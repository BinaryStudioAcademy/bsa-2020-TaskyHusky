import { UserProfile } from '../entity/UserProfile';

export interface TeamModel {
	id?: string;
	name?: string;
	description?: string;
	color?: string;
	createdBy: UserProfile;
	links?: string[];
	users?: UserProfile[];
}
