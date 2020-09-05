import React, { useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface Props {
	data: Array<WebApi.Entities.Projects | WebApi.Entities.UserProfile | any>;
	component: React.ComponentType<any>;
	countItem: number;
	emptyContent?: {
		img: string;
		title: string;
		content: string;
	};
	showEmpty: boolean;
}

const ProfileActivityBlock: React.FC<Props> = (props: Props) => {
	const { data, countItem, emptyContent, component: Component, showEmpty } = props;
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [showHidden, setShowHidden] = useState<boolean>(false);
	const handleClick = (e: any, titleProps: any) => {
		const { index } = titleProps;
		const newIndex = activeIndex === index ? -1 : index;
		setActiveIndex(newIndex);
		setShowHidden(!showHidden);
	};

	return (
		<>
			<article>
				{data.length ? (
					<Accordion>
						{data.map(
							(item: any, index: number) =>
								index <= countItem - 1 && <Component item={item} key={item.id} />,
						)}
						{data.length > countItem && (
							<>
								<Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
									<input
										type="button"
										value={showHidden ? (t('hide') as string) : (t('view_all') as string)}
										className={styles.showBtn}
									/>
								</Accordion.Title>
								<Accordion.Content active={activeIndex !== 0}>
									{data.map(
										(item: any, index: number) =>
											index > countItem - 1 && <Component item={item} key={item.id} />,
									)}
								</Accordion.Content>
							</>
						)}
					</Accordion>
				) : (
					showEmpty &&
					emptyContent && (
						<div className="emptyCard">
							<img className={styles.image} src={emptyContent.img} alt="icon" />
							<div>
								<h3 className={styles.title}>{t(emptyContent.title)}</h3>
								<p className={styles.text}>{t(emptyContent.content)}</p>
							</div>
						</div>
					)
				)}
			</article>
		</>
	);
};

export default ProfileActivityBlock;
