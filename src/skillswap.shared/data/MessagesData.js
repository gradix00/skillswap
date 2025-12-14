import { MockMatchData } from './UsersData'; 


const piotr = MockMatchData.AllMatches.find(u => u.name === 'Piotr');
const laura = MockMatchData.AllMatches.find(u => u.name === 'Laura');
const michael = MockMatchData.AllMatches.find(u => u.name === 'Michael');
const ewa = MockMatchData.AllMatches.find(u => u.name === 'Ewa');

const olga = MockMatchData.AllSwipeUsers.find(u => u.name === 'Olga');
const mateusz = MockMatchData.AllSwipeUsers.find(u => u.name === 'Mateusz');
const kinga = MockMatchData.AllSwipeUsers.find(u => u.name === 'Kinga');
const robert = MockMatchData.AllSwipeUsers.find(u => u.name === 'Robert');


export class MockMessageData {
    static getUserImage(guid) {
        const user = MockMatchData.AllMatches.find(u => u.guid === guid) || 
                     MockMatchData.AllSwipeUsers.find(u => u.guid === guid);
        return user ? user.imageUrl : undefined;
    }

    /**
     * @returns {Array} 
     */
    static getChats() {
        const now = new Date();
        const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
        const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
        const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
        const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
        const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
        const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000); 
        const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000); 
        const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);

        return [
            {
                matchGuid: piotr.guid,
                partnerGuid: kinga.guid,
                messages: [
                    {
                        senderId: kinga.guid,
                        senderImage: MockMessageData.getUserImage(kinga.guid),
                        text: "Cześć Piotr! Widzę, że zajmujesz się Node.js. Ja chciałabym pisać testy E2E w Selenium do aplikacji backendowych. Może masz jakiś projekt, na którym mogłabym poćwiczyć?",
                        timestamp: twoDaysAgo.toISOString(),
                    },
                    {
                        senderId: piotr.guid,
                        senderImage: MockMessageData.getUserImage(piotr.guid),
                        text: "Hej Kinga! Świetny pomysł! Właśnie pracuję nad mikroserwisem płatności. W sam raz, żeby wdrożyć testy regresji. Podrzucę Ci repo i możemy się umówić na 'test session'.",
                        timestamp: oneDayAgo.toISOString(),
                    },
                    {
                        senderId: kinga.guid,
                        senderImage: MockMessageData.getUserImage(kinga.guid),
                        text: "Super! A jakich narzędzi używasz do testów jednostkowych? Chętnie się podszkolę w kontekście backendu.",
                        timestamp: eightHoursAgo.toISOString(),
                    },
                    {
                        senderId: piotr.guid,
                        senderImage: MockMessageData.getUserImage(piotr.guid),
                        text: "Głównie Mocha i Chai. Zaczynajmy od E2E, a potem możemy przejść do jednostkowych.",
                        timestamp: twoMinutesAgo.toISOString(),
                    },
                ],
            },
            {
                matchGuid: piotr.guid,
                partnerGuid: mateusz.guid,
                messages: [
                    {
                        senderId: mateusz.guid,
                        senderImage: MockMessageData.getUserImage(mateusz.guid),
                        text: "Cześć Piotr, potrzebuję wdrożyć małą bazę danych na AWS RDS. Czy możesz mi polecić jakieś dobre tutoriale o Terraform do zarządzania infrastrukturą?",
                        timestamp: oneDayAgo.toISOString(),
                    },
                    {
                        senderId: piotr.guid,
                        senderImage: MockMessageData.getUserImage(piotr.guid),
                        text: "Jasne Mateusz! Terraform jest świetny do IaC. Zacznij od 'HashiCorp Learn'. Chętnie też pomogę Ci z konfiguracją RDS i ustawieniem IAM roles, żeby było bezpiecznie.",
                        timestamp: threeHoursAgo.toISOString(),
                    },
                    {
                        senderId: mateusz.guid,
                        senderImage: MockMessageData.getUserImage(mateusz.guid),
                        text: "Brzmi jak plan! Dzięki za cynk. Czy możemy spotkać się w biurze w przyszłym tygodniu? Przyda mi się pomoc z rolami IAM.",
                        timestamp: thirtyMinutesAgo.toISOString(),
                    },
                    {
                        senderId: piotr.guid,
                        senderImage: MockMessageData.getUserImage(piotr.guid),
                        text: "Jak najbardziej, napisz do mnie w poniedziałek, to ustalimy dzień.",
                        timestamp: twoMinutesAgo.toISOString(),
                    },
                ],
            },
            {
                matchGuid: piotr.guid,
                partnerGuid: robert.guid,
                messages: [
                    {
                        senderId: robert.guid,
                        senderImage: MockMessageData.getUserImage(robert.guid),
                        text: "Cześć Piotr! Widzę, że interesujesz się Gamedev. Jestem grafikiem, chętnie pomogę Ci z assetami 3D lub teksturami do Unity. Potrzebujesz czegoś?",
                        timestamp: twelveHoursAgo.toISOString(), 
                    },
                    {
                        senderId: piotr.guid,
                        senderImage: MockMessageData.getUserImage(piotr.guid),
                        text: "Super! Aktualnie walczę z oświetleniem i cieniowaniem w Unity. Czy mógłbyś mi polecić, jak zoptymalizować modele, żeby gra działała płynniej?",
                        timestamp: sixHoursAgo.toISOString(), 
                    },
                    {
                        senderId: robert.guid,
                        senderImage: MockMessageData.getUserImage(robert.guid),
                        text: "Jasne, musimy skupić się na LODs (Level of Detail) i bake'owaniu oświetlenia. Możemy to omówić na szybkim videocallu jutro wieczorem. Podrzucę Ci linki do dobrych poradników.",
                        timestamp: twoMinutesAgo.toISOString(),
                    },
                ],
            },
            {
                matchGuid: piotr.guid,
                partnerGuid: olga.guid,
                messages: [
                    {
                        senderId: ewa.guid,
                        senderImage: MockMessageData.getUserImage(ewa.guid),
                        text: "Witaj Piotr. Jako dietetyk, potrzebuję wiedzy o SEO. Chcę, aby moja nowa strona z planami dietetycznymi była wysoko w Google. Możemy coś o tym porozmawiać?",
                        timestamp: oneDayAgo.toISOString(),
                    },
                    {
                        senderId: piotr.guid,
                        senderImage: MockMessageData.getUserImage(piotr.guid),
                        text: "Dzień dobry Ewa! Oczywiście! To idealna tematyka pod content marketing. Zróbmy razem szybki audyt słów kluczowych związanych ze zdrowiem i dietą. Masz już gotową stronę?",
                        timestamp: twelveHoursAgo.toISOString(), 
                    },
                    {
                        senderId: ewa.guid,
                        senderImage: MockMessageData.getUserImage(ewa.guid),
                        text: "Strona jest prawie gotowa. Świetnie! Daj mi znać, kiedy masz czas na audyt!",
                        timestamp: twoMinutesAgo.toISOString(),
                    },
                ],
            },
        ];
    }
}