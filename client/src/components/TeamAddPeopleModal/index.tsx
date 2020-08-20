import React, { MouseEvent } from 'react';
import { Button, Modal, Search, SearchProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import debounce from 'lodash-es/debounce';

type Props = {
	onClose: (arg: boolean) => void;
	search: (match: string) => void;
	people: WebApi.Entities.UserProfile[];
	searchLoading: boolean;
};

const TeamAddPeopleModal = ({ onClose, search, searchLoading, people = [] }: Props) => {
	const handlerChange = (e: MouseEvent<HTMLElement>, { value }: SearchProps): void => {
		if (value) {
			search(value);
		}
	};
	return (
		<Modal onClose={() => onClose(false)} open size="small">
			<Modal.Header>Add teammates</Modal.Header>
			<Modal.Content>
				<Search
					category
					onSearchChange={debounce(handlerChange, 600, { maxWait: 1000 })}
					loading={searchLoading}
					size="large"
					input={{ fluid: true, placeholder: 'Start entering name or email' }}
				/>
				<p className={styles.description_p}>No more than 10 people can be invited at the same time.</p>
			</Modal.Content>
			<Modal.Actions>
				<Button content="Accept" primary labelPosition="left" icon="checkmark" onClick={() => onClose(false)} />
				<Button color="grey" onClick={() => onClose(false)}>
					Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default TeamAddPeopleModal;
