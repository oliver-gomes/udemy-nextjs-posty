import { signIn, auth } from "@/auth";

import { Navbar } from "@/components/navbar";
import { PostDisplay } from "@/components/post-display";
import { PostForm } from "@/components/post-form";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navbar />
      {session?.user ? (
        <>
          <PostForm />
          <PostDisplay />
        </>
      ) : (
        <div className="flex flex-col text-center mt-24">
          <h2 className="text-4xl">Join Today</h2>
          <p className="text-lg">Make post to get your ideas out</p>
        </div>
      )}
    </main>
  );
}
