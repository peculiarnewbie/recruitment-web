import { Job } from "~/helpers/types";
import JobView from "./jobView";

export default function JobListing(props: { jobs: Job[]; jobView: boolean }) {
	return (
		<div
			className={` p-2 grid  gap-2 ${
				props.jobView ? "grid-cols-1" : "grid-cols-2"
			}`}
		>
			{props.jobs.map((job) => (
				<JobView key={job._id} job={job} jobView={props.jobView} />
			))}
		</div>
	);
}
