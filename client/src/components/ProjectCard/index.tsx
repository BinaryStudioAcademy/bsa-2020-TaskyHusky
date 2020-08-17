import React from 'react';
import styles from './styles.module.scss';

interface Props {
	project: {
		name: string;
		id: string;
		category?: string;
	};
}

const ProjectCard: React.FC<Props> = (props: Props) => {
	const {
		project: { name, category = '' },
	} = props;
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.avatar}></div>
				<div className={styles.headerContent}>
					<p className={styles.name}>{name}</p>
					{category && <p className={styles.category}>{category} project</p>}
				</div>
			</div>
			<div className={styles.issues}>
				<p className={styles.text}>
					My open issues <span className={styles.count}>0</span>
				</p>
				<p className={styles.text}>
					My done issues <span className={styles.count}>0</span>
				</p>
			</div>
		</div>
	);
};

export default ProjectCard;
