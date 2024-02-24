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
	const job: Job = (await jobRes.json()).document;

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
		<div className="grow w-full flex flex-col gap-2 p-2 basis-2/3">
			<div className="flex justify-between p-2 items-center">
				<h1 className=" text-3xl font-bold">{data.job?.title}</h1>
				<Link
					to={`/apply/${data.job?._id}`}
					className="py-2 px-6 rounded-md bg-ctp-blue  text-ctp-crust "
				>
					<p className="ctp-latte font-semibold">Lamar</p>
				</Link>
			</div>

			<div className="flex flex-col gap-2 p-2">
				<div className="h-[2px] w-full bg-ctp-surface1" />
				<h2 className=" font-semibold text-xl">Job Description</h2>
				<div>{data.job?.description}</div>
				<div>
					<p>detail:</p>
					<div>{data.job?.detail}</div>
				</div>
				<div>
					<p>benefits:</p>
					<ul>
						{data.job.benefits.map((benefit) => (
							<li key={benefit}>- {benefit}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
