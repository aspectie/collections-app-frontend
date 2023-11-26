import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('__token')
    
    if (!token || !token.value) {
      return NextResponse.json([]);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token?.value}`
      }
    })

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