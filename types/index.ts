import { RecommendationDocument } from "@/db/models/recommendation";
import { UserDocument } from "@/db/models/user";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export type Recommendation = {
  title: string;
  description: string;
  recommendations: {
    coffeeName: string;
    coffeeDescription: string;
    keywords: string[];
  }[];
};

export type RecommendationWithAuthor = RecommendationDocument & {
  author: UserDocument;
};
