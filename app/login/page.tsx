import GoogleLoginButton from "@/features/auth/components/google-login-button";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();

  if (user) {
    return redirect("/app");
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 max-w-screen-md mx-auto ">
      <GoogleLoginButton />
    </section>
  );
}
