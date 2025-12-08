import './AboutView.css';
import { useEffect } from 'react';

export function AboutView() {
    document.title = "O nas - SkillSwap";

    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            revealElements.forEach(el => {
                const top = el.getBoundingClientRect().top;
                if (top < windowHeight - 100) {
                    el.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    return (
        <div className="about-view">

            <div className="about-wrapper">

                <div className="about-intro reveal">
                    <h1>Tworzymy miejsce, w którym ludzie uczą się od ludzi.</h1>
                    <p>
                        Skill Swap powstał z potrzeby.  
                        Z obserwacji.  
                        Z frustracji.  
                        I z ogromnej wiary w to, że wymiana umiejętności może zmieniać życie.
                    </p>
                </div>

                <div className="about-block reveal">
                    <h2>Kim jesteśmy?</h2>
                    <p>
                        Jesteśmy dwójką studentów, którzy – zamiast czekać aż ktoś stworzy idealne
                        narzędzie do nauki – postanowili zrobić je sami.  
                        Bez inwestorów. Bez zaplecza. Bez gotowych schematów.
                        <br /><br />
                        Tylko my, nasze umiejętności i przekonanie, że nauka nie musi być samotna,
                        droga i oderwana od rzeczywistości.
                    </p>
                </div>

                {/* ✅ TECH HIGHLIGHT */}
                <div className="about-highlight tech-highlight reveal">
                    <p>
                        Skill Swap to nie jest aplikacja o kursach.  
                        To platforma o relacjach.
                    </p>
                </div>

                <div className="about-block reveal">
                    <h2>Nasza misja</h2>
                    <p>
                        Chcemy stworzyć przestrzeń, w której każdy – niezależnie od wieku, zawodu
                        czy doświadczenia – może:
                        <br /><br />
                        • nauczyć się czegoś nowego,  
                        • przekazać swoją wiedzę dalej,  
                        • zdobyć realne umiejętności,  
                        • i budować wartościowe relacje.
                        <br /><br />
                        Wierzymy, że największym zasobem nie są pieniądze.  
                        Są nim ludzie i to, co potrafią.
                    </p>
                </div>

                <div className="about-block reveal">
                    <h2>Dlaczego barter?</h2>
                    <p>
                        Bo nie każdy ma budżet na kursy.  
                        Bo nie każdy chce kupować kolejne webinary.
                        <br /><br />
                        Ale każdy coś potrafi.
                        <br /><br />
                        Programista może nauczyć grafika.  
                        Grafik może nauczyć montażu.  
                        Montażysta może nauczyć sociali.  
                        A ktoś inny – języka, sprzedaży, organizacji pracy.
                    </p>
                </div>

                <div className="about-quote reveal">
                    „Nie chodzi o to, żeby mieć więcej pieniędzy.  
                    Chodzi o to, żeby mieć więcej możliwości.”
                </div>

                <div className="about-block reveal">
                    <h2>Jak widzimy przyszłość?</h2>
                    <p>
                        Chcemy, aby Skill Swap stał się miejscem, do którego wchodzisz nie po to,
                        by tylko coś przeczytać.
                        <br /><br />
                        Ale po to, by:
                        <br />
                        • poznać realnego człowieka,  
                        • dostać realne zadanie,  
                        • zrobić realny postęp,  
                        • i poczuć realną zmianę w swoim życiu.
                    </p>
                </div>

                <div className="about-ending reveal">
                    <h2>Nie budujemy „kolejnej aplikacji”.</h2>
                    <p>
                        Budujemy system wymiany umiejętności.
                        <br />
                        Budujemy społeczność.
                        <br />
                        Budujemy przyszłość nauki – razem z Wami.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default AboutView;