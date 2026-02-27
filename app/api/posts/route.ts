import { NextRequest } from "next/server";

const JSONPLACEHOLDER_URL = process.env.JSONPLACEHOLDER_URL || "https://jsonplaceholder.typicode.com";

async function forward(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  const body = await res.text();
  const contentType = res.headers.get("content-type") || "application/json";
  return new Response(body, { status: res.status, headers: { "content-type": contentType } });
}

export async function GET(req: Request) {
  const url = new URL((req as NextRequest).url);
  const qs = url.searchParams.toString();
  const target = `${JSONPLACEHOLDER_URL}/posts${qs ? `?${qs}` : ""}`;
  return forward(target, { method: "GET" });
}
