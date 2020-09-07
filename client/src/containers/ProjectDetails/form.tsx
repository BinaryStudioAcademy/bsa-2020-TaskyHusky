import React, { useState, useEffect, RefObject } from 'react';
import { Form, TextArea, Button, Icon, Popup, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import * as actions from '../ProjectSettings/logic/actions';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from 'components/common/Input/CustomInput';
import SelectIcon from './selectIcon';
import { RootState } from 'typings/rootState';
import { startGettingKeys } from 'containers/CreateProjectModal/logic/actions';
import { validProjectKey, validProjectName } from 'helpers/validationRules';
import * as validationMessage from 'constants/ValidationMessages';
import { base64StringtoFile, extractImageFileExtensionFromBase64 } from 'helpers/canvas.helper';
import CropModal from 'components/CropModal';
import { Link } from 'react-router-dom';

interface Props {
	projectData: WebApi.Entities.Projects;
}

const ProjectForm = ({ projectData }: Props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { keys } = useSelector((rootState: RootState) => rootState.createProject);

	const [isIconsModalOpened, setIsIconsModalOpened] = useState<boolean>(false);
	const [uploadUrl, setUploadUrl] = useState<ArrayBuffer | string | null>('');
	const [imgSrcExt, setImgSrcExt] = useState<string | null>(null);
	const [newProjectAvatar, setNewProjectAvatar] = useState<File | null>(null);

	const closeModalIcon = () => {
		setIsIconsModalOpened(false);
	};
	const openModalIcon = () => {
		setIsIconsModalOpened(true);
	};

	const onCloseCrop = () => {
		setUploadUrl(null);
	};

	const uploadPhoto = async (e: any) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
			reader.onloadend = () => {
				const { result } = reader;
				setUploadUrl(result);
				setImgSrcExt(extractImageFileExtensionFromBase64(result as string));
			};
			closeModalIcon();
		}
	};

	const saveCrop = (imagePreviewCanvasRef: RefObject<HTMLCanvasElement>) => {
		if (uploadUrl) {
			const canvasRef = imagePreviewCanvasRef.current;
			if (canvasRef) {
				const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt);
				const myFilename = 'previewFile.' + imgSrcExt;
				const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
				setNewProjectAvatar(myNewCroppedFile);
			}
		}
	};

	const [project, setProject] = useState<WebApi.Entities.Projects>(projectData);
	const [isNameValid, setIsNameValid] = useState<boolean>(true);
	const [isKeyValid, setIsKeyValid] = useState<boolean>(true);
	const [isValidErrorShown, setIsValidErrorShown] = useState<boolean>(false);

	useEffect(() => {
		dispatch(startGettingKeys());
	}, [dispatch]);

	const projectUsers = project.users.map((user) => ({
		key: user.id,
		text: `${user.firstName} ${user.lastName}`,
		value: user.id,
	}));

	const onProjectChange = (field: string, value: string): void => {
		let result: WebApi.Entities.UserProfile | string | undefined = value;

		if (field === 'key') {
			result = value.trim().toUpperCase();
			const keyIndex = keys.findIndex((item: any) => item.key === result);

			if (keyIndex !== -1 && projectData.key !== result) {
				setIsValidErrorShown(true);
				setIsKeyValid(false);
			}
		}

		if (field === 'lead') {
			result = project.users.find((user) => user.id === value);
		}

		setProject((state) => ({
			...state,
			[field]: result,
		}));
	};

	const onSave = () => {
		if (!isNameValid || !isKeyValid) {
			setIsValidErrorShown(true);
			return;
		}
		if (newProjectAvatar) {
			dispatch(actions.requestUpdateProjectAvatar({ image: newProjectAvatar, id: project.id }));
		}
		dispatch(actions.startUpdatingProject({ project }));
	};

	const options = [
		{ key: 'm', text: t('unassigned'), value: 'unassigned' },
		{ key: 'f', text: t('project_lead'), value: 'projectLead' },
	];

	return (
		<div className={styles.form__container}>
			<Form>
				<Form.Field className={styles.form__input_key} required>
					<label className="standartLabel">{t('name')}</label>
					<CustomInput
						isValidErrorShown={isValidErrorShown}
						isDataValid={isNameValid}
						setIsDataValid={setIsNameValid}
						data={project.name}
						setData={(data) => onProjectChange('name', data)}
						placeholder="Enter project name"
						popUpContent={validationMessage.VM_PROJECT_NAME}
						validation={validProjectName}
						popUpPosition="bottom right"
					/>
				</Form.Field>
				<Form.Field className={styles.form__input_key} required>
					<label className="standartLabel">{t('key')}</label>
					<div className={styles.form__input_container}>
						<CustomInput
							isValidErrorShown={isValidErrorShown}
							isDataValid={isKeyValid}
							setIsDataValid={setIsKeyValid}
							data={project.key}
							setData={(data) => onProjectChange('key', data)}
							placeholder={t('example') + ': QA'}
							popUpContent={validationMessage.VM_PROJECT_KEY}
							validation={validProjectKey}
							popUpPosition="bottom left"
						/>
						<Popup
							trigger={<Icon name="info circle" className={styles.information__icon} size={'large'} />}
							position="bottom center"
							content={t('key_info')}
						/>
					</div>
				</Form.Field>
				<Form.Input
					className={styles.form__input}
					label="URL"
					type="text"
					placeholder={'https://www...'}
					onChange={(e) => onProjectChange('url', e.target.value)}
					value={project.url}
				/>
				<Form.Field className={styles.form__input}>
					<label className="standartLabel">{t('project_category')}</label>
					<div className={styles.form__input_container}>
						<input placeholder={t('category')} className="standartInput" disabled />
						<Popup
							trigger={<Icon name="info circle" className={styles.information__icon} size={'large'} />}
							position="bottom center"
							content={t('project_category_info')}
						/>
					</div>
				</Form.Field>
				<Form.Field required className={styles.form__input}>
					<label className="standartLabel">{t('avatar')}</label>
					<button type="button" className={styles.form__avatar}>
						<img className={styles.avatar__img} src={project.icon} alt="Project avatar" />
						<span className={styles.avatar__text} onClick={openModalIcon}>
							{t('select_image')}
						</span>
					</button>
					<SelectIcon
						onIconChange={onProjectChange}
						uploadPhoto={uploadPhoto}
						isIconsModalOpened={isIconsModalOpened}
						onClose={closeModalIcon}
					/>
				</Form.Field>
				<Form.Field className={styles.form__area}>
					<label className="standartLabel">{t('Description')}</label>
					<TextArea
						className={styles.project__description}
						placeholder={t('project_desc')}
						rows={'4'}
						onChange={(e, data) => onProjectChange('description', data.value?.toString() || '')}
						value={project.description}
					/>
				</Form.Field>
				<Form.Field className={styles.form__input}>
					<label className="standartLabel">{t('lead')}</label>
					<Dropdown
						className="standartSelect"
						placeholder={`${project.lead.firstName} ${project.lead.lastName}`}
						search
						selection
						options={projectUsers}
						onChange={(e, data) => onProjectChange('lead', data.value?.toString() || '')}
						value={project.lead.id}
					/>
				</Form.Field>
				<Form.Field className={styles.form__input}>
					<label className="standartLabel">{t('default_assignee')}</label>
					<div className={styles.form__input_container}>
						<Form.Select
							options={options}
							className="formSelect"
							placeholder={t('unassigned')}
							// className={styles.form__input_select}
						/>
						<Popup
							trigger={<Icon name="info circle" className={styles.information__icon} size={'large'} />}
							position="top center"
							content={t('default_assignee_desc')}
						/>
					</div>
				</Form.Field>
				<div>
					<Button as={Link} className={[styles.action_button, 'cancelBtn'].join(' ')} to="/projects">
						{t('cancel')}
					</Button>
					<Button className={['primaryBtn'].join(' ')} onClick={onSave}>
						{t('save_details')}
					</Button>
				</div>
			</Form>
			{uploadUrl && <CropModal uploadUrl={uploadUrl as string} onClose={onCloseCrop} saveCrop={saveCrop} />}
		</div>
	);
};

export default ProjectForm;
