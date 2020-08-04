import { Person } from './people';

interface Team {
	id: string | number;
	color: string;
	name: string;
	participants: Person[];
}

export const teams: Team[] = [
	{
		id: 1,
		color: '#141a93',
		name: 'Centimia',
		participants: [
			{
				id: 1,
				firstName: 'Halimeda',
				lastName: 'Halvosen',
				role: 'Desktop Support Technician',
				avatar: 'https://robohash.org/illonihileligendi.jpg?size=50x50&set=set1',
			},
			{
				id: 2,
				firstName: 'Marina',
				lastName: 'Sellen',
				role: 'Help Desk Technician',
				avatar: 'https://robohash.org/deseruntomnisveniam.jpg?size=50x50&set=set1',
			},
		],
	},
	{
		id: 2,
		color: '#cabc40',
		name: 'Avamm',
		participants: [
			{
				id: 1,
				firstName: 'Welch',
				lastName: 'Beglin',
				role: 'Information Systems Manager',
				avatar: 'https://robohash.org/molestiaeexinventore.png?size=50x50&set=set1',
			},
			{
				id: 2,
				firstName: 'Terrye',
				lastName: 'Trawin',
				role: 'Legal Assistant',
				avatar: 'https://robohash.org/culpanequelibero.jpg?size=50x50&set=set1',
			},
			{
				id: 3,
				firstName: 'Lolly',
				lastName: 'Dyment',
				role: 'Budget/Accounting Analyst I',
				avatar: 'https://robohash.org/earumatvoluptates.bmp?size=50x50&set=set1',
			},
			{
				id: 4,
				firstName: 'Baryram',
				lastName: 'Cawthera',
				role: 'Senior Sales Associate',
				avatar: 'https://robohash.org/autipsamsimilique.jpg?size=50x50&set=set1',
			},
			{
				id: 5,
				firstName: 'Wilma',
				lastName: 'Dicks',
				role: 'Statistician IV',
				avatar: 'https://robohash.org/voluptatesfacerecum.jpg?size=50x50&set=set1',
			},
		],
	},
	{
		id: 3,
		color: '#9335f5',
		name: 'Youbridge',
		participants: [
			{
				id: 1,
				firstName: 'Shela',
				lastName: 'Davys',
				role: 'Electrical Engineer',
				avatar: 'https://robohash.org/etsapientesoluta.bmp?size=50x50&set=set1',
			},
		],
	},
	{
		id: 4,
		color: '#46611e',
		name: 'Topicshots',
		participants: [
			{
				id: 1,
				firstName: 'Sidoney',
				lastName: 'Decreuze',
				role: 'Teacher',
				avatar: 'https://robohash.org/etreprehenderitet.png?size=50x50&set=set1',
			},
			{
				id: 2,
				firstName: 'Patrice',
				lastName: 'Dinwoodie',
				role: 'Social Worker',
				avatar: 'https://robohash.org/quiarchitectoest.png?size=50x50&set=set1',
			},
			{
				id: 3,
				firstName: 'Arin',
				lastName: 'Pickerin',
				role: 'Mechanical Systems Engineer',
				avatar: 'https://robohash.org/velsintenim.png?size=50x50&set=set1',
			},
			{
				id: 4,
				firstName: 'Cacilia',
				lastName: 'Rainsdon',
				role: 'GIS Technical Architect',
				avatar: 'https://robohash.org/pariatursequiconsequatur.jpg?size=50x50&set=set1',
			},
		],
	},
	{
		id: 5,
		color: '#580121',
		name: 'Janyx',
		participants: [
			{
				id: 1,
				firstName: 'Leland',
				lastName: 'Malloy',
				role: 'Administrative Officer',
				avatar: 'https://robohash.org/repellatquotempora.bmp?size=50x50&set=set1',
			},
		],
	},
	{
		id: 6,
		color: '#fa9cfa',
		name: 'Realbuzz',
		participants: [
			{
				id: 1,
				firstName: 'Ellis',
				lastName: 'Housin',
				role: 'Associate Professor',
				avatar: 'https://robohash.org/explicaboautemad.jpg?size=50x50&set=set1',
			},
			{
				id: 2,
				firstName: 'Ninetta',
				lastName: 'Leneve',
				role: 'Accountant I',
				avatar: 'https://robohash.org/temporasitab.jpg?size=50x50&set=set1',
			},
			{
				id: 3,
				firstName: 'Jamaal',
				lastName: 'Scawton',
				role: 'Help Desk Operator',
				avatar: 'https://robohash.org/eiusexplicaboab.jpg?size=50x50&set=set1',
			},
			{
				id: 4,
				firstName: 'Vick',
				lastName: 'Scrowston',
				role: 'VP Accounting',
				avatar: 'https://robohash.org/absapienteitaque.bmp?size=50x50&set=set1',
			},
		],
	},
	{
		id: 7,
		color: '#88d167',
		name: 'Chatterpoint',
		participants: [
			{
				id: 1,
				firstName: 'Kenton',
				lastName: "O'Fihillie",
				role: 'Geologist IV',
				avatar: 'https://robohash.org/porrovelitest.bmp?size=50x50&set=set1',
			},
			{
				id: 2,
				firstName: 'Constantin',
				lastName: 'Juschka',
				role: 'Financial Advisor',
				avatar: 'https://robohash.org/dignissimosinciduntet.png?size=50x50&set=set1',
			},
		],
	},
	{
		id: 8,
		color: '#87e0df',
		name: 'Ailane',
		participants: [
			{
				id: 1,
				firstName: 'Toma',
				lastName: 'Addington',
				role: 'Office Assistant III',
				avatar: 'https://robohash.org/sittemporeut.png?size=50x50&set=set1',
			},
			{
				id: 2,
				firstName: 'Ephraim',
				lastName: 'Bromidge',
				role: 'Staff Scientist',
				avatar: 'https://robohash.org/etperspiciatisest.bmp?size=50x50&set=set1',
			},
			{
				id: 3,
				firstName: 'Benn',
				lastName: 'Meddemmen',
				role: 'Senior Sales Associate',
				avatar: 'https://robohash.org/nonquisquamquaerat.png?size=50x50&set=set1',
			},
			{
				id: 4,
				firstName: 'Feodor',
				lastName: 'Kinsley',
				role: 'Nuclear Power Engineer',
				avatar: 'https://robohash.org/laborumeiusvoluptatem.jpg?size=50x50&set=set1',
			},
			{
				id: 5,
				firstName: 'Shandeigh',
				lastName: 'Antonignetti',
				role: 'Human Resources Assistant IV',
				avatar: 'https://robohash.org/faceredelenitidoloremque.bmp?size=50x50&set=set1',
			},
		],
	},
	{
		id: 9,
		color: '#4ea0b5',
		name: 'Topiclounge',
		participants: [
			{
				id: 1,
				firstName: 'Diena',
				lastName: 'MacRitchie',
				role: 'Programmer IV',
				avatar: 'https://robohash.org/dictanatusmaiores.png?size=50x50&set=set1',
			},
			{
				id: 2,
				firstName: 'Andreas',
				lastName: 'Gerritsma',
				role: 'Developer II',
				avatar: 'https://robohash.org/exercitationemrepudiandaeest.png?size=50x50&set=set1',
			},
			{
				id: 3,
				firstName: 'Audi',
				lastName: 'Cabena',
				role: 'Computer Systems Analyst III',
				avatar: 'https://robohash.org/repudiandaeexcepturicorrupti.jpg?size=50x50&set=set1',
			},
		],
	},
	{
		id: 10,
		color: '#801bef',
		name: 'Thoughtbridge',
		participants: [
			{
				id: 1,
				firstName: 'Archibaldo',
				lastName: 'Habard',
				role: 'Web Designer IV',
				avatar: 'https://robohash.org/explicaboreprehenderitet.jpg?size=50x50&set=set1',
			},
			{
				id: 2,
				firstName: 'Duff',
				lastName: 'Jessel',
				role: 'Junior Executive',
				avatar: 'https://robohash.org/similiqueaccusantiumbeatae.bmp?size=50x50&set=set1',
			},
		],
	},
];
