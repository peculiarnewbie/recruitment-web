export const EmploymentTypes = {
	contract: "contract",
	PartTime: "partTime",
	FullTime: "fullTime",
} as const;

export type EmploymentTypeKeys =
	(typeof EmploymentTypes)[keyof typeof EmploymentTypes];

export type JobType = {
	id: string;
	title: string;
	time: string;
	description: string;
	type: EmploymentTypeKeys;
};

export type UserType = {
	id: string;
	name: string;
	info: {
		birthDate: number;
		residence: {
			city: string;
			province: string;
			country: string;
		};
		summary: string;
	};
	contact: {
		email: string;
		phone?: string;
		website?: string;
	};
	education: Education[];
	experience: Experience[];
	files: Files[];
};

export type Education = {
	degree: string;
	institute: string;
	startDate: number;
	graduationDate: number;
	description?: string;
};

export type Experience = {
	position: string;
	company: string;
	startDate: number;
	stopDate?: number;
	description?: string;
};

export type Files = {
	id: string;
};
