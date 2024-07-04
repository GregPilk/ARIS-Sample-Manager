// url: http://localhost:3000/api/records
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-06-18 
// This is the POST request that will be sent to MongoDB
// This will send 1 complete record to the database
// following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
export const POST = async (request) => {
  try {
    const body = await request.json();
    const {
      chainOfCustody,
      reportToCompany,
      reportToContact,
      reportToPhone,
      reportToStreet,
      reportToCity,
      reportToPostal,
      invoiceToSameAsReport,
      invoiceToCopyOfInvoice,
      invoiceToCompany,
      invoiceToContact,
      reportRecipientFormat,
      mergeQCReports,
      selectDistribution,
      reportRecipientEmailOne,
      reportRecipientEmailTwo,
      reportRecipientEmailThree,
      invoiceRecipientDistribution,
      invoiceRecipientEmailOne,
      invoiceRecipientEmailTwo,
      samples, // this is an array of Sample objects
    } = body;

    samples.forEach((sample) => {
      const {
        sampleID,
        type,
        tests, // This is an array of Test objects
        recordChainOfCustody,
      } = sample;

      tests.forEach((test) => {
        const {
          id,
          name,
          ph,
          conductivity,
          hpic,
          ic,
          alkalinity,
          toc,
          tic,
          icp,
          tss,
          completedBy,
          sampleSampleID,
        } = test;
      });
    });

    const newRecord = await prisma.record.create({
      data: {
        chainOfCustody,
        reportToCompany,
        reportToContact,
        reportToPhone,
        reportToStreet,
        reportToCity,
        reportToPostal,
        invoiceToSameAsReport,
        invoiceToCopyOfInvoice,
        invoiceToCompany,
        invoiceToContact,
        reportRecipientFormat,
        mergeQCReports,
        selectDistribution,
        reportRecipientEmailOne,
        reportRecipientEmailTwo,
        reportRecipientEmailThree,
        invoiceRecipientDistribution,
        invoiceRecipientEmailOne,
        invoiceRecipientEmailTwo,
        samples: {
          create: samples.map((sample) => ({
            sampleID: sample.sampleID,
            type: sample.type,
            recordChainOfCustody: sample.recordChainOfCustody,
            tests: {
              create: sample.tests.map((test) => ({
                id: test.id,
                name: test.name,
                ph: test.ph,
                conductivity: test.conductivity,
                hpic: test.hpic,
                ic: test.ic,
                alkalinity: test.alkalinity,
                toc: test.toc,
                tic: test.tic,
                icp: test.icp,
                tss: test.tss,
                completedBy: test.completedBy,
                sampleSampleID: test.sampleSampleID,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(newRecord);

  } 
  catch (err) 
  {
    return NextResponse.json({message: "POST error", err}, {status: 500});
  }
};


// Added by: Nick
// Date: 2024-06-20 
// This is the GET request that will be sent to MongoDB
// This will get all records from the database
// following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
export const GET = async () => {
  try {
    const records = await prisma.record.findMany({
      include: {
        samples: {
          include: {
            tests: true,
          },
        },
      },
    });

    return NextResponse.json(records);
  } 
  catch (err) 
  {
    return NextResponse.json({message: "GET error", err}, {status: 500});
  }
};
