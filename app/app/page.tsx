import { getUser } from "@/lib/user";
import ChatForm from "@/app/chat-form";
import RecommendationList from "@/features/recommendation/components/recommendation-list";
import { Suspense } from "react";
export default async function AppPage() {
  const user = await getUser();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 max-w-screen-md mx-auto ">
      <ChatForm />
      <Suspense fallback={<div>Loading...</div>}>
        <RecommendationList />
      </Suspense>
    </section>
  );
}
