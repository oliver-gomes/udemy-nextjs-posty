"use client";

import { useState } from "react";
import { PostSchema } from "@/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import * as actions from "@/actions";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

export const PostForm = () => {
  const { toast } = useToast();
  const [success, setSuccess] = useState<string | undefined>("");
  const session = useSession();

  console.log("using useSession", session?.data?.user);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      post: "",
    },
  });

  function onSubmit(values: z.infer<typeof PostSchema>) {
    actions.CreatePost(values).then((data) => {
      setSuccess(data?.success);
    });

    toast({
      title: "Posted",
      description: `${success}`,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-6/12 mt-8"
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="write your post..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="float-right">
          Submit
        </Button>
      </form>
    </Form>
  );
};
