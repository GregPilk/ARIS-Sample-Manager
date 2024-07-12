// url: http://localhost:3000/api/records
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-06-18 
// This is the POST request that will be sent to MongoDB
// This will send 1 complete record to the database
// following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
export const POST = async (request) => {
    try{
        const body = await request.json();
        const { Record } = body; // Destructure Record from body
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
            samples, 
        } = Record; // Destructure properties from Record

        const createdRecord = await prisma.record.create({
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
                create: samples.map(sample => ({
                  sampleID: sample.sampleID,
                  type: sample.type,
                  tests: {
                    create: sample.tests.map(test => ({
                      name: test.name,
                      phConResults: test.name === 'PH/Conductivity' ? { create: test.phConResults } : undefined,
                      tssResults: test.name === 'TSS' ? { create: test.tssResults } : undefined,
                      icResults: test.name === 'IC' ? { create: test.icResults } : undefined,
                      tictocResults: test.name === 'TICTOC' ? { create: test.tictocResults } : undefined,
                      alkalinityResults: test.name === 'Alkalinity' ? { create: test.alkalinityResults } : undefined,
                    }))
                  }
                }))
              }
            },
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
                    }
                  }
                }
              }
            }
          });

        return NextResponse.json(createdRecord, {status: 201});
    }
    catch (err) 
    {
        console.log(err);
        return NextResponse.json({message: "POST error", err}, {status: 500});
    }
};


// Added by: Nick
// Date: 2024-07-11
// This is a GET request that will be sent to MongoDB
// This will get all records from the database
// This will only return data from the Record collection

export const GET = async (request) => {
    try {
        const records = await prisma.record.findMany();
        return NextResponse.json(records, {status: 200});
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: "GET error", err}, {status: 500});
    }
}

