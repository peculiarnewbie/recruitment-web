import { Job } from "~/helpers/types";
import JobView from "./jobView";

export default function JobListing(props: { jobs: Job[] }) {
	return (
		<div className="flex gap-2">
			{props.jobs.map((job) => (
				<JobView job={job} />
			))}
		</div>
	);
}
