import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import { SortByProp, Sort } from 'containers/AdvancedSearch/IssueTable';
import { useTranslation } from 'react-i18next';

interface HeaderCellI {
	name: SortByProp;
	sort: Sort;
}

const HeaderCell = ({ name, sort }: HeaderCellI) => {
	const { t } = useTranslation();

	return (
		<>
			{name === 'type' || name === 'priority' ? (
				<Popup
					content={t(name)}
					trigger={
						<div style={{ paddingLeft: '6px' }}>
							{name[0].toUpperCase()}
							{sort[name] && (
								<Icon size="small" name={sort[name] === 'DESC' ? 'arrow down' : 'arrow up'} />
							)}
						</div>
					}
				/>
			) : (
				<div>
					{t(name)}
					{sort[name] && <Icon size="small" name={sort[name] === 'DESC' ? 'arrow down' : 'arrow up'} />}
				</div>
			)}
		</>
	);
};

export default HeaderCell;
