import { UserProfile } from '../entity/UserProfile';
import { Projects } from '../entity/Projects';

export interface TeamModel {
	id?: string;
	name?: string;
	description?: string;
	color?: string;
	createdBy: UserProfile;
	links?: string[];
	users?: UserProfile[];
	projects?: Projects[];
}
