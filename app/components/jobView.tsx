import { Job } from "~/helpers/types";
import dayjs from "dayjs";
import { useSelectedJobStore } from "~/routes/jobs";
import { Link } from "@remix-run/react";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function camelCaseToWords(s: string) {
	const result = s.replace(/([A-Z])/g, " $1");
	return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function JobView(props: { job: Job }) {
	const { selectedJob } = useSelectedJobStore();

	return (
		<div
			className={`transition-all duration-200 border-2 border-ctp-surface0 hover:border-ctp-blue flex rounded-md justify-start  min-w-72 ${
				selectedJob == props.job._id
					? "bg-ctp-blue/20 border-ctp-blue/40"
					: ""
			}`}
		>
			{selectedJob === "" && (
				<div className="w-0 bg-ctp-blue transition-all duration-200 group-hover:w-1" />
			)}
			<Link
				to={`/jobs/${props.job._id}`}
				className="w-full text-start p-2 gap-2 flex flex-col"
			>
				<div className="flex justify-between">
					<div className=" font-semibold text-2xl">
						{props.job.title}
					</div>
					<div className=" text-ctp-subtext0">
						{camelCaseToWords(props.job.type)}
					</div>
				</div>

				<p className="  text-ctp-subtext1 text-sm">
					{props.job.description}
				</p>
				<div className="flex justify-between w-full">
					<div>
						{
							//@ts-expect-error
							dayjs(props.job.posted).fromNow()
						}
					</div>
					<div className=" opacity-0 transition-opacity group-hover:opacity-100">
						{selectedJob !== "" ? "" : "view details ->"}
					</div>
				</div>
			</Link>
		</div>
	);
}
