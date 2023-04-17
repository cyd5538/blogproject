import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {


  const myPosts = await prisma.post.findMany({
      where: {
        userId: params.slug,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(myPosts);
}
