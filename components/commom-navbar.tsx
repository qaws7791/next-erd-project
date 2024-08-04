"use client";
import { useUser } from "@/lib/queries";
import { Button } from "@nextui-org/button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { logout } from "@/db/actions/logout";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CommonNavbar() {
  const userQuery = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="text-lg font-bold">
          나만의 커피
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          {userQuery.data ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={userQuery.data.name}
                  size="sm"
                  src={userQuery.data.photo}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">{userQuery.data.name}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={async () => {
                    await logout();
                    await queryClient.clear();
                    router.push("/");
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button as={Link} color="primary" href="/login" variant="flat">
              로그인
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
