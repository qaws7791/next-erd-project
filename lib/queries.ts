import { UserDocument } from "@/db/models/user";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
      if (!res.ok) {
        throw new Error("An error occurred while fetching the user");
      }
      return res.json() as Promise<UserDocument>;
    },
  });
}
