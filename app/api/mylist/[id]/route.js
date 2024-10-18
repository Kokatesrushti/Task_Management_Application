import { connectMongo } from "@/lib/mongodb"
import User from "@/models/user";
import { NextResponse } from "next/server"

export async function GET(req,{params}) {
    
    try {
        const { id } = params

        console.log(id)

        await connectMongo();

        const user=await User.findOne({_id:id}).populate('tasks');

        if(!user){
            return NextResponse.json({ message: 'User not exist' }, { status: 400 })
        }

        return NextResponse.json(user.tasks, { status: 200 })

        
    } catch (error) {
        return NextResponse.json({ message: 'Error while registering' }, { status: 500 })
    }

}