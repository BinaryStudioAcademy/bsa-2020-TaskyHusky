import React from 'react';
import FileInput from 'components/common/FileInput';
import styles from './styles.module.scss';
import { attachFile } from 'services/issue.service';
import { Label, Icon, Button } from 'semantic-ui-react';
import { FileDrop } from 'react-file-drop';
import { getFnameByLink } from 'helpers/getFnameByLink';

import {
	ALLOWED_ISSUE_ATTACHMENT_MIME_TYPES,
	ALLOWED_ISSUE_ATTACHMENT_EXTNAMES,
	ALLOWED_ISSUE_ATTACHMENT_EXTNAMES_HR,
} from 'constants/FileType';

import { useTranslation } from 'react-i18next';

interface Props {
	onChangePending?: (pending: boolean) => void;
	onChange?: (newLinks: string[]) => void;
	currentLinks?: string[];
	issueKey: string;
}

const IssueFileInput: React.FC<Props> = ({
	onChange = () => {},
	onChangePending = () => {},
	currentLinks: givenCurrentLinks,
	issueKey,
}) => {
	const currentLinks = givenCurrentLinks ?? [];
	const { t } = useTranslation();

	const upload = async (newFileList: File[]): Promise<string[]> => {
		return await Promise.all(newFileList.map((file) => attachFile(file, issueKey)));
	};

	const handleUpload = (newFileList: FileList | null) => {
		if (newFileList) {
			onChangePending(true);

			upload(
				Array.from(newFileList).filter((file) => ALLOWED_ISSUE_ATTACHMENT_MIME_TYPES.includes(file.type)),
			).then((newLinks) => {
				onChangePending(false);
				onChange([...currentLinks, ...newLinks]);
			});
		}
	};

	const curryDeleteLink = (currentLink: string) => () => {
		const index = currentLinks.findIndex((linkToCheck) => linkToCheck === currentLink);
		const newLinks = [...currentLinks];
		newLinks.splice(index, 1);
		onChange(newLinks);
	};

	return (
		<FileDrop
			targetClassName={styles.button}
			draggingOverTargetClassName={styles.dragOverButton}
			onDrop={handleUpload}
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
					onChange={handleUpload}
				>
					<Button secondary compact style={{ marginTop: 5, marginBottom: 5 }} type="button">
						{t('click_to_browse')}
					</Button>
				</FileInput>
			</div>
			<div className={styles.smallText}>
				{currentLinks.map((link, i) => (
					<Label key={i}>
						<a href={link} target="_blank" rel="noopener noreferrer">
							{getFnameByLink(link)}
						</a>
						<Icon name="delete" link onClick={curryDeleteLink(link)} />
					</Label>
				))}
			</div>
		</FileDrop>
	);
};

export default IssueFileInput;
