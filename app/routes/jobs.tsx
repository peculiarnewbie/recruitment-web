import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Outlet } from "react-router";
import JobListing from "~/components/jobListing";
import { dummyJobs } from "~/helpers/dummyData";

import { create } from "zustand";
import { useEffect } from "react";
import { findDocuments } from "~/helpers/mongo-helper";
import { Job } from "~/helpers/types";

export type selectedJobStore = {
	selectedJob: string;
	setSelectedJobId: (jobId: string) => void;
};

export const useSelectedJobStore = create<selectedJobStore>()((set) => ({
	selectedJob: "",
	setSelectedJobId: (jobId: string) => set({ selectedJob: jobId }),
}));

export async function loader({ context, request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const routes = url.pathname.split("/");
	let jobView = false;
	let selectedJob = routes[2] ?? "";
	if (selectedJob) {
		jobView = true;
	}

	const jobsRes = await findDocuments("Jobs", 10, context);
	const jobs: Job[] = (await jobsRes.json()).documents;

	return json(
		{ jobs: jobs, jobView: jobView, selectedJob: selectedJob },
		{ status: 200 }
	);
}

export default function Jobs() {
	const data = useLoaderData<typeof loader>();
	const { selectedJob, setSelectedJobId } = useSelectedJobStore();

	useEffect(() => {
		if (data.selectedJob) {
			setSelectedJobId(data.selectedJob);
		}
	}, []);

	return (
		<div className=" container mx-auto">
			<div className="w-full text-center"> Jobs</div>
			<div
				className={`${
					selectedJob !== "" ? "flex flex-col md:flex-row" : ""
				}`}
			>
				<JobListing jobs={data.jobs} />
				<Outlet />
			</div>
		</div>
	);
}
