import { useEffect, useState } from 'react';
import './App.css';
import './Rest.css';
import './Updates.css';
import './ImagePreview.css';
import GoogleMap from './Components/GoogleMap';
import { contacts, portfolioLinks } from './config/siteConfig';

const Arrow = () => <span className="icon">↗</span>;
const projects = [
  { id: 'carrent', number: '01', name: 'CarRent', type: 'Онлайн-сервис аренды авто', image: '/images/carrent-preview.png', url: portfolioLinks.carrent, tags: ['React', 'UI/UX'] },
  { id: 'cleanon', number: '02', name: 'CleanOn', type: 'Сервис клининга', image: '/images/cleanon-preview.png', url: portfolioLinks.cleanon, tags: ['Next.js', 'Tailwind'] },
  { id: 'kelinkapro', number: '03', name: 'Kelinka Pro', type: 'Цифровая платформа', image: '/images/kelinkapro-preview.png', url: portfolioLinks.kelinkapro, tags: ['React', 'TypeScript'] },
];

function ThemeToggle({ theme, setTheme }) { return <button className="theme-toggle" aria-label="Переключить тему" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><span className={theme === 'dark' ? 'active' : ''}>☾</span><span className={theme === 'light' ? 'active' : ''}>☀</span></button>; }

// function LeadForm({ compact = false, onSuccess }) {
//   const [status, setStatus] = useState('idle');
//   const submit = async (event) => {
//     event.preventDefault();
//     const values = Object.fromEntries(new FormData(event.currentTarget));
//     setStatus('loading');
//     try {
//       const response = await fetch(process.env.REACT_APP_API_URL || 'http://localhost:5000/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
//       const data = await response.json().catch(() => ({}));
//       if (!response.ok) throw new Error(data.message || 'Не удалось отправить заявку.');
//       setStatus('success'); event.currentTarget.reset(); setTimeout(() => { setStatus('idle'); onSuccess?.(); }, 1800);
//     } catch (error) { setStatus({ type: 'error', message: error.message }); }
//   };
//   return <form className={compact ? 'modal-form' : 'contact-form'} onSubmit={submit}>
//     <label>Как к вам обращаться?<input name="name" required placeholder="Ваше имя"/></label>
//     <label>Телефон или WhatsApp<input name="phone" required placeholder="+7 (___) ___-__-__"/></label>
//     <label>Что планируете создать?<select name="projectType" required defaultValue=""><option value="" disabled>Выберите тип проекта</option><option>Сайт / интернет-магазин</option><option>Мобильное приложение</option><option>Telegram-бот</option></select></label>
//     {!compact && <label>Коротко о задаче<textarea name="brief" placeholder="Что должно уметь решение?" rows="3"/></label>}
//     <button className="button primary submit" disabled={status === 'loading'}>{status === 'success' ? 'Заявка отправлена ✓' : status === 'loading' ? 'Отправляем…' : <>Отправить заявку <Arrow/></>}</button>
//     {status?.type === 'error' && <small className="form-error">{status.message}</small>}
//     {!compact && <small>Нажимая кнопку, вы соглашаетесь с обработкой данных</small>}
//   </form>;
// }

