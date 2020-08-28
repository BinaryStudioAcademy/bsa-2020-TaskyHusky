import React from 'react';
import FileInput from 'components/common/FileInput';
import styles from './styles.module.scss';
import { attachFile } from 'services/issue.service';
import { Label, Icon, Button } from 'semantic-ui-react';
import { FileDrop } from 'react-file-drop';
import { getFnameByLink } from 'helpers/getFnameByLink';

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

	const upload = async (newFileList: FileList): Promise<string[]> => {
		return await Promise.all(Array.from(newFileList).map((file) => attachFile(file, issueKey)));
	};

	const handleUpload = (newFileList: FileList | null) => {
		if (newFileList) {
			onChangePending(true);

			upload(newFileList).then((newLinks) => {
				onChangePending(false);
				onChange([...currentLinks, ...newLinks]);
			});
		}
	};

	return (
		<FileDrop
			targetClassName={styles.button}
			draggingOverTargetClassName={styles.dragOverButton}
			onDrop={handleUpload}
		>
			<div className={styles.smallText}>
				.png, .jpg, .jpeg, .bmp, .docx, .pptx, .xlsx and .txt files are available
			</div>
			<div className={styles.controlsContainer}>
				<div>Drag&apos;n&apos;drop files here</div>
				<div className={styles.smallText} style={{ marginRight: 15, marginLeft: 15 }}>
					or
				</div>
				<FileInput
					attributes={{ accept: '.png, .jpg, .jpeg, .bmp, .docx, .pptx, .xlsx, .txt', multiple: true }}
					onChange={handleUpload}
				>
					<Button secondary compact style={{ marginTop: 5, marginBottom: 5 }} type="button">
						Click to browse
					</Button>
				</FileInput>
			</div>
			<div className={styles.smallText}>
				{currentLinks.map((link, i) => (
					<Label key={i}>
						<a href={link} target="_blank" rel="noopener noreferrer">
							{getFnameByLink(link)}
						</a>
						<Icon
							name="delete"
							link
							onClick={() => {
								const index = currentLinks.findIndex((linkToCheck) => linkToCheck === link);
								const newLinks = [...currentLinks];
								newLinks.splice(index, 1);
								onChange(newLinks);
							}}
						/>
					</Label>
				))}
			</div>
		</FileDrop>
	);
};

export default IssueFileInput;
