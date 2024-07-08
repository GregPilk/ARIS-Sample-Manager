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

            // this needs to be reworked to match the schema
            tests: {
              create: sample.tests.map((test) => ({
                name: test.name,
                completedBy: test.completedBy,
                sampleSampleID: test.sampleSampleID,
                ph: test.ph,
                conductivity: test.conductivity,
                tssInMgl: test.tssInMgl,
                determinationStart: test.determinationStart,
                ident: test.ident,
                sampleType: test.sampleType,
                methodName: test.methodName,
                infoOne: test.infoOne,
                anionsChlorideConcentration: test.anionsChlorideConcentration,
                anionsSulfateConcentration: test.anionsSulfateConcentration,
                type: test.type,
                analogy: test.analogy,
                resultTOC: test.resultTOC,
                resultTC: test.resultTC,
                resultIC: test.resultIC,
                resultPOC: test.resultPOC,
                resultNPOC: test.resultNPOC,
                resultTN: test.resultTN,
                unit: test.unit,
                vial: test.vial,
                methodName: test.methodName,
                ID1value: test.ID1value,
                RS01name: test.RS01name,
                RS02name: test.RS02name,
                RS02meanValue: test.RS02meanValue,
                // whatever is needed for metals...
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
