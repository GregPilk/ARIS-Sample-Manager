import NextAuth from 'next-auth';
import { authOptions } from '../../../auth'; // Adjust path as needed

export const GET = async (req, res) => {
    return NextAuth(req, res, authOptions);
  };
  
  export const POST = async (req, res) => {
    return NextAuth(req, res, authOptions);
  };