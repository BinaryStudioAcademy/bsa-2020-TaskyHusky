import React, { MouseEvent } from 'react';
import { Button, Modal, Search, SearchProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import ResultPeople from './ResultPeople';
import debounce from 'lodash-es/debounce';

type Props = {
	onClose: (arg: boolean) => void;
	search: (match: string) => void;
	people: {
		name?: string;
		results: WebApi.Entities.UserProfile[];
	};
	searchLoading: boolean;
};

const TeamAddPeopleModal = ({ onClose, search, searchLoading, people }: Props) => {
	const handlerChange = (e: MouseEvent<HTMLElement>, { value }: SearchProps): void => {
		if (value) {
			search(value);
		}
	};

	const resultRender = (value: any): React.ReactElement => {
		if (value.data) {
			const { firstName, lastName, id, email, avatar } = value.data as WebApi.Entities.UserProfile;
			return <ResultPeople id={id} firstName={firstName} lastName={lastName} email={email} avatar={avatar} />;
		}
		return <div> No results found </div>;
	};

	const onChosenField = (e: React.SyntheticEvent, data: any) => {
		const { data: user } = data.result;
		console.log(user);
	};
	return (
		<Modal onClose={() => onClose(false)} open size="small">
			<Modal.Header>Add teammates</Modal.Header>
			<Modal.Content>
				<Search
					input={{ icon: 'search', iconPosition: 'left', fluid: true }}
					onSearchChange={debounce(handlerChange, 800, { maxWait: 5000 })}
					loading={searchLoading}
					className={styles.field}
					size="large"
					results={people.results}
					resultRenderer={resultRender}
					onResultSelect={onChosenField}
					minCharacters={2}
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
