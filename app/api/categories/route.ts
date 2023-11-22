import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    //TODO: Refactor token hack
    const token = req.cookies.get('__token')?.value

    if (!token) {
      return NextResponse.json({status: 400})
    }
    const config = token ? {
      headers: {Authorization: `Bearer ${token}`}
    } : {}
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/categories`, config)

    if (res.ok) {
      return NextResponse.json(await res.json());
    } else {
      throw new NextResponse('Internal error', { status: 400 })
    }
  } catch (e) {
    console.log(e)
    throw new NextResponse('Internal error', { status: 400 })
  }
}