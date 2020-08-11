import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
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
	const [issue, setIssue] = useState<WebApi.Result.IssueResult | null>(null);

	useEffect(() => {
		getByKey(match.params.key as string).then(setIssue);
	}, [match]);

	if (!issue) {
		return null;
	}

	return (
		<DefaultPageWrapper>
			<main className="fill">
				<Grid columns="1" textAlign="center" className="fluid" style={{ marginTop: 50 }}>
					<Grid.Column style={{ maxWidth: 700 }}>
						<IssuePageContent issue={issue} />
					</Grid.Column>
				</Grid>
			</main>
		</DefaultPageWrapper>
	);
};

export default IssuePage;
