import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { tokenCookie } from "~/helpers/cookies.server";

export async function loader() {
	return redirect("/", {
		headers: {
			"Set-Cookie": await tokenCookie.serialize("", {
				maxAge: 1,
			}),
		},
	});
}
