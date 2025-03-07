// url: http://localhost:3000/api/records/987654321
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-06-18
// This is the GET request that will retrieve a record with all related data
export const GET = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const record = await prisma.record.findUnique({
      include: {
        samples: {
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
        },
      },
      where: {
        chainOfCustody: id,
      },
    });

    if (!record) {
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(record);
  } catch (err) {
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};


// Added by: Nick
// Date: 2024-07-22
// This is the PATCH request that will update a record
export const PATCH = async (request, { params }) => {
  try {
    let { id } = params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const updatedRecord = await prisma.record.update({
      where: {
        chainOfCustody: id,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
};
