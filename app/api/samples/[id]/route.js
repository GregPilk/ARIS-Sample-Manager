// http://localhost:3000/api/samples/123456765
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


// Added by: Nick
// Date: 2024-06-25
// This is a GET request that will be sent to MongoDB
// This will get 1 sample from the database using the sample ID
// This will also include the tests that are associated with the sample
// Following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
export const GET = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // Convert id to integer.. this is needed because the id from params is a string
    // COC is stored as an integer in the database
    id = parseInt(id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const sample = await prisma.sample.findUnique({
      include: {
        tests: true,
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

// Added by: Nick
// Date: 2024-06-25
// This is a PATCH request that updates a single sample by ID
// The will update 1 sample from the database using the sample ID
// This will only update information in the sample table, this will NOT update the tests data.
// Following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI

// NOT SURE IF THIS IS NEEDED YET - NICK
// only "type" field can be updated, so this may not be needed 
// sample structure:

// _id : 123456765
// type : "Water"
// recordChainOfCustody : 123456456456