"use client";
import { RecommendationWithAuthor } from "@/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function RecommendationList() {
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(moreButtonRef);

  const query = useSuspenseInfiniteQuery({
    queryKey: ["recommendations"],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/recommendations?limit=6&cursor=${pageParam || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.json() as Promise<RecommendationWithAuthor[]>;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      return lastPage[lastPage.length - 1]?._id.toString() || undefined;
    },
  });
  useEffect(() => {
    console.log("isInView", isInView);
  }, [isInView]);

  useEffect(() => {
    if (isInView && !query.isFetchingNextPage && query.hasNextPage) {
      console.log("fetchNextPage");
      query.fetchNextPage();
    }
  }, [isInView, query]);

  return (
    <div>
      <ul className="grid gap-y-8 my-4">
        {query.data?.pages.map((page) => {
          return page.map((recommendation) => (
            <div
              className="border rounded-3xl p-4"
              key={recommendation._id.toString()}
            >
              <div className="flex gap-4 items-center">
                <Avatar
                  src={recommendation.author.photo}
                  alt={recommendation.author.name}
                />
                <div className="flex flex-col leading-tight">
                  <h3 className="font-semibold">
                    {recommendation.author.name}
                  </h3>
                  <p className="text-default-600">
                    {recommendation.author.email}
                  </p>
                </div>
              </div>
              <h2 className="text-xl font-semibold mt-6">
                {recommendation.title}
              </h2>
              <p className="mt-3">{recommendation.description}</p>
              <ul className="flex gap-4 flex-col mt-4">
                {recommendation.recommendations.map((recommendation, i) => (
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
              <div className="flex justify-end">
                <time className="text-default-500 mt-4">
                  {new Date(recommendation.createdAt).toLocaleString()}에 생성됨
                </time>
              </div>
            </div>
          ));
        })}
      </ul>
      {query.hasNextPage ? (
        <Button
          ref={moreButtonRef}
          onClick={() => query.fetchNextPage()}
          disabled={!query.hasNextPage}
          isLoading={query.isFetchingNextPage}
          className="w-full"
        >
          {query.isFetchingNextPage ? "불러오는 중" : "더 보기"}
        </Button>
      ) : (
        <div className="text-center">더 이상 추천이 없습니다.</div>
      )}
    </div>
  );
}
