import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import type { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
    try {
        const body = await req.body;
        const userData = body.formData;

        //Confirm data exists
        if (!userData?.email || !userData.password) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        // check for duplicate emails
        const duplicate = await User.findOne({ email: userData.email })
            .lean()
            .exec();

        if (duplicate) {
            return NextResponse.json({ message: "Email already exist" }, { status: 409 });
        }

        const hashPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashPassword;
        userData.role="user";

        await User.create(userData);
        return NextResponse.json({ message: "Signed up successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}
