import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Outlet } from "react-router";
import JobListing from "~/components/jobListing";
import { dummyJobs } from "~/helpers/dummyData";

import { create } from "zustand";
import { useEffect } from "react";

export type JobViewStore = {
	jobView: boolean;
	setJobView: (view: boolean) => void;
};

export const useJobViewStore = create<JobViewStore>()((set) => ({
	jobView: false,
	setJobView: (view: boolean) => set({ jobView: view }),
}));

export function loader({ context, request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const routes = url.pathname.split("/");
	let jobView = false;
	if (routes[2]) {
		jobView = true;
		useJobViewStore.setState({ jobView: jobView });
	}
	console.log(routes);
	return json({ jobs: dummyJobs, jobView: jobView }, { status: 200 });
}

export default function Jobs() {
	const data = useLoaderData<typeof loader>();
	const { jobView } = useJobViewStore();

	return (
		<div className=" container mx-auto">
			<p>Jobs parent</p>
			{jobView.toString()}
			<div
				className={`${data.jobView ? "flex flex-col sm:flex-row" : ""}`}
			>
				<JobListing jobs={data.jobs} jobView={data.jobView} />
				<Outlet />
			</div>
		</div>
	);
}
