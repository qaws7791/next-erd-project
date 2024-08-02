import { Recommendation as RecommendationType } from "@/types";
import mongoose, { Schema } from "mongoose";

// user schema for multiple providers
export interface RecommendationDocument {
  _id: string;
  title: string;
  description: string;
  recommendations: RecommendationType["recommendations"];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
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
    userId: {
      type: String,
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
