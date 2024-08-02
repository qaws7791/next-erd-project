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
