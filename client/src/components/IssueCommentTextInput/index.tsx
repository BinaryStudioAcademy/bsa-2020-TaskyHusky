import React from 'react';
import { Form, Popup, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
	text: string;
	setText: (value: string) => void;
	popupOpen: boolean;
	setPopupOpen: (value: boolean) => void;
	userOptions: {
		key: string | number;
		value: any;
		text: string | JSX.Element | JSX.Element[];
	}[];
}

const IssueCommentTextInput: React.FC<Props> = ({ text, setText, popupOpen, setPopupOpen, userOptions }) => {
	const { t } = useTranslation();

	return (
		<Popup
			trigger={
				<Form.Input
					fluid
					placeholder={t('enter_comment_text')}
					onChange={(event, data) => {
						if (popupOpen && data.value[data.value.length - 1] !== '@') {
							setPopupOpen(false);
						}

						setText(data.value);
					}}
					onKeyUp={(event: React.KeyboardEvent) => {
						if (event.key === 'Enter' && popupOpen) {
							event.preventDefault();
						}

						if (event.key === '@') {
							setPopupOpen(true);
						}
					}}
					value={text}
				/>
			}
			content={
				<Dropdown
					selection
					options={userOptions}
					open
					search={(options, query) =>
						options.filter((opt) => (opt.text as string).toLowerCase().includes(query.toLowerCase()))
					}
					onChange={(event, data) => {
						const index: number = text.lastIndexOf('@');
						setPopupOpen(false);

						if (data.value) {
							setText(
								text.substring(0, index + 1) +
									data.value +
									'>' +
									text.substring(index + 1, text.length),
							);
						}
					}}
				/>
			}
			position="top center"
			open={popupOpen}
			closeOnTriggerMouseLeave
		/>
	);
};

export default IssueCommentTextInput;
