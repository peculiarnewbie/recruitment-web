import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

export async function action({ context, request }: ActionFunctionArgs) {
	console.log(
		"==============================================hi========================="
	);
	const bucket: R2Bucket = context.env.R2_BUCKET;
	console.log("bucket==========================================", bucket);
	const obj: R2ObjectBody | null = await bucket.get("dummyFile.txt");
	if (obj === null) {
		return new Response("Not found", { status: 404 });
	}

	const body = await obj.json();

	console.log("obj=============================", body);

	return json(body, { status: 200 });
}

export default function Profile() {
	const data = useActionData();

	const downloadRef = useRef(null);

	useEffect(() => {
		console.log("calling effect");
		if (data && downloadRef.current) {
			const fileName = "dummy.txt";
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
				<button type="submit">get file</button>
			</form>
			{JSON.stringify(data)}
			<a hidden={true} ref={downloadRef}></a>
		</div>
	);
}
