import { Job } from "~/helpers/types";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default function JobView(props: { job: Job; jobView: boolean }) {
	return (
		<form
			className="transition-all duration-200 border-2 border-ctp-surface0 hover:border-ctp-blue flex rounded-md group min-w-72"
			action={`/jobs/${props.job._id}`}
			method="get"
		>
			{!props.jobView && (
				<div className="w-0 bg-ctp-blue transition-all duration-200 group-hover:w-1" />
			)}
			<button className="w-full text-start p-2" type="submit">
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
						{props.jobView ? "" : "view details ->"}
					</div>
				</div>
			</button>
		</form>
	);
}
