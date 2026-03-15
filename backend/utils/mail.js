import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail=async (to,otp) => {
    try {
        console.log(`Sending OTP to: ${to}`);
        console.log(`OTP: ${otp}`);
        
        await transporter.sendMail({
            from:process.env.EMAIL,
            to,
            subject:"Vingo - Your Verification Code",
            html:`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <div style="background-color: white; padding: 20px; border-radius: 8px; text-align: center;">
                <h1 style="color: #ff4d2d; margin-bottom: 10px;">Vingo Food Delivery</h1>
                <h2 style="color: #333; margin-bottom: 10px;">Password Reset Request</h2>
                <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Hello,</p>
                <p style="color: #666; font-size: 16px; margin-bottom: 20px;">You requested to reset your password for your Vingo Food Delivery account.</p>
                <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Your verification code is:</p>
                <div style="background-color: #f0f0f0; color: white; font-size: 24px; font-weight: bold; padding: 15px; margin: 20px 0; text-align: center; border-radius: 4px;">${otp}</div>
                <p style="color: #666; font-size: 14px; margin-top: 20px;">This code will expire in 5 minutes.</p>
                <p style="color: #999; font-size: 12px; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="color: #999; font-size: 12px;">Best regards,<br>Vingo Food Delivery Team</p>
            </div>
        </div>
        `});
        
        console.log('OTP email sent successfully');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
}

export const sendDeliveryOtpMail=async (user,otp) => {
    await transporter.sendMail({
        from:process.env.EMAIL,
        to:user.email,
        subject:"Delivery OTP",
        html:`<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })
}
