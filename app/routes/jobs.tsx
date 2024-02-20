import { Outlet } from "react-router";
import JobListing from "~/components/jobListing";

export default function Jobs() {
	return (
		<div>
			<p>Jobs parent</p>
			<JobListing />
			<Outlet />
		</div>
	);
}
