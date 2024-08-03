import Recommendation from "@/db/models/recommendation";
import { connectDB } from "@/db/mongodb";
import { NextResponse } from "next/server";

// pagination based on the query parameters cursor and limit sorted by _id descending
export async function GET(request: Request) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  if (limit > 40 || limit < 1) {
    return new Response("Limit must be between 1 and 40", { status: 400 });
  }

  await connectDB();

  const filter = cursor ? { _id: { $lt: cursor } } : {};

  // fing recommendations and author profile
  const recommendations = await Recommendation.find({
    ...filter,
  })
    .populate("author", "name email photo")
    .sort({ _id: -1 })
    .limit(limit);

  return NextResponse.json(recommendations);
}
