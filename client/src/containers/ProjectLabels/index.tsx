import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import AddLabelModal from './AddLabelModal';
import * as actions from './logic/actions';
import styles from './styles.module.scss';
import Label from 'components/common/Label';
import ConfirmModal from 'components/common/ConfirmModal';
import emptyList from 'assets/images/search-result.svg';

interface Props {}

const ProjectLabels = (props: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { isModalOpen, labelDeletingId } = useSelector((rootState: RootState) => rootState.projectLabel);
	const { project } = useSelector((rootState: RootState) => rootState.project);
	const { labels, id: projectId } = project;

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
	const [labelId, setLabelId] = useState<string>('');

	const onOpenAddLabelModal = (): void => {
		dispatch(actions.openModal());
	};

	const onOpenEditLabelModal = (editLabel: WebApi.Entities.ProjectLabel): void => {
		dispatch(actions.openEditModal({ editLabel }));
	};

	const confirmDeleting = () => {
		setIsConfirmModalOpen(false);
		dispatch(
			actions.startDeletingLabel({
				projectId,
				labelId,
			}),
		);
	};

	const onDeleteLabel = (labelId: string): void => {
		setLabelId(labelId);
		setIsConfirmModalOpen(true);
	};

	return (
		<>
			<div className={styles.body_inner__container}>
				<div className={styles.header_inner__container}>
					<h1 className={styles.header_inner__title}>{t('labels')}</h1>
				</div>
				{labels.length === 0 ? (
					<div className={styles.imgWrapper}>
						<div className={styles.content}>
							<img className={styles.img} src={emptyList} alt="No people" />
							<span className={styles.text}>{t('no_label')}</span>
						</div>
					</div>
				) : (
					<>
						<ul className={styles.label__list}>
							{labels.map((label) => (
								<li key={label.id} className={styles.label__list_item}>
									<Label
										backgroundColor={label.backgroundColor}
										text={label.text}
										textColor={label.textColor}
									/>
									<span className={styles.labels__list_actions}>
										<Button
											className={styles.button__edit_action}
											onClick={() => onOpenEditLabelModal(label)}
										>
											<Icon name="edit" />
										</Button>
										<Button
											className={styles.button__delete_action}
											onClick={() => onDeleteLabel(label.id)}
											loading={labelDeletingId === label.id}
										>
											<Icon name="trash alternate" />
										</Button>
									</span>
								</li>
							))}
						</ul>
					</>
				)}
				<Button className={['primaryBtn', styles.button__add_action].join(' ')} onClick={onOpenAddLabelModal}>
					{t('add_label')}
				</Button>
			</div>
			{isModalOpen && <AddLabelModal />}
			{isConfirmModalOpen && (
				<ConfirmModal
					isOpened={isConfirmModalOpen}
					setIsOpened={setIsConfirmModalOpen}
					confirmAction={confirmDeleting}
					header={t('delete_label')}
					content={t('delete_label_confirm')}
				/>
			)}
		</>
	);
};

export default ProjectLabels;
