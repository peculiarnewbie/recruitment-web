import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { useActionData, useLoaderData } from "@remix-run/react";
import { nanoid } from "nanoid";
import { insertDocument } from "~/components/mongo-helper";
import { Candidate } from "~/mongodb/types";

export async function action({ context }: ActionFunctionArgs) {
	const fileToPost = {
		_id: nanoid(),
		url: "layy",
		uploaded: Date.now(),
		size: 100,
	};

	const objectToPost: Candidate = {
		_id: nanoid(),
		name: "Jon",
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

	return await insertDocument(objectToPost, "Candidates", context);
}

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
