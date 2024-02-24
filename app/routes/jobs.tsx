import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Outlet } from "react-router";
import JobListing from "~/components/jobListing";
import { dummyJobs } from "~/helpers/dummyData";

import { create } from "zustand";
import { useEffect } from "react";

export type selectedJobStore = {
	selectedJob: string;
	setSelectedJobId: (jobId: string) => void;
};

export const useSelectedJobStore = create<selectedJobStore>()((set) => ({
	selectedJob: "",
	setSelectedJobId: (jobId: string) => set({ selectedJob: jobId }),
}));

export function loader({ context, request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const routes = url.pathname.split("/");
	let jobView = false;
	let selectedJob = routes[2] ?? "";
	if (selectedJob) {
		jobView = true;
	}
	console.log(routes);
	return json(
		{ jobs: dummyJobs, jobView: jobView, selectedJob: selectedJob },
		{ status: 200 }
	);
}

export default function Jobs() {
	const data = useLoaderData<typeof loader>();
	const { setSelectedJobId } = useSelectedJobStore();

	useEffect(() => {
		if (data.selectedJob) {
			setSelectedJobId(data.selectedJob);
		}
	}, []);

	return (
		<div className=" container mx-auto">
			<div className="w-full text-center"> Jobs</div>
			<div
				className={`${data.jobView ? "flex flex-col sm:flex-row" : ""}`}
			>
				<JobListing jobs={data.jobs} jobView={data.jobView} />
				<Outlet />
			</div>
		</div>
	);
}
