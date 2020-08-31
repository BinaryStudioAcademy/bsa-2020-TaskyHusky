import React from 'react';
import FileInput from 'components/common/FileInput';
import styles from './styles.module.scss';
import { Label, Icon, Button } from 'semantic-ui-react';
import { FileDrop } from 'react-file-drop';

import {
	ALLOWED_ISSUE_ATTACHMENT_MIME_TYPES,
	ALLOWED_ISSUE_ATTACHMENT_EXTNAMES,
	ALLOWED_ISSUE_ATTACHMENT_EXTNAMES_HR,
} from 'constants/FileType';

import { useTranslation } from 'react-i18next';
import { getFnameByLink } from 'helpers/getFnameByLink';

interface Props {
	currentFiles?: File[];
	alreadyAttached?: string[];
	onChange?: (newFiles: File[]) => void;
	onDeleteAlreadyAttached?: (newLinks: string[]) => void;
}

const IssueFileInput: React.FC<Props> = ({
	onChange = () => {},
	currentFiles: givenCurrentFiles,
	alreadyAttached = [],
	onDeleteAlreadyAttached = () => {},
}) => {
	const currentFiles = givenCurrentFiles ?? [];
	const { t } = useTranslation();

	const handleChange = (newFileList: FileList | null) => {
		if (newFileList) {
			onChange([
				...currentFiles,
				...Array.from(newFileList).filter((file) => ALLOWED_ISSUE_ATTACHMENT_MIME_TYPES.includes(file.type)),
			]);
		}
	};

	const curryDeleteFile = (index: number) => () => {
		const newFiles = [...currentFiles];
		newFiles.splice(index, 1);
		onChange(newFiles);
	};

	const curryDeleteLink = (index: number) => () => {
		const newLinks = [...alreadyAttached];
		newLinks.splice(index, 1);
		onDeleteAlreadyAttached(newLinks);
	};

	return (
		<FileDrop
			targetClassName={styles.button}
			draggingOverTargetClassName={styles.dragOverButton}
			onDrop={handleChange}
		>
			<div className={styles.smallText}>
				{ALLOWED_ISSUE_ATTACHMENT_EXTNAMES_HR()} {t('files_are_available')}
			</div>
			<div className={styles.controlsContainer}>
				<div>{t('drag_n_drop_files_here')}</div>
				<div className={styles.smallText} style={{ marginRight: 15, marginLeft: 15 }}>
					{t('or')}
				</div>
				<FileInput
					attributes={{ accept: ALLOWED_ISSUE_ATTACHMENT_EXTNAMES, multiple: true }}
					onChange={handleChange}
				>
					<Button secondary compact style={{ marginTop: 5, marginBottom: 5 }} type="button">
						{t('click_to_browse')}
					</Button>
				</FileInput>
			</div>
			<div className={styles.smallText}>
				{alreadyAttached.map((link, i) => (
					<Label key={i}>
						{getFnameByLink(link)}
						<Icon name="delete" link onClick={curryDeleteLink(i)} />
					</Label>
				))}
				{currentFiles.map((file, i) => (
					<Label key={i}>
						{file.name}
						<Icon name="delete" link onClick={curryDeleteFile(i)} />
					</Label>
				))}
			</div>
		</FileDrop>
	);
};

export default IssueFileInput;
