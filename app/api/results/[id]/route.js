// url: http://localhost:3000/api/results/668f35ec1861993c21c7621b 
//                                        this is a id for a TSS result

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-07-23
// This is the PATCH request that will update a result
// This will update the result based on the resultID and resultType provided in the body
// The resultData will be the new data for the result

// basic structure of the body:
// {
//   "resultID": "specificResultID",
//   "resultType": "PhConResult",
//   "resultData": {
//     "ph": "7.4",
//   }
// }
// Note does not require all fields to be updated, only the ones that need to be changed
export const PATCH = async (request) => {
    try {
      const body = await request.json();
      const {
        resultID,       
        resultType,     
        resultData,     
      } = body;
  
     
      if (!resultID || !resultType) {
        return NextResponse.json({ message: "resultID and resultType are required" }, { status: 400 });
      }
  
      let updatedResult;
  
      
      switch (resultType) {
        case 'PhConResult':
          updatedResult = await prisma.phConResult.update({
            where: { id: resultID },
            data: {
              ...resultData, 
            },
          });
          break;
        case 'TSSResult':
          updatedResult = await prisma.tSSResult.update({
            where: { id: resultID },
            data: {
              ...resultData,
            },
          });
          break;
        case 'ICResult':
          updatedResult = await prisma.iCResult.update({
            where: { id: resultID },
            data: {
              ...resultData,
            },
          });
          break;
        case 'TICTOCResult':
          updatedResult = await prisma.tICTOCResult.update({
            where: { id: resultID },
            data: {
              ...resultData,
            },
          });
          break;
        case 'AlkalinityResult':
          updatedResult = await prisma.alkalinityResult.update({
            where: { id: resultID },
            data: {
              ...resultData,
            },
          });
          break;
        default:
          return NextResponse.json({ message: "Invalid result type" }, { status: 400 });
      }
  
      return NextResponse.json(updatedResult, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "PATCH error", err }, { status: 500 });
    }
  };
  