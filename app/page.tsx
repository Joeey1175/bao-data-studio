'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Binary, Files, Mail, Minus, Plus, Puzzle, RefreshCw, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Case Study', page: 'case-study' },
  { label: 'FAQ', page: 'faq' },
] as const;

type NavPageId = (typeof navItems)[number]['page'];
type PageId = NavPageId | 'service-cleaning' | 'service-analysis' | 'service-dashboard' | 'start-project' | 'privacy-policy' | 'terms-of-use';
type ProjectSubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

function pageFromHash(hash: string): PageId {
  const page = hash.replace('#', '');

  if (page === 'contact' || page === 'start-project') return 'start-project';
  if (page === 'privacy-policy') return 'privacy-policy';
  if (page === 'terms-of-use') return 'terms-of-use';
  if (page === 'blogs') return 'faq';
  if (page === 'behind-bao' || page === 'clarity') return 'about';
  if (page.startsWith('service-preview-')) return 'home';
  if (page === 'service-02' || page === 'service-03' || page === 'service-04') return 'services';
  if (page === 'service-cleaning' || page === 'service-analysis' || page === 'service-dashboard') return page;

  return navItems.some((item) => item.page === page) ? (page as NavPageId) : 'home';
}

const stickers = [
  { label: 'Clear', className: 'sticker sticker-clear' },
  { label: 'Practical', className: 'sticker sticker-practical' },
  { label: 'Insightful', className: 'sticker sticker-insightful' },
];

const performanceBullets = [
  '45 monthly analytical reports',
  'Competitive & performance trend analysis',
  'Data-backed recommendations that improved average views by 20%',
];

const performanceCharts = [
  { kind: 'trend', eyebrow: 'Performance Index', title: 'Performance Trend' },
  { kind: 'distribution', eyebrow: 'Top 100', title: 'Content Distribution' },
  { kind: 'bars', eyebrow: 'Relative Index', title: 'Average Content Performance' },
  { kind: 'multi', eyebrow: 'Normalized Performance Index', title: 'Monthly Performance Index' },
  { kind: 'ranking', eyebrow: 'Average Performance Index', title: 'Average Publisher Performance' },
];

const genreBullets = [
  'Genre performance & profitability analysis',
  'ROI and revenue comparison',
  'Interactive decision-making dashboard',
];

const genreSlides = [
  { src: '/case-study/movie-industry-trend-revenue-analysis.png', alt: 'Genre investment insights case study cover' },
  { src: '/case-study/movie-revenue-budget-analysis.png', alt: 'Movie revenue and budget analysis dashboard' },
  { src: '/case-study/movie-roi-weighted-roi.png', alt: 'Movie ROI and weighted ROI comparison dashboard' },
  { src: '/case-study/movie-genre-performance-summary.png', alt: 'Movie genre performance summary dashboard' },
  { src: '/case-study/movie-top-genres-roi.png', alt: 'Top movie genres by ROI dashboard' },
  { src: '/case-study/movie-decision-support.png', alt: 'Movie investment decision support dashboard' },
  { src: '/case-study/movie-interactive-genre-filter.png', alt: 'Interactive genre filter dashboard' },
];

const churnBullets = [
  'Customer churn risk analysis',
  'Key churn driver identification',
  'Explainable predictive insights',
];

const churnSlides = [
  { src: '/case-study/customer-churn-prediction-cover.png', alt: 'Customer churn prediction case study cover' },
  { src: '/case-study/churn-service-features-support.png', alt: 'Service features and support tickets by churn charts' },
  { src: '/case-study/churn-service-logins-time.png', alt: 'Logins and time in app by churn charts' },
  { src: '/case-study/churn-rate-industry.png', alt: 'Churn rate by industry chart' },
  { src: '/case-study/churn-rate-plan-type.png', alt: 'Churn rate by plan type chart' },
  { src: '/case-study/churn-rate-region.png', alt: 'Churn rate by region chart' },
  { src: '/case-study/churn-correlation-matrix.png', alt: 'Customer churn correlation matrix' },
];

const caseStudies = [
  {
    title: 'Performance Analytics & Reporting',
    summary: 'Turning ongoing performance data into structured reporting and actionable insights.',
  },
  {
    title: 'Genre Investment Insights',
    summary: 'A market and audience analysis system for evaluating genre opportunities with sharper evidence.',
  },
  {
    title: 'Customer Churn Analytics',
    summary: 'A churn analysis workflow that identifies retention risks and the customer signals behind them.',
  },
];

const serviceCards = [
  {
    number: '1',
    title: 'Clean & Prepare',
    body: 'We organize, clean, merge, and structure messy datasets, creating a reliable foundation for analysis.',
  },
  {
    number: '2',
    title: 'Analyze & Understand',
    body: 'We explore your data to uncover trends, patterns, and performance insights that answer the questions that matter.',
  },
  {
    number: '3',
    title: 'Visualize & Communicate',
    body: 'We turn findings into clear dashboards, reports, and visual stories that make insights easier to understand and act on.',
  },
];

const servicePreviews = [
  {
    slug: 'cleaning',
    title: 'Data Cleaning & Preparation',
    description: 'Turn scattered, inconsistent data into analysis-ready datasets.',
    bullets: [
      'Data cleaning & restructuring',
      'Dataset merging',
      'Data quality checks',
    ],
    image: '/service-data-cleaning.jpg',
    alt: 'Laptop, calculator, and printed business data prepared for analysis',
  },
  {
    slug: 'analysis',
    title: 'Analysis & Insights',
    description: 'Find the patterns behind your data and turn them into answers.',
    bullets: [
      'Performance & trend analysis',
      'Survey / campaign analysis',
      'Competitive analysis',
    ],
    image: '/service-analysis-insights.jpg',
    alt: 'Research questions written in a notebook beside a laptop',
  },
  {
    slug: 'reporting',
    title: 'Dashboards & Reporting',
    description: 'Make results easier to understand, share, and act on.',
    bullets: [
      'Interactive dashboards',
      'Recurring reports',
      'Data visualization & storytelling',
    ],
    image: '/service-dashboards-reporting.png',
    alt: 'Analyst presenting charts and visual findings on a board',
  },
];

const whyBaoPoints = [
  {
    title: 'No one-size-fits-all analysis',
    body: 'Every project starts with the question you actually need answered.',
    image: '/why-bao-idea.png',
    imageLabel: 'Idea icon representing analysis tailored to each question',
  },
  {
    title: 'Clear over complicated',
    body: 'Analysis should make decisions easier—not add more jargon.',
    image: '/why-bao-analytics.png',
    imageLabel: 'Analytics icon representing clear, practical analysis',
  },
  {
    title: 'Useful from day one',
    body: 'Deliverables are designed to be understood, shared, and acted on.',
    image: '/why-bao-graphic.png',
    imageLabel: 'Graphic icon representing useful, ready-to-share deliverables',
  },
];

const faqQuestions = [
  {
    question: 'What types of projects does BAO work on?',
    answer: 'BAO focuses on data cleaning and preparation, data analysis and reporting, and dashboard and data visualization projects. Whether you’re working with messy data or looking for clearer insights, we help turn what you have into something useful.',
  },
  {
    question: 'What kind of data can I bring to BAO?',
    answer: 'Excel files, CSVs, survey responses, marketing and performance data, and other structured datasets are all welcome. Your data doesn’t need to be perfectly organized—that’s often where we come in.',
  },
  {
    question: 'What will I receive at the end of a project?',
    answer: 'It depends on what you need. Deliverables may include cleaned datasets, analysis reports, KPI summaries, dashboards, visualizations, or actionable findings and recommendations—all agreed on before the project begins.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Every project is different. Timing depends on the amount and condition of your data, the complexity of the analysis, and the final deliverables, so we’ll provide a clear timeline once the project scope is defined.',
  },
  {
    question: 'How does pricing work?',
    answer: 'BAO uses project-based pricing based on the scope, complexity, and deliverables of each project. Once we understand what you need, we’ll provide a clear quote before any work begins.',
  },
  {
    question: 'What if I’m not sure what kind of analysis I need?',
    answer: 'No problem—you don’t need to have the technical solution figured out. Tell us what data you have, what you’re trying to understand, and where you’re getting stuck, and we’ll help identify the most practical next step.',
  },
];


