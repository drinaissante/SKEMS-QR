import { supabase } from "@/lib/supabase.js";

export async function POST(req) {
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.API_KEY}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // DB
  // id, name, type, owner, date_given, status
  const { name, type, owner, date_given, status } = body;

  const { data, error } = await supabase
    .from("equipments")
    .insert([{ name, type, owner, date_given, status }])
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  console.info(data);

  return Response.json({
    uuid: data.id,
    url: `${process.env.SUPABASE_URL}/equipments?id=${data.id}`,
  });
}
