export interface TeamModel {
	id?: string;
	name?: string;
	description?: string;
	color?: string;
	createdBy: string;
	links?: string[];
	users?: [];
}
