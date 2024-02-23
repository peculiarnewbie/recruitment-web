import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { WorkOS } from "@workos-inc/node";
import { SignJWT } from "jose";
import { tokenCookie } from "~/components/cookies.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
	const encoder = new TextEncoder();

	//@ts-expect-error
	const workos = new WorkOS(context.env.WORKOS_API_KEY);
	//@ts-expect-error
	const clientId = context.env.WORKOS_CLIENT_ID;
	//@ts-expect-error
	const secret = new TextEncoder().encode(context.env.JWT_SECRET_KEY);

	const url = new URL(request.url);
	const code = url.searchParams.get("code") as string;

	const { user } = await workos.userManagement.authenticateWithCode({
		code,
		clientId,
	});

	const cookieHeader = request.headers.get("Cookie");
	const cookie = (await tokenCookie.parse(cookieHeader)) || {};

	const jwt = await new SignJWT({
		// Here you might lookup and retrieve user details from your database
		user,
	})
		.setProtectedHeader({ alg: "HS256", typ: "JWT" })
		.setIssuedAt()
		.setExpirationTime("1h")
		.sign(secret);

	cookie.token = jwt;

	return redirect("/profile", {
		headers: {
			"Set-Cookie": await tokenCookie.serialize(cookie),
		},
	});
}

export default function Callback() {
	return (
		<div>
			<div>hey</div>
		</div>
	);
}
