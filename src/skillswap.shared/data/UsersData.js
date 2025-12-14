// src\skillswap.shared\data\UsersData.js (MockMatchData)
import CrisMan from '../../resources/humans/cris-man.jpg'; 
import AdamMan from '../../resources/humans/adam-man.jpg';
import PiotrMan from '../../resources/humans/piotr-man.jpg';
import MichaelMan from '../../resources/humans/michael-man.jpg';
import AnnaWoman from '../../resources/humans/anna-woman.jpg';
import EwaWoman from '../../resources/humans/ewa-woman.jpg';
import KasiaWoman from '../../resources/humans/kasia-woman.jpg';
import LauraWoman from '../../resources/humans/laura-woman.jpg';

import OlgaWoman from '../../resources/humans/olga-woman.jpg';
import MateuszMan from '../../resources/humans/mateusz-man.jpg';
import KingaWoman from '../../resources/humans/kinga-woman.jpg'; 
import RobertMan from '../../resources/humans/robert-man.jpg'; 

export class MockMatchData {
    static AllMatches = [
        { 
            id: 1, 
            guid: 'c1r1s1-m4n-4a7b-8c9d-0e1f2a3b4c5d', 
            name: 'Piotr', 
            imageUrl: PiotrMan, 
            preferences: ['Backend Development (Node.js)', 'Architektura Mikroserwisów', 'Gotowanie'],
            learningStyle: { mode: 'Online', pace: 'Zadaniowo', method: 'Pisanie kodu i testowanie' },
            bio: "Szukam kogoś do rozmów o skalowalności i projektowaniu API. Poziom: Zaawansowany."
        },
        { 
            id: 2, 
            guid: 'a5d4m4-m4n-4b7a-9d8c-1f0e2b3a4d5c', 
            name: 'Laura', 
            imageUrl: LauraWoman, 
            preferences: ['Cloud Computing (AWS)', 'DevOps', 'Wspinaczka'],
            learningStyle: { mode: 'Stacjonarnie (Biuro)', pace: 'Zadaniowo', method: 'Ćwiczenia praktyczne i CI/CD' },
            bio: "Chcę opanować Terraform i Kubernetes. Chętnie spotkam się na kawie i pomówię o najlepszych praktykach IaC."
        },
        { 
            id: 7, 
            guid: 'm9i8c7-h5l-4a9b-0c1d-6e7f8a9b0c1d', 
            name: 'Michael', 
            imageUrl: MichaelMan, 
            preferences: ['Gamedev (Unity)', 'C#', 'Gry planszowe i RPG'],
            learningStyle: { mode: 'Online', pace: 'Luzno', method: 'Tworzenie małych prototypów' },
            bio: "Dopiero zaczynam tworzenie gier 3D. Potrzebuję kogoś do burzy mózgów i podstaw C#."
        },
        { 
            id: 8, 
            guid: 'e9w9a9-w8m8n-4b0c-1d2e-7f8a9b0c1d2e', 
            name: 'Ewa', 
            imageUrl: EwaWoman, 
            preferences: ['Fitness i Zdrowie', 'Analiza Diety', 'JavaScript (Podstawy)'],
            learningStyle: { mode: 'Online/Stacjonarnie (Kawiarnia)', pace: 'Luzno', method: 'Proste ćwiczenia i feedback' },
            bio: "Jestem dietetykiem. Chciałabym stworzyć prostą aplikację webową do śledzenia postępów klientów. Szukam pomocy w JS."
        },
    ];

    static AllSwipeUsers = [
        { 
            id: 9, 
            guid: 'o9l9g9-w8m8n-4i8j-9k0l-1m2n3o4p5q6r', 
            name: 'Olga', 
            imageUrl: OlgaWoman, 
            preferences: ['Marketing Cyfrowy', 'Content Strategy', 'Fotografia'],
            learningStyle: { mode: 'Online (Dzień)', pace: 'Zadaniowo', method: 'Analiza SEO i Content Audyt' },
            bio: "Szukam partnera do wspólnej **analizy strategii SEO** i contentu. Preferuję 2h sesje w ciągu dnia. Poziom: Średniozaawansowany."
        },
        { 
            id: 10, 
            guid: 'm9t9e9u9s9z-m4n-4j9k-0l1m-2n3o4p5q6r7s', 
            name: 'Mateusz', 
            imageUrl: MateuszMan, 
            preferences: ['Bazy Danych (SQL)', 'Python do skryptowania', 'Siłownia'],
            learningStyle: { mode: 'Stacjonarnie', pace: 'Zadaniowo', method: 'Implementacja zapytań SQL' },
            bio: "Potrzebuję kogoś, kto pomoże mi zaprojektować **bazę danych** dla małego systemu magazynowego. Preferuję spotkania w kawiarni. Poziom: Początkujący/Średniozaawansowany."
        },
        { 
            id: 11, 
            guid: 'k9i9n9g9a-w8m8n-4k0l-1m2n-3o4p5q6r7s8t', 
            name: 'Kinga', 
            imageUrl: KingaWoman, 
            preferences: ['Automatyzacja Testów (Selenium)', 'Testowanie Aplikacji', 'Taniec'],
            learningStyle: { mode: 'Online', pace: 'Zadaniowo', method: 'Pisanie testów end-to-end' },
            bio: "Chcę przejść od manualnego do automatycznego testowania. Poszukuję partnera do **nauki Selenium**. Elastyczne godziny, liczy się praktyka."
        },
        { 
            id: 12, 
            guid: 'r9o9b9e9r9t-m4n-4l1m-2n3o-4p5q6r7s8t9u', 
            name: 'Robert', 
            imageUrl: RobertMan, 
            preferences: ['Photoshop i Grafika', 'Video Editing', 'Motoryzacja'],
            learningStyle: { mode: 'Online', pace: 'Luzno', method: 'Korekty i feedback wizualny' },
            bio: "Jestem grafikiem. Szukam kogoś do **wymiany wiedzy** o najnowszych trendach w obróbce wideo i grafiki 3D. Poziom: Średniozaawansowany."
        },
    ];

    static getAllMatches() {
        return this.AllMatches;
    }
    static getSwipeUsers() {
        return this.AllSwipeUsers;
    }
    static getByGuid(guid) {
        if (!guid) return undefined;
        return this.AllMatches.find(match => match.guid === guid) || this.AllSwipeUsers.find(user => user.guid === guid);
    }
}