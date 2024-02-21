export const EmploymentTypes = {
	Contract: "contract",
	PartTime: "partTime",
	FullTime: "fullTime",
} as const;

export type EmploymentTypeKeys =
	(typeof EmploymentTypes)[keyof typeof EmploymentTypes];

export class Job {
	_id!: string;
	title!: string;
	time!: number;
	description?: string;
	type!: EmploymentTypeKeys;
}

export class Candidate {
	_id!: string;
	name!: string;
	info_birthdate?: number;
	info_residence_city!: string;
	info_residence_province!: string;
	info_residence_country!: string;
	info_summary?: string;
	contact_email!: string;
	contact_phone?: string;
	contact_website?: string;
	// education?: Education[];
	// experience?: Experience[];
	files?: File[];
	appliedJobs?: Job[];
}

// export class Education extends Realm.Object {
// 	degree!: string;
// 	institute?: Institution;
// 	startDate!: number;
// 	graduationDate!: number;
// 	description?: string;

// 	static schema: ObjectSchema = {
// 		name: "Education",
// 		embedded: true,
// 		properties: {
// 			degree: "string",
// 			institute: "Institution",
// 			startDate: "number",
// 			graduationDate: "number",
// 			description: "string?",
// 		},
// 	};
// }

// export type EducationType = Omit<Education, keyof Realm.Object>;

// export class Institution extends Realm.Object {
// 	_id!: Realm.BSON.ObjectId;
// 	name!: string;

// 	static schema: ObjectSchema = {
// 		name: "Institution",
// 		properties: {
// 			_id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
// 			name: "string",
// 		},
// 	};
// }

// export type InstitutionType = Omit<Institution, keyof Realm.Object>;

// export class Experience extends Realm.Object {
// 	position!: string;
// 	company!: string;
// 	startDate!: number;
// 	stopDate?: number;
// 	description?: string;

// 	static schema: ObjectSchema = {
// 		name: "Experience",
// 		embedded: true,
// 		properties: {
// 			position: "string",
// 			company: "string",
// 			startDate: "number",
// 			stopDate: "number?",
// 			description: "string?",
// 		},
// 	};
// }

// export type ExperienceType = Omit<Experience, keyof Realm.Object>;

export class File {
	url!: string;
	uploaded!: number;
	size!: number;
}
