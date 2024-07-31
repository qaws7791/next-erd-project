"use client";
import Script from "next/script";
import { createContext, useContext, useEffect, useState } from "react";

interface GoogleLoginContext {
  renderGoogleLoginButton: (reference: React.RefObject<HTMLDivElement>) => void;
  isLoaded: boolean;
}

export const googleLoginContext = createContext<GoogleLoginContext | undefined>(
  undefined
);

export const GoogleLoginProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const renderGoogleLoginButton = (
    reference: React.RefObject<HTMLDivElement>
  ) => {
    if (!isLoaded || !reference.current) return;
    window.google.accounts.id.renderButton(reference.current, {
      theme: "outline",
      shape: "circle",
      size: "large",
      text: "signin_with",
      locale: "ko",
    });
  };

  const onLoadScript = () => {
    window.google.accounts.id.initialize({
      ux_mode: "redirect",
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      login_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
    });
    setIsLoaded(true);
    window.google.accounts.id.prompt();
  };

  useEffect(() => {
    if (isLoaded) {
      window.google.accounts.id.cancel();
    }
  }, [isLoaded]);

  return (
    <googleLoginContext.Provider value={{ isLoaded, renderGoogleLoginButton }}>
      {children}
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={onLoadScript}
      />
    </googleLoginContext.Provider>
  );
};

export const useGoogleLogin = () => {
  const context = useContext(googleLoginContext);
  if (!context) {
    throw new Error("useGoogleLogin must be used within a GoogleLoginProvider");
  }
  return context;
};
