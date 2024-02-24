import { LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { jwtVerify } from "jose";
import { tokenCookie } from "~/helpers/cookies.server";
import { updateDocument } from "~/helpers/mongo-helper";
import { User } from "~/helpers/types";

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

	const user = verifiedToken.payload.user as User;
	if (!user) return redirect("/register");

	const res = await updateDocument(
		"Candidate",
		user.id,
		{ $addToSet: { appliedJobs: params.jobId } },
		context
	);

	return redirect("/profile");
}

export default function Apply() {
	const data = useLoaderData<typeof loader>();
	return (
		<div>
			<div>{data.id}</div>
		</div>
	);
}
