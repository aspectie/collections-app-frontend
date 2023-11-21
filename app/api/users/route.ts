import axios from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

import { TUser } from "@/types/user";

export async function GET(req: NextRequest) {
  try {   
    const {data} = await axios.get<TUser>(`/users/me`)
    
    return NextResponse.json(data);
  } catch (e) {
    console.log(e)
    throw new NextResponse('Internal error', { status: 400 })
  }
}