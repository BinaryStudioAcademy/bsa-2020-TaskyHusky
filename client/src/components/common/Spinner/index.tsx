import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface Props {}

const Spinner = (props: Props) => {
	return (
		<Segment className={styles.container}>
			<Dimmer active inverted>
				<Loader size="large" inverted>
					Loading
				</Loader>
			</Dimmer>
		</Segment>
	);
};

export default Spinner;
