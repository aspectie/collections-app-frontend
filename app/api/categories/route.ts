import axios from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

import { TCategory } from "@/types/category";

export async function GET(req: NextRequest) {
  try {   
    const {data} = await axios.get<TCategory>(`/categories`)
    
    return NextResponse.json(data);
  } catch (e) {
    console.log(e)
    throw new NextResponse('Internal error', { status: 400 })
  }
}