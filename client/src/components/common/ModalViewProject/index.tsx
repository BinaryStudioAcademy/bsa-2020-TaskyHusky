import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

type Props = {
	project: { id: string; name: string; category: string; users: Array<{ id: string }> };
	onClose: (arg: React.BaseSyntheticEvent) => void;
};

const ModalViewProject = ({ project, onClose }: Props) => {
	return (
		<div className={styles.block_wrapper} onMouseLeave={(e) => onClose(e)}>
			<div className={styles.header} style={{ backgroundColor: '#FECE2F' }}>
				<div className={styles.avatar}>
					<p className={styles.avatarTitle}>{project.name[0]}</p>
				</div>
				<div className={styles.name}>
					<span>{project.name}</span>
					<span>{project.category}</span>
				</div>
			</div>

			<div className={styles.main_info}>
				<div className={styles.left_margin}></div>
				<div className={styles.details}>
					<span className={styles.user_field}>Participants: {project.users.length}</span>
					<Link to={`/project/${project.id}/issues`}>
						<Button className="primaryBtn">View project</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ModalViewProject;
