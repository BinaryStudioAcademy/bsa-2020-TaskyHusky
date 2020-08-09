import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

export type BreadcrumbItem = {
	key: string;
	content: string;
	link?: boolean;
	active?: boolean;
	onClickAction?: () => void;
};

interface Params {
	sections: BreadcrumbItem[];
}

const Breadcrumbs = ({ sections }: Params) => <Breadcrumb divider="&nbsp;/&nbsp;" sections={sections} />;

export default Breadcrumbs;
