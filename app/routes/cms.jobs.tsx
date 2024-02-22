import { Select } from "@chakra-ui/react";
import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { Form, useActionData } from "@remix-run/react";
import { nanoid } from "nanoid";
import { insertDocument } from "~/components/mongo-helper";
import { EmploymentTypeKeys, EmploymentTypes, Job } from "~/mongodb/types";

export async function action({ context, request }: ActionFunctionArgs) {
	const body = await request.formData();

	const job: Job = {
		_id: nanoid(),
		title: body.get("title") as string,
		posted: Date.now(),
		description: body.get("description") as string,
		type: body.get("type") as EmploymentTypeKeys,
	};

	console.log(job);

	return await insertDocument(job, "Jobs", context);
}

export default function CmsJobs() {
	const response = useActionData<typeof action>();
	return (
		<div>
			<Form method="post" className="flex flex-col w-36">
				<p>title</p>
				<input type="text" name="title" />
				<p>description</p>
				<textarea name="description" />
				<p>employment type</p>
				<Select name="type" placeholder="Select option">
					{Array.from(
						Object.values(EmploymentTypes).map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))
					)}
				</Select>
				<button type="submit"> Post</button>
			</Form>
			<p>response: {JSON.stringify(response)}</p>
		</div>
	);
}
