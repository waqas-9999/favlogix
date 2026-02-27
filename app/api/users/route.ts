import { NextRequest } from "next/server";

const REQRES_URL = process.env.REQRES_URL || "https://reqres.in";

async function forward(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  const body = await res.text();
  const contentType = res.headers.get("content-type") || "application/json";
  return new Response(body, { status: res.status, headers: { "content-type": contentType } });
}

export async function GET(req: Request) {
  const url = new URL((req as NextRequest).url);
  const qs = url.searchParams.toString();
  // Proxy to reqres user list endpoint
  const target = `${REQRES_URL}/api/users${qs ? `?${qs}` : ""}`;
  return forward(target, { method: "GET" });
}
