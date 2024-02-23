import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";

export async function action({ context, request }: ActionFunctionArgs) {
	console.log(
		"==============================================hi========================="
	);
	const bucket: R2Bucket = context.env.R2_BUCKET;
	console.log("bucket==========================================", bucket);
	const obj = await bucket.get("dummyFile.txt");
	if (obj === null) {
		return new Response("Not found", { status: 404 });
	}
	console.log("obj=============================", obj.body);

	return json(obj.body, { status: 200 });
}

export default function Profile() {
	const data = useActionData();
	return (
		<div className="">
			<form method="post">
				<button type="submit">get file</button>
			</form>
			{JSON.stringify(data)}
		</div>
	);
}
