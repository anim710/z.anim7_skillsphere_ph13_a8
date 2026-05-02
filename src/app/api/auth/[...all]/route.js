// import { auth } from "@/lib/auth";
import { authClient } from "@/src/lib/auth-client";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(authClient.handler);