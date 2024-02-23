import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { WorkOS } from "@workos-inc/node";

export async function loader({ context, request }: LoaderFunctionArgs) {
	//@ts-expect-error
	const workos = new WorkOS(context.env.WORKOS_API_KEY);
	//@ts-expect-error
	const clientId = context.env.WORKOS_CLIENT_ID;

	const url = new URL(request.url);
	const code = url.searchParams.get("code") as string;

	const { user } = await workos.userManagement.authenticateWithCode({
		code,
		clientId,
	});

	return redirect("/");
}

export default function Callback() {
	return (
		<div>
			<div>hey</div>
		</div>
	);
}
