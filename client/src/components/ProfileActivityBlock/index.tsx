import React, { useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import UserActivityItem from 'components/UserActivityItem';
import styles from './styles.module.scss';

interface Props {
	mockData: any;
	countItem: number;
	icon?: string;
	emptyContent?: {
		img: string;
		title: string;
		content: string;
	};
}

const ProfileProjectBlock: React.FC<Props> = (props: Props) => {
	const { mockData, countItem, emptyContent } = props;
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
			<article className={styles.container}>
				{mockData.length ? (
					<Accordion>
						{mockData.map(
							(item: any, index: number) =>
								index <= countItem - 1 && (
									<UserActivityItem item={item} icon={props.icon} key={item.id} />
								),
						)}
						{mockData.length > countItem && (
							<>
								<Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
									<input
										type="button"
										value={!showHidden ? 'view all' : 'hide'}
										className={styles.showBtn}
									/>
								</Accordion.Title>
								<Accordion.Content active={activeIndex !== 0}>
									{mockData.map(
										(item: any, index: number) =>
											index > countItem - 1 && (
												<UserActivityItem item={item} icon={props.icon} key={item.id} />
											),
									)}
								</Accordion.Content>
							</>
						)}
					</Accordion>
				) : (
					emptyContent && (
						<div className={styles.emptyCard}>
							<img className={styles.emptyCard__image} src={emptyContent.img} alt="icon" />
							<div className={styles.emptyCard__content}>
								<h3>{t(emptyContent.title)}</h3>
								<p>{t(emptyContent.content)}</p>
							</div>
						</div>
					)
				)}
			</article>
		</>
	);
};

export default ProfileProjectBlock;
