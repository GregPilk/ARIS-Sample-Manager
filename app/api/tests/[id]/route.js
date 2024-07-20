// url: http://localhost:3000/api/tests/987654321
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-07-19
// This is the GET request that will retrieve a test with all related data
export const GET = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const test = await prisma.test.findUnique({
      include: {
        phConResults: true,
        tssResults: true,
        icResults: true,
        tictocResults: true,
        alkalinityResults: true,
      },
      where: {
        id,
      },
    });

    if (!test) {
      return NextResponse.json(
        { message: "Test not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(test);
  } catch (err) {
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};