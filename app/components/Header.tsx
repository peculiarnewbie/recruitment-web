import { github, moon, sun } from "./icons";
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
} from "@remix-run/cloudflare";
import { prefs, tokenCookie } from "~/helpers/cookies.server";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { loader } from "~/root";

function Header() {
	const fetcher = useFetcher();
	let { darkTheme, isSignedIn } = useLoaderData<typeof loader>();

	if (fetcher.formData?.has("darkTheme")) {
		darkTheme = fetcher.formData.get("darkTheme") === "true";
	}

	return (
		<header className=" shrink-0 flex justify-center bg-ctp-crust h-14 items-center">
			<div className="container flex justify-between px-6">
				<nav className="flex items-center gap-4 font-semibold">
					<a
						href="/"
						className=" border-b-2 border-transparent hover:border-ctp-blue"
					>
						Home
					</a>
					<a
						href="/jobs"
						className=" border-b-2 border-transparent hover:border-ctp-blue"
					>
						Jobs
					</a>
					{isSignedIn ? (
						<a
							href="/profile"
							className=" border-b-2 border-transparent hover:border-ctp-blue"
						>
							Profile
						</a>
					) : (
						<a
							href="/register"
							className=" border-b-2 border-transparent hover:border-ctp-blue"
						>
							Sign In
						</a>
					)}
				</nav>
				<div className="flex gap-4 items-center">
					<fetcher.Form method="post">
						<button
							className=" flex items-center rounded-full bg-ctp-base border border-ctp-surface0 hover:border-ctp-blue w-12 h-8"
							name="darkTheme"
							value={darkTheme ? "false" : "true"}
							type="submit"
						>
							<div
								className={` flex px-1 transition-all h-8 justify-end ${
									darkTheme ? "w-8" : "w-12"
								} `}
							>
								<div className=" flex justify-center items-center scale-75">
									{darkTheme ? moon : sun}
								</div>
							</div>
						</button>
					</fetcher.Form>
					<div className="h-8 w-[2px] bg-ctp-surface0 rounded-full" />
					<a
						target="_blank"
						href="https://github.com/peculiarnewbie/recruitment-web"
						className="bg-ctp-surface0 rounded-full p-1 border-ctp-surface0 hover:border-ctp-blue border"
					>
						<div className="scale-75">{github}</div>
					</a>
				</div>
			</div>
		</header>
	);
}

export default Header;
