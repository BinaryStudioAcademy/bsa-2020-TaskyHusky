import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import { SortByProp, Sort } from 'containers/AdvancedSearch/IssueTable';
import { useTranslation } from 'react-i18next';

interface HeaderCellI {
	name: SortByProp;
	popup?: boolean;
	text?: string;
	sort: Sort;
}

const HeaderCell = ({ name, popup, text, sort }: HeaderCellI) => {
	const { t } = useTranslation();

	return (
		<>
			{popup ? (
				<Popup
					content={t(name)}
					trigger={
						<div style={{ paddingLeft: '6px' }}>
							{text}
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
