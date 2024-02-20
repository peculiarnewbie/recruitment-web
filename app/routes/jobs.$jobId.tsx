import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import JobListing from "~/components/jobListing";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	return params.jobId;
};

export default function Job() {
	const jobId = useLoaderData<typeof loader>();

	return (
		<div>
			<JobListing />
			{jobId !== "list" ? <div>job {jobId}</div> : <></>}
		</div>
	);
}
