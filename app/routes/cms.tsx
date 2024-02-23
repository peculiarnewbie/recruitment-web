import { LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { jwtVerify } from "jose";
import { tokenCookie } from "~/components/cookies.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
	const secret = new TextEncoder().encode(context.env.JWT_SECRET_KEY);

	const cookieHeader = request.headers.get("Cookie");
	const cookie = (await tokenCookie.parse(cookieHeader)) || {};

	let verifiedToken;
	try {
		verifiedToken = await jwtVerify(cookie.token, secret);
	} catch {
		return json({ isAuthenticated: false }, { status: 401 });
	}

	const user = verifiedToken.payload.user;
	if (user.id !== context.env.ADMIN_USER_ID) return redirect("/401");

	return json({ isAuthenticated: true }, { status: 200 });
}

export default function Cms() {
	return (
		<div>
			<Outlet />
		</div>
	);
}