const clarityComparisons = [
  { before: 'Scattered data', after: 'Structured data', icon: Puzzle, tone: 'mint' },
  { before: 'Manual, repetitive work', after: 'Streamlined workflows', icon: RefreshCw, tone: 'lavender' },
  { before: 'Numbers without context', after: 'Meaningful insights', icon: Binary, tone: 'brie' },
  { before: 'Overwhelming reports', after: 'Clear visual stories', icon: Files, tone: 'mint' },
  { before: '\u201CWhat happened?\u201D', after: '\u201CWhat should we do next?\u201D', icon: Search, tone: 'pink' },
];

const titleParts = [
  { text: 'B', className: 'title-part title-initial' },
  { text: 'etter', className: 'title-part title-rest title-etter' },
  { text: 'A', className: 'title-part title-initial' },
  { text: 'nalysis', className: 'title-part title-rest title-nalysis' },
  { text: 'O', className: 'title-part title-initial' },
  { text: 'ption.', className: 'title-part title-rest title-ption' },
];

function PerformanceChart({ chart }: { chart: { kind: string; eyebrow: string; title: string } }) {
  return (
    <div className={`analytics-chart analytics-chart-${chart.kind}`}>
      <div className="chart-heading">
        <p>{chart.eyebrow}</p>
        <h4>{chart.title}</h4>
      </div>

      {chart.kind === 'trend' && (
        <div className="chart-frame line-chart-frame">
          <svg className="trend-svg" viewBox="42 42 650 314" role="img" aria-label="Monthly performance trend line chart">
            <g className="chart-grid">
              {[70, 116, 162, 208, 254, 300].map((y) => (
                <line x1="78" x2="658" y1={y} y2={y} key={y} />
              ))}
            </g>
            <g className="chart-axis-labels y-labels">
              {['140', '120', '100', '80', '60', '40', '20', '0'].map((label, index) => (
                <text x="58" y={72 + index * 34} key={label}>{label}</text>
              ))}
            </g>
            <path
              className="line-main"
              d="M78 70 C96 116 112 194 132 254 S176 102 206 116 248 132 276 162 324 95 354 116 396 166 426 208 482 142 516 132 562 105 592 150 626 168 658 146"
            />
            {[['78','70'], ['132','254'], ['206','116'], ['276','162'], ['354','116'], ['426','208'], ['516','132'], ['592','150'], ['658','146']].map(([cx, cy]) => (
              <circle className="line-dot" cx={cx} cy={cy} r="8" key={`${cx}-${cy}`} />
            ))}
            <g className="chart-axis-labels x-labels">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, index) => (
                <text x={78 + index * 52.7} y="332" key={label}>{label}</text>
              ))}
            </g>
          </svg>
        </div>
      )}

      {chart.kind === 'distribution' && (
        <div className="chart-frame distribution-frame">
          <div className="donut-chart" aria-label="Top 100 content distribution chart" />
          {[
            ['Category A', '12.9%', 'top'],
            ['Category B', '15.5%', 'right'],
            ['Category C', '23.3%', 'bottom-right'],
            ['Category D', '7.8%', 'bottom'],
            ['Category E', '13.8%', 'bottom-left'],
            ['Others', '26.7%', 'left'],
          ].map(([label, value, position]) => (
            <div className={`donut-label donut-label-${position}`} key={label}>
              <strong>{label}</strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}

      {chart.kind === 'bars' && (
        <div className="chart-frame vertical-bar-chart" aria-label="Average content performance bar chart">
          <div className="vertical-scale" aria-hidden="true">
            {[120, 100, 80, 60, 40, 20, 0].map((label) => <span key={label}>{label}</span>)}
          </div>
          <div className="vertical-bars">
            {[
              ['Category A', '87.5%', 'var(--tea-leaves)'],
              ['Category B', '72.5%', 'var(--primary)'],
              ['Category C', '28.33%', 'var(--sage)'],
              ['Category D', '40%', 'var(--parchment)'],
              ['Category E', '20.83%', 'var(--brie)'],
            ].map(([label, height, color]) => (
              <div
                className="vbar"
                style={{ '--h': height, '--bar-color': color } as React.CSSProperties}
                key={label}
              >
                <i />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {chart.kind === 'multi' && (
        <div className="chart-frame multi-line-frame">
          <svg viewBox="0 0 720 420" role="img" aria-label="Monthly performance index multi-line chart">
            <g className="chart-grid">
              {[72, 132, 192, 252, 312].map((y) => (
                <line x1="92" x2="628" y1={y} y2={y} key={y} />
              ))}
            </g>
            <g className="chart-axis-labels y-labels">
              {['1200', '900', '600', '300', '0'].map((label, index) => (
                <text x="58" y={78 + index * 60} key={label}>{label}</text>
              ))}
            </g>
            <path className="multi-line publisher-a" d="M92 292 C150 205 172 112 246 112 S360 212 432 194 548 262 628 330" />
            <path className="multi-line publisher-b" d="M92 300 C174 270 226 262 312 278 S470 292 628 314" />
            <path className="multi-line publisher-c" d="M92 340 C174 352 234 326 326 330 S502 320 628 350" />
            <path className="multi-line publisher-d" d="M92 354 C190 324 298 326 412 320 S548 316 628 306" />
            <path className="multi-line publisher-e" d="M92 346 C188 366 276 360 382 356 S520 360 628 356" />
            <path className="multi-line publisher-f" d="M92 210 C180 288 250 300 332 252 S476 188 628 292" />
            <g className="chart-axis-labels x-labels multi-x">
              {['Jan', 'Feb', 'Mar', 'Apr'].map((label, index) => (
                <text x={92 + index * 178} y="386" key={label}>{label}</text>
              ))}
            </g>
          </svg>
          <div className="chart-legend">
            {['Publisher A', 'Publisher B', 'Publisher C', 'Publisher D', 'Publisher E', 'Publisher F'].map((label, index) => (
              <span className={`legend-item legend-${index + 1}`} key={label}>{label}</span>
            ))}
          </div>
        </div>
      )}

      {chart.kind === 'ranking' && (
        <div className="chart-frame ranking-frame">
          {[
            ['A', '92%', 'var(--tea-leaves)'],
            ['F', '86%', 'var(--primary)'],
            ['B', '55%', 'var(--sage)'],
            ['D', '24%', 'var(--elise)'],
            ['C', '19%', 'var(--parchment)'],
            ['E', '12%', 'var(--brie)'],
          ].map(([label, width, color]) => (
            <div className="ranking-row" key={label}>
              <strong>{label}</strong>
              <span style={{ '--bar-width': width, '--bar-color': color } as React.CSSProperties} />
            </div>
          ))}
          <div className="ranking-axis" aria-hidden="true">
            {[0, 100, 200, 300, 400, 500].map((label) => <span key={label}>{label}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [expand, setExpand] = useState(0);
  const [activePage, setActivePage] = useState<PageId>('home');
  const [openCase, setOpenCase] = useState(-1);
  const [caseSlide, setCaseSlide] = useState(0);
  const [genreSlide, setGenreSlide] = useState(0);
  const [churnSlide, setChurnSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectSubmitStatus, setProjectSubmitStatus] = useState<ProjectSubmitStatus>('idle');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setExpand(1);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const syncPageToUrl = () => {
      setActivePage(pageFromHash(window.location.hash));
      window.scrollTo({ top: 0 });
    };

    syncPageToUrl();
    window.addEventListener('popstate', syncPageToUrl);

    return () => {
      window.removeEventListener('popstate', syncPageToUrl);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', closeMenuOnEscape);
    return () => window.removeEventListener('keydown', closeMenuOnEscape);
  }, [mobileMenuOpen]);

  const navigateTo = (page: PageId) => {
    setMobileMenuOpen(false);
    setActivePage(page);
    window.history.pushState(null, '', page === 'home' ? window.location.pathname : `#${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, page: PageId) => {
    event.preventDefault();
    navigateTo(page);
  };

  const handleProjectClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo('start-project');
  };

  const handleProjectSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      _subject: 'New BAO project inquiry',
      _template: 'table',
      _captcha: 'false',
      _honey: String(formData.get('_honey') ?? ''),
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company_organization: String(formData.get('company') || 'Not provided'),
      help_needed: String(formData.get('service') ?? ''),
      project_details: String(formData.get('project') ?? ''),
      timeline: String(formData.get('timeline') || 'Flexible / Not sure yet'),
      submitted_from: window.location.href,
    };

    setProjectSubmitStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/baodatastudio@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
      const submissionFailed = !response.ok || result?.success === false || result?.success === 'false';

      if (submissionFailed) {
        throw new Error('Project inquiry submission failed');
      }

      form.reset();
      setProjectSubmitStatus('success');
    } catch {
      setProjectSubmitStatus('error');
    }
  };

  const handleNextServiceClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActivePage('services');
    window.history.pushState(null, '', '#service-02');
    window.requestAnimationFrame(() => {
      document.getElementById('service-02')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <main
      className="home-shell"
      data-page={activePage}
      style={{ '--expand': expand } as React.CSSProperties}
    >
      <header className="site-nav" aria-label="Primary navigation">
        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-site-menu"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        >
          Menu
        </button>
        <a
          className="nav-brand"
          href="#home"
          aria-label="BAO home"
          aria-current={activePage === 'home' ? 'page' : undefined}
          onClick={(event) => handleNavClick(event, 'home')}
        >
          BAO
        </a>
        <nav className="nav-links" aria-label="Site sections">
          {navItems.map((item) => (
            <a
              href={`#${item.page}`}
              data-active={activePage === item.page || (item.page === 'services' && (activePage === 'service-cleaning' || activePage === 'service-analysis' || activePage === 'service-dashboard'))}
              aria-current={activePage === item.page || (item.page === 'services' && (activePage === 'service-cleaning' || activePage === 'service-analysis' || activePage === 'service-dashboard')) ? 'page' : undefined}
              onClick={(event) => handleNavClick(event, item.page)}
              key={item.page}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-action" href="#start-project" onClick={handleProjectClick}>
          Start a Project →
        </a>

        {mobileMenuOpen && (
          <nav className="mobile-menu-panel" id="mobile-site-menu" aria-label="Mobile site sections">
            {navItems.map((item) => (
              <a
                href={`#${item.page}`}
                aria-current={activePage === item.page ? 'page' : undefined}
                onClick={(event) => handleNavClick(event, item.page)}
                key={item.page}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#start-project"
              aria-current={activePage === 'start-project' ? 'page' : undefined}
              onClick={handleProjectClick}
            >
              Start a Project
            </a>
          </nav>
        )}
      </header>

      <section id="home" className="bao-scroll" aria-labelledby="bao-title" hidden={activePage !== 'home'}>
        <div className="bao-home">
          <div className="hero-copy">
            <h1 id="bao-title" className="wordmark-line" aria-label="Better Analysis Option.">
              {titleParts.map((part, index) => (
                <span className={part.className} key={`${part.text}-${index}`}>
                  {part.text}
                </span>
              ))}
            </h1>
            <p className="hero-description">
              Turning messy data into clear, actionable insights.
            </p>
            <div className="hero-actions">
              <a className="hero-button hero-button-primary" href="#start-project" onClick={handleProjectClick}>
                <span>Start a Project</span>
                <ArrowRight aria-hidden="true" strokeWidth={2.4} />
              </a>
              <a
                className="hero-button hero-button-secondary"
                href="#about"
                onClick={(event) => handleNavClick(event, 'about')}
              >
                <span>Explore More</span>
                <ArrowRight aria-hidden="true" strokeWidth={2.4} />
              </a>
            </div>
          </div>

          <div className="floating-stickers" aria-label="BAO qualities">
            {stickers.map((sticker) => (
              <span className={sticker.className} key={sticker.label}>
                {sticker.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section view-first-section" aria-labelledby="about-title" hidden={activePage !== 'about'}>
        <div className="about-kicker">
          <span aria-hidden="true" />
          <p>About BAO</p>
        </div>
        <div className="about-intro">
          <h2 id="about-title">Better analysis starts with clearer questions.</h2>
          <div className="about-copy">
            <p>BAO Data Studio helps turn messy, scattered data into clear insights that are easier to understand and act on.</p>
            <p>We combine data preparation, analysis, and visualization to answer practical business questions — without making the process more complicated than it needs to be.</p>
          </div>
        </div>
      </section>

      <section id="clarity" className="clarity-section" aria-labelledby="clarity-title" hidden={activePage !== 'about'}>
        <h2 id="clarity-title">Analysis should make things clearer.</h2>
        <div className="clarity-compare">
          <div className="clarity-column clarity-before">
            <h3>Before</h3>
            <ul>
              {clarityComparisons.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.before}>
                    <span className={`clarity-icon clarity-icon-${item.tone}`} aria-hidden="true">
                      <Icon strokeWidth={2.5} />
                    </span>
                    <span>{item.before}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="clarity-column clarity-after">
            <h3>With BAO</h3>
            <ul>
              {clarityComparisons.map((item) => (
                <li key={item.after}>
                  <span className="clarity-icon clarity-arrow" aria-hidden="true">
                    <ArrowRight strokeWidth={2.5} />
                  </span>
                  <span>{item.after}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="behind-bao" className="founder-section" aria-labelledby="founder-title" hidden={activePage !== 'about'}>
        <div className="founder-kicker">
          <span aria-hidden="true" />
          <p>Behind BAO</p>
        </div>
        <div className="founder-grid">
          <figure className="founder-profile">
            <div className="founder-portrait">
              <img
                src="/zeying-xu.jpeg"
                alt="Portrait of Zeying Xu, founder of BAO Data Studio"
                width="724"
                height="1086"
              />
            </div>
            <figcaption>
              <div>
                <h3>Zeying Xu</h3>
                <p>Founder of BAO Data Studio</p>
              </div>
              <a
                className="founder-linkedin"
                href="https://www.linkedin.com/in/zeying-joeey-xu-1b3a76356"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Zeying Xu on LinkedIn"
              >
                <span aria-hidden="true">in</span>
              </a>
            </figcaption>
          </figure>

          <div className="founder-story">
            <p className="founder-eyebrow">Founder Story</p>
            <h2 id="founder-title">
              BAO started with a simple observation: having more data doesn&rsquo;t always make decisions easier.
            </h2>
            <div className="founder-copy">
              <p>
                Over the past few years, I&rsquo;ve worked with everything from long-term performance reports and campaign data to surveys, competitive research, and messy spreadsheets. Again and again, I saw the same challenge: the information was there, but turning it into something clear, useful, and actionable was often the hardest part.
              </p>
              <p>
                That idea became BAO &mdash; <strong>Better Analysis Option.</strong>
              </p>
              <p>
                I created BAO to make data analysis feel more practical and approachable. Whether that means cleaning an inconsistent dataset, uncovering patterns, or turning findings into a dashboard or report, the goal is the same: <strong>make the next decision clearer.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="what-we-do" className="services-section" aria-labelledby="services-title" hidden={activePage !== 'home'}>
        <div className="section-kicker">
          <span aria-hidden="true" />
          <p>What We Do</p>
        </div>
        <h2 id="services-title" className="services-heading">
          From messy data to meaningful decisions,<br />
          we make every step clearer.
        </h2>
        <div className="service-grid">
          {serviceCards.map((card) => (
            <article className="service-card" key={card.number}>
              <div className={`service-number service-number-${card.number}`}>
                {card.number}
              </div>
              <div className="service-copy">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="services-preview-section"
        aria-labelledby="services-preview-title"
        hidden={activePage !== 'home'}
      >
        <div className="services-preview-header">
          <div className="section-kicker">
            <span aria-hidden="true" />
            <p>Our Services</p>
          </div>
          <h2 id="services-preview-title">Services Preview</h2>
        </div>

        <div className="services-preview-list">
          {servicePreviews.map((service) => (
            <article className="service-preview" id={`service-preview-${service.slug}`} key={service.title}>
              <figure className="service-preview-media">
                <img src={service.image} alt={service.alt} />
              </figure>
              <div className="service-preview-content">
                <div className="service-preview-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <a
                  className="service-preview-button"
                  href="#services"
                  onClick={(event) => handleNavClick(event, 'services')}
                >
                  <span>Explore Service</span>
                  <ArrowRight aria-hidden="true" strokeWidth={2.4} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="why-bao"
        className="why-bao-section"
        aria-labelledby="why-bao-title"
        hidden={activePage !== 'home'}
      >
        <div className="why-bao-header">
          <div className="section-kicker">
            <span aria-hidden="true" />
            <p>Why BAO</p>
          </div>
          <h2 id="why-bao-title">Clear. Practical. Built around your data.</h2>
        </div>

        <Tabs className="why-bao-tabs" defaultValue="why-1">
          <TabsList className="why-bao-tab-list" aria-label="Why BAO points">
            {whyBaoPoints.map((point, index) => (
              <TabsTrigger value={`why-${index + 1}`} key={point.title}>
                {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {whyBaoPoints.map((point, index) => (
            <TabsContent
              className="why-bao-content"
              value={`why-${index + 1}`}
              key={point.title}
            >
              <div className="why-bao-copy">
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </div>
              <div
                className="why-bao-visual"
                role="img"
                aria-label={point.imageLabel}
                style={{ '--why-icon': `url(${point.image})` } as React.CSSProperties}
              />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section
        id="services"
        className="service-detail-section view-first-section"
        aria-labelledby="services-page-title"
        hidden={activePage !== 'services'}
      >
        <header className="services-page-header">
          <img
            className="services-page-header-image"
            src="/service-data-cleaning.jpg"
            alt=""
            aria-hidden="true"
          />
          <div className="services-page-header-copy">
            <p className="services-page-kicker">Services</p>
            <h1 id="services-page-title">
              Better Data.<br />
              Clearer Decisions.
            </h1>
            <p className="services-page-description">
              From messy datasets to meaningful insights, BAO helps turn your data into something you can understand, use, and act on.
            </p>
          </div>
        </header>

        <article className="service-detail-card">
          <div className="service-detail-content">
            <div className="service-detail-number" aria-label="Service 01">01</div>

            <div className="service-detail-intro">
              <h2>Data Cleaning &amp; Preparation</h2>
              <p>Turn messy, scattered data into something you can actually work with.</p>
            </div>

            <div className="service-deliverables">
              <h3>Typical Deliverables</h3>
              <div className="service-labels" aria-label="Typical deliverables">
                {[
                  'Cleaned dataset',
                  'Data dictionary',
                  'Processing summary',
                  'Analysis-ready files',
                ].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>

            <a
              className="service-detail-button"
              href="#service-cleaning"
              onClick={(event) => handleNavClick(event, 'service-cleaning')}
            >
              <span>Explore More</span>
              <ArrowRight aria-hidden="true" strokeWidth={2.4} />
            </a>
          </div>

          <figure className="service-detail-media">
            <img
              src="/service-data-cleaning-detail.jpg"
              alt="Team reviewing charts and preparing business data for analysis"
            />
          </figure>
        </article>

        <article className="service-detail-card" id="service-02">
          <div className="service-detail-content">
            <div className="service-detail-number" aria-label="Service 02">02</div>

            <div className="service-detail-intro">
              <h2>Data Analysis &amp; Reporting</h2>
              <p>Find the patterns behind your numbers — and understand what they mean.</p>
            </div>

            <div className="service-deliverables">
              <h3>Typical Deliverables</h3>
              <div className="service-labels" aria-label="Typical deliverables">
                {[
                  'Analysis report',
                  'KPI summary',
                  'Charts & tables',
                  'Key findings',
                  'Actionable recommendations',
                ].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>

            <a
              className="service-detail-button"
              href="#service-analysis"
              onClick={(event) => handleNavClick(event, 'service-analysis')}
            >
              <span>Explore More</span>
              <ArrowRight aria-hidden="true" strokeWidth={2.4} />
            </a>
          </div>

          <figure className="service-detail-media service-detail-media-analysis">
            <img
              src="/service-data-analysis-detail.jpg"
              alt="Pen pointing to sales and cost lines in a data report"
            />
          </figure>
        </article>

        <article className="service-detail-card" id="service-03">
          <div className="service-detail-content">
            <div className="service-detail-number" aria-label="Service 03">03</div>

            <div className="service-detail-intro">
              <h2>Dashboard &amp; Data Visualization</h2>
              <p>Turn complex results into visuals people can understand at a glance.</p>
            </div>

            <div className="service-deliverables">
              <h3>Typical Deliverables</h3>
              <div className="service-labels" aria-label="Typical deliverables">
                {[
                  'Interactive dashboard',
                  'KPI views',
                  'Visualization package',
                  'Dashboard documentation',
                ].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>

            <a
              className="service-detail-button"
              href="#service-dashboard"
              onClick={(event) => handleNavClick(event, 'service-dashboard')}
            >
              <span>Explore More</span>
              <ArrowRight aria-hidden="true" strokeWidth={2.4} />
            </a>
          </div>

          <figure className="service-detail-media service-detail-media-dashboard">
            <img
              src="/service-dashboard-visualization-cropped.png"
              alt="Hands holding a report with colorful dashboard charts"
            />
          </figure>
        </article>

        <article className="service-detail-card service-contact-card" id="service-04">
          <div className="service-detail-content">
            <div className="service-detail-number" aria-label="Service 04">04</div>

            <div className="service-detail-intro">
              <h2>Not sure where your project fits?</h2>
              <p>
                You don&rsquo;t need to know exactly what kind of analysis you need. Tell us what you&rsquo;re working with, what you&rsquo;re trying to understand, and where you&rsquo;re getting stuck. We&rsquo;ll help identify the right next step.
              </p>
            </div>

            <a
              className="service-detail-button service-contact-button"
              href="#start-project"
              onClick={handleProjectClick}
            >
              <span>Tell Us About Your Project</span>
              <ArrowRight aria-hidden="true" strokeWidth={2.4} />
            </a>
          </div>

          <figure className="service-detail-media service-detail-media-contact">
            <img
              src="/service-project-fit.jpg"
              alt="Layered paper question marks representing an undefined project challenge"
            />
          </figure>
        </article>
      </section>

      <section
        id="service-cleaning"
        className="service-story-section view-first-section"
        aria-labelledby="service-cleaning-title"
        hidden={activePage !== 'service-cleaning'}
      >
        <header className="service-story-header">
          <p className="service-story-kicker">Service 01 · Data Cleaning &amp; Preparation</p>
          <h1 id="service-cleaning-title">Messy data in. Clear answers out.</h1>
          <p>
            From messy datasets to meaningful insights, BAO helps turn information into something you can understand, use, and act on.
          </p>
        </header>

        <figure className="service-story-hero">
          <img
            src="/service-data-cleaning-detail.jpg"
            alt="Team reviewing charts and preparing business data for analysis"
          />
        </figure>

        <div className="service-story-layout">
          <div className="service-story-copy">
            <p className="service-story-lead">
              Raw data rarely arrives ready for analysis. BAO helps organize, clean, combine, and validate your data so you have a reliable foundation for whatever comes next.
            </p>

            <section aria-labelledby="service-help-title">
              <h2 id="service-help-title">When this service can help</h2>
              <ul>
                <li>Multiple Excel or CSV files need to be combined</li>
                <li>Data contains duplicates, missing values, or inconsistent formats</li>
                <li>Survey or event data needs to be organized</li>
                <li>Existing datasets have become difficult to maintain</li>
                <li>Data needs to be prepared before analysis or visualization</li>
              </ul>
            </section>

            <section aria-labelledby="service-do-title">
              <h2 id="service-do-title">What BAO can do</h2>
              <ul>
                <li>Data cleaning &amp; standardization</li>
                <li>Dataset merging &amp; restructuring</li>
                <li>Duplicate and missing-value handling</li>
                <li>Data validation &amp; quality checks</li>
                <li>Survey and event data preparation</li>
                <li>Analysis-ready dataset creation</li>
              </ul>
            </section>
          </div>

          <aside className="service-story-sidebar" aria-label="Service details">
            <dl className="service-story-facts">
              <div>
                <dt>Inputs</dt>
                <dd>Excel · CSV · Survey Data</dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>Excel · Python · SQL</dd>
              </div>
              <div>
                <dt>Deliverables</dt>
                <dd>
                  <span>Clean Dataset</span>
                  <span>Data Dictionary</span>
                  <span>Processing Summary</span>
                </dd>
              </div>
            </dl>

            <div className="service-story-cta">
              <h2>Have messy data?</h2>
              <a href="#start-project" onClick={handleProjectClick}>
                <span>Get Started</span>
                <ArrowRight aria-hidden="true" strokeWidth={2.4} />
              </a>
            </div>
          </aside>
        </div>

        <a
          className="service-story-next"
          href="#service-02"
          onClick={handleNextServiceClick}
          aria-label="Next service: Analysis and Insights"
        >
          <span>Next</span>
          <ArrowRight aria-hidden="true" strokeWidth={1.6} />
        </a>
      </section>

      <section
        id="service-analysis"
        className="service-story-section view-first-section"
        aria-labelledby="service-analysis-title"
        hidden={activePage !== 'service-analysis'}
      >
        <header className="service-story-header">
          <p className="service-story-kicker">Service 02 · Data Analysis &amp; Reporting</p>
          <h1 id="service-analysis-title">
            Go beyond the numbers.<br />
            Understand what they mean.
          </h1>
          <p>
            We uncover trends, patterns, and performance insights that turn your data into answers you can actually use.
          </p>
        </header>

        <figure className="service-story-hero service-story-hero-analysis">
          <img
            src="/service-data-analysis-detail.jpg"
            alt="Pen pointing to sales and cost lines in a data report"
          />
        </figure>

        <div className="service-story-layout">
          <div className="service-story-copy">
            <p className="service-story-lead">
              Having the data is only the beginning. BAO analyzes performance, trends, and patterns to help answer the questions behind the numbers—and communicate what matters clearly.
            </p>

            <section aria-labelledby="analysis-help-title">
              <h2 id="analysis-help-title">When this service can help</h2>
              <ul>
                <li>You have data but aren&rsquo;t sure what it is telling you</li>
                <li>Performance needs to be tracked over time</li>
                <li>Campaign or content results need to be evaluated</li>
                <li>Competitors need to be benchmarked</li>
                <li>Recurring reports take too much manual work</li>
                <li>Stakeholders need clearer insights from existing data</li>
              </ul>
            </section>

            <section aria-labelledby="analysis-do-title">
              <h2 id="analysis-do-title">What BAO can do</h2>
              <ul>
                <li>KPI &amp; performance analysis</li>
                <li>Trend analysis</li>
                <li>Marketing &amp; campaign analysis</li>
                <li>Competitive benchmarking</li>
                <li>Survey analysis</li>
                <li>Exploratory data analysis</li>
                <li>Monthly / quarterly reporting</li>
                <li>Findings &amp; recommendations</li>
              </ul>
            </section>
          </div>

          <aside className="service-story-sidebar" aria-label="Analysis service details">
            <dl className="service-story-facts">
              <div>
                <dt>Analysis</dt>
                <dd>Trends · KPIs · Performance</dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>Python · SQL · Excel</dd>
              </div>
              <div>
                <dt>Deliverables</dt>
                <dd>
                  <span>Analysis Report</span>
                  <span>KPI Summary</span>
                  <span>Key Findings &amp; Recommendations</span>
                </dd>
              </div>
            </dl>

            <div className="service-story-cta">
              <h2>Need clearer insights?</h2>
              <a href="#start-project" onClick={handleProjectClick}>
                <span>Get Started</span>
                <ArrowRight aria-hidden="true" strokeWidth={2.4} />
              </a>
            </div>
          </aside>
        </div>

        <nav className="service-story-pagination" aria-label="Service detail navigation">
          <a
            href="#service-cleaning"
            onClick={(event) => handleNavClick(event, 'service-cleaning')}
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.6} />
            <span>Previous</span>
          </a>
          <a
            href="#service-dashboard"
            onClick={(event) => handleNavClick(event, 'service-dashboard')}
          >
            <span>Next</span>
            <ArrowRight aria-hidden="true" strokeWidth={1.6} />
          </a>
        </nav>
      </section>

      <section
        id="service-dashboard"
        className="service-story-section view-first-section"
        aria-labelledby="service-dashboard-title"
        hidden={activePage !== 'service-dashboard'}
      >
        <header className="service-story-header">
          <p className="service-story-kicker">Service 03 · Dashboard &amp; Data Visualization</p>
          <h1 id="service-dashboard-title">
            See what matters.<br />
            Share it clearly.
          </h1>
          <p>
            We turn complex findings into dashboards, reports, and visual stories that make insights easier to understand and act on.
          </p>
        </header>

        <figure className="service-story-hero service-story-hero-dashboard">
          <img
            src="/service-dashboard-visualization-cropped.png"
            alt="Hands holding a report with colorful dashboard charts"
          />
        </figure>

        <div className="service-story-layout">
          <div className="service-story-copy">
            <p className="service-story-lead">
              BAO turns complex results into clear dashboards and visual reports designed around the metrics and questions that matter most.
            </p>

            <section aria-labelledby="dashboard-help-title">
              <h2 id="dashboard-help-title">When this service can help</h2>
              <ul>
                <li>Important KPIs are scattered across spreadsheets</li>
                <li>Reports are difficult to read or update</li>
                <li>Teams need a clearer view of performance</li>
                <li>Stakeholders need interactive reporting</li>
                <li>Analysis needs to be presented visually</li>
              </ul>
            </section>

            <section aria-labelledby="dashboard-do-title">
              <h2 id="dashboard-do-title">What BAO can do</h2>
              <ul>
                <li>Interactive dashboards</li>
                <li>KPI dashboards</li>
                <li>Performance dashboards</li>
                <li>Tableau development</li>
                <li>Excel-based reporting</li>
                <li>Custom charts &amp; visualizations</li>
                <li>Data storytelling</li>
                <li>Dashboard documentation</li>
              </ul>
            </section>
          </div>

          <aside className="service-story-sidebar" aria-label="Dashboard service details">
            <dl className="service-story-facts">
              <div>
                <dt>Outputs</dt>
                <dd>Dashboard · Report · Visuals</dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>Tableau · Excel · Python</dd>
              </div>
              <div>
                <dt>Deliverables</dt>
                <dd>
                  <span>Interactive Dashboard</span>
                  <span>KPI Views</span>
                  <span>Visualization Package</span>
                </dd>
              </div>
            </dl>

            <div className="service-story-cta">
              <h2>Need a clearer view of your data?</h2>
              <a href="#start-project" onClick={handleProjectClick}>
                <span>Get Started</span>
                <ArrowRight aria-hidden="true" strokeWidth={2.4} />
              </a>
            </div>
          </aside>
        </div>

        <nav className="service-story-pagination service-story-pagination-single" aria-label="Service detail navigation">
          <a
            href="#service-analysis"
            onClick={(event) => handleNavClick(event, 'service-analysis')}
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.6} />
            <span>Previous</span>
          </a>
        </nav>
      </section>

      <section id="case-study" className="case-section view-first-section" aria-labelledby="case-title" hidden={activePage !== 'case-study'}>
        <div className="case-intro">
          <h2 id="case-title">Selected Work</h2>
          <p>A few ways we've turned data into clarity.</p>
        </div>
        <div className="case-bars">
          {caseStudies.map((study, index) => {
            const isOpen = openCase === index;

            return (
              <article className="case-bar" key={study.title} data-open={isOpen}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`case-panel-${index}`}
                  onClick={() => setOpenCase(isOpen ? -1 : index)}
                >
                  <span>{study.title}</span>
                  <span className="case-plus" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className="case-panel" id={`case-panel-${index}`}>
                  <div className="case-panel-inner">
                    {index === 0 ? (
                      <div className="performance-case">
                        <div className="performance-copy">
                          <div className="case-expanded-copy">
                            <p>{study.summary}</p>
                          </div>
                          <ul className="performance-list" aria-label="Performance Analytics outcomes">
                            {performanceBullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="case-gallery" aria-label="Performance Analytics report gallery">
                          <div className="case-slides">
                            {performanceCharts.map((chart, slideIndex) => (
                              <figure
                                className="case-slide"
                                data-active={caseSlide === slideIndex}
                                key={chart.title}
                              >
                                <PerformanceChart chart={chart} />
                              </figure>
                            ))}
                          </div>
                          <button
                            className="case-arrow case-arrow-prev"
                            type="button"
                            aria-label="Previous case image"
                            onClick={() =>
                              setCaseSlide((current) =>
                                current === 0 ? performanceCharts.length - 1 : current - 1,
                              )
                            }
                          >
                            ‹
                          </button>
                          <button
                            className="case-arrow case-arrow-next"
                            type="button"
                            aria-label="Next case image"
                            onClick={() =>
                              setCaseSlide((current) =>
                                current === performanceCharts.length - 1 ? 0 : current + 1,
                              )
                            }
                          >
                            ›
                          </button>
                          <div className="case-gallery-dots" aria-label="Case image pages">
                            {performanceCharts.map((chart, slideIndex) => (
                              <button
                                type="button"
                                aria-label={`Show chart ${slideIndex + 1}`}
                                aria-current={caseSlide === slideIndex}
                                onClick={() => setCaseSlide(slideIndex)}
                                key={chart.title}
                              >
                                {slideIndex + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : index === 1 ? (
                      <div className="performance-case genre-case">
                        <div className="performance-copy genre-copy">
                          <div className="case-expanded-copy compact">
                            <p>Transforming movie performance data into clear insights for genre-level investment decisions.</p>
                          </div>
                          <ul className="performance-list" aria-label="Genre Investment Insights outcomes">
                            {genreBullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="case-gallery" aria-label="Genre Investment Insights dashboard gallery">
                          <div className="case-slides">
                            {genreSlides.map((slide, slideIndex) => (
                              <figure
                                className="case-slide case-image-slide"
                                data-active={genreSlide === slideIndex}
                                key={slide.src}
                              >
                                <img src={slide.src} alt={slide.alt} />
                              </figure>
                            ))}
                          </div>
                          <button
                            className="case-arrow case-arrow-prev"
                            type="button"
                            aria-label="Previous genre image"
                            onClick={() =>
                              setGenreSlide((current) =>
                                current === 0 ? genreSlides.length - 1 : current - 1,
                              )
                            }
                          >
                            ‹
                          </button>
                          <button
                            className="case-arrow case-arrow-next"
                            type="button"
                            aria-label="Next genre image"
                            onClick={() =>
                              setGenreSlide((current) =>
                                current === genreSlides.length - 1 ? 0 : current + 1,
                              )
                            }
                          >
                            ›
                          </button>
                          <div className="case-gallery-dots" aria-label="Genre image pages">
                            {genreSlides.map((slide, slideIndex) => (
                              <button
                                type="button"
                                aria-label={`Show genre image ${slideIndex + 1}`}
                                aria-current={genreSlide === slideIndex}
                                onClick={() => setGenreSlide(slideIndex)}
                                key={slide.src}
                              >
                                {slideIndex + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : index === 2 ? (
                      <div className="performance-case churn-case">
                        <div className="performance-copy churn-copy">
                          <div className="case-expanded-copy compact">
                            <p>Using customer data to identify churn patterns and understand the factors behind customer loss.</p>
                          </div>
                          <ul className="performance-list" aria-label="Customer Churn Analytics outcomes">
                            {churnBullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="case-gallery" aria-label="Customer Churn Analytics dashboard gallery">
                          <div className="case-slides">
                            {churnSlides.map((slide, slideIndex) => (
                              <figure
                                className="case-slide case-image-slide"
                                data-active={churnSlide === slideIndex}
                                key={slide.src}
                              >
                                <img src={slide.src} alt={slide.alt} />
                              </figure>
                            ))}
                          </div>
                          <button
                            className="case-arrow case-arrow-prev"
                            type="button"
                            aria-label="Previous churn image"
                            onClick={() =>
                              setChurnSlide((current) =>
                                current === 0 ? churnSlides.length - 1 : current - 1,
                              )
                            }
                          >
                            ‹
                          </button>
                          <button
                            className="case-arrow case-arrow-next"
                            type="button"
                            aria-label="Next churn image"
                            onClick={() =>
                              setChurnSlide((current) =>
                                current === churnSlides.length - 1 ? 0 : current + 1,
                              )
                            }
                          >
                            ›
                          </button>
                          <div className="case-gallery-dots" aria-label="Churn image pages">
                            {churnSlides.map((slide, slideIndex) => (
                              <button
                                type="button"
                                aria-label={`Show churn image ${slideIndex + 1}`}
                                aria-current={churnSlide === slideIndex}
                                onClick={() => setChurnSlide(slideIndex)}
                                key={slide.src}
                              >
                                {slideIndex + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="case-expanded-copy compact">
                        <p>{study.summary}</p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="contact" className="cta-section" aria-labelledby="cta-title" hidden={activePage !== 'case-study'}>
        <div className="cta-inner">
          <div className="cta-kicker">
            <span aria-hidden="true" />
            <p>Get Started</p>
          </div>
          <div className="cta-copy">
            <h2 id="cta-title">Have data. Need clarity?</h2>
            <p>Let's turn your data into insights you can actually use.</p>
            <a className="cta-button" href="#start-project" onClick={handleProjectClick}>
              <span>Start a Project</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="faq-section view-first-section"
        aria-labelledby="faq-title"
        hidden={activePage !== 'faq'}
      >
        <header className="faq-header">
          <h1 id="faq-title">
            You ask,<br />
            we analyze.
          </h1>
        </header>

        <div className="faq-list">
          {faqQuestions.map((item, index) => {
            const isOpen = openFaq === index;

            return (
              <article className="faq-item" data-open={isOpen} key={item.question}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {isOpen ? <Minus strokeWidth={2.2} /> : <Plus strokeWidth={2.2} />}
                  </span>
                </button>

                <div className="faq-answer-wrap" id={`faq-answer-${index}`}>
                  <div>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <h2 className="faq-closing">You don&rsquo;t need to have the technical solution figured out.</h2>
      </section>

      <section
        className="cta-section faq-cta-section"
        aria-labelledby="faq-cta-title"
        hidden={activePage !== 'faq'}
      >
        <div className="cta-inner">
          <div className="cta-kicker">
            <span aria-hidden="true" />
            <p>Ready When You Are</p>
          </div>
          <div className="cta-copy">
            <h2 id="faq-cta-title">Have data. Let&rsquo;s make sense of it.</h2>
            <p>
              Tell us what you&rsquo;re working with, what you&rsquo;re trying to understand, and where you need a
              little clarity.
            </p>
            <a className="cta-button" href="#start-project" onClick={handleProjectClick}>
              <span>Start a Project</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section
        id="start-project"
        className="project-page"
        aria-labelledby="project-page-title"
        hidden={activePage !== 'start-project'}
      >
        <header className="project-page-hero">
          <div className="project-page-hero-inner">
            <div className="project-page-kicker">
              <span aria-hidden="true" />
              <p>Start a Project</p>
            </div>
            <h1 id="project-page-title">
              Tell us what<br />
              you&rsquo;re working with.
            </h1>
            <p className="project-page-intro">
              You don&rsquo;t need to have everything figured out. Share a little about your data, your question, and
              what you&rsquo;d like to accomplish.
            </p>
          </div>
        </header>

        <div className="project-form-shell">
          <form
            className="project-form"
            onSubmit={handleProjectSubmit}
            onChange={() => {
              if (projectSubmitStatus !== 'idle' && projectSubmitStatus !== 'submitting') {
                setProjectSubmitStatus('idle');
              }
            }}
          >
            <input
              className="project-honeypot"
              name="_honey"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="project-field">
              <label htmlFor="project-name">
                <span>Name</span>
                <small>Required</small>
              </label>
              <input id="project-name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
            </div>

            <div className="project-field">
              <label htmlFor="project-email">
                <span>Email</span>
                <small>Required</small>
              </label>
              <input
                id="project-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="project-field">
              <label htmlFor="project-company">
                <span>Company / Organization</span>
                <small>Optional</small>
              </label>
              <input
                id="project-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Your company or organization"
              />
            </div>

            <div className="project-field">
              <label htmlFor="project-service">
                <span>What do you need help with?</span>
                <small>Required</small>
              </label>
              <select id="project-service" name="service" defaultValue="" required>
                <option value="" disabled>Select a service</option>
                <option>Data Cleaning &amp; Preparation</option>
                <option>Data Analysis &amp; Reporting</option>
                <option>Dashboard &amp; Data Visualization</option>
                <option>Not Sure Yet</option>
              </select>
            </div>

            <div className="project-field project-field-wide">
              <label htmlFor="project-details">
                <span>Tell us about your project</span>
                <small>Required</small>
              </label>
              <textarea
                id="project-details"
                name="project"
                placeholder="What data are you working with, what are you trying to understand, and what would you like help with?"
                required
              />
            </div>

            <div className="project-field project-field-wide">
              <label htmlFor="project-timeline">
                <span>When do you need it?</span>
                <small>Optional</small>
              </label>
              <select id="project-timeline" name="timeline" defaultValue="">
                <option value="">Choose a timeline</option>
                <option>As soon as possible</option>
                <option>Within 1–2 weeks</option>
                <option>Within a month</option>
                <option>Flexible / Not sure yet</option>
              </select>
            </div>

            <div className="project-form-actions">
              <button
                className="project-submit"
                type="submit"
                disabled={projectSubmitStatus === 'submitting'}
                aria-busy={projectSubmitStatus === 'submitting'}
                data-status={projectSubmitStatus}
              >
                <span>
                  {projectSubmitStatus === 'submitting'
                    ? 'Sending...'
                    : projectSubmitStatus === 'success'
                      ? 'Message Sent'
                      : 'Send a Message'}
                </span>
                <ArrowRight aria-hidden="true" strokeWidth={2.2} />
              </button>

              <a className="project-email-card" href="mailto:baodatastudio@gmail.com">
                <Mail aria-hidden="true" strokeWidth={2} />
                <span>baodatastudio@gmail.com</span>
              </a>

              {projectSubmitStatus === 'success' && (
                <p className="project-submit-status" role="status">
                  Thanks. Your project request has been sent to BAO.
                </p>
              )}
              {projectSubmitStatus === 'error' && (
                <p className="project-submit-status" data-error="true" role="alert">
                  We couldn&rsquo;t send your request. Please try again or email BAO directly.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

      <section
        id="privacy-policy"
        className="legal-page"
        aria-labelledby="privacy-policy-title"
        hidden={activePage !== 'privacy-policy'}
      >
        <header className="legal-page-header">
          <div className="legal-page-kicker">
            <span aria-hidden="true" />
            <p>Privacy</p>
          </div>
          <h1 id="privacy-policy-title">Privacy Policy</h1>
          <p className="legal-page-updated"><strong>Last Updated:</strong> September 2026</p>
          <p className="legal-page-intro">
            BAO Data Studio (&ldquo;BAO,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your
            privacy. This Privacy Policy explains what information we may collect when you visit our website or
            submit a project inquiry, how we use that information, and the choices available to you.
          </p>
        </header>

        <div className="legal-page-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>When you contact BAO or submit a project inquiry, you may voluntarily provide information such as:</p>
            <ul>
              <li>Your name</li>
              <li>Email address</li>
              <li>Company or organization</li>
              <li>Type of service you are interested in</li>
              <li>Preferred project timeline</li>
              <li>Information you choose to include about your project</li>
            </ul>
            <p>
              We ask that you do not submit confidential, sensitive, or proprietary datasets through the initial
              project inquiry form.
            </p>
            <p>
              We may also receive basic technical information associated with visits to our website, such as browser
              type, device information, or similar information automatically provided through our website hosting or
              service providers.
            </p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We may use the information you provide to:</p>
            <ul>
              <li>Review and respond to your inquiry</li>
              <li>Understand your project needs</li>
              <li>Communicate with you about potential or ongoing services</li>
              <li>Prepare project scopes, timelines, or estimates</li>
              <li>Operate and improve the BAO Data Studio website and services</li>
              <li>Maintain appropriate business records</li>
              <li>Comply with applicable legal obligations</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </section>

          <section>
            <h2>3. How We Share Information</h2>
            <p>BAO does not sell or rent your personal information.</p>
            <p>
              Information may be shared with service providers when reasonably necessary to operate the website,
              process inquiries, provide services, or support business operations. We may also disclose information
              when required by law or when reasonably necessary to protect our rights or comply with a legal
              obligation.
            </p>
          </section>

          <section>
            <h2>4. Data Retention</h2>
            <p>
              We retain personal information only for as long as reasonably necessary for the purposes described in
              this Privacy Policy, including responding to inquiries, providing services, maintaining business
              records, and meeting applicable legal requirements.
            </p>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We take reasonable measures to protect the information submitted to us. However, no website, email
              communication, or method of electronic storage can be guaranteed to be completely secure.
            </p>
            <p>
              Please do not submit sensitive or confidential business data through the website&rsquo;s initial contact
              or project inquiry form. If a project requires access to business datasets or other confidential
              information, appropriate arrangements can be discussed separately.
            </p>
          </section>

          <section>
            <h2>6. Your Privacy Choices</h2>
            <p>
              You may contact us to request access to, correction of, or deletion of personal information you have
              provided to BAO, subject to applicable legal and business recordkeeping requirements.
            </p>
            <p>California residents may also have additional privacy rights under applicable California law.</p>
          </section>

          <section>
            <h2>7. Third-Party Services</h2>
            <p>
              Our website may rely on third-party providers for services such as website hosting, form processing, or
              other website functionality. Those providers may process information according to their own privacy
              practices.
            </p>
            <p>
              Our website may also contain links to third-party websites. BAO is not responsible for the privacy
              practices or content of those external websites.
            </p>
          </section>

          <section>
            <h2>8. Children&rsquo;s Privacy</h2>
            <p>
              BAO Data Studio&rsquo;s services are intended for businesses and adults seeking analytics services and
              are not directed toward children under 13. We do not knowingly collect personal information from
              children under 13 through our website.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy as our website, services, or privacy practices change. Any updated
              version will be posted on this page with a revised &ldquo;Last Updated&rdquo; date.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or your personal information, please contact:</p>
            <address>
              BAO Data Studio<br />
              Los Angeles, California<br />
              Email: <a href="mailto:baodatastudio@gmail.com">baodatastudio@gmail.com</a>
            </address>
          </section>
        </div>
      </section>

      <section
        id="terms-of-use"
        className="legal-page"
        aria-labelledby="terms-of-use-title"
        hidden={activePage !== 'terms-of-use'}
      >
        <header className="legal-page-header">
          <div className="legal-page-kicker">
            <span aria-hidden="true" />
            <p>Terms</p>
          </div>
          <h1 id="terms-of-use-title">Terms of Use</h1>
          <p className="legal-page-updated"><strong>Last Updated:</strong> September 2026</p>
          <div className="legal-page-intro">
            <p>
              Welcome to the BAO Data Studio website. These Terms of Use (&ldquo;Terms&rdquo;) govern your access to
              and use of this website. By accessing or using this website, you agree to these Terms.
            </p>
            <p>If you do not agree with these Terms, please do not use this website.</p>
          </div>
        </header>

        <div className="legal-page-content">
          <section>
            <h2>1. About BAO Data Studio</h2>
            <p>
              BAO Data Studio (&ldquo;BAO,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides
              information about data analytics services, including data cleaning and preparation, data analysis and
              reporting, and dashboard and data visualization services.
            </p>
            <p>
              Information presented on this website is for general informational purposes and does not constitute a
              binding offer or agreement to provide services.
            </p>
          </section>

          <section>
            <h2>2. Use of This Website</h2>
            <p>
              You may use this website for lawful purposes, including learning about BAO Data Studio, reviewing our
              services and work, and contacting us about a potential project.
            </p>
            <p>You agree not to:</p>
            <ul>
              <li>Use the website for unlawful, fraudulent, or harmful purposes</li>
              <li>Attempt to interfere with the website&rsquo;s operation or security</li>
              <li>Attempt to gain unauthorized access to the website or related systems</li>
              <li>Use automated methods to misuse, disrupt, or excessively access the website</li>
              <li>Copy, reproduce, or distribute website content in violation of applicable intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2>3. Project Inquiries</h2>
            <p>
              Submitting a contact form or project inquiry does not create a client relationship, service agreement,
              partnership, or other contractual relationship between you and BAO Data Studio.
            </p>
            <p>
              Any potential project will be subject to further discussion and, where appropriate, a separate written
              agreement defining matters such as project scope, deliverables, timeline, fees, payment terms,
              confidentiality, and other applicable terms.
            </p>
            <p>
              Please do not submit confidential, sensitive, proprietary, or personally identifiable datasets through
              the initial project inquiry form.
            </p>
          </section>

          <section>
            <h2>4. Website Content</h2>
            <p>
              We make reasonable efforts to keep the information on this website accurate and current. However, we do
              not guarantee that all content will always be complete, accurate, current, or free from errors.
            </p>
            <p>Services, descriptions, availability, and other website content may be changed or updated without notice.</p>
          </section>

          <section>
            <h2>5. Case Studies and Portfolio Content</h2>
            <p>
              Case studies, project examples, dashboards, visualizations, and other work displayed on this website are
              provided to demonstrate relevant experience, approaches, and capabilities.
            </p>
            <p>
              Where appropriate, information may be summarized, anonymized, modified, or presented for portfolio
              purposes to protect confidential or proprietary information.
            </p>
            <p>Past project examples or results do not guarantee the same or similar results for future projects.</p>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>
              Unless otherwise stated, the content and materials created for this website—including text, branding,
              graphics, layouts, and original visual materials—are owned by or licensed to BAO Data Studio and are
              protected by applicable intellectual property laws.
            </p>
            <p>
              You may view and use the website for personal or legitimate business evaluation purposes. You may not
              reproduce, distribute, modify, publish, or commercially exploit BAO-owned website content without prior
              permission.
            </p>
            <p>
              Third-party names, trademarks, software, platforms, images, or other materials appearing on the website
              remain the property of their respective owners.
            </p>
          </section>

          <section>
            <h2>7. Third-Party Links and Services</h2>
            <p>
              This website may contain links to third-party websites, platforms, dashboards, or other external
              resources.
            </p>
            <p>
              BAO Data Studio does not control and is not responsible for the availability, content, security, or
              privacy practices of third-party websites or services. Accessing third-party resources is at your own
              discretion.
            </p>
          </section>

          <section>
            <h2>8. No Professional or Business Outcome Guarantee</h2>
            <p>
              Information provided through this website is general in nature and should not be considered legal, tax,
              financial, or other regulated professional advice.
            </p>
            <p>
              Data analysis and related services can support decision-making, but BAO Data Studio does not guarantee
              specific business, financial, marketing, operational, or other outcomes from the use of information
              presented on this website.
            </p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              To the extent permitted by applicable law, BAO Data Studio will not be liable for indirect, incidental,
              special, consequential, or similar damages arising from or related to your use of, or inability to use,
              this website.
            </p>
            <p>
              Nothing in these Terms is intended to exclude or limit liability where such exclusion or limitation is
              prohibited by applicable law.
            </p>
          </section>

          <section>
            <h2>10. Privacy</h2>
            <p>
              Your use of this website is also subject to our{' '}
              <a href="#privacy-policy" onClick={(event) => handleNavClick(event, 'privacy-policy')}>Privacy Policy</a>,
              which explains how information submitted through the website may be collected and used.
            </p>
          </section>

          <section>
            <h2>11. Changes to These Terms</h2>
            <p>We may update these Terms from time to time as our website, services, or business practices change.</p>
            <p>
              Any updated Terms will be posted on this page with a revised &ldquo;Last Updated&rdquo; date. Your
              continued use of the website after changes are posted constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2>12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of California, without regard to conflict-of-law
              principles.
            </p>
          </section>

          <section>
            <h2>13. Contact</h2>
            <p>If you have questions about these Terms of Use, please contact:</p>
            <address>
              BAO Data Studio<br />
              Los Angeles, California<br />
              Email: <a href="mailto:baodatastudio@gmail.com">baodatastudio@gmail.com</a>
            </address>
          </section>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-action">
            <h2>
              Let&rsquo;s Make Sense
              <br />
              of Your Data.
            </h2>
            <a className="site-footer-button" href="#start-project" onClick={handleProjectClick}>
              Start a Project
            </a>
            <p className="site-footer-copyright">&copy; 2026 BAO Data Studio</p>
          </div>

          <div className="site-footer-directory">
            <nav aria-label="Footer pages">
              <h3>Pages</h3>
              <a href="#home" onClick={(event) => handleNavClick(event, 'home')}>Home</a>
              <a href="#about" onClick={(event) => handleNavClick(event, 'about')}>About</a>
              <a href="#services" onClick={(event) => handleNavClick(event, 'services')}>Services</a>
              <a href="#case-study" onClick={(event) => handleNavClick(event, 'case-study')}>Case Studies</a>
              <a href="#faq" onClick={(event) => handleNavClick(event, 'faq')}>FAQ</a>
              <a href="#start-project" onClick={handleProjectClick}>Contact</a>
            </nav>

            <div className="site-footer-legal" aria-label="Legal">
              <h3>Legal</h3>
              <a href="#privacy-policy" onClick={(event) => handleNavClick(event, 'privacy-policy')}>Privacy Policy</a>
              <a href="#terms-of-use" onClick={(event) => handleNavClick(event, 'terms-of-use')}>Terms of Use</a>
            </div>
          </div>
        </div>

        <p className="site-footer-wordmark" aria-hidden="true">
          <span>BAO</span>
        </p>
      </footer>
    </main>
  );
}
