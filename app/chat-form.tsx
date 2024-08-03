"use client";
import { createChat } from "@/lib/actions";
import { Recommendation } from "@/types";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface ChatFormProps {}

export default function ChatForm(props: ChatFormProps) {
  const [state, formAction] = useFormState(createChat, undefined);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state?.result) {
      queryClient.invalidateQueries({
        queryKey: ["recommendations"],
      });
    }
  }, [state?.result, queryClient]);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      {/* <RecommendationView {...MOCK_RECOMMENDATION} /> */}
      {state?.result && <RecommendationView {...state.result} />}
      <div className="flex gap-4">
        <Input
          placeholder="Type a message"
          isInvalid={!!state?.errors?.message}
          errorMessage={state?.errors?.message}
          name="message"
          id="message"
        />
        <FormSubmitButton />
      </div>
    </form>
  );
}

function FormSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      isLoading={pending}
      className="w-32"
    >
      {pending ? "추천 중" : "추천 받기"}
    </Button>
  );
}

function RecommendationView({
  recommendations,
  title,
  description,
}: Recommendation) {
  return (
    <div className="border rounded-3xl p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-4">{description}</p>
      <ul className="flex gap-4 flex-col mt-8">
        {recommendations.map((recommendation, i) => (
          <li key={i} className="p-4 border rounded-xl">
            <div>
              <h3 className="font-bold">
                {i + 1}. {recommendation.coffeeName}
              </h3>
            </div>
            <div>
              <p className="text-default-600">
                {recommendation.coffeeDescription}
              </p>
              <div className="flex gap-2 mt-3 items-center">
                {recommendation.keywords.map((keyword, i) => (
                  <Chip key={i} color="default">
                    {keyword}
                  </Chip>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
