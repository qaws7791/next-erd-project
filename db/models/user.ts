import mongoose, { Schema } from "mongoose";

// user schema for multiple providers
export interface UserDocument {
  _id: string;
  email: string;
  googleId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  photo: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String },
  },

  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
export default User;
