import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

import { signIn, signOut, auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const space = Space_Grotesk({ subsets: ["latin"] });

export const Navbar = async () => {
  const session = await auth();

  return (
    <div className="flex w-11/12 items-center justify-around">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" width="60" height="60" alt="logo" />
        <h1 className={cn`${space.className} text-3xl`}>Posty</h1>
      </div>

      <div className="flex gap-4">
        {session?.user && (
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}

        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="destructive">Sign Out</Button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Button>Sign In</Button>
          </form>
        )}
      </div>
    </div>
  );
};
