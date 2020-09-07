import React, { useState } from 'react';
import { Form, Modal, Popup, Image } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import TagsInput from 'components/common/TagsInput';
import IssueFileInput from 'components/IssueFileInput';
import { useDispatch } from 'react-redux';
import { updateIssue } from 'pages/IssuePage/logic/actions';
import styles from './styles.module.scss';
import { isImage } from 'helpers/isImage.helper';

interface Props {
	links: string[];
	attachments: string[];
	id: string;
}

const SmallEditForm: React.FC<Props> = ({ links: givenLinks, attachments: givenAttachments, id }) => {
	const { t } = useTranslation();
	const [links, setLinks] = useState<string[]>(givenLinks);
	const [attachments, setAttachments] = useState<File[]>([]);
	const [alreadyAttached, setAlreadyAttached] = useState<string[]>(givenAttachments);
	const [linksModalOpened, setLinksModalOpened] = useState<boolean>(false);
	const [filesModalOpened, setFilesModalOpened] = useState<boolean>(false);
	const dispatch = useDispatch();

	const update = (links: string[], fileLinks: string[], attachments: File[]) => {
		dispatch(updateIssue({ id, data: { attachments: fileLinks, links }, files: attachments }));
	};

	const onLinksChange = (links: string[]) => {
		setLinks(links);
		update(links, alreadyAttached, attachments);
	};

	const onAttachmentsChange = (attachmentLinks: string[]) => {
		setAlreadyAttached(attachmentLinks);
		update(links, attachmentLinks, attachments);
	};

	const onFilesChange = (files: File[]) => {
		setAttachments(files);
		update(links, alreadyAttached, files);
	};

	return (
		<Form style={{ marginBottom: 20 }}>
			<Form.Field>
				<h5 style={{ margin: 0 }}>{t('links')}</h5>
				<div style={{ marginTop: 10, marginBottom: 10 }}>
					{givenLinks && givenLinks.length
						? givenLinks.map((link, i) => (
								<a
									rel="noopener noreferrer"
									target="_blank"
									href={link}
									key={i}
									style={{ marginRight: 10 }}
								>
									{link}
								</a>
						  ))
						: t('no')}
				</div>
				<span onClick={() => setLinksModalOpened(true)} className={styles.spanButton}>
					{t('click_here_to_add_link')}
				</span>
				<Modal
					closeIcon
					closeOnDimmerClick
					closeOnEscape
					open={linksModalOpened}
					onClose={() => setLinksModalOpened(false)}
					size="small"
				>
					<Modal.Content>
						<div style={{ marginRight: 40 }}>
							<TagsInput
								placeholder={t('add_link')}
								tags={links}
								onChange={(tags) => onLinksChange(tags)}
							/>
						</div>
					</Modal.Content>
				</Modal>
			</Form.Field>
			<Form.Field>
				<h5 style={{ margin: 0 }}>{t('attachments')}</h5>
				<div style={{ marginTop: 10, marginBottom: 10 }}>
					{givenAttachments && givenAttachments.length
						? givenAttachments.map((link, i) => {
								const fname = link.slice(link.lastIndexOf('/') + 1);

								return (
									<Popup
										key={i}
										openOnTriggerMouseEnter
										closeOnPortalMouseLeave
										trigger={<span style={{ marginRight: 10 }}>{fname}</span>}
									>
										{isImage(fname) ? <Image src={link} alt="Image" /> : ''}
										<a href={link} download>
											{t('click_to_download')}
										</a>
									</Popup>
								);
						  })
						: t('no')}
				</div>
				<span onClick={() => setFilesModalOpened(true)} className={styles.spanButton}>
					{t('click_here_to_add_attachment')}
				</span>
				<Modal
					closeIcon
					closeOnDimmerClick
					closeOnEscape
					open={filesModalOpened}
					onClose={() => setFilesModalOpened(false)}
					size="small"
				>
					<Modal.Content>
						<div style={{ marginRight: 40 }}>
							<IssueFileInput
								onChange={(attachments: File[]) => onFilesChange(attachments)}
								alreadyAttached={alreadyAttached}
								currentFiles={attachments}
								onDeleteAlreadyAttached={(newFiles) => onAttachmentsChange(newFiles)}
							/>
						</div>
					</Modal.Content>
				</Modal>
			</Form.Field>
		</Form>
	);
};

export default SmallEditForm;
