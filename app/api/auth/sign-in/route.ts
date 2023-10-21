import axios from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

type TSingInResponse = {
  access_token: string
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json()
    const {data} = await axios.post<TSingInResponse>("/auth/sign-in", body)

    if (data.access_token) {  
      cookies().set('__token', data.access_token)
    }
    
    return NextResponse.json(data);
  } catch (e: any) {    
    if (e.response.data.message) {    
      return NextResponse.json({ message: e.response.data.message }, {status: e.response.data.statusCode});
    }
    throw new NextResponse('Internal error', { status: 400 })
  }
}