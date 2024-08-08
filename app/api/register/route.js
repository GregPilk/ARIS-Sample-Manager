import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, user, password } = await req.json();

    console.log("Name:", name);
    console.log("User:", user);
    console.log("Password:", password);

    return NextResponse.json({ message: "User Registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
}
