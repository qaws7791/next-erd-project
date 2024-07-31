"use server";
import { connectDB } from "@/db/mongodb";
import User from "@/db/models/user";

export const register = async (values: {
  email: string;
  googleId: string;
  name: string;
  photo?: string;
}) => {
  const { email, googleId, name, photo } = values;
  try {
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        error: "User already exists",
      };
    }

    const user = new User({
      email,
      googleId,
      name,
      photo,
    });

    await user.save();
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};
