import { getPageInfo } from "../../../lib/wp.ts";

export async function GET({ params }: { params: { postId: string } }) {
  const postId = params.postId;
  const postInfo = await getPageInfo(`posts/${postId}`);

  return new Response(JSON.stringify(postInfo), {
    headers: { "Content-Type": "application/json" },
  });
}
