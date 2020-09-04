import React from 'react';
import { Table } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import UserAvatar from 'components/common/UserAvatar';
import Options, { ConfigItem } from 'components/common/Options';
import { Link, useHistory } from 'react-router-dom';

interface Props {
	filter: WebApi.Entities.Filter;
	updateFilter: (data: WebApi.Entities.Filter) => void;
	fullName: string;
}

const FilterItem: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const history = useHistory();
	const { filter, fullName } = props;
	const { id, name, owner, staredBy } = filter;

	const config: ConfigItem[] = [
		{
			id,
			text: 'Edit filter',
			onClickAction: () => {
				history.push(`/advancedSearch/${id}`);
			},
		},
		{
			id,
			text: 'Delete filter',
			onClickAction: () => {
				// will be handled in a separate task
				console.log('handle deletion');
			},
		},
	];

	return (
		<Table.Row key={id}>
			<Table.Cell className={styles.filterNameCell} children={<a href={`/advancedSearch/${id}`}>{name}</a>} />
			<Table.Cell
				className={styles.userCell}
				children={
					<>
						<UserAvatar user={owner as WebApi.Entities.UserProfile} small />
						<Link to={`/profile/${owner?.id}`}>{fullName}</Link>
					</>
				}
			/>
			<Table.Cell
				className={styles.favoriteCell}
				children={
					<>
						{staredBy?.length} {staredBy?.length === 1 ? t('person') : t('people_rating')}
					</>
				}
			/>
			<Table.Cell
				className={styles.optionsCell}
				children={<Options config={config} isBackgroundShown={false} />}
			/>
		</Table.Row>
	);
};

export default FilterItem;
