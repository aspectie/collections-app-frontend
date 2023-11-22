import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    //TODO: Refactor token hack
    const token = req.cookies.get('__token')?.value
    const config = token ? {
      headers: {Authorization: `Bearer ${token}`}
    } : {}
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/categories`, config)
    
    return NextResponse.json(await data.json());
  } catch (e) {
    console.log(e)
    throw new NextResponse('Internal error', { status: 400 })
  }
}