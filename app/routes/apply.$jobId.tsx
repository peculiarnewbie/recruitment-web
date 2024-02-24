import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
	return { id: params.jobId };
}

export default function Apply() {
	const data = useLoaderData<typeof loader>();
	return (
		<div>
			<div>{data.id}</div>
		</div>
	);
}
