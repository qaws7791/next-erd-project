import { loginOrCreate } from "@/db/actions/login";
import { createSession } from "@/lib/session";
import { OAuth2Client } from "google-auth-library";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const clientId = formData.get("clientId")?.toString();
  const token = formData.get("credential")?.toString();

  if (clientId !== process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    return new Response("Invalid client id", { status: 400 });
  }

  if (!token) {
    return new Response("Token is missing", { status: 400 });
  }

  try {
    // verify the token to google
    const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return new Response("Invalid token", { status: 400 });
    }

    if (!payload.email) {
      return new Response("Invalid email", { status: 400 });
    }

    const user = await loginOrCreate({
      email: payload.email,
      googleId: payload.sub,
      name: payload.name || payload.email,
      photo: payload.picture,
    });

    if (user.error) {
      return new Response(user.error, { status: 400 });
    }

    await createSession(user.user._id);
  } catch (error) {
    console.error(error);
  }
  return redirect("/");
}
