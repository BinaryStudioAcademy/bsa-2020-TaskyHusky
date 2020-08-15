import React, { useEffect, useState } from 'react';
import { getByKey } from 'services/issue.service';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';
import IssuePageContent from 'containers/IssuePageContent';

interface Props {
	match: {
		params: {
			key: string;
		};
	};
}

const IssuePage: React.FC<Props> = ({ match }) => {
	const [issue, setIssue] = useState<WebApi.Result.IssueResult | undefined>();

	useEffect(() => {
		getByKey(match.params.key as string).then(setIssue);
	}, [match]);

	if (!issue) {
		return null;
	}

	return (
		<DefaultPageWrapper>
			<IssuePageContent issue={issue} />
		</DefaultPageWrapper>
	);
};

export default IssuePage;
