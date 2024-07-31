"use server";

import { connectDB } from "@/db/mongodb";
import User from "@/db/models/user";

export const login = async (values: { email: string; googleId: string }) => {
  const { email, googleId } = values;
  try {
    await connectDB();
    const user = await User.findOne({
      email,
      googleId,
    });
    if (!user) {
      return {
        error: "User not found",
      };
    }
    return {
      user,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};

export const loginOrCreate = async (values: {
  email: string;
  googleId: string;
  name: string;
  photo?: string;
}) => {
  const { email, googleId, name, photo } = values;

  try {
    await connectDB();
    let user = await User.findOne({ email, googleId });
    if (!user) {
      user = new User({
        email,
        googleId,
        name,
        photo,
      });
      await user.save();
    }
    return {
      user,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};
