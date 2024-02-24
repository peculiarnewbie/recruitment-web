import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { Job } from "~/helpers/types";
import { dummyJobs } from "~/helpers/dummyData";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const jobs = dummyJobs;
	const job = dummyJobs.find((job) => job._id == params.jobId);
	return json({ job: job }, { status: 200 });
};

export default function JobDetail() {
	const data = useLoaderData<typeof loader>();

	return (
		<div className="grow">
			<div className="flex justify-between p-2 items-center">
				<h1 className=" text-3xl font-bold">{data.job?.title}</h1>
				<button className="p-2 bg-ctp-blue">Lamar</button>
			</div>
			<div>{data.job?._id}</div>
			<div>{data.job?.description}</div>
		</div>
	);
}
