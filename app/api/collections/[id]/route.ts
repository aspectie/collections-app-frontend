import axios from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

import { TCollection } from "@/types/collection";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {data} = await axios.delete<TCollection>(`/collections/${params.id}`)
    
    return NextResponse.json(data);
  } catch (e) {
    console.log(e)
    throw new NextResponse('Internal error', { status: 400 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    console.log(body)
    const {data} = await axios.patch<TCollection>(`/collections/${params.id}`, body)
    
    return NextResponse.json(data);
  } catch (e) {
    console.log(e)
    throw new NextResponse('Internal error', { status: 400 })
  }
}