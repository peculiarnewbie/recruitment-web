import { createCookie } from "@remix-run/cloudflare";

export const tokenCookie = createCookie("token", {
	maxAge: 604_800, // one week
	path: "/",
	httpOnly: true,
	secure: true,
	sameSite: "lax",
});
