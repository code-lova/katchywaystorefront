import bcrypt from 'bcryptjs';
import { connectToDB } from "@/utils/mongodb";
import User from "@/models/user";
import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import crypto from "crypto";

   

export async function POST(req: Request) {
    try{
        const { name, username, email, password} = await req.json();

        // Basic server-side validation
        if (!name || !username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if name contains only letters (using regex)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            return NextResponse.json({ error: 'Name can only contain letters and spaces' }, { status: 400 });
        }

        // Check if username contains only alphanumeric characters (using regex)
        const usernameRegex = /^[A-Za-z0-9]+$/;
        if (!usernameRegex.test(username)) {
            return NextResponse.json({ error: 'Username can only contain letters and numbers' }, { status: 400 });
        }

        // Connect to the database when the file is first run
        await connectToDB();

        //check first if user already exist
        const existUser = await User.findOne({ email, username });
        if(existUser){
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //generate a confirmation code
        const emailConfirmationCode = crypto.randomBytes(3).toString('hex');

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword,
            name,
            username,
            role: 'user', // Default role
            emailConfirmed: 0, // New field to track email confirmation
            emailConfirmationCode, // Store the confirmation code
        });

        // Save the user to the database
        await user.save();

            //NODE MAILER FOR SENDING EMAIL
        var transporter = nodemailer.createTransport({
            host: 'smtp.titan.email',
            port: 465,
            secure: true,
            debug: true,
            connectionTimeout: 10000,
            auth: {
                user: process.env.GRIEVANCE_EMAIL, //GOTTON FROM ENV FILE
                pass: process.env.GRIEVANCE_EMAIL_PASSWORD  //GOTTON FROM ENV FILE
            }
        });

        const mailOptions = {
            from: process.env.GRIEVANCE_EMAIL,
            to: email,
            subject: 'Email Confirmation',
            text: `Your confirmation code is: "${emailConfirmationCode}". This is not valid after now`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Please check your email for the OTP confirmation code' }, { status: 200 });


    }catch (error) {
        console.error('Error in signup process:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }


    

}