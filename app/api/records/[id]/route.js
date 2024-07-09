// http://localhost:3000/api/records/123456
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-06-20
// This is the GET request that will be sent to MongoDB
// This will get 1 record from the database using the COC number
// following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
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
            tests: true,
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
// Date: 2024-06-25
// This is the PATCH request that will be sent to MongoDB
// This will update 1 record from the database using the COC number
// This will only update information in the record tables, this will NOT update the samples and tests data.
// following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
export const PATCH = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const record = await prisma.record.findUnique({
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

    const data = await request.json();

    const updatedRecord = await prisma.record.update({
      where: {
        chainOfCustody: id,
      },
      data,
    });

    return NextResponse.json(updatedRecord);
  } catch (err) {
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
};


// Added by: Nick
// Date: 2024-07-08
// This is the DELETE request that will be sent to MongoDB
// This will delete 1 record from the database using the COC number
// This will delete all the samples and tests data associated with the record.
// following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
export const DELETE = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // Fetch the record with related samples (and their tests)
    const record = await prisma.record.findUnique({
      where: {
        chainOfCustody: id,
      },
      include: {
        samples: {
          include: {
            tests: true,
          },
        },
      },
    });

    if (!record) {
      return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }

    // Delete tests for each sample
    for (const sample of record.samples) {
      await prisma.test.deleteMany({
        where: {
          sampleSampleID: sample.sampleID,
        },
      });
    }

    // Delete samples
    await prisma.sample.deleteMany({
      where: {
        recordChainOfCustody: id,
      },
    });

    // Now delete the record itself
    const deletedRecord = await prisma.record.delete({
      where: {
        chainOfCustody: id,
      },
    });

    return NextResponse.json(deletedRecord);
  } catch (err) {
    return NextResponse.json(
      { message: "DELETE error", err: err.message },
      { status: 500 }
    );
  }
};
