import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { File } from "~/mongodb/types";

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const url = context.env.DB_ENDPOINT_URL;

	const fileToPost = {
		url: "filee",
		uploaded: 12,
		size: 100,
	};

	const requestURL = url + "/action/insertOne";

	console.log(requestURL);

	const res = await fetch(requestURL, {
		body: JSON.stringify({
			dataSource: "mongodb-atlas",
			database: "recruitment-web",
			collection: "Files",
			document: fileToPost,
		}),
		headers: {
			Accept: "application/json",
			apikey: context.env.DB_API_KEY,
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	const resObject = await res.json();

	console.log(resObject, context.env.DB_API_KEY);

	return json({ thing: "waow", res: resObject });
};

export default function () {
	const fromLoader = useLoaderData<typeof loader>();
	return (
		<div>
			<div>do stuff on db</div>
			{JSON.stringify(fromLoader.res)} hehe
		</div>
	);
}
