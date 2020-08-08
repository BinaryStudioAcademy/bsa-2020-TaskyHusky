import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {}

const Spinner = (props: Props) => {
	const { t } = useTranslation();

	return (
		<Segment className={styles.container}>
			<Dimmer active inverted>
				<Loader size="large" inverted>
					{t('loading')}
				</Loader>
			</Dimmer>
		</Segment>
	);
};

export default Spinner;
