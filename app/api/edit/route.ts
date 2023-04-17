import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, image } = body;

  const updateUser = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data : {
      name,
      image,
    }
  });

  return NextResponse.json(updateUser);
}

