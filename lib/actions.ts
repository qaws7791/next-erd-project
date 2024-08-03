"use server";

import Recommendation from "@/db/models/recommendation";
import { connectDB } from "@/db/mongodb";
import { generateCoffeeRecommendation } from "@/gemini";
import { getUser } from "@/lib/user";
import { ChatFormState } from "@/types/form-state";

export async function createChat(
  state: ChatFormState,
  formData: FormData
): Promise<ChatFormState> {
  const message = formData.get("message") as string;

  if (!message) {
    return { errors: { message: "Message is required" } };
  }

  const user = await getUser();

  if (!user) {
    return { errors: { message: "User is not authenticated" } };
  }

  const result = await generateCoffeeRecommendation(message);

  //save the chat to the database

  await connectDB();
  const recommendation = new Recommendation({
    title: result.title,
    description: result.description,
    recommendations: result.recommendations,
    author: user._id,
  });
  await recommendation.save();

  console.log("title", result.title);
  console.log("description", result.description);
  result.recommendations.forEach((recommendation) => {
    console.log("coffee: ", recommendation.coffeeName);
    console.log("description: ", recommendation.coffeeDescription);
    console.log("keywords: ", recommendation.keywords.join(", "));
  });
  return { result };
}
