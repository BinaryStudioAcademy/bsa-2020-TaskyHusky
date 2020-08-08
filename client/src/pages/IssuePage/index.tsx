import React, { useEffect, useState } from 'react';
import { Header, Button, Grid, Table, Label, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { getByKey } from 'services/issue.service';
import UpdateIssueModal from 'containers/UpdateIssueModal';
import { ContextProvider } from 'containers/CreateIssueModal/logic/context';
import DefaultPageWrapper from 'containers/DefaultPageWrapper';

interface Props {
	match: {
		params: {
			key: string;
		};
	};
}

const IssuePage: React.FC<Props> = ({ match }) => {
	const [issue, setIssue] = useState<WebApi.Result.IssueResult | null>(null);
	const [redirecting, setRedirecting] = useState<boolean>(false);
	let openEditModal: () => void = () => {};

	useEffect(() => {
		getByKey(match.params.key as string).then(setIssue);
	}, [match]);

	if (!issue) {
		return null;
	}

	const initalIssue = {
		...issue,
		type: issue.type.id,
		priority: issue.priority.id,
	};

	return (
		<DefaultPageWrapper>
			<main className="fill">
				{redirecting ? <Redirect to="/createIssue" /> : ''}
				<Grid columns="1" textAlign="center" className="fluid" style={{ marginTop: 50 }}>
					<Grid.Column style={{ maxWidth: 700 }}>
						<Button.Group>
							<Button primary onClick={() => setRedirecting(true)}>
								Add new issue
							</Button>
							<Button secondary inverted onClick={() => openEditModal()}>
								Edit issue
							</Button>
						</Button.Group>
						<Header as="h1">
							{issue.summary} #{issue.issueKey}
						</Header>
						{issue.description}
						<Table definition>
							<Table.Body>
								<Table.Row>
									<Table.Cell>Reported by</Table.Cell>
									<Table.Cell>Reporter will be here</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Assigned by</Table.Cell>
									<Table.Cell>Assignee will be here</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Sprint</Table.Cell>
									<Table.Cell>Sprint will be here</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Links</Table.Cell>
									<Table.Cell>
										{(issue.links ?? []).map((l, i) => (
											<a href={l} key={i} style={{ marginRight: 10 }}>
												{l}
											</a>
										))}
									</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Attachments</Table.Cell>
									<Table.Cell>
										{(issue.attachments ?? []).map((a, i) => (
											<a href={a} key={i} style={{ marginRight: 10 }}>
												{a}
											</a>
										))}
									</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Labels</Table.Cell>
									<Table.Cell>
										{(issue.labels || []).map((label, index) => (
											<Label key={index}>{label}</Label>
										))}
									</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Type</Table.Cell>
									<Table.Cell>
										<Label color={issue.type.color as any}>
											<Icon name={issue.type.icon as any} />
											{issue.type.title}
										</Label>
									</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Priority</Table.Cell>
									<Table.Cell>
										<Label color={issue.priority.color as any}>
											<Icon name={issue.priority.icon as any} />
											{issue.priority.title}
										</Label>
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</Grid.Column>
				</Grid>
				<ContextProvider customInitalState={initalIssue}>
					<UpdateIssueModal
						onSubmit={() => window.location.reload()}
						current={issue}
						getOpenFunc={(open) => (openEditModal = open)}
					/>
				</ContextProvider>
			</main>
		</DefaultPageWrapper>
	);
};

export default IssuePage;
