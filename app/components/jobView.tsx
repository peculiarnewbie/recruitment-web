import { Job } from "~/helpers/types";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default function JobView(props: { job: Job }) {
	return (
		<form
			className="transition-all duration-200 border-2 border-transparent hover:border-ctp-blue rounded-md"
			action={`/jobs/${props.job._id}`}
			method="get"
		>
			<button type="submit">
				<div>{props.job.title}</div>
				<div>{props.job.type}</div>
				<div>{props.job.description}</div>
				<div>
					{
						//@ts-expect-error
						dayjs(props.job.posted).fromNow()
					}
				</div>
				<div>{"view details ->"}</div>
			</button>
		</form>
	);
}
