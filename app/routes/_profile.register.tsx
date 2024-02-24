import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { WorkOS } from "@workos-inc/node";
import dayjs from "dayjs";
import { jwtVerify } from "jose";
import { nanoid } from "nanoid";
import EducationList from "~/components/EducationList";
import ExperienceList from "~/components/ExperienceList";
import FileUpload from "~/components/FileUpload";
import { tokenCookie } from "~/helpers/cookies.server";
import { insertDocument } from "~/helpers/mongo-helper";
import { Candidate, User } from "~/helpers/types";

export async function action({ context, request }: ActionFunctionArgs) {
	const form = await request.formData();

	const candidateData: Candidate = {
		_id: form.get("_id") as string,
		name: form.get("candidateName") as string,
		info: {
			residence: {
				city: form.get("city") as string,
				province: form.get("province") as string,
				country: form.get("country") as string,
			},
		},
		contact: {
			email: form.get("email") as string,
		},
	};

	const birthDate = form.get("birthDate") as string;
	if (birthDate) candidateData.info.birthdate = dayjs(birthDate).valueOf();

	const phone = form.get("phone") as string;
	if (phone) candidateData.contact.phone = phone;
	const website = form.get("website") as string;
	if (website) candidateData.contact.website = website;

	const response = await insertDocument(candidateData, "Candidate", context);

	const res = await response.json();

	return redirect("/profile");
}

export async function loader({ context, request }: LoaderFunctionArgs) {
	const callWorkOS = () => {
		//@ts-expect-error
		const workos = new WorkOS(context.env.WORKOS_API_KEY);
		//@ts-expect-error
		const clientId = context.env.WORKOS_CLIENT_ID;

		const authorizationUrl = workos.userManagement.getAuthorizationUrl({
			provider: "authkit",

			//@ts-expect-error
			redirectUri: context.env.WORKOS_CALLBACK_URL,
			clientId,
		});

		return redirect(authorizationUrl);
	};

	const secret = new TextEncoder().encode(context.env.JWT_SECRET_KEY);

	const cookieHeader = request.headers.get("Cookie");
	const cookie = (await tokenCookie.parse(cookieHeader)) || {};

	let verifiedToken;
	try {
		verifiedToken = await jwtVerify(cookie.token, secret);
	} catch {
		return callWorkOS();
	}

	const user = verifiedToken.payload.user as User;
	if (!user) return callWorkOS();

	return json(user, { status: 200 });
}

export default function Profile() {
	const data: User = useLoaderData<typeof loader>();
	return (
		<div className=" container mx-auto">
			<form className="flex flex-col gap-2 items-start" method="post">
				<input type="text" hidden={true} name="_id" value={data.id} />
				<div>
					<p>name*</p>
					<input
						className="p-2 bg-white  dark:bg-slate-950  rounded-md"
						name="candidateName"
						type="text"
						value={data.firstName + " " + data.lastName}
						required={true}
					/>
				</div>
				<div>
					<p>email*</p>
					<input
						className="p-2 bg-white  dark:bg-slate-950  rounded-md"
						name="email"
						value={data.email}
						type="email"
					/>
				</div>
				<div>
					<p>birth date*</p>
					<input
						className="p-2 bg-white  dark:bg-slate-950  rounded-md"
						name="birthDate"
						type="date"
						required={true}
					/>
				</div>
				<div>
					<p>location</p>
					<div className="flex gap-4">
						<div>
							<p>city:</p>
							<input
								className="p-2 bg-white  dark:bg-slate-950  rounded-md"
								name="city"
								type="text"
							/>
						</div>
						<div>
							<p>province:</p>
							<input
								className="p-2 bg-white  dark:bg-slate-950  rounded-md"
								name="province"
								type="text"
							/>
						</div>

						<div>
							<p>country:</p>
							<input
								className="p-2 bg-white  dark:bg-slate-950  rounded-md"
								name="country"
								type="text"
							/>
						</div>
					</div>
				</div>
				{/* validate phone number */}
				<div>
					<p>phone</p>
					<input
						className="p-2 bg-white  dark:bg-slate-950  rounded-md"
						name="phone"
						type="text"
					/>
				</div>
				<div>
					<p>website</p>
					<input
						className="p-2 bg-white  dark:bg-slate-950  rounded-md"
						name="website"
						type="url"
					/>
				</div>

				<EducationList />

				<ExperienceList />

				<FileUpload />

				<button
					className="px-4 py-2 border-2 border-ctp-blue rounded-md bg-ctp-blue/30"
					type="submit"
				>
					Register
				</button>
			</form>
		</div>
	);
}
