import { LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
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
		return redirect("/register");
	}

	const user = verifiedToken.payload.user;
	console.log("user=====================", user);
	if (!user) return redirect("/register");

	return json(
		{ isAuthenticated: true, user: verifiedToken.payload.user },
		{ status: 200 }
	);
}

export default function Profile() {
	const data = useLoaderData<typeof loader>();
	return (
		<div className="">
			{JSON.stringify(data.user)}
			<a href="/signOut">Sign Out</a>
		</div>
	);
}
