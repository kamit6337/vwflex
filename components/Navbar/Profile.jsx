"use client";
import { useQuery } from "@apollo/client";
import { Icons } from "@assets/icons";
import LoginButton from "@components/LoginButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import loginCheckSchema, {
  getLoginCheckDataQuery,
} from "@graphql/auth/loginCheckSchema";

const Profile = () => {
  const { loading, error, data } = useQuery(loginCheckSchema);

  if (loading) return;

  if (error) {
    console.error("Error in profile", error.message);
    return <LoginButton sm_width={true} />;
  }

  const user = data?.[getLoginCheckDataQuery];

  const { name, email } = user;

  const handleLogout = async () => {};

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-2xl cursor-pointer border-none">
          <Icons.profile />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Hello, {name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Sign Out ({email})</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Profile;
