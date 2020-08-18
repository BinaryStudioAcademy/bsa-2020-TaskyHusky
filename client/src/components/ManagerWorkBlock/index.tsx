import React from 'react';
import { Menu } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {
	changeMode: (mode: string) => void;
	modeToShow: string;
}
const ManagerWorkBlock: React.FC<Props> = (props: Props) => {
	const { changeMode, modeToShow } = props;
	return (
		<div className="site-header">
			<Menu className={styles.menu}>
				<Menu.Item
					name="projects"
					active={modeToShow === 'projects'}
					className={styles.item}
					onClick={() => changeMode('projects')}
				>
					Recent Projects
				</Menu.Item>
				<Menu.Item
					name="worked-on"
					active={modeToShow === 'worked-on'}
					className={styles.item}
					onClick={() => changeMode('worked-on')}
				>
					Worked on
				</Menu.Item>
				<Menu.Item
					name="assigned"
					active={modeToShow === 'assigned'}
					className={styles.item}
					onClick={() => changeMode('assigned')}
				>
					Assigned to me
				</Menu.Item>
				<Menu.Item
					name="starred"
					active={modeToShow === 'starred'}
					className={styles.item}
					onClick={() => changeMode('starred')}
				>
					Starred
				</Menu.Item>
			</Menu>
		</div>
	);
};

export default ManagerWorkBlock;
