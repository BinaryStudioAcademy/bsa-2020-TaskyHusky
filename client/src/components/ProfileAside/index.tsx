import React from 'react';
import styles from './styles.module.scss';
import ProfilePicture from 'components/ProfilePicture';
import { Header, Segment, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ContentInput from 'components/ContentInput';

const ProfileAside = ({
	data: { user, isCurrentUser, mockData },
}: {
	data: { isCurrentUser: boolean; mockData: any; user: WebApi.User.UserModel };
}) => {
	return (
		<aside className={styles.userInfo}>
			<ProfilePicture
				user={{ avatar: user.avatar, fullName: user.fullName, username: user.username }}
				isCurrentUser={isCurrentUser}
			/>
			<Segment>
				<Container className={styles.infoBlock}>
					<Header as="h3" className={styles.infoBlock__header}>
						About
					</Header>
					{user.jobTitle ? (
						<>
							<div className={styles.infoBlock__item}>
								<Icon disabled name="briefcase" size="large" />
								<ContentInput
									isCurrentUser={isCurrentUser}
									contentData={{ text: user.jobTitle, defaultContent: false, name: 'jobTitle' }}
								></ContentInput>
							</div>
						</>
					) : isCurrentUser ? (
						<div className={styles.infoBlock__item}>
							<Icon disabled name="briefcase" size="large" />
							<ContentInput
								isCurrentUser={isCurrentUser}
								contentData={{ text: 'Your job title', defaultContent: true, name: 'jobTitle' }}
							/>
						</div>
					) : (
						''
					)}
					{user.department ? (
						<div className={styles.infoBlock__item}>
							<Icon disabled name="fork" size="large" />
							<ContentInput
								isCurrentUser={isCurrentUser}
								contentData={{ text: user.department, defaultContent: false, name: 'department' }}
							/>
						</div>
					) : isCurrentUser ? (
						<div className={styles.infoBlock__item}>
							<Icon disabled name="fork" size="large" />
							<ContentInput
								isCurrentUser={isCurrentUser}
								contentData={{ text: 'Your department', defaultContent: true, name: 'department' }}
							/>
						</div>
					) : (
						''
					)}
					{user.organization ? (
						<div className={styles.infoBlock__item}>
							<Icon disabled name="fax" size="large" />
							<ContentInput
								isCurrentUser={isCurrentUser}
								contentData={{ text: user.organization, defaultContent: false, name: 'organization' }}
							/>
						</div>
					) : isCurrentUser ? (
						<div className={styles.infoBlock__item}>
							<Icon disabled name="fax" size="large" />
							<ContentInput
								isCurrentUser={isCurrentUser}
								contentData={{ text: 'Your organization', defaultContent: true, name: 'organization' }}
							/>
						</div>
					) : (
						''
					)}
					{user.location ? (
						<div className={styles.infoBlock__item}>
							<Icon disabled name="map marker alternate" size="large" />
							<ContentInput
								isCurrentUser={isCurrentUser}
								contentData={{ text: user.location, defaultContent: false, name: 'location' }}
							/>
						</div>
					) : isCurrentUser ? (
						<div className={styles.infoBlock__item}>
							<Icon disabled name="map marker alternate" size="large" />
							<ContentInput
								isCurrentUser={isCurrentUser}
								contentData={{ text: 'Your location', defaultContent: true, name: 'location' }}
							/>
						</div>
					) : (
						''
					)}
				</Container>
				{user.email && (
					<>
						<Header as="h3" className={styles.infoBlock__header}>
							Contact
						</Header>
						{user.email ? (
							<div className={`${styles.infoBlock__item} ${styles.neverPoint}`}>
								<Icon disabled name="envelope outline" size="large" />
								<p className={styles.infoBlock__content}>{user.email}</p>
							</div>
						) : isCurrentUser ? (
							<div className={styles.infoBlock__item}>
								<Icon disabled name="envelope outline" size="large" />
								<p>Your location</p>
							</div>
						) : (
							''
						)}
					</>
				)}
				<Header as="h3" className={styles.infoBlock__header}>
					Teams
				</Header>
				{mockData.teams.map((item: any) => (
					<div key={item.id} className={`${styles.infoBlock__item} ${styles.pointer}`}>
						<div className={styles.infoBlock__groupIcon}>
							<Icon disabled name="group" size="small" />
						</div>
						<div>
							<p className={styles.infoBlock__content}>{item.name}</p>
							<p className={styles.infoBlock__content__secondary}>
								{item.members}
								{item.members === 1 ? ' member' : ' members'}
							</p>
						</div>
					</div>
				))}
				{isCurrentUser && (
					<div className={`${styles.infoBlock__item} ${styles.pointer}`}>
						<div className={styles.infoBlock__groupIcon__secondary}>
							<Icon disabled name="group" size="small" />
						</div>
						<p className={styles.infoBlock__content}>Start a team...</p>
					</div>
				)}
				<Link to="#" className={styles.policyLink}>
					View privacy policy
				</Link>
			</Segment>
		</aside>
	);
};

export default ProfileAside;
