import { prisma } from "@/prisma";
import { SinglePost } from "@/components/single-post";

async function getPost() {
  const data = await prisma.post.findMany();
  return data;
}

export const PostDisplay = async () => {
  const data = await getPost();
  console.log("data", data);

  return (
    <div>
      {data?.length > 0 && (
        <div>
          {data.map((post) => (
            <div key={post.id}>
              <SinglePost postData={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
