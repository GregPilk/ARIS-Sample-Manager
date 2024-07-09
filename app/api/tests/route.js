// url: http://localhost:3000/api/tests
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-07-08
// This is the POST request that will be sent to MongoDB
// This will send 1 complete test to the database
// following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
export const POST = async (request) => {
  try {
    const body = await request.json();
    const {
        name,
        completedBy,
        sampleSampleID,
        ph,
        conductivity,
        tssInMgl,
        determinationStart,
        ident,
        sampleType,
        methodName,
        infoOne,
        anionsChlorideConcentration,
        anionsSulfateConcentration,
        type,
        analogy,
        resultTOC,
        resultTC,
        resultIC,
        resultPOC,
        resultNPOC,
        resultTN,
        unit,
        vial,
        ID1value,
        RS01name,
        RS01value,
        RS01unit,
        sampleSizeValue,
        unitValue,
        remarks,
        RS02name,
        RS02value,
        RS02unit,
        RS02meanValue
    } = body;

    // Check if sampleSampleID exists
    const sample = await prisma.sample.findUnique({
        where: {
            sampleID: sampleSampleID,
        },
        });
    
    if (!sample) {
        return NextResponse.json(
            { message: "Sample not found" },
            { status: 404 }
        );
        }

    const test = await prisma.test.create({
      data: {
        name,
        completedBy,
        sampleSampleID,
        ph,
        conductivity,
        tssInMgl,
        determinationStart,
        ident,
        sampleType,
        infoOne,
        anionsChlorideConcentration,
        anionsSulfateConcentration,
        type,
        analogy,
        resultTOC,
        resultTOC,
        resultTC,
        resultIC,
        resultPOC,
        resultNPOC,
        resultTN,
        unit,
        vial,
        methodName,
        ID1value,
        RS01name,
        RS01value,
        RS01unit,
        sampleSizeValue,
        unitValue,
        remarks,
        RS02name,
        RS02value,
        RS02unit,
        RS02meanValue

      },
    });

    return NextResponse.json(test);
  } catch (err) {
    return NextResponse.json(
      { message: "POST error", err: err.message },
      { status: 500 }
    );
  }
};