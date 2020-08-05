import { Person } from './people';

export interface Team {
	id: string | number;
	color: string;
	name: string;
	creator: Person;
}

export const teams: Team[] = [
	{
		id: 1,
		color: 'Pink',
		name: 'Divavu',
		creator: {
			id: 1,
			firstName: 'Terence',
			lastName: 'Bitterton',
			role: 'Office Assistant II',
			avatar: 'https://robohash.org/saepeetquia.bmp?size=200x200&set=set1',
		},
	},
	{
		id: 2,
		color: 'Violet',
		name: 'Voolia',
		creator: {
			id: 2,
			firstName: 'Tiebold',
			lastName: 'Cowe',
			role: 'Assistant Manager',
			avatar: 'https://robohash.org/officiisquisiure.bmp?size=200x200&set=set1',
		},
	},
	{
		id: 3,
		color: 'Mauv',
		name: 'Zooxo',
		creator: {
			id: 3,
			firstName: 'Ansell',
			lastName: 'Burleton',
			role: 'Technical Writer',
			avatar: 'https://robohash.org/nobisutad.jpg?size=200x200&set=set1',
		},
	},
	{
		id: 4,
		color: 'Violet',
		name: 'Linkbridge',
		creator: {
			id: 4,
			firstName: 'Skip',
			lastName: 'Humpherson',
			role: 'Accounting Assistant II',
			avatar: 'https://robohash.org/sedrecusandaevoluptatum.png?size=200x200&set=set1',
		},
	},
	{
		id: 5,
		color: 'Teal',
		name: 'Flipbug',
		creator: {
			id: 5,
			firstName: 'Elicia',
			lastName: 'Rathbourne',
			role: 'Nurse Practicioner',
			avatar: 'https://robohash.org/rationeeaasperiores.jpg?size=200x200&set=set1',
		},
	},
	{
		id: 6,
		color: 'Crimson',
		name: 'Centidel',
		creator: {
			id: 6,
			firstName: 'Roosevelt',
			lastName: 'Peres',
			role: 'Dental Hygienist',
			avatar: 'https://robohash.org/estdoloresperspiciatis.bmp?size=200x200&set=set1',
		},
	},
	{
		id: 7,
		color: 'Yellow',
		name: 'Mydeo',
		creator: {
			id: 7,
			firstName: 'Noellyn',
			lastName: 'Lean',
			role: 'Associate Professor',
			avatar: 'https://robohash.org/omnisearumnesciunt.bmp?size=200x200&set=set1',
		},
	},
	{
		id: 8,
		color: 'Yellow',
		name: 'Riffpath',
		creator: {
			id: 8,
			firstName: 'Elladine',
			lastName: 'Valde',
			role: 'Senior Sales Associate',
			avatar: 'https://robohash.org/deseruntfugiatvoluptatem.png?size=200x200&set=set1',
		},
	},
	{
		id: 9,
		color: 'Khaki',
		name: 'Linkbuzz',
		creator: {
			id: 9,
			firstName: 'Jamill',
			lastName: 'Golsworthy',
			role: 'Internal Auditor',
			avatar: 'https://robohash.org/ineumsaepe.png?size=200x200&set=set1',
		},
	},
	{
		id: 10,
		color: 'Aquamarine',
		name: 'Vidoo',
		creator: {
			id: 10,
			firstName: 'Alexia',
			lastName: 'Skehens',
			role: 'Food Chemist',
			avatar: 'https://robohash.org/enimsimiliqueamet.png?size=200x200&set=set1',
		},
	},
	{
		id: 11,
		color: 'Violet',
		name: 'Jabbersphere',
		creator: {
			id: 11,
			firstName: 'Hyman',
			lastName: 'Youle',
			role: 'Teacher',
			avatar: 'https://robohash.org/sitaspernatureveniet.png?size=200x200&set=set1',
		},
	},
	{
		id: 12,
		color: 'Teal',
		name: 'Bubbletube',
		creator: {
			id: 12,
			firstName: 'Annamaria',
			lastName: 'Willshear',
			role: 'Safety Technician I',
			avatar: 'https://robohash.org/quaetemporaa.png?size=200x200&set=set1',
		},
	},
	{
		id: 13,
		color: 'Indigo',
		name: 'Riffpath',
		creator: {
			id: 13,
			firstName: 'Lamont',
			lastName: 'Durak',
			role: 'VP Product Management',
			avatar: 'https://robohash.org/eligendidolornostrum.jpg?size=200x200&set=set1',
		},
	},
	{
		id: 14,
		color: 'Turquoise',
		name: 'Jaxnation',
		creator: {
			id: 14,
			firstName: 'Lazare',
			lastName: 'Poytheras',
			role: 'Project Manager',
			avatar: 'https://robohash.org/numquamullamrepellat.jpg?size=200x200&set=set1',
		},
	},
	{
		id: 15,
		color: 'Mauv',
		name: 'Oloo',
		creator: {
			id: 15,
			firstName: 'Anderea',
			lastName: 'Astles',
			role: 'Health Coach II',
			avatar: 'https://robohash.org/facilisdebitisdeleniti.png?size=200x200&set=set1',
		},
	},
	{
		id: 16,
		color: 'Red',
		name: 'Plajo',
		creator: {
			id: 16,
			firstName: 'Lonny',
			lastName: 'Le Fleming',
			role: 'Marketing Manager',
			avatar: 'https://robohash.org/rerumearumvoluptas.jpg?size=200x200&set=set1',
		},
	},
	{
		id: 17,
		color: 'Teal',
		name: 'Tazzy',
		creator: {
			id: 17,
			firstName: 'Channa',
			lastName: 'Casbon',
			role: 'VP Sales',
			avatar: 'https://robohash.org/suscipitadautem.bmp?size=200x200&set=set1',
		},
	},
	{
		id: 18,
		color: 'Turquoise',
		name: 'Demivee',
		creator: {
			id: 18,
			firstName: 'Nicol',
			lastName: 'Copin',
			role: 'Account Representative III',
			avatar: 'https://robohash.org/quiaetodit.png?size=200x200&set=set1',
		},
	},
	{
		id: 19,
		color: 'Teal',
		name: 'Jaxworks',
		creator: {
			id: 19,
			firstName: 'Reamonn',
			lastName: 'MacClancey',
			role: 'Data Coordiator',
			avatar: 'https://robohash.org/sintnihilneque.png?size=200x200&set=set1',
		},
	},
	{
		id: 20,
		color: 'Red',
		name: 'Camimbo',
		creator: {
			id: 20,
			firstName: 'Tracy',
			lastName: 'Lehemann',
			role: 'General Manager',
			avatar: 'https://robohash.org/quidemmodiquae.jpg?size=200x200&set=set1',
		},
	},
];
