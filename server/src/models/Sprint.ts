interface SprintModel {
	id: string;
	sprintName: string;
	isActive: boolean;
	isCompleted: boolean;
	project: string;
	board: string;
	issues: string[];
	startDate: Date;
	endDate: Date;
}
