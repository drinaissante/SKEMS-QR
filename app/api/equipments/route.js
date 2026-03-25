import { supabase } from "@/lib/supabase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "No ID provided" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("equipments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  if (!data) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
