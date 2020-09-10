import React from 'react';
import { ActivityIssue } from 'containers/WorkPage/logic/state';
import WorkOnCard from 'components/WorkOnCard';
import { useTranslation } from 'react-i18next';
import EmptyCard from 'components/common/EmptyCard';

interface Props {
	activityIssues: Array<ActivityIssue>;
}

const WorkOnBlock: React.FC<Props> = (props: Props) => {
	const { activityIssues } = props;
	const { t } = useTranslation();
	return (
		<>
			{Boolean(activityIssues.length) ? (
				<div className={'workBlock'}>
					{activityIssues.map((item) => (
						<WorkOnCard key={item.id} issue={item} />
					))}
				</div>
			) : (
				<EmptyCard content={t('you_do_not_have_activity')} />
			)}
		</>
	);
};

export default WorkOnBlock;
