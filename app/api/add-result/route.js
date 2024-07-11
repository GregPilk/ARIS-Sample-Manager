//http://localhost:3000/api/records/123456789

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-06-18
// This is the POST request that will add a result to an existing test
export const POST = async (request) => {
    try {
        const body = await request.json();
        const {
            testID,
            resultType,
            resultData,
        } = body;

        // Check if the test with the given testID exists
        const test = await prisma.test.findUnique({
            where: {
                id: testID,
            },
        });

        if (!test) {
            return NextResponse.json({ message: "Test not found" }, { status: 404 });
        }

        let createdResult;

        // Determine the result type and create the corresponding result
        switch (resultType) {
            case 'PhConResult':
                createdResult = await prisma.phConResult.create({
                    data: {
                        testID,
                        ph: resultData.ph,
                        conductivity: resultData.conductivity,
                    },
                });
                break;
            case 'TSSResult':
                createdResult = await prisma.tSSResult.create({
                    data: {
                        testID,
                        tssInMgl: resultData.tssInMgl,
                    },
                });
                break;
            case 'ICResult':
                createdResult = await prisma.iCResult.create({
                    data: {
                        testID,
                        determinationStart: resultData.determinationStart,
                        ident: resultData.ident,
                        sampleType: resultData.sampleType,
                        methodName: resultData.methodName,
                        infoOne: resultData.infoOne,
                        anionsChlorideConcentration: resultData.anionsChlorideConcentration,
                        anionsSulfateConcentration: resultData.anionsSulfateConcentration,
                    },
                });
                break;
            case 'TICTOCResult':
                createdResult = await prisma.tICTOCResult.create({
                    data: {
                        testID,
                        type: resultData.type,
                        analogy: resultData.analogy,
                        resultTOC: resultData.resultTOC,
                        resultTC: resultData.resultTC,
                        resultIC: resultData.resultIC,
                        resultPOC: resultData.resultPOC,
                        resultNPOC: resultData.resultNPOC,
                        resultTN: resultData.resultTN,
                        unit: resultData.unit,
                        vial: resultData.vial,
                    },
                });
                break;
            case 'AlkalinityResult':
                createdResult = await prisma.alkalinityResult.create({
                    data: {
                        testID,
                        methodName: resultData.methodName,
                        ID1value: resultData.ID1value,
                        RS01name: resultData.RS01name,
                        RS01value: resultData.RS01value,
                        RS01unit: resultData.RS01unit,
                        sampleSizeValue: resultData.sampleSizeValue,
                        unitValue: resultData.unitValue,
                        remarks: resultData.remarks,
                        RS02name: resultData.RS02name,
                        RS02value: resultData.RS02value,
                        RS02unit: resultData.RS02unit,
                        RS02meanValue: resultData.RS02meanValue,
                        determinationStart: resultData.determinationStart,
                    },
                });
                break;
            default:
                return NextResponse.json({ message: "Invalid result type" }, { status: 400 });
        }

        return NextResponse.json(createdResult, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "POST error", err }, { status: 500 });
    }
};
