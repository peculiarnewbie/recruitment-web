import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { useActionData, useLoaderData } from "@remix-run/react";
import { nanoid } from "nanoid";
import { Candidate, File, generateInsertBody } from "~/mongodb/types";

export const action = async ({ request, context }: ActionFunctionArgs) => {
	const url = context.env.DB_ENDPOINT_URL;

	const fileToPost = {
		_id: nanoid(),
		url: "actual one",
		uploaded: Date.now(),
		size: 100,
	};

	const objectToPost: Candidate = {
		_id: nanoid(),
		name: "QT",
		info: {
			birthdate: 100,
			residence: {
				city: "Abdhuehue",
				province: "B",
				country: "C",
			},
			summary: "i exist",
		},
		contact: {
			email: "man@man.man",
			phone: "080808",
			website: "localhost",
		},
		education: [
			{
				degree: "livin",
				institute: { _id: nanoid(), name: "uni of livin" },
				startdate: 90,
				description: "im the best btw",
			},
		],
		files: [fileToPost],
	};

	const postBody = generateInsertBody(objectToPost, "Candidates");

	const requestURL = url + "/action/insertOne";

	console.log(requestURL);

	const res = await fetch(requestURL, {
		body: postBody,
		headers: {
			Accept: "application/json",
			apikey: context.env.DB_API_KEY,
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	const response = await res.json();

	return json({ thing: "waow", res: JSON.stringify(response) });
};

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
			{actionResponse?.res}
		</div>
	);
}
