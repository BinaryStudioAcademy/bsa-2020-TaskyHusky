import React, { useEffect, useRef, useCallback } from 'react';
import styles from './styles.module.scss';
import Avatar from 'components/Avatar';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import Spinner from 'components/common/Spinner';
import { getBgColor } from './helper';

const ModalViewProfile = ({ user, onClose }: any) => {
	const header = useRef<any>(null);
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		header.current.style.backgroundColor = getBgColor();
	}, []);
	return (
		<>
			<div className={styles.block_wrapper} onMouseLeave={(e) => onClose(e)}>
				{!user.id ? (
					<Spinner />
				) : (
					<>
						<div className={styles.header} id="bg" ref={header}>
							<div className={styles.left_margin}></div>
							<div className={styles.name}>
								<span>{user.name}</span>
								<span>{user.position}</span>
							</div>
						</div>
						<div className={styles.avatar}>
							<Link to={`/profile/${user.id}`}>
								<Avatar fullName={user.name} imgSrc={user.avatar} />
							</Link>
						</div>
						<div className={styles.main_info}>
							<div className={styles.left_margin}></div>
							<div className={styles.details}>
								<span>
									<Icon name="at" size="small" color="grey" />
									{user.email}
								</span>
								<span>
									<Icon name="clock outline" size="small" color="grey" />
									{user.timezone}
								</span>
								<span>
									<Icon name="map signs" size="small" color="grey" />
									{user.location}
								</span>
								<Link to={`/profile/${user.id}`}>
									<Button primary className={styles.view}>
										View profile
									</Button>
								</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default ModalViewProfile;
