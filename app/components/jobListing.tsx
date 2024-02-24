import { Job } from "~/helpers/types";
import JobView from "./jobView";
import { useSelectedJobStore } from "~/routes/jobs";

export default function JobListing(props: { jobs: Job[] }) {
	const { selectedJob } = useSelectedJobStore();
	return (
		<div
			className={` p-4 grid  gap-2 shrink min-w-0 basis-1/3 h-fit ${
				selectedJob !== "" ? "grid-cols-1" : "grid-cols-2"
			}`}
		>
			{props.jobs.map((job) => (
				<JobView key={job._id} job={job} />
			))}
		</div>
	);
}
