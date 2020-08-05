import React, { useState } from 'react';
import { Table, Rating, Dropdown } from 'semantic-ui-react';
import styles from './styles.module.scss';
import Avatar from 'components/Avatar';

interface Props {
	filter: WebApi.Entities.Filter;
	updateFilter: (data: WebApi.Entities.Filter) => void;
}

const FilterItem = ({ updateFilter, filter }: Props) => {
	const { id, name, owner, staredBy } = filter;
	const [isStared, setIsStared] = useState(Boolean(staredBy?.find(({ id }) => owner?.id === id)));
	const getFullUserName = (user: WebApi.Entities.User | undefined): string => {
		if (!user) {
			return '';
		}
		const { firstName = '', lastName = '' } = user;
		return `${firstName} ${lastName}`;
	};
	const onSetFavorite = () => {
		const updated = isStared
			? staredBy?.filter(({ id }) => id !== owner?.id)
			: ([...(staredBy || []), owner] as WebApi.Entities.User[]);
		setIsStared(!isStared);
		updateFilter({
			...filter,
			staredBy: updated,
		});
	};
	return (
		<Table.Row key={id}>
			<Table.HeaderCell>
				<Rating onRate={onSetFavorite} icon="star" defaultRating={isStared ? 1 : 0} maxRating={1} />
			</Table.HeaderCell>
			<Table.HeaderCell>
				<a href={`/filter/${id}`} className={styles.underlinedLink}>
					{name}
				</a>
			</Table.HeaderCell>
			<Table.HeaderCell>
				<div className={styles.userCell}>
					<Avatar imgSrc={owner?.avatar || ''} fullName={`${getFullUserName(owner)}`} />
					<a href={`/profile/${owner?.id}`} className={styles.underlinedLink}>
						{getFullUserName(owner)}
					</a>
				</div>
			</Table.HeaderCell>
			<Table.HeaderCell>{staredBy?.length} person</Table.HeaderCell>
			<Table.HeaderCell className={styles.editCell}>
				<Dropdown className={styles.dropdown} compact fluid icon={null} text="...">
					<Dropdown.Menu>
						<Dropdown.Item text="Edit" />
						<Dropdown.Divider />
						<Dropdown.Item text="Share..." />
					</Dropdown.Menu>
				</Dropdown>
			</Table.HeaderCell>
		</Table.Row>
	);
};

export default FilterItem;
