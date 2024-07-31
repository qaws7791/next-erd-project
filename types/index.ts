import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};
