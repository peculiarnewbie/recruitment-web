import Realm, { ObjectSchema } from "realm";

export const EmploymentTypes = {
	Contract: "contract",
	PartTime: "partTime",
	FullTime: "fullTime",
} as const;

export type EmploymentTypeKeys =
	(typeof EmploymentTypes)[keyof typeof EmploymentTypes];

export class Job extends Realm.Object<Job> {
	_id!: Realm.BSON.ObjectId;
	title!: string;
	time!: number;
	description?: string;
	type!: EmploymentTypeKeys;

	static schema = {
		name: "Job",
		properties: {
			_id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
			title: "string",
			time: "number",
			description: "string?",
			type: "string?",
		},
	};
}

export type JobType = Omit<Job, keyof Realm.Object | "_id">;

export class Candidate extends Realm.Object<Candidate> {
	_id!: Realm.BSON.ObjectId;
	name!: string;
	info_birthdate?: number;
	info_residence_city!: string;
	info_residence_province!: string;
	info_residence_country!: string;
	info_summary?: string;
	contact_email!: string;
	contact_phone?: string;
	contact_website?: string;
	education?: Realm.List<Education>;
	experience?: Realm.List<Experience>;
	files?: Realm.List<File>;
	appliedJobs?: Realm.List<Job>;

	static schema = {
		name: "Candidate",
		properties: {
			_id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
			name: "string",
			info_birthdate: "number?",
			info_residence_city: "string",
			info_residence_province: "string",
			info_residence_country: "string",
			info_summary: "string",
			contact_email: "string",
			contact_phone: "string",
			contact_website: "string",
			education: "Education[]",
			experience: "Experience[]",
			files: "File[]",
			appliedJobs: "Job[]",
		},
	};
}

export type CandidateType = Omit<Candidate, keyof Realm.Object | "_id">;

export class Education extends Realm.Object {
	degree!: string;
	institute?: Institution;
	startDate!: number;
	graduationDate!: number;
	description?: string;

	static schema: ObjectSchema = {
		name: "Education",
		embedded: true,
		properties: {
			degree: "string",
			institute: "Institution",
			startDate: "number",
			graduationDate: "number",
			description: "string?",
		},
	};
}

export type EducationType = Omit<Education, keyof Realm.Object>;

export class Institution extends Realm.Object {
	_id!: Realm.BSON.ObjectId;
	name!: string;

	static schema: ObjectSchema = {
		name: "Institution",
		properties: {
			_id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
			name: "string",
		},
	};
}

export type InstitutionType = Omit<Institution, keyof Realm.Object>;

export class Experience extends Realm.Object {
	position!: string;
	company!: string;
	startDate!: number;
	stopDate?: number;
	description?: string;

	static schema: ObjectSchema = {
		name: "Experience",
		embedded: true,
		properties: {
			position: "string",
			company: "string",
			startDate: "number",
			stopDate: "number?",
			description: "string?",
		},
	};
}

export type ExperienceType = Omit<Experience, keyof Realm.Object>;

export class File extends Realm.Object {
	url!: string;
	uploaded!: number;
	size!: number;

	static schema: ObjectSchema = {
		name: "File",
		embedded: true,
		properties: {
			url: "string",
			uploaded: "number",
			size: "number",
		},
	};
}

export type FileType = Omit<File, keyof Realm.Object>;
