import type {
	ActionFunctionArgs,
	LinksFunction,
	LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useLoaderData,
} from "@remix-run/react";
import styles from "./app.css";
import Header from "./components/Header";
import { prefs, tokenCookie } from "./helpers/cookies.server";
import { useEffect } from "react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const prefsCookie = (await prefs.parse(cookieHeader)) || {};
	const darkTheme = prefsCookie.darkTheme;

	const profileCookie = (await tokenCookie.parse(cookieHeader)) || {};
	const tokenExist = profileCookie.token ? true : false;

	return json({ darkTheme: darkTheme, isSignedIn: tokenExist });
}

export async function action({ request }: ActionFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const cookie = (await prefs.parse(cookieHeader)) || {};
	const formData = await request.formData();

	const isDark = formData.get("darkTheme") === "true";
	cookie.darkTheme = isDark;

	return json(isDark, {
		headers: {
			"Set-Cookie": await prefs.serialize(cookie),
		},
	});
}

export default function App() {
	let { darkTheme } = useLoaderData<typeof loader>();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body
				className={`bg-ctp-base text-ctp-text ${
					darkTheme ? "ctp-mocha" : "ctp-latte"
				}`}
			>
				<Header />
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
