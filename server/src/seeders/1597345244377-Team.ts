import { MigrationInterface, QueryRunner, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserProfile } from '../entity/UserProfile';
import { TeamRepository } from '../repositories/teams.repository';

export class Team1597345244377 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		const teamRepository = getCustomRepository(TeamRepository);

		const teamPromises = await [
			{
				id: 'Quality Engineer',
				color: 'Red',
				name: 'Lang LLC',
				creator: {
					id: '48e60f10-9498-4870-9e7b-11681e213454',
					firstName: 'Mel',
					lastName: 'McCullock',
					email: 'efodden1@webnode.com',
					avatar: 'https://robohash.org/harumrepellendusdolorum.bmp?size=200x200&set=set1',
					jobTitle: 'Staff Scientist',
				},
			},
			{
				id: 'Office Assistant I',
				color: 'Fuscia',
				name: 'Orn-Aufderhar',
				creator: {
					id: '474d2249-4d17-4f88-88ab-08ed22fe8723',
					firstName: 'Glynnis',
					lastName: 'Foxley',
					email: 'bhussy2@deliciousdays.com',
					avatar: 'https://robohash.org/voluptatibussolutaveritatis.png?size=200x200&set=set1',
					jobTitle: 'Assistant Media Planner',
				},
			},
			{
				id: 'Dental Hygienist',
				color: 'Indigo',
				name: 'VonRueden-Yost',
				creator: {
					id: '9ee76267-a351-470b-a656-c386a2e4a6a2',
					firstName: 'Hagan',
					lastName: 'McGarrell',
					email: 'pwetherill3@sun.com',
					avatar: 'https://robohash.org/eumidvoluptas.jpg?size=200x200&set=set1',
					jobTitle: 'Editor',
				},
			},
			{
				id: 'Developer III',
				color: 'Fuscia',
				name: 'Bechtelar-Erdman',
				creator: {
					id: '7496217e-1784-4eba-90cd-36fb184cc09c',
					firstName: 'Tammie',
					lastName: 'Blackborough',
					email: 'dkerry4@paypal.com',
					avatar: 'https://robohash.org/veroporroexpedita.jpg?size=200x200&set=set1',
					jobTitle: 'Editor',
				},
			},
			{
				id: 'Senior Quality Engineer',
				color: 'Orange',
				name: 'Nader-Hilll',
				creator: {
					id: '28a57e06-9937-4994-94cf-f8902ca65352',
					firstName: 'April',
					lastName: 'MacDonell',
					email: 'gdunthorn5@hibu.com',
					avatar: 'https://robohash.org/voluptatumvoluptasvelit.jpg?size=200x200&set=set1',
					jobTitle: 'Clinical Specialist',
				},
			},
			{
				id: 'Senior Sales Associate',
				color: 'Orange',
				name: 'Hills-Macejkovic',
				creator: {
					id: '96814653-192a-4c3c-acf8-018c84e2c8a7',
					firstName: 'Payton',
					lastName: 'MacPake',
					email: 'iclabburn6@hibu.com',
					avatar: 'https://robohash.org/temporepossimusrerum.jpg?size=200x200&set=set1',
					jobTitle: 'Assistant Professor',
				},
			},
			{
				id: 'Professor',
				color: 'Purple',
				name: 'Wilderman, Conn and Hane',
				creator: {
					id: 'c9976328-4208-46b3-9360-04d9f93408a0',
					firstName: 'Elsworth',
					lastName: 'Muggeridge',
					email: 'dcanada7@dedecms.com',
					avatar: 'https://robohash.org/quiaautqui.bmp?size=200x200&set=set1',
					jobTitle: 'Professor',
				},
			},
			{
				id: 'Project Manager',
				color: 'Khaki',
				name: 'Lowe LLC',
				creator: {
					id: 'c1996545-543f-4b94-98cf-e60253d6d822',
					firstName: 'Hale',
					lastName: 'Corain',
					email: 'rliver8@mozilla.com',
					avatar: 'https://robohash.org/quialaborelaborum.jpg?size=200x200&set=set1',
					jobTitle: 'Graphic Designer',
				},
			},
			{
				id: 'Web Developer I',
				color: 'Violet',
				name: 'Wisozk-Fay',
				creator: {
					id: '08294ce2-d63c-4854-aacb-8397f8bd4a8d',
					firstName: 'Ellsworth',
					lastName: 'Lawland',
					email: 'psinyard9@alibaba.com',
					avatar: 'https://robohash.org/aspernaturvoluptasvoluptas.bmp?size=200x200&set=set1',
					jobTitle: 'Budget/Accounting Analyst III',
				},
			},
			{
				id: 'Account Representative I',
				color: 'Fuscia',
				name: 'Batz LLC',
				creator: {
					id: '2e6365e8-dbbe-4a27-9b52-dbf7036001f0',
					firstName: 'Orv',
					lastName: 'Snellman',
					email: 'kmecozzia@vimeo.com',
					avatar: 'https://robohash.org/nihilporroet.jpg?size=200x200&set=set1',
					jobTitle: 'VP Product Management',
				},
			},
			{
				id: 'Media Manager I',
				color: 'Fuscia',
				name: 'Franecki, Hackett and Hoeger',
				creator: {
					id: 'bbe06261-1ae7-4e7b-b625-95de2f42dfac',
					firstName: 'Mendie',
					lastName: 'Robuchon',
					email: 'pvotierb@upenn.edu',
					avatar: 'https://robohash.org/ipsamconsequaturducimus.png?size=200x200&set=set1',
					jobTitle: 'Engineer II',
				},
			},
			{
				id: 'Marketing Assistant',
				color: 'Aquamarine',
				name: 'Blanda LLC',
				creator: {
					id: 'a8824a14-0044-4a6f-87cf-e5e7ba72e152',
					firstName: 'Alleyn',
					lastName: 'Stritton',
					email: 'ashawlc@photobucket.com',
					avatar: 'https://robohash.org/autfugaomnis.jpg?size=200x200&set=set1',
					jobTitle: 'Junior Executive',
				},
			},
			{
				id: 'Editor',
				color: 'Mauv',
				name: 'Purdy and Sons',
				creator: {
					id: '4f19d28a-ec9d-4c2e-92d9-01378e13b3f5',
					firstName: 'Harrison',
					lastName: 'Brankley',
					email: 'fgoddertsfd@ezinearticles.com',
					avatar: 'https://robohash.org/namautut.jpg?size=200x200&set=set1',
					jobTitle: 'Desktop Support Technician',
				},
			},
			{
				id: 'Staff Accountant IV',
				color: 'Mauv',
				name: 'Feest Inc',
				creator: {
					id: '96a2ffa3-3696-46c5-968c-2ac9582c5c08',
					firstName: 'Leisha',
					lastName: 'Fulger',
					email: 'lfulgerd@mac.com',
					avatar: 'https://robohash.org/numquamquia.bmp?size=200x200&set=set1',
					jobTitle: 'Database Administrator I',
				},
			},
			{
				id: 'VP Product Management',
				color: 'Crimson',
				name: 'Maggio and Sons',
				creator: {
					id: '2f3c5cdc-d443-4a66-bf25-7447b8d28e90',
					firstName: 'Joyous',
					lastName: 'Lamplugh',
					email: 'cgostagee@ucla.edu',
					avatar: 'https://robohash.org/eumprovidentexplicabo.png?size=200x200&set=set1',
					jobTitle: 'Human Resources Manager',
				},
			},
			{
				id: 'Safety Technician II',
				color: 'Mauv',
				name: 'Tromp, Bauch and Christiansen',
				creator: {
					id: '4c8a68b8-a66e-42b0-b01c-c83059ee0657',
					firstName: 'Darius',
					lastName: 'de Cullip',
					email: 'ltolworthyf@va.gov',
					avatar: 'https://robohash.org/placeatquasqui.bmp?size=200x200&set=set1',
					jobTitle: 'Account Representative II',
				},
			},
			{
				id: 'Research Nurse',
				color: 'Green',
				name: 'Krajcik Inc',
				creator: {
					id: '48a474ef-5a97-4ccb-8541-ee4bb40d23ed',
					firstName: 'Rani',
					lastName: 'Dumbrall',
					email: 'hmccahillg@mashable.com',
					avatar: 'https://robohash.org/vitaeuteveniet.png?size=200x200&set=set1',
					jobTitle: 'Database Administrator II',
				},
			},
			{
				id: 'Human Resources Manager',
				color: 'Indigo',
				name: 'Graham LLC',
				creator: {
					id: '59dcfe4e-058e-4743-af4d-ef084d1417ad',
					firstName: 'Tomaso',
					lastName: 'Flucker',
					email: 'prichardssonh@merriam-webster.com',
					avatar: 'https://robohash.org/estsitquibusdam.png?size=200x200&set=set1',
					jobTitle: 'Nurse Practicioner',
				},
			},
			{
				id: 'Statistician III',
				color: 'Turquoise',
				name: 'Hilll Group',
				creator: {
					id: '2df3feec-cc7c-4896-aba3-b2fdbf90e097',
					firstName: 'Vidovik',
					lastName: 'Etuck',
					email: 'lkauscheri@sciencedirect.com',
					avatar: 'https://robohash.org/molestiaesimiliquelabore.jpg?size=200x200&set=set1',
					jobTitle: 'Human Resources Manager',
				},
			},
			{
				id: 'Account Executive',
				color: 'Khaki',
				name: 'Ziemann-Stark',
				creator: {
					id: 'bbdfc1ab-a970-491a-8005-05d336f0eaf0',
					firstName: 'Kissie',
					lastName: 'Sadat',
					email: 'jkneelandj@addtoany.com',
					avatar: 'https://robohash.org/voluptatemabut.png?size=200x200&set=set1',
					jobTitle: 'Quality Engineer',
				},
			},
		].map(async (team) => {
			const { creator, id, ...teamDataToAdd } = team;

			const user = <UserProfile>await userRepository.getByEmail(creator.email);
			const teamToCreate = { ...teamDataToAdd, createdBy: user, links: [] };

			// @ts-ignore
			const createdTeam = await teamRepository.createOne(teamToCreate);

			return createdTeam;
		});

		const teams = await Promise.all(teamPromises);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
