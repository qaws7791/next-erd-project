import { Recommendation as RecommendationType } from "@/types";
import mongoose, { Document, Schema, Types } from "mongoose";

// user schema for multiple providers
export interface RecommendationDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  recommendations: RecommendationType["recommendations"];
  createdAt: Date;
  updatedAt: Date;
  author: Types.ObjectId;
}

const RecommendationSchema = new Schema<RecommendationDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recommendations: {
      type: [
        {
          coffeeName: {
            type: String,
            required: true,
          },
          coffeeDescription: {
            type: String,
            required: true,
          },
          keywords: {
            type: [String],
            required: true,
          },
        },
      ],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Recommendation =
  mongoose.models.Recommendation ||
  mongoose.model<RecommendationDocument>(
    "Recommendation",
    RecommendationSchema
  );
export default Recommendation;
