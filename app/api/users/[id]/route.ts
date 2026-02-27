import { NextRequest } from "next/server";

const JSONPLACEHOLDER_URL = process.env.JSONPLACEHOLDER_URL || "https://jsonplaceholder.typicode.com";

async function forward(url: string, init?: RequestInit) {
  const hdrs: Record<string, string> = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": JSONPLACEHOLDER_URL,
    ...(init && (init.headers as Record<string, string>))
  };
  const mergedInit = { ...(init || {}), headers: hdrs } as RequestInit;
  const res = await fetch(url, mergedInit);
  const body = await res.text();
  const contentType = res.headers.get("content-type") || "application/json";
  return new Response(body, { status: res.status, headers: { "content-type": contentType } });
}

export async function GET(req: Request) {
  const url = new URL((req as NextRequest).url);
  const parts = url.pathname.split('/');
  const id = parts[parts.length - 1];
  const target = `${JSONPLACEHOLDER_URL}/users/${encodeURIComponent(id)}`;
  return forward(target, { method: "GET" });
}
