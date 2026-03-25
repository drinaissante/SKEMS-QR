import { supabase } from "@/lib/supabase.js";

const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap.get(ip).filter((t) => now - t < windowMs);

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  return timestamps.length > maxRequests;
}

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

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
    url: `${process.env.UURL}/equipments?id=${data.id}`,
  });
}
