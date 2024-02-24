import { type MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<div className="container mx-auto flex flex-col items-center gap-4 p-4">
				<a
					href="/jobs"
					className=" px-4 py-2 rounded-md bg-ctp-blue/40"
				>
					Job List
				</a>
				<p>
					by{" "}
					<a target="_blank" href="https://peculiarnewbie.com">
						perculiarnewbie
					</a>
				</p>
			</div>
		</div>
	);
}
