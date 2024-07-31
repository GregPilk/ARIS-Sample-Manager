// url: http://localhost:3000/api/samples
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-07-30
// This is the GET request that will retrieve all samples
export const GET = async (request) => {
  try {
    const samples = await prisma.sample.findMany({
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
    });

    return NextResponse.json(samples);
  } catch (err) {
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};