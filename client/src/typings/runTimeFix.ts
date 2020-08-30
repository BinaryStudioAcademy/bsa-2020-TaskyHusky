/* eslint-disable */
export const Enums = {
"WebApi.Board": {
	"BoardType": {
		Scrum : 'Scrum',
		Kanban : 'Kanban',
	}
}, "WebApi.IO": {
	"IssueActions": {
		CreateIssue : 'ISSUE:CREATE',
		UpdateIssue : 'ISSUE:UPDATE',
		DeleteIssue : 'ISSUE:DELETE',
		CommentIssue : 'ISSUE:COMMENT:ADD',
		UpdateIssueComment : 'ISSUE:COMMENT:UPDATE',
		DeleteIssueComment : 'ISSUE:COMMENT:DELETE',
	}, "NotificationActions": {
		CreateNotification : 'NOTIFICATION:CREATE',
		ViewNotification : 'NOTIFICATION:VIEW',
		UnviewNotification : 'NOTIFICATION:UNVIEW',
		ViewAllNotifications : 'NOTIFICATION:ALL:VIEW',
	}, "Types": {
		Issue : 'ISSUE',
		Notification : 'NOTIFICATION',
	}
}, "WebApi.User": {
	"jobTitle": {
		dbAdmin : 'Database administrator',
		backEndDev : 'Back-end developer',
		frontEndDev : 'Front-end developer',
		fullStackDev : 'Full-Stack developer',
	}
}
};


	(function () {
		function getNamespace(nsName: string) {
			let ns: any = window;
			nsName.split('.').forEach((nsPart) => {
				if (ns[nsPart] !== undefined) {
					ns = ns[nsPart];
				} else {
					ns = ns[nsPart] = {};
				}
			});
			return ns;
		}
	
		for (let nsName of Object.keys(Enums)) {
			const ns = getNamespace(nsName);
			Object.assign(ns, (Enums as any)[nsName]);
		}
	})();