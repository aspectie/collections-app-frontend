import axios from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

type TSingInResponse = {
  access_token: string
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json()
    const {data} = await axios.post<TSingInResponse>("/auth/sign-up", body)
    
    if (data.access_token) {  
      cookies().set('__token', data.access_token)
    }
    
    return NextResponse.json(data);
  } catch (e) {
    console.log(e)
    throw new NextResponse('Internal error', { status: 400 })
  }
}