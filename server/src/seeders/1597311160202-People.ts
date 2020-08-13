import {MigrationInterface, QueryRunner, getRepository} from 'typeorm';

export class People1597311160202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const users=[
            {
                id: '1b03723a-e09d-4ccc-9729-bd434cc27cf2',
                firstName: 'Fred',
                lastName: 'Shireff',
                email: 'fshireff0@aboutads.info',
                avatar: 'https://robohash.org/sedoditdolor.jpg?size=200x200&set=set1',
                jobTitle: 'Database Administrator II',
            },
            {
                id: 'cdae9885-c2aa-402e-9f7b-1a63e062eac4',
                firstName: 'Eleni',
                lastName: 'Fodden',
                email: 'efodden1@webnode.com',
                avatar: 'https://robohash.org/doloresmagnamrem.jpg?size=200x200&set=set1',
                jobTitle: 'Registered Nurse',
            },
            {
                id: '8509029d-2a65-49d4-9d3a-45ee24202e2d',
                firstName: 'Brice',
                lastName: 'Hussy',
                email: 'bhussy2@deliciousdays.com',
                avatar: 'https://robohash.org/velitnonodit.png?size=200x200&set=set1',
                jobTitle: 'Actuary',
            },
            {
                id: 'dede080f-4538-44f0-83b2-e9aa33e113c6',
                firstName: 'Patrizius',
                lastName: 'Wetherill',
                email: 'pwetherill3@sun.com',
                avatar: 'https://robohash.org/utcumquemagnam.jpg?size=200x200&set=set1',
                jobTitle: 'Clinical Specialist',
            },
            {
                id: '4dfdbf74-089d-4139-871c-8ad5df155bb1',
                firstName: 'Daveta',
                lastName: 'Kerry',
                email: 'dkerry4@paypal.com',
                avatar: 'https://robohash.org/quiacorruptidolorem.png?size=200x200&set=set1',
                jobTitle: 'Electrical Engineer',
            },
            {
                id: 'ea701e12-23e9-489b-b884-0f3ae2d177d3',
                firstName: 'Gretal',
                lastName: 'Dunthorn',
                email: 'gdunthorn5@hibu.com',
                avatar: 'https://robohash.org/recusandaerepudiandaeeum.png?size=200x200&set=set1',
                jobTitle: 'Assistant Media Planner',
            },
            {
                id: '09238205-592f-4792-bc0b-095bacb17356',
                firstName: 'Ileane',
                lastName: 'Clabburn',
                email: 'iclabburn6@hibu.com',
                avatar: 'https://robohash.org/cumquiad.png?size=200x200&set=set1',
                jobTitle: 'Associate Professor',
            },
            {
                id: '45898dce-43dc-46d6-a357-7cd955532b64',
                firstName: 'Dallis',
                lastName: 'Canada',
                email: 'dcanada7@dedecms.com',
                avatar: 'https://robohash.org/accusantiumperferendisquam.png?size=200x200&set=set1',
                jobTitle: 'Product Engineer',
            },
            {
                id: '53673096-3cb5-498f-8e93-154efb9a57cc',
                firstName: 'Reena',
                lastName: 'Liver',
                email: 'rliver8@mozilla.com',
                avatar: 'https://robohash.org/molestiaedoloresminus.jpg?size=200x200&set=set1',
                jobTitle: 'Nuclear Power Engineer',
            },
            {
                id: '62c85922-7b9b-42e0-baa7-787ddb8f07a0',
                firstName: 'Paco',
                lastName: 'Sinyard',
                email: 'psinyard9@alibaba.com',
                avatar: 'https://robohash.org/utoditeos.jpg?size=200x200&set=set1',
                jobTitle: 'Graphic Designer',
            },
            {
                id: 'b9c068cb-8821-447f-a8af-ebbce85d611f',
                firstName: 'Kristi',
                lastName: 'Mecozzi',
                email: 'kmecozzia@vimeo.com',
                avatar: 'https://robohash.org/accusamusenimest.png?size=200x200&set=set1',
                jobTitle: 'Food Chemist',
            },
            {
                id: '6001530e-483b-4784-831e-d0ff43003976',
                firstName: 'Paquito',
                lastName: 'Votier',
                email: 'pvotierb@upenn.edu',
                avatar: 'https://robohash.org/laborumaliassint.png?size=200x200&set=set1',
                jobTitle: 'Senior Sales Associate',
            },
            {
                id: 'e4f6118c-30b0-4d39-8ac1-87ae1102a792',
                firstName: 'Alaster',
                lastName: 'Shawl',
                email: 'ashawlc@photobucket.com',
                avatar: 'https://robohash.org/dolorvoluptatemducimus.jpg?size=200x200&set=set1',
                jobTitle: 'Health Coach I',
            },
            {
                id: 'ce1f9721-9a5a-4e5d-8569-fdc72bae63cd',
                firstName: 'Filmer',
                lastName: 'Goddert.sf',
                email: 'fgoddertsfd@ezinearticles.com',
                avatar: 'https://robohash.org/sintremiste.jpg?size=200x200&set=set1',
                jobTitle: 'Data Coordiator',
            },
            {
                id: '323a9bfe-66c9-4284-953b-70029a8a7d4f',
                firstName: 'Courtney',
                lastName: 'Gostage',
                email: 'cgostagee@ucla.edu',
                avatar: 'https://robohash.org/culpaliberoaliquid.png?size=200x200&set=set1',
                jobTitle: 'Software Consultant',
            },
            {
                id: '672a0da0-e4e9-4016-86fb-0e192c44062a',
                firstName: 'Loreen',
                lastName: 'Tolworthy',
                email: 'ltolworthyf@va.gov',
                avatar: 'https://robohash.org/autemutdignissimos.bmp?size=200x200&set=set1',
                jobTitle: 'Professor',
            },
            {
                id: 'd80b3289-8e32-4f53-9cb4-32dcc4ad64e0',
                firstName: 'Hakim',
                lastName: 'McCahill',
                email: 'hmccahillg@mashable.com',
                avatar: 'https://robohash.org/saepevoluptatemrecusandae.png?size=200x200&set=set1',
                jobTitle: 'Quality Control Specialist',
            },
            {
                id: '2c7bb0a3-7c8c-4986-9376-5248fcf10329',
                firstName: 'Panchito',
                lastName: 'Richardsson',
                email: 'prichardssonh@merriam-webster.com',
                avatar: 'https://robohash.org/explicaboiureexercitationem.bmp?size=200x200&set=set1',
                jobTitle: 'Payment Adjustment Coordinator',
            },
            {
                id: '26f447d7-85ea-4bb6-817f-cb8861d9d846',
                firstName: 'Linell',
                lastName: 'Kauscher',
                email: 'lkauscheri@sciencedirect.com',
                avatar: 'https://robohash.org/sitquiaaut.bmp?size=200x200&set=set1',
                jobTitle: 'Assistant Professor',
            },
            {
                id: '8c86f143-589d-4689-9908-2fe0fb8a52f2',
                firstName: 'Jeremy',
                lastName: 'Kneeland',
                email: 'jkneelandj@addtoany.com',
                avatar: 'https://robohash.org/maioresmagnamnemo.png?size=200x200&set=set1',
                jobTitle: 'Assistant Professor',
            },
        ].map(user=>{
            const {id, ...userData}=user;

            return {...userData, password:'1234567'}
        });

        await getRepository('UserProfile').save(users);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
