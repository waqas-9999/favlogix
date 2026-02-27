import { NextRequest } from "next/server";

const DUMMYJSON_URL = process.env.DUMMYJSON_URL || "https://dummyjson.com";

async function forward(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  const body = await res.text();
  const contentType = res.headers.get("content-type") || "application/json";
  return new Response(body, { status: res.status, headers: { "content-type": contentType } });
}

export async function GET(req: Request) {
  const url = new URL((req as NextRequest).url);
  const params = url.searchParams;

  // if `search` param present -> use DummyJSON search endpoint
  if (params.has("search")) {
    const q = params.get("search") || "";
    const target = `${DUMMYJSON_URL}/products/search?q=${encodeURIComponent(q)}`;
    return forward(target, { method: "GET" });
  }

  // if `category` param present -> category listing
  if (params.has("category")) {
    const cat = params.get("category") || "";
    const target = `${DUMMYJSON_URL}/products/category/${encodeURIComponent(cat)}`;
    return forward(target, { method: "GET" });
  }

  // default: pass through limit/skip etc. to /products
  const qs = params.toString();
  const target = `${DUMMYJSON_URL}/products${qs ? `?${qs}` : ""}`;
  return forward(target, { method: "GET" });
}
