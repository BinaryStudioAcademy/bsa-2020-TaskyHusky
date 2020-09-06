import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

interface Props {
	commitLink: string;
	file: WebApi.Result.CommitFileResult;
}

const CommitFile: React.FC<Props> = (props) => {
	const { file, commitLink } = props;
	return (
		<div className={styles.wrapper}>
			<div className={styles.bar}>
				<div className={styles.additions}>{file.additions > 0 ? `+${file.additions}` : '-'}</div>
				<div className={styles.deletions}>{file.deletions > 0 ? `-${file.deletions}` : '-'}</div>
			</div>
			<Link to={{ pathname: `${commitLink}` }} target="_blank">
				{file.filename}
			</Link>
		</div>
	);
};

export default CommitFile;
