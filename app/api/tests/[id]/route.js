// url: http://localhost:3000/api/tests/507f1f77bcf86cd799439511
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-06-25
// This is a GET request that will be sent to MongoDB
// This will get 1 test from the database using the test ID
// Following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
export const GET = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const test = await prisma.test.findUnique({
      where: {
        id: id,
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

// Added by: Nick
// Date: 2024-06-25
// This is a PATCH request that updates a single test by ID
// The will update 1 test from the database using the test ID
// This will only update information in the test table, this will NOT update the samples and records data.
// Following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
export const PATCH = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const test = await prisma.test.findUnique({
      where: {
        id: id,
      },
    });

    if (!test) {
      return NextResponse.json(
        { message: "Test not found" },
        { status: 404 }
      );
    }

    const data = await request.json();

    const updatedTest = await prisma.test.update({
      where: {
        id: id,
      },
      data,
    });

    return NextResponse.json(updatedTest);
  }catch (err) {
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
 }

