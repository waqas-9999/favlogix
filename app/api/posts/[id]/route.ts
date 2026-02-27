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
  // route pattern: /api/posts/:id
  const parts = url.pathname.split('/');
  const id = parts[parts.length - 1];
  const target = `${JSONPLACEHOLDER_URL}/posts/${encodeURIComponent(id)}`;
  return forward(target, { method: "GET" });
}
