import GoogleLoginButton from "@/features/auth/components/google-login-button";
import LogoutButton from "@/features/auth/components/logout-button";
import { title } from "@/components/primitives";
import { getUser } from "@/lib/user";
import { Avatar } from "@nextui-org/avatar";
export default async function Home() {
  const user = await getUser();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Login &nbsp;</h1>
        <br />
        <h1 className={title()}>Your Google Account</h1>
      </div>
      {user ? (
        <div className="flex items-center flex-col gap-8">
          <h2 className={title({ size: "sm" })}>{user.email}</h2>
          <Avatar src={user.photo} className="w-20 h-20" />
          <LogoutButton />
        </div>
      ) : (
        <GoogleLoginButton />
      )}
    </section>
  );
}
