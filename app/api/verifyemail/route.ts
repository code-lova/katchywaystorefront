import { NextResponse } from 'next/server';
import User from '@/models/user';
import { connectToDB } from '@/utils/mongodb';

export async function POST(req: Request) {
    try {
        const { otp } = await req.json();

        await connectToDB();

        // Find the user by confirmation code
        const user = await User.findOne({ emailConfirmationCode: otp });

        if (!user) {
            return NextResponse.json({ error: 'Invalid confirmation code' }, { status: 400 });
        }

        // Update the emailConfirmed field
        user.emailConfirmed = 1;
        user.emailConfirmationCode = ''; // Clear the confirmation code
        await user.save();

        return NextResponse.json({ message: 'Email confirmed successfully' }, { status: 200});

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500});
    }
}
