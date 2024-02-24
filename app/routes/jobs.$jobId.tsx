import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Job } from "~/helpers/types";
import { dummyJobs } from "~/helpers/dummyData";
import { useSelectedJobStore } from "./jobs";
import { useEffect } from "react";
import { findDocument } from "~/helpers/mongo-helper";

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
	if (params.jobId == undefined) return redirect("/404");
	const jobRes = await findDocument("Jobs", params.jobId, context);
	//@ts-expect-error
	const job = (await jobRes.json()).document;

	if (job == undefined) return redirect("/404");

	return json({ job: job }, { status: 200 });
};

export default function JobDetail() {
	const data = useLoaderData<typeof loader>();
	const { setSelectedJobId } = useSelectedJobStore();

	useEffect(() => {
		setSelectedJobId(data.job?._id);
		console.log("selected:", data.job?._id);
	}, [data]);

	return (
		<div className="grow">
			<div className="flex justify-between p-2 items-center">
				<h1 className=" text-3xl font-bold">{data.job?.title}</h1>
				<Link
					to={`/apply/${data.job?._id}`}
					className="p-2 bg-ctp-blue"
				>
					Lamar
				</Link>
			</div>
			<div>{data.job?._id}</div>
			<div>{data.job?.description}</div>
		</div>
	);
}
