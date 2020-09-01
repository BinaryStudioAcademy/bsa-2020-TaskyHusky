import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useBoardColumnContext } from './logic/context';

export interface Props {
	boardId: string;
	children: JSX.Element;
	onClose?: (data: WebApi.Board.CreateBoardColumn) => void;
}

const Body: React.FC<Props> = ({ boardId, children, onClose = () => {} }) => {
	const { t } = useTranslation();
	const context = useBoardColumnContext();
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const curryOpen = (isOpened: boolean) => () => {
		setIsModalOpened(isOpened);
	};

	return (
		<Modal
			onOpen={curryOpen(true)}
			onClose={curryOpen(false)}
			trigger={children}
			openOnTriggerClick
			closeOnDimmerClick
			closeOnEscape
			closeIcon
			as="form"
			size="tiny"
			dimmer="inverted"
			open={isModalOpened}
		>
			<Modal.Header>{t('create_column')}</Modal.Header>
			<Modal.Content scrolling>
				<Form>
					<Form.Field>
						<label className="required">{t('name')}</label>
						<Form.Input
							placeholder={t('name')}
							fluid
							icon="users"
							value={context.data.columnName}
							onChange={(event, data) => context.set('columnName', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('status')}</label>
						<Form.Input
							placeholder={t('status')}
							fluid
							icon="tag"
							value={context.data.status}
							onChange={(event, data) => context.set('status', data.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('is_resolution_set')}</label>
						<Form.Checkbox
							onChange={(event, data) => context.set('isResolutionSet', data.checked)}
							toggle
							checked={context.data.isResolutionSet}
							label={t('is_resolution_set')}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button className="primaryBtn" onClick={curryOpen(true)}>
					{t('submit')}
				</Button>
				<Button className="cancelBtn" compact onClick={curryOpen(false)}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default Body;
