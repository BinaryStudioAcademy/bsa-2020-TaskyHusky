import React from 'react';
import { Card, Comment } from 'semantic-ui-react';
import { getDateString } from '../../helpers/time.helper';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Icon } from 'semantic-ui-react';

interface Props {
	commit: WebApi.Result.CommitResult;
	issueKey?: string;
}

const IssueCommit: React.FC<Props> = ({ commit, issueKey }) => {
	return (
		<Comment>
			<Comment.Avatar src={commit.author.avatar} className={styles.avatar} />
			<Comment.Content className={styles.container}>
				<Comment.Author
					as="a"
					rel="noopener noreferrer"
					target="_blank"
					href={`https://github.com/${commit.author.name}`}
					className={styles.commentAuthorName}
				>
					{commit.author.name}
				</Comment.Author>
				<Comment.Metadata className={styles.commitTime}>
					{getDateString(new Date(commit.date))}
				</Comment.Metadata>
				<Comment.Text className={styles.commitContainer}>
					<Card className={styles.commit}>
						<Card.Content>
							<Card.Header className={styles.issueName}>{commit.message}</Card.Header>
							<Card.Description className={styles.description}>
								<span>
									<Icon name="code branch" color="blue" className={styles.icon} />
									<Link
										to={{
											pathname: commit.repo.url,
										}}
										target="_blank"
										className={styles.repoName}
									>
										{commit.repo.name}
									</Link>
								</span>
								<span>
									<Icon name="code" color="blue" className={styles.icon} />
									<Link
										to={{
											pathname: commit.url,
										}}
										target="_blank"
									>
										{commit.sha}
									</Link>
								</span>
							</Card.Description>
						</Card.Content>
					</Card>
				</Comment.Text>
			</Comment.Content>
		</Comment>
	);
};

export default IssueCommit;
