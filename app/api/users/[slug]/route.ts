import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
  slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {

  const existingUser = await prisma.user.findUnique({
    where: {
      id: params.slug
    }
  });
  
  return NextResponse.json(existingUser);
}