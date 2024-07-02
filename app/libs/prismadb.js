// Added by: Nick
// Date: 2024-06-18 
// following instructions from https://www.youtube.com/watch?v=KvesFlTVCaI
// time stamp 38.08

import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client; 

export default client;