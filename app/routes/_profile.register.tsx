import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/cloudflare";
import { WorkOS } from "@workos-inc/node";

export async function action({ context }: ActionFunctionArgs) {
	//@ts-expect-error
	const workos = new WorkOS(context.env.WORKOS_API_KEY);
	//@ts-expect-error
	const clientId = context.env.WORKOS_CLIENT_ID;

	const authorizationUrl = workos.userManagement.getAuthorizationUrl({
		provider: "authkit",

		//@ts-expect-error
		redirectUri: context.env.WORKOS_CALLBACK_URL,
		clientId,
	});

	return redirect(authorizationUrl);
}

export async function loader({ params }: LoaderFunctionArgs) {
	if (params.direct) return await fetch("/", { method: "POST" });
	return true;
}

export default function Profile() {
	return (
		<div className="">
			<form method="post">
				<button type="submit">sign in</button>
			</form>
		</div>
	);
}
