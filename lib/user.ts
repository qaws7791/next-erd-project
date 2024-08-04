"use server";
import { connectDB } from "@/db/mongodb";
import { verifySession } from "@/lib/session";
import User, { UserDocument } from "@/db/models/user";
import { cache } from "react";

export const getUser = cache(async () => {
  const session = await verifySession();

  if (!session) return null;

  try {
    await connectDB();
    const user = await User.findOne({
      _id: session.userId,
    });

    return user as UserDocument;
  } catch (error) {
    console.error(error);
    return null;
  }
});
