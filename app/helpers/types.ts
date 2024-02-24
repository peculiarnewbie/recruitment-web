export const EmploymentTypes = {
	Contract: "contract",
	PartTime: "partTime",
	FullTime: "fullTime",
} as const;

export type EmploymentTypeKeys =
	(typeof EmploymentTypes)[keyof typeof EmploymentTypes];

export type Job = {
	_id: string;
	title: string;
	posted: number;
	description: string;
	detail: string;
	benefits: string[];
	type: EmploymentTypeKeys;
};

export type Candidate = {
	_id: string;
	name: string;
	info: {
		birthdate?: number;
		residence: {
			city: string;
			province: string;
			country: string;
		};
		summary?: string;
	};
	contact: {
		email: string;
		phone?: string;
		website?: string;
	};
	education?: Education[];
	experience?: Experience[];
	files?: File[];
	appliedJobs?: Job[];
};

export type Education = {
	degree: string;
	institute: Institution;
	startdate: number;
	graduationDate?: number;
	description?: string;
};

export type Institution = {
	_id: string;
	name: string;
};

export type Experience = {
	position: string;
	company: string;
	startDate: number;
	stopDate?: number;
	description?: string;
};
export type File = {
	url: string;
	uploaded: number;
	size: number;
};

export const generateInsertBody = (object: any, collection: string) => {
	return JSON.stringify({
		dataSource: "mongodb-atlas",
		database: "recruitment-web",
		collection: collection,
		document: object,
	});
};

export type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	profilePictureUrl: string;
};
