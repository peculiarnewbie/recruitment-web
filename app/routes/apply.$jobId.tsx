import { LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { jwtVerify } from "jose";
import { tokenCookie } from "~/helpers/cookies.server";

export async function loader({ params, request, context }: LoaderFunctionArgs) {
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
	return { id: params.jobId };
}

export default function Apply() {
	const data = useLoaderData<typeof loader>();
	return (
		<div>
			<div>{data.id}</div>
		</div>
	);
}
