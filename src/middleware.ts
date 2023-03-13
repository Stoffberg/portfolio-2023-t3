import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { redis } from "./server/redis/client";

export const middleware = async (request: NextRequest) => {
  const redirect = (url = "/") => NextResponse.redirect(new URL(url, request.nextUrl.origin));

  const key = request.nextUrl.pathname.split("/")[2];
  if (!key) return redirect();

  const link = await redis.get<string | null>(key);
  if (!link) return redirect();

  return NextResponse.redirect(link);
};

export const config = {
  matcher: "/link/:key+",
};
