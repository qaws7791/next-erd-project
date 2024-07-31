"use client";
import { logout } from "@/db/actions/logout";
import { Button } from "@nextui-org/button";

export default function LogoutButton() {
  return (
    <Button
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </Button>
  );
}
