import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { ColorResult, SliderPicker } from 'react-color';
//@ts-ignore
import contrast from 'get-contrast';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import Label from 'components/common/Label';

const AddLabelModal: React.FC = () => {
	const { isLoading, isEditMode, editLabel } = useSelector((rootState: RootState) => rootState.projectLabel);
	const { project } = useSelector((rootState: RootState) => rootState.project);

	const dispatch = useDispatch();
	const { t } = useTranslation();

	const alternativeTextColor = '#ffffff';
	const mainTextColor = '#000000';
	const defaultBackgroundColor = '#ebbd34';

	const [text, setText] = useState<string>(editLabel?.text || '');
	const [backgroundColor, setBackgroundColor] = useState<string>(
		editLabel?.backgroundColor || defaultBackgroundColor,
	);
	const [textColor, setTextColor] = useState<string>(mainTextColor);

	const onLabelTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setText(event.target.value);
	};

	const onLabelColorChange = (color: ColorResult): void => {
		const checkedColor = color.hex;
		setBackgroundColor(checkedColor);

		const isAccessibleColor = contrast.isAccessible(checkedColor, mainTextColor);
		if (!isAccessibleColor) {
			setTextColor(alternativeTextColor);
			return;
		}
		setTextColor(mainTextColor);
	};

	const onAddLabel = (): void => {
		if (text === '') {
			return;
		}

		dispatch(
			actions.startAddingLabel({
				project,
				label: { text, textColor, backgroundColor },
			}),
		);
	};

	const onEditLabel = (): void => {
		dispatch(
			actions.startUpdatingLabel({
				project,
				label: { ...editLabel, text, textColor, backgroundColor },
			}),
		);
	};

	const onModalClose = () => {
		dispatch(actions.closeModal());
	};

	return (
		<>
			<Modal dimmer="inverted" size={'mini'} open={true} onClose={onModalClose}>
				<Modal.Header>{t('add_label')}</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<label>{t('label_text')}</label>
							<Input onChange={onLabelTextChange} value={text} placeholder="Type text" />
						</Form.Field>
						<Form.Field>
							<label>{t('label_pick_color')}</label>
							<SliderPicker color={backgroundColor} onChange={onLabelColorChange} />
						</Form.Field>
						<Form.Field>
							<label>
								<span className={styles.label__example_title}>{t('result')}</span>
								<Label backgroundColor={backgroundColor} text={text} textColor={textColor} />
							</label>
						</Form.Field>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={onModalClose}>{t('cancel')}</Button>
					<>
						{!isEditMode ? (
							<Button className={styles.primary__button} onClick={onAddLabel} loading={isLoading}>
								{t('add')}
							</Button>
						) : (
							<Button className={styles.primary__button} onClick={onEditLabel} loading={isLoading}>
								{t('edit')}
							</Button>
						)}
					</>
				</Modal.Actions>
			</Modal>
		</>
	);
};

export default AddLabelModal;
