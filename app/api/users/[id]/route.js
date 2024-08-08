// url: http://localhost:3000/api/users/66ac112776fd63d614690e03
// this is John Doe's ID
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Added by: Nick
// Date: 2024-08-01
// This is the PATCH request that will be sent to MongoDB
// This will update 1 user in the database
//
// The user object should look like this:
// {
//     "email": "newemail@test.ca",
//     "name": "John Doe",
//     "password" : "newPassword",
//     "role": "user"
// }
export const PATCH = async (request, { params, body }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: body.email,
        name: body.name,
        password: await bcrypt.hash(body.password, 10),
        role: body.role,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "PATCH error", err: err.message }, { status: 500 });
  }
};

// Added by: Nick
// Date: 2024-08-01
// This is the DELETE request that will be sent to MongoDB
// This will delete 1 user from the database
export const DELETE = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "DELETE error", err: err.message }, { status: 500 });
  }
};

// Added by: Adam
// Date: 2024-08-07
// This is the GET request that will be sent to MongoDB
// This will retrieve 1 user from the database by ID

export const GET = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "GET error", err: err.message }, { status: 500 });
  }
};
