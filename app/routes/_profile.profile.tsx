import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
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

	return json(
		{ isAuthenticated: true, user: verifiedToken.payload.user },
		{ status: 200 }
	);
}

export default function Profile() {
	const data = useLoaderData<typeof loader>();
	return (
		<div className="">
			<div>view</div>
			{JSON.stringify(data.user)}
		</div>
	);
}
