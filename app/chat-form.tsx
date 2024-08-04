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
