import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

export async function action({ context, request }: ActionFunctionArgs) {
	const form = await request.formData();

	if (form.get("_action") === "get") {
		const bucket: R2Bucket = context.env.R2_BUCKET;
		const object: R2ObjectBody | null = await bucket.get(
			form.get("fileName") as string
		);
		if (object === null) {
			return new Response("Not found", { status: 404 });
		}

		return json(object.body, { status: 200 });
	} else if (form.get("_action") === "put") {
		const bucket: R2Bucket = context.env.R2_BUCKET;
		const object = await bucket.put(
			form.get("fileName") as string,
			request.body,
			{
				httpMetadata: request.headers,
			}
		);
	}
}

export default function Files() {
	const data = useActionData();

	const downloadRef = useRef(null);

	return (
		<div className="">
			<form method="post">
				<input hidden={true} name="_action" value="get" />
				<input type="text" name="fileName" />
				<button type="submit">get file</button>
			</form>

			<form method="post" encType="multipart/form-data">
				<input hidden={true} name="_action" value="put" />
				<input type="file" accept=".doc,.docx, .pdf" />
				<input type="text" name="fileName" />
				<button type="submit">get file</button>
			</form>
			{JSON.stringify(data)}
			<a hidden={true} ref={downloadRef}></a>
		</div>
	);
}
