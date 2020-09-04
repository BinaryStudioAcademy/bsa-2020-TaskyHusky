import React, { MouseEvent, useState } from 'react';
import { Button, Modal, Search, SearchProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import ResultPeople from './ResultPeople';
import ChosenPeople from './ResultPeople/СhosenPeople';
import { useTranslation } from 'react-i18next';

type Props = {
	onClose: (arg: boolean) => void;
	onConfirm: (arg: WebApi.Entities.UserProfile[]) => void;
	search: (match: string) => void;
	clearStateAfterSelect: () => void;
	people: {
		name?: string;
		results: WebApi.Entities.UserProfile[];
	};
	searchLoading: boolean;
};

const TeamAddPeopleModal = ({ onConfirm, onClose, search, searchLoading, people, clearStateAfterSelect }: Props) => {
	const [chosenUsers, setChosenUser] = useState<WebApi.Entities.UserProfile[] | []>([]);
	const [searchText, setSearchText] = useState<string | undefined>('');

	const { t } = useTranslation();

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
		return <div> {t('no_results_found')}</div>;
	};

	const onChosenField = (e: React.SyntheticEvent, data: any) => {
		const { data: user } = data.result;
		setChosenUser([...chosenUsers, user]);
		clearStateAfterSelect();
		setSearchText('');
	};

	const handlerAccept = () => {
		if (chosenUsers.length > 0) {
			onConfirm(chosenUsers);
		}
		onClose(false);
	};

	return (
		<Modal onClose={() => onClose(false)} dimmer="inverted" open size="small">
			<Modal.Header>{t('add_teammates')}</Modal.Header>
			<Modal.Content>
				{chosenUsers.length > 0 && <ChosenPeople users={chosenUsers} />}
				<Search
					disabled={chosenUsers.length >= 4}
					input={{ icon: 'search', iconPosition: 'left' }}
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
				<p className={styles.descriptionP}>{t('no_more_4_people_can_ba_added')}</p>
			</Modal.Content>
			<Modal.Actions>
				<Button
					content={t('accept')}
					className={styles.editBtn}
					labelPosition="left"
					icon="checkmark"
					onClick={handlerAccept}
				/>
				<Button className={styles.cancelBtn} onClick={() => onClose(false)}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default TeamAddPeopleModal;
