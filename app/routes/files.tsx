import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

export async function action({ context, request }: ActionFunctionArgs) {
	const form = request.formData();

	const bucket: R2Bucket = context.env.R2_BUCKET;
	const object: R2ObjectBody | null = await bucket.get(
		(await form).get("fileName") as string
	);
	if (object === null) {
		return new Response("Not found", { status: 404 });
	}

	const text = await object.text();

	return json(text, { status: 200 });
}

export default function Files() {
	const data = useActionData();

	const downloadRef = useRef(null);

	useEffect(() => {
		console.log("calling effect");
		if (data && downloadRef.current) {
			const fileName = "dummy.pdf";
			const json = JSON.stringify(data),
				blob = new Blob([json], { type: "octet/stream" }),
				url = window.URL.createObjectURL(blob);

			const a = downloadRef.current as HTMLAnchorElement;
			a.href = url;
			a.download = fileName;
			a.click();

			window.URL.revokeObjectURL(url);
		}
	}, [data]);

	return (
		<div className="">
			<form method="post">
				<input type="text" name="fileName" />
				<button type="submit">get file</button>
			</form>
			{JSON.stringify(data)}
			<a hidden={true} ref={downloadRef}></a>
		</div>
	);
}
