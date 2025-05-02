import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // storing refresh token into database 
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

// User Registration
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    // validation - not empty
    if ([name, email, password, phone].some((field) => {
        !field || field?.trim() === ""
    })) {
        throw new ApiError(400, "All fields are required!!")
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    // Validation - phone number length
    if (phone.length != 10) {
        throw new ApiError(400, "Phone number should be of 10 digits!!");
    }

    // check if user already exists : username, email
    const exitedUser = await User.findOne({
        $or: [{ phone }, { email }]
    })

    if (exitedUser) {
        throw new ApiError(400, "User with email or phone number already exists!!")
    }

    // create user object - create entry in db
    const user = await User.create({
        name,
        email,
        password,
        phone,
        role: "user",
    })

    if (!user) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // remove password and refresh token filed from response
    const createdUser = await User.findById(user._id)

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the data")
    }

    // return reponse 
    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                createdUser,
                "User Data Registered Successfully !!"
            )
        )
})

// User Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // validation - username or email
    if (!email) {
        throw new ApiError(400, "email is required")
    }

    // check if user exists
    const user = await User.findOne({
        $or: [{ email }]
    }).select("+password")

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    // check password
    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    // generate access and refresh tokens 
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    // send access token and refresh token - cookie 
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None", // Important for production frontend + backend cross-origin
    }

    // return reponse
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    role: user.role,
                    accessToken,
                    refreshToken
                },
                "User Logged In Successfully"
            )
        )
})

// log out functionality 
const logoutUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "You must be logged in to log out");
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        {
            new: true,
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict", // optional, security ke liye
        path: "/",          // important
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User Logged Out Successfully")
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    // Take Incoming token from user 
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    // validate incoming Token 
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unautorized request")
    }

    try {
        // Verify incoming token 
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        // decoded token me se userId (token) fetch karne ka 
        const user = await User.findById(decodedToken?._id)

        // validate Fetch Userid (token)
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }

        // check both token are match or not 
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict", // optional for extra security
            path: "/"
        }

        // if both tokens are match - generate new token
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        // return response 
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access Token Refreshed Successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})

// change password 
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id).select("+password")

    if (!user) {
        throw new ApiError(404, "User not Found")
    }

    // compare the provided old password with the stored hash 
    const isPasswordCorrect = await user.comparePassword(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Old password is incorrect")
    }

    // Check if the new password same as the old password 
    const isSameAsOldPass = await user.comparePassword(newPassword)

    if (isSameAsOldPass) {
        throw new ApiError(400, "New Password can not be the same as the old Password!!")
    }

    // update the password 
    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed Successfully"))
})

// get current user 
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "Current User Fetched Successfully")
        )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    generateAccessAndRefreshTokens
}