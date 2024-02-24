import { LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { jwtVerify } from "jose";
import JobListing from "~/components/jobListing";
import { tokenCookie } from "~/helpers/cookies.server";
import { findDocument, findDocuments } from "~/helpers/mongo-helper";
import { Candidate, Job, User } from "~/helpers/types";

export async function loader({ context, request }: LoaderFunctionArgs) {
	//@ts-expect-error
	const secret = new TextEncoder().encode(context.env.JWT_SECRET_KEY);

	const cookieHeader = request.headers.get("Cookie");
	const cookie = (await tokenCookie.parse(cookieHeader)) || {};

	let verifiedToken;
	try {
		verifiedToken = await jwtVerify(cookie.token, secret);
	} catch {
		return redirect("/register");
	}

	const user = verifiedToken.payload.user as User;
	if (!user) return redirect("/register");

	const res = await findDocument("Candidate", user.id, context);

	const candidate = (await res.json()).document as Candidate;

	const ids = [] as { _id: string }[];

	candidate.appliedJobs?.forEach((jobId) => ids.push({ _id: jobId }));

	console.log("ids================", ids);

	const jobsRes = await findDocuments("Jobs", 10, context, { $or: ids });

	const jobs = ((await jobsRes.json()).documents as Job[]) ?? [];

	console.log("jobs", jobs);

	return json(
		{
			isAuthenticated: true,
			user: verifiedToken.payload.user,
			candidate: candidate,
			jobs: jobs,
		},
		{ status: 200 }
	);
}

export default function Profile() {
	const data = useLoaderData<typeof loader>();

	console.log(data);
	return (
		<div className="flex flex-col gap-2 items-start container mx-auto p-4">
			{/* {JSON.stringify(data.candidate)} */}

			<div>
				<p className=" font-semibold">Name</p>
				<p className=" text-xl">{data.candidate.name}</p>
			</div>
			<div>
				<p className=" font-semibold">Email</p>
				<p className=" text-xl">{data.candidate.contact.email}</p>
			</div>
			<div>
				<p className=" font-semibold">Birthday</p>
				<p className=" text-xl">
					{dayjs(data.candidate.info.birthdate).format(
						"DD MMMM YYYY"
					)}
				</p>
			</div>
			<div>
				<p className=" font-semibold">Residence</p>
				<p className=" text-xl">
					{`
					${data.candidate.info.residence.city}, 
					${data.candidate.info.residence.province}, 
					${data.candidate.info.residence.country}
				`}
				</p>
			</div>

			<div className=" pt-4">
				<p className=" text-xl font-semibold">Applied Jobs</p>
				{data.jobs.length === 0 ? (
					<p>no jobs applied yet</p>
				) : (
					<JobListing jobs={data.jobs} />
				)}
			</div>

			<a
				className="px-4 py-2 border-2 border-ctp-red rounded-md bg-ctp-red/30"
				href="/signOut"
			>
				Sign Out
			</a>
		</div>
	);
}
