// // import { auth } from "@/lib/auth";
// import { authClient } from "@/src/lib/auth-client";
// import { toNextJsHandler } from "better-auth/next-js";

// export const { GET, POST } = toNextJsHandler(authClient.handler);
// import { auth } from "@/lib/auth";
import { auth } from "@/src/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth.handler);