import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Job } from "~/helpers/types";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	return params.jobId;
};

export default function JobDetail(props: { job: Job }) {
	const jobId = useLoaderData<typeof loader>();

	return (
		<div>
			<div>job {jobId}</div>
		</div>
	);
}
