export interface ReportState {
	sprint?: WebApi.Entities.Sprint;
	issues: WebApi.Result.IssueResult[];
}

export const initialState: ReportState = {
	issues: [],
};
