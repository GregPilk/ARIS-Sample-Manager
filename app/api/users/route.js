// url: http://localhost:3000/api/users
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Added by: Nick
// Date: 2024-08-01
// This is the POST request that will be sent to MongoDB
// This will send 1 complete user to the database
// 
// The user object should look like this:
//  {
//     "email": "example@example.com",
//     "name": "John Doe",
//     "password": "password123",
//     "role": "user"
//  }
export const POST = async (request) => {
  try {
    const body = await request.json();
    const {
        email,
        name,
        password,
        role,
    } = body; 

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json(createdUser, {status: 201});
  } 
  catch (err) 
  {
    console.log(err);
    return NextResponse.json({message: "user POST error", err}, {status: 500});
}
};


// Added by: Nick
// Date: 2024-08-01
// This is the GET request that will be sent to MongoDB
// This will get all users from the database
export const GET = async (request) => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, {status: 200});
  } 
  catch (err) 
  {
    console.log(err);
    return NextResponse.json({message: "user GET error", err}, {status: 500});
  }
};