import React, { MouseEvent, useState } from 'react';
import { Button, Modal, Search, SearchProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import ResultPeople from './ResultPeople';
import ChosenPeople from './ResultPeople/chosenPeople';
// import debounce from 'lodash-es/debounce';

type Props = {
	onClose: (arg: boolean) => void;
	search: (match: string) => void;
	clearStateAfterSelect: () => void;
	people: {
		name?: string;
		results: WebApi.Entities.UserProfile[];
	};
	searchLoading: boolean;
};

const TeamAddPeopleModal = ({ onClose, search, searchLoading, people, clearStateAfterSelect }: Props) => {
	const [chosenUsers, setChosenUser] = useState<WebApi.Entities.UserProfile[] | []>([]);
	const [searchText, setSearchText] = useState<string | undefined>('');

	const handlerChange = (e: MouseEvent<HTMLElement>, { value }: SearchProps): void => {
		if (chosenUsers.length >= 4) {
			return;
		}

		setSearchText(value);
		if (value) {
			search(value);
		}
	};

	const resultRender = (value: any): React.ReactElement => {
		if (value.data) {
			const { firstName, lastName, id, email, avatar } = value.data as WebApi.Entities.UserProfile;
			const isFoundUserExist = chosenUsers.find((el: WebApi.Entities.UserProfile) => el.id === id);
			if (!isFoundUserExist) {
				return <ResultPeople id={id} firstName={firstName} lastName={lastName} email={email} avatar={avatar} />;
			}
		}
		return <div> No results found </div>;
	};

	const onChosenField = (e: React.SyntheticEvent, data: any) => {
		const { data: user } = data.result;
		setChosenUser([...chosenUsers, user]);
		clearStateAfterSelect();
		setSearchText('');
	};

	return (
		<Modal onClose={() => onClose(false)} open size="small">
			<Modal.Header>Add teammates</Modal.Header>
			<Modal.Content>
				{chosenUsers.length > 0 && <ChosenPeople users={chosenUsers} />}
				<Search
					disabled={chosenUsers.length >= 4}
					input={{ icon: 'search', iconPosition: 'left', fluid: true }}
					onSearchChange={handlerChange}
					loading={searchLoading}
					className={styles.field}
					size="large"
					results={people.results}
					resultRenderer={resultRender}
					onResultSelect={onChosenField}
					minCharacters={2}
					value={searchText}
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
