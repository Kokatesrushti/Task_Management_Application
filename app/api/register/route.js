import { connectMongo } from "@/lib/mongodb"
import User from "@/models/user";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const { name,gender, email, password } = await req.json()

        console.log(name,gender, email, password)

        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongo();

        const _user = await User.findOne({ email: email }).exec();
        if (_user) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const user = new User({
            name,
            gender,
            email,
            password: hashedPassword,
        });

        await user.save()

        return NextResponse.json({ message: 'User Registered' }, { status: 201 });
        
    } catch (error) {
        return NextResponse.json({ message: 'Error while registering' }, { status: 500 })
    }

}