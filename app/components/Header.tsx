import { useEffect, useLayoutEffect, useState } from "react";
import { github, moon, sun } from "./icons";
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
} from "@remix-run/cloudflare";
import { prefs } from "~/helpers/cookies.server";
import { useFetcher, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const cookie = (await prefs.parse(cookieHeader)) || {};
	return json({ darkTheme: cookie.darkTheme });
}

function Header() {
	// useLayoutEffect(() => {
	// 	const dark = window.localStorage.getItem("darkTheme");
	// 	console.log("dark", dark);
	// 	if (!dark || dark == "true") {
	// 		toggleDarkTheme(true);
	// 	} else toggleDarkTheme(false);
	// }, []);

	// const toggleDarkTheme = (newTheme: boolean) => {
	// 	setDarkTheme(newTheme);
	// 	window.localStorage.setItem("darkTheme", newTheme.toString());
	// 	if (newTheme)
	// 		document.body.className = "ctp-mocha bg-ctp-base text-ctp-text";
	// 	else document.body.className = "ctp-latte bg-ctp-base text-ctp-text";
	// };

	const fetcher = useFetcher();
	let { darkTheme } = useLoaderData<typeof loader>();

	if (fetcher.formData?.has("darkTheme")) {
		darkTheme = fetcher.formData.get("darkTheme") === "true";
	}

	return (
		<header className=" shrink-0 flex justify-center bg-ctp-crust h-14 items-center">
			<div className="container flex justify-between px-6">
				<div className="flex items-center">logo</div>
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
						href="https://github.com/peculiarnewbie/frontend-workshop/tree/master/examples/remix-todo"
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
