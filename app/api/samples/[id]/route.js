// url: http://localhost:3000/api/samples/S123456
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-07-30
// This is the GET request that will retrieve a sample with all related data
export const GET = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const sample = await prisma.sample.findUnique({
      include: {
        tests: {
          include: {
            phConResults: true,
            tssResults: true,
            icResults: true,
            tictocResults: true,
            alkalinityResults: true,
          },
        },
      },
      where: {
        sampleID: id,
      },
    });

    if (!sample) {
      return NextResponse.json(
        { message: "Sample not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(sample);
  } catch (err) {
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};