function App() {
  const [theme, setTheme] = useState('dark');
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [screen, setScreen] = useState('finance');
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  const scroll = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false); };
  return <div className="site-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="noise"/>
    <header className="header glass"><button className="brand" onClick={() => scroll('home')}><span className="brand-mark">C/</span><span>CodeMatrix</span></button><nav className={menu ? 'nav nav-open' : 'nav'}><button onClick={() => scroll('work')}>Работы</button><button onClick={() => scroll('about')}>О студии</button><button onClick={() => scroll('contacts')}>Контакты</button></nav><div className="header-actions"><ThemeToggle theme={theme} setTheme={setTheme}/><a className="whatsapp" href={contacts.whatsapp} target="_blank" rel="noreferrer"><span>✦</span><span className="desktop-label">Написать в WhatsApp</span></a><button className="menu-button" onClick={() => setMenu(!menu)}>{menu ? '×' : '☰'}</button></div></header>
    <main>
      <section className="hero section" id="home"><div className="hero-copy reveal"><div className="eyebrow"><span className="live-dot"/> DIGITAL PRODUCT STUDIO · ALMATY</div><h1>Разрабатываем digital,<br/><em>который выбирают.</em></h1><p className="hero-text">Разрабатываем сайты, мобильные приложения и Telegram-ботов <strong>с нуля до запуска в сеть.</strong></p><div className="hero-actions"><button className="button primary" onClick={() => scroll('work')}>Смотреть портфолио <Arrow/></button><button className="button glass-button" onClick={() => setModal(true)}>Быстрый расчёт <span>→</span></button></div><div className="hero-proof"><div className="avatars"><b>Н</b><b>А</b><b>Д</b><b>С</b></div><span>Нам доверяют команды<br/>из 7 стран мира</span></div></div><div className="hero-visual" aria-label="Превью цифрового продукта"><div className="orbit orbit-1"/><div className="orbit orbit-2"/><div className="sphere large-sphere"/><div className="sphere small-sphere"/><div className="float-card metric-card glass"><span className="metric-icon">✺</span><span>Эффективность</span><strong>+38%</strong><small>к конверсии за 3 месяца</small></div><div className="hero-device glass"><div className="device-top"><span>09:41</span><span>● ● ●</span></div><div className="device-inner"><div className="ui-pill">NOVA COLLECTIVE <span>↗</span></div><h3>Ideas deserve<br/>to <i>move.</i></h3><div className="mini-circles"><b/><b/><b/></div><div className="device-chart"><span/><span/><span/><span/><span/><span/><span/></div></div><div className="device-bottom"><span>⌂</span><span>◉</span><span>◌</span></div></div><div className="float-card project-card glass"><div className="project-logo">B</div><div><small>НОВЫЙ ПРОЕКТ</small><strong>Bankio app</strong></div><span className="project-arrow">↗</span></div></div></section>
      
      <section id="work" className="section work-section"><div className="section-head reveal"><div><div className="eyebrow">SELECTED WORKS / 2023—2025</div><h2>Работы, где каждая<br/><em>деталь работает.</em></h2></div><button className="link-button" onClick={() => setModal(true)}>Начать проект <Arrow/></button></div><div className="portfolio-grid">{projects.map(project => <article className="portfolio-card glass" key={project.id}><div className="tile-top"><span>{project.number} / DIGITAL PRODUCT</span><a href={project.url} target="_blank" rel="noreferrer">Открыть <Arrow/></a></div><div className="pdf-preview"><img src={project.image} alt={`Превью сайта ${project.name}`}/></div><div className="tile-bottom"><div><h3>{project.name}</h3><p>{project.type}</p></div><div className="stack">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        <div className="mobile-showcase glass"><div className="showcase-copy"><div className="eyebrow">MOBILE EXPERIENCE</div><h3>Приложения,<br/>которые <em>решают</em><br/>задачи.</h3><p>Проектируем полноценные сценарии: от онбординга и аналитики до платежей и управления заказами.</p><div className="screen-selector"><button onClick={() => setScreen('finance')} className={screen === 'finance' ? 'selected' : ''}>01 <span>Finance control</span></button><button onClick={() => setScreen('delivery')} className={screen === 'delivery' ? 'selected' : ''}>02 <span>Delivery dashboard</span></button></div></div><div className="app-devices"><div className="device-orb orb-a"/><div className="device-orb orb-b"/><div className="app-phone primary-phone"><div className="dynamic-island"/><div className={`app-screen ${screen}`}><div className="app-status">9:41 <span>▮ ◒</span></div>{screen === 'finance' ? <><div className="app-title"><span className="app-logo">V</span><button>•••</button></div><p className="screen-kicker">Ваш баланс</p><b className="screen-balance">₸ 4 280 000</b><div className="visa-card"><small>VIRTUAL BUSINESS</small><b>•••• 2481</b><span>VISA</span></div><div className="chart-card"><div><b>Расходы</b><small>за неделю</small></div><div className="line-chart"><i/><i/><i/><i/><i/><i/><i/></div></div></> : <><div className="delivery-head"><span>Добрый вечер,</span><b>Алихан 👋</b></div><div className="delivery-map"><i className="route route-one"/><i className="route route-two"/><b>●</b><span>Ваш курьер<br/><small>будет через 8 мин.</small></span></div><div className="delivery-order"><span>Заказ #1054</span><b>В пути</b><small>2 позиции · 14 300 ₸</small></div><div className="delivery-actions"><button>Поддержка</button><button>Детали</button></div></>}<div className="app-nav"><span>⌂<small>Главная</small></span><span>◔<small>Аналитика</small></span><span>◎<small>Профиль</small></span></div></div></div><div className="app-phone second-phone"><div className="dynamic-island"/><div className="orders-screen"><div className="app-status">9:41 <span>▮ ◒</span></div><b>Заказы</b><div className="order-filter"><button>Все</button><button>Новые</button></div>{['Доставка #1048','Доставка #1047','Доставка #1046'].map((order, index) => <div className="order-row" key={order}><span className={`order-dot dot-${index}`}>⌁</span><div><b>{order}</b><small>{['Выполнен','В пути','Новый'][index]} · сегодня</small></div><strong>{[28400,14300,9200][index]} ₸</strong></div>)}<div className="mini-bottom">⌂　◈　◎</div></div></div></div></div>
      </section>
      <section id="about" className="section about-section"><div className="about-intro"><div className="eyebrow">ABOUT CODEMATRIX</div><h2>Сложные продукты —<br/><em>простым языком.</em></h2><p>Мы — команда стратегов, дизайнеров и инженеров. С 2023 года помогаем бизнесу расти через понятные и красивые цифровые решения.</p><button className="text-cta" onClick={() => setModal(true)}>Познакомиться с нами <Arrow/></button></div><div className="stats-grid"><div className="stat-card glass"><strong>2<span>+</span></strong><p>года в веб и мобильной разработке</p><i>↗</i></div><div className="stat-card glass"><strong>50<span>+</span></strong><p>запущенных продуктов и сервисов</p></div><div className="stat-card stat-wide glass"><div><strong>100<span>%</span></strong><p>соблюдение сроков<br/>по договору</p></div><div className="radial">◎</div></div></div></section>
      <section className="tech-section"><div className="eyebrow">OUR TOOLBOX</div><div className="tech-groups"><div><b>Frontend</b><p>{['React.js','Next.js','JavaScript','TypeScript','HTML','CSS','TailwindCSS'].map(t => <span key={t}>{t}</span>)}</p></div><div><b>Backend</b><p>{['Node.js','Nest.js','Python (FastAPI)'].map(t => <span key={t}>{t}</span>)}</p></div><div><b>Mobile</b><p>{['Flutter','Dart', 'Kotlin'].map(t => <span key={t}>{t}</span>)}</p></div><div><b>Other</b><p>{['MongoDB','PostgreSQL', 'AWS', 'Cloudflare'].map(t => <span key={t}>{t}</span>)}</p></div></div></section>
      <section className="services section"><div className="eyebrow">WHAT WE DO</div><div className="service-list"><article><span>01</span><h3>Разработка сайта <em>с нуля до запуска в сеть</em></h3><p>Стратегия, дизайн, разработка, интеграции и техническая поддержка.</p></article><article><span>02</span><h3>Разработка приложений <em>до рабочей версии</em></h3><p>Проектирование интерфейсов, мобильная разработка и публикация.</p></article><article><span>03</span><h3>Разработка <em>Telegram-ботов</em></h3><p>Автоматизируем продажи, коммуникации и бизнес-процессы.</p></article></div></section>
      <section id="contacts" className="section contact-section"><div className="contact-card glass"><div className="contact-copy"><div className="eyebrow">START A PROJECT</div><h2>Есть идея?<br/><em>Давайте обсудим.</em></h2><p>Ответим в течение рабочего дня. Без брифов на 20 страниц — начнём с простого разговора.</p><div className="contact-links"><a href={`mailto:${contacts.email}`}>✉ <span>{contacts.email}</span><Arrow/></a><a href={`tel:${contacts.phoneHref}`}>⌕ <span>{contacts.phone}</span><Arrow/></a><a href={contacts.telegram} target="_blank" rel="noreferrer">◉ <span>Написать в Telegram</span><Arrow/></a></div></div></div></section>
      
    </main><footer><button className="brand" onClick={() => scroll('home')}><span className="brand-mark">C/</span><span>CodeMatrix</span></button><span>© 2025 CodeMatrix. Digital products with intent.</span><span>Made with ✦ in Almaty</span></footer>
    {modal && <div className="modal-backdrop" onMouseDown={() => setModal(false)}><div className="modal glass" onMouseDown={e => e.stopPropagation()}><button className="close-modal" onClick={() => setModal(false)}>×</button><div className="eyebrow">PROJECT ESTIMATE</div><h3>Расскажите<br/>о вашей задаче.</h3></div></div>}
  </div>;
}
export default App;
//<section className="ticker"><div>СТРАТЕГИЯ <i>✦</i> ДИЗАЙН <i>✦</i> РАЗРАБОТКА <i>✦</i> ИИ-ИНТЕГРАЦИИ <i>✦</i> СТРАТЕГИЯ <i>✦</i> ДИЗАЙН <i>✦</i></div></section>
//<LeadForm/>
//<LeadForm compact onSuccess={() => setModal(false)}/>
//<section className="map-section glass"><div className="map-copy"><span className="map-pin">✦</span><div><b>{contacts.location}</b><p>Работаем по всему Казахстану и миру</p></div></div><GoogleMap/></section>
