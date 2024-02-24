import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { useActionData, useLoaderData } from "@remix-run/react";
import { nanoid } from "nanoid";
import { insertDocument } from "~/helpers/mongo-helper";

export async function action({ context }: ActionFunctionArgs) {}

export default function () {
	const actionResponse = useActionData<typeof action>();
	return (
		<div>
			<div>do stuff on db</div>
			<form method="post">
				<button type="submit" name="send" value="send">
					send
				</button>
			</form>
			{JSON.stringify(actionResponse)}
		</div>
	);
}
