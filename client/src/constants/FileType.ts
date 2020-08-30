import i18next from 'i18next';

export const IMAGE_EXTNAMES = ['.png', '.jpg', '.bmp', '.jpeg', '.gif'];

export const ALLOWED_ISSUE_ATTACHMENT_MIME_TYPES = [
	'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'image/png',
	'image/jpeg',
	'image/bmp',
	'image/jpg',
	'image/gif',
	'text/plain',
	'text/csv',
];

export const ALLOWED_ISSUE_ATTACHMENT_EXTNAMES = '.png, .jpg, .jpeg, .bmp, .gif, .docx, .pptx, .xlsx, .txt';

export const ALLOWED_ISSUE_ATTACHMENT_EXTNAMES_HR = () =>
	`.png, .jpg, .jpeg, .bmp, .gif, .docx, .pptx, .xlsx ${i18next.t('and')} .txt`;
