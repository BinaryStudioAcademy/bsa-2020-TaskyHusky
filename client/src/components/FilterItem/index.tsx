import React, { useState } from 'react';
import { Table, Rating } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import UserAvatar from 'components/common/UserAvatar';
import Options, { ConfigItem } from 'components/common/Options';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from 'typings/rootState';
import { useSelector } from 'react-redux';

interface Props {
	filter: WebApi.Entities.Filter;
	updateFilter: (data: WebApi.Entities.Filter) => void;
	fullName: string;
}

const FilterItem: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const history = useHistory();

	const { user } = useSelector((rootState: RootState) => rootState.auth);
	const { filter, fullName, updateFilter } = props;

	const { id, name, owner, staredBy } = filter;

	const [sratedByCount, setSratedByCount] = useState<number>(staredBy?.length || 0);
	const [isStared, setIsStared] = useState(Boolean(staredBy?.find(({ id }) => user?.id === id)));

	const onSetFavorite = () => {
		const updated = isStared
			? staredBy?.filter(({ id }) => id !== owner?.id)
			: ([...(staredBy || []), owner] as WebApi.Entities.UserProfile[]);
		setIsStared(!isStared);
		updateFilter({
			...filter,
			staredBy: updated,
		});
		const inc = isStared ? -1 : 1;
		setSratedByCount(sratedByCount + inc);
	};

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
			<Table.Cell
				className={styles.starCell}
				children={<Rating onRate={onSetFavorite} icon="star" defaultRating={isStared ? 1 : 0} maxRating={1} />}
			/>
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
						{sratedByCount} {sratedByCount === 1 ? t('person') : t('people_rating')}
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
