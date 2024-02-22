import { AppLoadContext, json } from "@remix-run/cloudflare";
import { generateInsertBody } from "~/mongodb/types";

export async function insertDocument(
	mongoObject: any,
	collection: string,
	context: AppLoadContext
) {
	const url = context.env.DB_ENDPOINT_URL;

	const postBody = generateInsertBody(mongoObject, collection);

	const requestURL = url + "/action/insertOne";

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

	return json(response, { status: 200 });
}
