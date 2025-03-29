import { getPageInfo, processPost } from "@/lib/wp.ts";

export async function GET({ params }: { params: { postId: string } }) {
  try {
    const postId = params.postId;
    if (!postId) {
      return new Response(
        JSON.stringify({ error: "ID del post no proporcionado" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const postData = await getPageInfo(`posts/${postId}?_embed`);
    
    if (!postData || Array.isArray(postData)) {
      return new Response(
        JSON.stringify({ error: "Post no encontrado" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const processedPost = await processPost(postData);

    return new Response(JSON.stringify(processedPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener el post:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
} 