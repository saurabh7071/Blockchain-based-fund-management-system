import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { emailForOtpVerification } from "../utils/emailTemplateForOTP.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

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
        loginType: "email",
    })

    if (!user) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // remove password and refresh token filed from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken -status")

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
    const user = await User.findOne({$or: [{ email }, { loginType: email }]}).select("+password")
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if (user.loginType !== 'email') {
        throw new ApiError(400, "Invalid login type")
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

const requestPasswordReset = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email }).select("+email +lastOtpSentAt");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if OTP was sent recently
    const cooldownPeriod = 60 * 1000; // 30 seconds
    if (user.lastOtpSentAt && Date.now() - user.lastOtpSentAt < cooldownPeriod) {
        throw new ApiError(429, "You can only request a new OTP after 60 seconds");
    }

    // Generate a one-time code or token
    const otp = crypto.randomBytes(3).toString("hex");

    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    user.lastOtpSentAt = Date.now(); // Update the last OTP sent time
    await user.save({ validateBeforeSave: false });

    const sentOtp = emailForOtpVerification(user.email, otp);
    try {
        await sendEmail(user.email, "Password Reset OTP", sentOtp);
    } catch (error) {
        throw new ApiError(500, "Failed to send email. Please try again later.");
    }

    // Return response
    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset token sent to your email")
    );
});

const resetPasswordWithOtp = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        throw new ApiError(400, "Email, OTP, and new password are required");
    }

    const user = await User.findOne({ email }).select("+resetOtp +resetOtpExpires");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if OTP is valid
    if (user.resetOtp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    // Check if OTP is expired
    if (user.resetOtpExpires < Date.now()) {
        throw new ApiError(400, "OTP has expired");
    }

    // Update the password
    user.password = newPassword;
    user.resetOtp = undefined; // Clear the OTP
    user.resetOtpExpires = undefined; // Clear the expiration
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset successfully")
    );
});

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
    requestPasswordReset,
    resetPasswordWithOtp,
    getCurrentUser,
    generateAccessAndRefreshTokens
}