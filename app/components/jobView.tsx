import { Job } from "~/helpers/types";
import dayjs from "dayjs";
import { useSelectedJobStore } from "~/routes/jobs";
import { Link } from "@remix-run/react";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default function JobView(props: { job: Job }) {
	const { selectedJob } = useSelectedJobStore();

	return (
		<div
			className={`transition-all duration-200 border-2 border-ctp-surface0 hover:border-ctp-blue flex rounded-md group min-w-72 ${
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
				className="w-full text-start p-2"
			>
				<div className=" font-semibold text-2xl">{props.job.title}</div>

				<div className=" text-ctp-subtext0">{props.job.type}</div>
				<div className="w-full h-6" />
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
