import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDistance } from "date-fns/formatDistance";
import { getUserById } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import * as actions from "@/actions";

interface PostProps {
  id: string;
  userId: string;
  description: string;
  createAt: Date;
}
import { Trash } from "lucide-react";

export const SinglePost = async ({ postData }: { postData: PostProps }) => {
  const userData = await getUserById(postData.userId);
  const session = await auth();

  return (
    <Card className="w-[600px] my-4">
      <CardHeader></CardHeader>
      <CardContent className="flex items-center">
        <p className="font-bold">{postData.description}</p>
        {/* check if the post is same as logged in user's post for deletion */}
        {session?.user && session?.user.id === userData?.id && (
          <form action={actions.DeletePost} className="ml-auto">
            <Button type="submit" variant="link">
              <input
                type="text"
                hidden
                defaultValue={postData.id}
                name="postId"
              />
              <Trash color="red" size="md" />
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter>
        <Avatar>
          <AvatarImage src={userData?.image || ""} alt="user avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-light ml-auto">
          {formatDistance(new Date(postData.createAt), new Date())}
        </p>
      </CardFooter>
    </Card>
  );
};
