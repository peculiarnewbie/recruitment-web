import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/cloudflare";
import { WorkOS } from "@workos-inc/node";
import { jwtVerify } from "jose";
import { nanoid } from "nanoid";
import EducationList from "~/components/EducationList";
import ExperienceList from "~/components/ExperienceList";
import FileUpload from "~/components/FileUpload";
import { tokenCookie } from "~/helpers/cookies.server";
import { Candidate } from "~/helpers/types";

export async function action({ context }: ActionFunctionArgs) {
	const candidateData: Candidate = {
		_id: nanoid(),
	};
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

	const user = verifiedToken.payload.user;
	if (!user) return callWorkOS();

	return json({ user: user }, { status: 200 });
}

export default function Profile() {
	return (
		<div className=" container">
			<form method="post">
				<p>name</p>
				<input name="candidateName" type="text" required={true} />
				<p>email</p>
				<input name="email" type="email" />
				<p>birth date</p>
				<input name="birthDate" type="date" required={true} />
				<p>location</p>
				<div>
					<input name="city" type="text" />
					<input name="province" type="text" />
					<input name="country" type="text" />
				</div>
				{/* perform validation */}
				<p>phone</p>
				<input name="phone" type="text" />
				<p>website</p>
				<input name="website" type="url" />

				<EducationList />

				<ExperienceList />

				<FileUpload />

				<button type="submit">sign in</button>
			</form>
		</div>
	);
}
