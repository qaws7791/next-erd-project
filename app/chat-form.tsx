"use client";
import { Recommendation } from "@/types";
import { ChatFormState } from "@/types/form-state";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { useFormState, useFormStatus } from "react-dom";

interface ChatFormProps {
  action: (state: ChatFormState, formData: FormData) => Promise<ChatFormState>;
}

const MOCK_RECOMMENDATION: Recommendation = {
  title: "최신 커피 5종 추천",
  description:
    "최근 트렌드를 반영한 다섯 가지 커피를 소개합니다. 새로운 맛과 향을 경험해보세요!",
  recommendations: [
    {
      coffeeName: "달고나 커피",
      coffeeDescription:
        "달콤한 설탕과 커피의 조화가 일품인 커피로, 최근 틱톡에서 큰 인기를 얻고 있습니다. 집에서도 쉽게 만들 수 있다는 장점이 있습니다.",
      keywords: ["달콤", "크리미", "틱톡", "인기"],
    },
    {
      coffeeName: "콜드 브루",
      coffeeDescription:
        "차갑게 우려낸 커피로, 부드럽고 깔끔한 맛이 특징입니다. 진하고 풍부한 향을 즐기기에 좋습니다.",
      keywords: ["차갑게", "부드러운", "깔끔한", "진하고"],
    },
    {
      coffeeName: "nitro 커피",
      coffeeDescription:
        "질소를 주입하여 부드러운 거품을 형성한 커피로, 부드러운 크림과 커피의 조화가 매력적입니다.",
      keywords: ["질소", "거품", "부드러운", "크림"],
    },
    {
      coffeeName: "에스프레소 토닉",
      coffeeDescription:
        "에스프레소와 토닉워터를 섞어 마시는 커피로, 상큼하고 쌉쌀한 맛이 특징입니다.",
      keywords: ["에스프레소", "토닉워터", "상큼한", "쌉쌀한", "맛"],
    },
    {
      coffeeName: "플랫 화이트",
      coffeeDescription:
        "에스프레소에 스팀 우유를 넣어 만든 커피로, 부드럽고 고소한 맛이 일품입니다.",
      keywords: ["에스프레소", "스팀 우유", "부드러운", "고소한"],
    },
  ],
};

export default function ChatForm({ action }: ChatFormProps) {
  const [state, formAction] = useFormState(action, undefined);
  console.log("state", state);
  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 max-w-screen-md w-full"
    >
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
