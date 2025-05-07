const emailForOtpVerification = (email, otp) => {
    return `
Hello,
You requested to reset your password. Use the OTP below to reset your password:

OTP: ${otp}

This OTP is valid for 10 minutes.
If you did not request this, please ignore this email.

Thank you,
Your App Team`;
};

export { emailForOtpVerification };