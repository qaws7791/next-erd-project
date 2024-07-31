"use client";
import { useGoogleLogin } from "@/features/auth/components/google-login";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleLoginButton() {
  const { renderGoogleLoginButton } = useGoogleLogin();
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderGoogleLoginButton(loginRef);
  }, [renderGoogleLoginButton]);

  return <div id="signInDiv" ref={loginRef} />;
}
