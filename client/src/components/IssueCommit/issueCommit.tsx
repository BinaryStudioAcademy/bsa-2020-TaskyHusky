import React from 'react';
import { Card, Comment } from 'semantic-ui-react';
import { getDateString } from '../../helpers/time.helper';
import { Link } from 'react-router-dom';
import CommitFile from './CommitFile/CommitFile';

interface Props {
	commit: WebApi.Result.CommitResult;
}

const IssueCommit: React.FC<Props> = ({ commit }) => {
	return (
		<Comment>
			<Comment.Avatar src={commit.avatar} />
			<Comment.Content>
				<Comment.Author
					as="a"
					rel="noopener noreferrer"
					target="_blank"
					href={`https://github.com/${commit.author}`}
				>
					{commit.author}
				</Comment.Author>
				<Comment.Metadata>{getDateString(new Date(commit.time))}</Comment.Metadata>
				<Comment.Text>
					<Card>
						<Card.Content>
							<Card.Header>{commit.message}</Card.Header>
							<Card.Description>
								<Link
									to={{
										pathname: `https://github.com/witcher1359/testFeature/commit/${commit.hash}`,
									}}
									target="_blank"
								>
									{commit.hash.slice(0, 6)}
								</Link>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							{commit.files.map((file) => (
								<CommitFile
									commitLink={`https://github.com/witcher1359/testFeature/commit/${commit.hash}`}
									file={file}
									key={file.sha}
								/>
							))}
						</Card.Content>
					</Card>
				</Comment.Text>
			</Comment.Content>
		</Comment>
	);
};

export default IssueCommit;
