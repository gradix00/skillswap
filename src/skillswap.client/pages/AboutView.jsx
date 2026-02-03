import './AboutView.css';
import { motion } from 'framer-motion';

export function AboutView() {
    document.title = "O nas - SkillSwap";

    const revealVariant = {
        hidden: { opacity: 0, y: 40, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="about-view">
            <div className="about-wrapper">

                <motion.div
                    className="about-intro"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h1>Tworzymy miejsce, w którym ludzie uczą się od ludzi.</h1>
                    <p>
                        Skill Swap powstał z potrzeby.  
                        Z obserwacji.  
                        Z frustracji.  
                        I z ogromnej wiary w to, że wymiana umiejętności może zmieniać życie.
                    </p>
                </motion.div>

                <motion.div
                    className="about-block"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2>Kim jesteśmy?</h2>
                    <p>
                        Jesteśmy dwójką studentów, którzy – zamiast czekać aż ktoś stworzy idealne
                        narzędzie do nauki – postanowili zrobić je sami.  
                        Bez inwestorów. Bez zaplecza. Bez gotowych schematów.
                    </p>
                </motion.div>

                <motion.div
                    className="about-highlight tech-highlight"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <p>
                        Skill Swap to nie jest aplikacja o kursach.  
                        To platforma o relacjach.
                    </p>
                </motion.div>

                <motion.div
                    className="about-block"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
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
                </motion.div>

                <motion.div
                    className="about-block"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
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
                </motion.div>

                <motion.div
                    className="about-quote"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    „Nie chodzi o to, żeby mieć więcej pieniędzy.  
                    Chodzi o to, żeby mieć więcej możliwości.”
                </motion.div>

                <motion.div
                    className="about-block"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
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
                </motion.div>

                <motion.div
                    className="about-ending"
                    variants={revealVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <h2>Nie budujemy „kolejnej aplikacji”.</h2>
                    <p>
                        Budujemy system wymiany umiejętności.  
                        Budujemy społeczność.  
                        Budujemy przyszłość nauki – razem z Wami.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}

export default AboutView;