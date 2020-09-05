import React from 'react';
import { useTranslation } from 'react-i18next';
import ProfileActivityBlock from 'components/ProfileActivityBlock';
import IssueActivityItem from 'components/IssueActivityItem';

type Props = {
	issues?: WebApi.Entities.Issue[];
	projectLength: number;
};

const TeamActivity: React.FC<Props> = ({ issues, projectLength }: Props) => {
	const { t } = useTranslation();
	const emptyActivityCard = {
		img:
			'https://jira-frontend-static.prod.public.atl-paas.net/assets/WorkListEmpty.4f661661cc7870531cec33801ddb8b45.8.svg',
		title: 'no_work',
		content: 'content_no_work',
	};
	const count = 3;
	return (
		<>
			{(Boolean(issues?.length) || !projectLength) && <h3 className="managerHeader">{t('worked_on')}</h3>}
			<ProfileActivityBlock
				data={issues ?? []}
				countItem={count}
				component={IssueActivityItem}
				emptyContent={emptyActivityCard}
				showEmpty={true}
			/>
		</>
	);
};

export default TeamActivity;
