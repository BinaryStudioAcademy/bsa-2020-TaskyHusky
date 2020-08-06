import React, { useEffect, useState } from 'react';
import { Header, Button, Grid, Table, Label, Icon } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import style from './styles.module.scss';
import { getByKey } from 'services/issue.service';
import UpdateIssueModal from 'containers/UpdateIssueModal';
import { ContextProvider } from 'containers/CreateIssueModal/logic/context';

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
		type: (issue.type as { id: string }).id,
		priority: (issue.priority as { id: string }).id,
	};

	return (
		<main className="fill">
			{redirecting ? <Redirect to="/createIssue" /> : ''}
			<div className={style.siteHeader}>
				<Grid className="fill" textAlign="center" verticalAlign="middle" columns="3">
					<Grid.Column>
						<Header as="h1" color="blue">
							TaskyHusky
						</Header>
					</Grid.Column>
					<Grid.Column>
						<Header as="h2">Issue #{issue.issueKey}</Header>
					</Grid.Column>
					<Grid.Column>
						<Button.Group>
							<Button primary onClick={() => setRedirecting(true)}>
								Add new issue
							</Button>
							<Button secondary inverted onClick={() => openEditModal()}>
								Edit issue
							</Button>
						</Button.Group>
					</Grid.Column>
				</Grid>
			</div>
			<Grid columns="1" textAlign="center" className="fluid" style={{ marginTop: 50 }}>
				<Grid.Column style={{ maxWidth: 700 }}>
					<Header as="h1">{issue.summary}</Header>
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
										<Link to={l} key={i} style={{ marginRight: 10 }}>
											{l}
										</Link>
									))}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Attachments</Table.Cell>
								<Table.Cell>
									{(issue.attachments ?? []).map((a, i) => (
										<Link to={a} key={i} style={{ marginRight: 10 }}>
											{a}
										</Link>
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
									<Label color={(issue.type as { color: string }).color as any}>
										<Icon name={(issue.type as { icon: string }).icon as any} />
										{(issue.type as { title: string }).title}
									</Label>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Pririoty</Table.Cell>
								<Table.Cell>
									<Label color={(issue.priority as { color: string }).color as any}>
										<Icon name={(issue.priority as { icon: string }).icon as any} />
										{(issue.priority as { title: string }).title}
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
	);
};

export default IssuePage;
