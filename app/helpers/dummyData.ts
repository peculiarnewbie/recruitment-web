import dayjs from "dayjs";
import { Candidate, EmploymentTypes, Job } from "./types";

export const fileToPost = {
	_id: "ytrewa",
	url: "layy",
	uploaded: Date.now(),
	size: 100,
};

export const candidate1: Candidate = {
	_id: "awerty",
	name: "Jon",
	info: {
		birthdate: 100,
		residence: {
			city: "Abdhuehue",
			province: "B",
			country: "C",
		},
		summary: "i exist",
	},
	contact: {
		email: "man@man.man",
		phone: "080808",
		website: "localhost",
	},
	education: [
		{
			degree: "livin",
			institute: { _id: "123908f", name: "uni of livin" },
			startdate: 90,
			description: "im the best btw",
		},
	],
	files: [fileToPost],
};

export const dummyJobs: Job[] = [
	{
		_id: "123",
		title: "Programmer",
		posted: dayjs("2024-02-24", "YYYY-MM-DD").valueOf(),
		description: "Program stuff",
		type: EmploymentTypes.Contract,
	},
	{
		_id: "1234",
		title: "Designer",
		posted: dayjs("2024-02-12", "YYYY-MM-DD").valueOf(),
		description: "Design stuff",
		type: EmploymentTypes.Contract,
	},
	{
		_id: "12390",
		title: "Producer",
		posted: dayjs("2024-01-12", "YYYY-MM-DD").valueOf(),
		description: "Produce stuff",
		type: EmploymentTypes.FullTime,
	},
];
