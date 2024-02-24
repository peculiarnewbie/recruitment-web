import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Outlet } from "react-router";
import JobListing from "~/components/jobListing";
import { dummyJobs } from "~/helpers/dummyData";

export function loader({ context }: LoaderFunctionArgs) {
	return json(dummyJobs, { status: 200 });
}

export default function Jobs() {
	const data = useLoaderData<typeof loader>();
	return (
		<div>
			<p>Jobs parent</p>
			<JobListing jobs={data} />
			<Outlet />
		</div>
	);
}
