import { redirect } from "next/navigation";
import { getUser } from "@/lib/user";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
export default async function LandingPage() {
  const user = await getUser();
  if (user) {
    redirect("/app");
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 max-w-screen-md mx-auto ">
      <h1 className={title()}>
        Welcome to
        <span
          className={title({
            color: "violet",
            size: "lg",
            fullWidth: true,
          })}
        >
          My Coffee
        </span>
      </h1>
      <p className={subtitle()}>{siteConfig.description}</p>
    </section>
  );
}
