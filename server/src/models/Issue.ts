interface PartialIssue {
    id?: string;
    typeID?: string;
    summary?: string;
    boardColumnID?: string;
    labels?: string[];
    attachments?: string[];
    links?: string[];
    priorityID?: string;
    description?: string;
    sprintID?: string;
    projectID?: string;
    issueKey?: string;
    assignedID?: string;
    creatorID?: string;
}
