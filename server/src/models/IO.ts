export enum IssueActions {
	CreateIssue = 'ISSUE:CREATE',
	UpdateIssue = 'ISSUE:UPDATE',
	DeleteIssue = 'ISSUE:DELETE',
	CommentIssue = 'ISSUE:COMMENT:ADD',
	UpdateIssueComment = 'ISSUE:COMMENT:UPDATE',
	DeleteIssueComment = 'ISSUE:COMMENT:DELETE',
}

export enum NotificationActions {
	CreateNotification = 'NOTIFICATION:CREATE',
	ViewNotification = 'NOTIFICATION:VIEW',
	UnviewNotification = 'NOTIFICATION:UNVIEW',
	ViewAllNotifications = 'NOTIFICATION:ALL:VIEW',
}

export enum Types {
	Issue = 'ISSUE',
	Notification = 'NOTIFICATION',
}
