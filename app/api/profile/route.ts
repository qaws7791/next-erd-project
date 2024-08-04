import { getUser } from "@/lib/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();

  if (!user) {
    return new Response("User is not authenticated", {
      status: 401,
    });
  }

  return NextResponse.json(user);
}
