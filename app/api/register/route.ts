import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  // prisma를 사용하여 이미 등록된 유저인지 확인한다.
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  
  // 이미 등록된 유저라면 422 에러를 반환한다.
  if (existingUser) {
    return new NextResponse(
      JSON.stringify({ success: false, message: '이미 사용중인 이메일입니다' }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
