import { AppLoadContext, json } from "@remix-run/cloudflare";
import { Job, generateInsertBody } from "~/helpers/types";

export async function insertDocument(
	mongoObject: any,
	collection: string,
	context: AppLoadContext
) {
	//@ts-expect-error
	const url = context.env.DB_ENDPOINT_URL;

	const postBody = generateInsertBody(mongoObject, collection);

	const requestURL = url + "/action/insertOne";

	const res = await fetch(requestURL, {
		body: postBody,
		headers: {
			Accept: "application/json",
			//@ts-expect-error
			apikey: context.env.DB_API_KEY,
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	const response = await res.json();

	return json(response, { status: 200 });
}

export async function findDocuments(
	collection: string,
	limit: number,
	context: AppLoadContext,
	filter?: any,
	sort?: any
) {
	//@ts-expect-error
	const url = context.env.DB_ENDPOINT_URL;

	const body = {
		dataSource: "mongodb-atlas",
		database: "recruitment-web",
		collection: collection,
		limit: limit,
	};
	if (filter) body.filter = filter;
	if (sort) body.sort = sort;

	console.log("filter", filter, "body", body);

	const postBody = JSON.stringify(body);

	const requestURL = url + "/action/find";

	const res = await fetch(requestURL, {
		body: postBody,
		headers: {
			Accept: "application/json",
			//@ts-expect-error
			apikey: context.env.DB_API_KEY,
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	const response = await res.json();

	return json(response, { status: 200 });
}

export async function findDocument(
	collection: string,
	_id: string,
	context: AppLoadContext
) {
	//@ts-expect-error
	const url = context.env.DB_ENDPOINT_URL;

	const body = {
		dataSource: "mongodb-atlas",
		database: "recruitment-web",
		collection: collection,
		filter: {
			_id: _id,
		},
	};

	const postBody = JSON.stringify(body);

	const requestURL = url + "/action/findOne";

	const res = await fetch(requestURL, {
		body: postBody,
		headers: {
			Accept: "application/json",
			//@ts-expect-error
			apikey: context.env.DB_API_KEY,
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	const response = await res.json();

	return json(response, { status: 200 });
}

export async function updateDocument(
	collection: string,
	_id: string,
	update: any,
	context: AppLoadContext
) {
	//@ts-expect-error
	const url = context.env.DB_ENDPOINT_URL;

	const body = {
		dataSource: "mongodb-atlas",
		database: "recruitment-web",
		collection: collection,
		filter: {
			_id: _id,
		},
		update: update,
	};

	const postBody = JSON.stringify(body);

	const requestURL = url + "/action/updateOne";

	const res = await fetch(requestURL, {
		body: postBody,
		headers: {
			Accept: "application/json",
			//@ts-expect-error
			apikey: context.env.DB_API_KEY,
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	const response = await res.json();

	return json(response, { status: 200 });
}
