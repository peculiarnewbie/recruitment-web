import { LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { jwtVerify } from "jose";
import { tokenCookie } from "~/helpers/cookies.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
	//@ts-expect-error
	const secret = new TextEncoder().encode(context.env.JWT_SECRET_KEY);

	const cookieHeader = request.headers.get("Cookie");
	const cookie = (await tokenCookie.parse(cookieHeader)) || {};

	let verifiedToken;
	try {
		verifiedToken = await jwtVerify(cookie.token, secret);
	} catch {
		return redirect("/401");
	}

	const user = verifiedToken.payload.user;
	//@ts-expect-error
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
