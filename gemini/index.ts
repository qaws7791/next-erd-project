import { Recommendation } from "@/types";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

class AIModel {
  genAI: GoogleGenerativeAI;
  model: GenerativeModel;
  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is required");
    }
    this.genAI = new GoogleGenerativeAI(process.env.API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        candidateCount: 1,
        responseMimeType: "application/json",
      },
    });
  }

  generateContent(prompt: string, schema?: string) {
    const input = schema
      ? prompt + "using this JSON schema: " + schema
      : prompt;

    return this.model
      .generateContent(input)
      .then((result) => result.response)
      .then((response) => response.text());
  }
}

const coffeeSchema = `
{
    "type": "object",
    "properties": {
      "title" :{
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "recommendations": {
        "type": "array",
        "items: {
          "type": "object",
          "properties": {
            "coffeeName": {
              "type": "string"
            },
            "coffeeDescription": {
              "type": "string"
            },
            "keywords": {
              "type": "array",
              "items": {
                "type": "string"
                }
              }
            }
          }
        }
    }
}`;

let aiModel = new AIModel();

export async function generateCoffeeRecommendation(text: string) {
  const result = await aiModel.generateContent(text, coffeeSchema);
  const json = JSON.parse(`${result}`);
  return json as Recommendation;
}
