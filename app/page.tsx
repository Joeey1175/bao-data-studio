'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Binary, Files, Mail, Minus, Plus, Puzzle, RefreshCw, Search, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Case Study', page: 'case-study' },
  { label: 'Pricing', page: 'pricing' },
] as const;

type NavPageId = (typeof navItems)[number]['page'];
type PageId =
  | NavPageId
  | 'service-cleaning'
  | 'service-analysis'
  | 'service-dashboard'
  | 'pricing-retail-sales-analysis'
  | 'pricing-skincare-competitive-analysis'
  | 'preview-skincare-competitive-positioning'
  | 'preview-skincare-slide-report'
  | 'preview-skincare-analysis-notebook'
  | 'preview-skincare-dataset'
  | 'preview-written-analysis'
  | 'preview-slide-report'
  | 'start-project'
  | 'privacy-policy'
  | 'terms-of-use';
type ProjectSubmitStatus = 'idle' | 'submitting' | 'success';

function pageFromHash(hash: string): PageId {
  const page = hash.replace('#', '');

  if (page === 'contact' || page === 'start-project') return 'start-project';
  if (page === 'privacy-policy') return 'privacy-policy';
  if (page === 'terms-of-use') return 'terms-of-use';
  if (page === 'blogs' || page === 'faq' || page === 'pricing-faq') return 'pricing';
  if (page === 'behind-bao' || page === 'clarity') return 'about';
  if (page.startsWith('service-preview-')) return 'home';
  if (page === 'service-02' || page === 'service-03' || page === 'service-04') return 'services';
  if (page === 'service-cleaning' || page === 'service-analysis' || page === 'service-dashboard') return page;
  if (page === 'pricing-retail-sales-analysis') return page;
  if (page === 'pricing-skincare-competitive-analysis') return page;
  if (page === 'preview-skincare-competitive-positioning') return page;
  if (
    page === 'preview-skincare-slide-report' ||
    page === 'preview-skincare-analysis-notebook' ||
    page === 'preview-skincare-dataset'
  ) {
    return page;
  }
  if (page === 'preview-written-analysis' || page === 'preview-slide-report') return page;

  return navItems.some((item) => item.page === page) ? (page as NavPageId) : 'home';
}

const stickers = [
  { label: 'Clear', className: 'sticker sticker-clear' },
  { label: 'Practical', className: 'sticker sticker-practical' },
  { label: 'Insightful', className: 'sticker sticker-insightful' },
];

const reportPreviews = [
  {
    page: 'preview-written-analysis',
    title: 'Written Analysis Report',
    description: 'Retail Sales Performance Analysis - Written Business Analysis Report',
    backPage: 'pricing-retail-sales-analysis',
    pages: Array.from(
      { length: 12 },
      (_, index) => `/demo-project-written-analysis-pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
    ),
  },
  {
    page: 'preview-slide-report',
    title: 'Executive Slide Report',
    description: 'Retail Sales Performance Analysis - Executive Analysis Report',
    backPage: 'pricing-retail-sales-analysis',
    pages: Array.from({ length: 9 }, (_, index) => `/demo-project-slide-report-pages/page-${index + 1}.jpg`),
  },
  {
    page: 'preview-skincare-slide-report',
    title: 'Executive Slide Report',
    description: 'Skincare Competitive Analysis - Executive Slide Report',
    backPage: 'pricing-skincare-competitive-analysis',
    pages: Array.from({ length: 9 }, (_, index) => `/demo2-slide-report-pages/page-${index + 1}.jpg`),
  },
] as const;

const pricingServices = [
  {
    number: '01',
    title: 'Data Cleaning',
    tagline: 'Prepare your data for reliable analysis.',
    description:
      'For businesses with messy, inconsistent, or unstructured data that needs to be cleaned and organized before analysis.',
    priceLabel: 'Starting at',
    price: '$99',
    buttonLabel: 'Start a Project',
    includedLabel: 'Included',
    included: [
      'Data quality review',
      'Missing & duplicate handling',
      'Data formatting & standardization',
      'Dataset merging',
      'Analysis-ready Excel / CSV',
      'Data dictionary',
    ],
  },
  {
    number: '02',
    title: 'Data Visualization',
    tagline: 'Turn your data into clear, decision-ready visuals.',
    description:
      'For businesses that need a clearer way to track performance, communicate results, and understand key metrics.',
    priceLabel: 'Starting at',
    price: '$249',
    buttonLabel: 'Start a Project',
    includedLabel: 'Included',
    included: [
      'KPI & metric design',
      'Charts & visual reporting',
      'Interactive dashboards',
      'Tableau / Excel reporting',
      'Dashboard filters',
      'Presentation-ready visuals',
    ],
  },
  {
    number: '03',
    title: 'Business Analysis',
    tagline: 'Turn your data into actionable business insights.',
    description:
      'For businesses that want to understand performance, identify patterns, and make better-informed decisions.',
    priceLabel: 'Starting at',
    price: 'Custom',
    buttonLabel: 'Request a Quote',
    includedLabel: 'Tailored to your needs',
    included: [
      'Performance & trend analysis',
      'Customer & product analysis',
      'Competitor analysis',
      'KPI interpretation',
      'Business recommendations',
      'Written or slide reporting',
    ],
  },
] as const;

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
    answer: 'Deliverables depend on the project scope and may include cleaned datasets, Excel or CSV files, dashboards, analytical reports, slide reports, and supporting documentation.',
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
  {
    question: 'How is project pricing determined?',
    answer: 'Pricing depends on the scope, dataset size and complexity, required analysis, and final deliverables. Starting prices are provided as a reference, and a project estimate will be confirmed after reviewing your request.',
  },
  {
    question: 'Can I request only one service?',
    answer: 'Yes. Services can be requested individually or combined based on your project needs. For example, you can request data cleaning only, or combine cleaning, visualization, and business analysis.',
  },
  {
    question: 'What do I need to provide to get started?',
    answer: 'Usually, you’ll need to provide your dataset, a brief description of your business question or goal, and any preferred deliverables. If you’re not sure what you need, you can simply describe the problem you’re trying to solve.',
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
          <svg className="trend-svg" viewBox="0 42 720 314" role="img" aria-label="Monthly performance trend line chart">
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
  const datasetPreviewRef = useRef<HTMLDivElement>(null);

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
      const shouldOpenPricingFaq = window.location.hash === '#pricing-faq' || window.location.hash === '#faq';

      if (shouldOpenPricingFaq) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            document.getElementById('pricing-faq')?.scrollIntoView({ block: 'start' });
          });
        });
      } else {
        window.scrollTo({ top: 0 });
      }

      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('sent') === '1') {
        setProjectSubmitStatus('success');
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.hash}`);
      }
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

  const handlePricingFaqClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    setActivePage('pricing');
    window.history.pushState(null, '', '#pricing-faq');
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById('pricing-faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  const scrollDatasetPreview = (direction: -1 | 1) => {
    const viewport = datasetPreviewRef.current;

    if (!viewport) return;

    viewport.scrollBy({ left: viewport.clientWidth * direction, behavior: 'smooth' });
  };

  const isNavItemActive = (page: NavPageId) =>
    activePage === page ||
    (page === 'services' &&
      (activePage === 'service-cleaning' || activePage === 'service-analysis' || activePage === 'service-dashboard')) ||
    (page === 'pricing' &&
      (activePage === 'pricing-retail-sales-analysis' ||
        activePage === 'pricing-skincare-competitive-analysis' ||
        activePage === 'preview-skincare-competitive-positioning' ||
        activePage === 'preview-skincare-slide-report' ||
        activePage === 'preview-skincare-analysis-notebook' ||
        activePage === 'preview-skincare-dataset' ||
        activePage === 'preview-written-analysis' ||
        activePage === 'preview-slide-report'));

  const handleProjectSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const autoresponse = form.elements.namedItem('_autoresponse');

    if (autoresponse instanceof HTMLInputElement) {
      autoresponse.value = `Hi ${name},

Thank you for reaching out to BAO Data Studio!
We’ve received your project request and are looking forward to learning more about what you’re working on.

We’ll review the details and get back to you as soon as possible with the next steps or any questions we may have.

Best,
BAO Data Studio
Better Analysis Option
baodatastudio@gmail.com`;
    }

    setProjectSubmitStatus('submitting');
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
              data-active={isNavItemActive(item.page)}
              aria-current={isNavItemActive(item.page) ? 'page' : undefined}
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
                aria-current={isNavItemActive(item.page) ? 'page' : undefined}
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
        id="pricing"
        className="pricing-demo-section view-first-section"
        aria-labelledby="pricing-demo-title"
        hidden={activePage !== 'pricing'}
      >
        <div className="pricing-demo-grid">
          <h1 id="pricing-demo-title">See Our Work in Action</h1>
          <div className="pricing-demo-copy">
            <div className="pricing-demo-kicker">
              <span aria-hidden="true" />
              <p>Demo Project</p>
            </div>
            <p>
              See what a BAO Data Studio project can include, from data preparation and analysis to dashboards and
              decision-ready insights.
            </p>
          </div>
        </div>

        <div className="pricing-demo-projects">
          <a
            className="pricing-demo-card pricing-demo-card-link"
            href="#pricing-retail-sales-analysis"
            aria-label="View Retail Sales Performance Analysis demo project"
            onClick={(event) => handleNavClick(event, 'pricing-retail-sales-analysis')}
          >
            <img
              src="/pricing-retail-sales-analysis.jpg"
              alt="Illuminated shopping cart sign above a retail entrance"
            />
            <div className="pricing-demo-card-caption">
              <h2>Retail Sales Performance Analysis</h2>
              <p>
                <strong>23K+</strong>
                <span>Orders analyzed across sales, products, markets, and customers.</span>
              </p>
            </div>
          </a>

          <a
            className="pricing-demo-card pricing-demo-card-link"
            href="#pricing-skincare-competitive-analysis"
            aria-label="View Skincare Competitive Analysis demo project"
            onClick={(event) => handleNavClick(event, 'pricing-skincare-competitive-analysis')}
          >
            <img
              src="/pricing-demo-2.jpg"
              alt="Pastel cosmetic products arranged on a display table"
            />
            <div className="pricing-demo-card-caption">
              <h2>Skincare Competitive Analysis</h2>
              <p>
                <strong>304</strong>
                <span>Products analyzed across six skincare brands to evaluate pricing, portfolios, and customer response.</span>
              </p>
            </div>
          </a>
        </div>

        <div className="pricing-service-plans" aria-label="BAO Data Studio service pricing">
          {pricingServices.map((service) => (
            <article className="pricing-service-plan" key={service.number}>
              <header className="pricing-service-plan-header">
                <span>{service.number}</span>
                <h2>{service.title}</h2>
              </header>

              <p className="pricing-service-plan-tagline">{service.tagline}</p>
              <p className="pricing-service-plan-description">{service.description}</p>

              <div className="pricing-service-plan-price">
                <span>{service.priceLabel}</span>
                <strong>{service.price}</strong>
              </div>

              <a className="pricing-service-plan-button" href="#start-project" onClick={handleProjectClick}>
                <span>{service.buttonLabel}</span>
                <ArrowRight aria-hidden="true" strokeWidth={2.3} />
              </a>

              <div className="pricing-service-plan-included">
                <p>{service.includedLabel}</p>
                <ul>
                  {service.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <section
          id="pricing-faq"
          className="faq-section pricing-faq-section"
          aria-labelledby="pricing-faq-title"
        >
          <header className="faq-header">
            <div className="faq-kicker">
              <span aria-hidden="true" />
              <p>FAQ</p>
            </div>
            <h2 id="pricing-faq-title">
              You ask,<br />
              we analyze.
            </h2>
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
                    aria-controls={`pricing-faq-answer-${index}`}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="faq-question-text">{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      {isOpen ? <Minus strokeWidth={2.2} /> : <Plus strokeWidth={2.2} />}
                    </span>
                  </button>

                  <div className="faq-answer-wrap" id={`pricing-faq-answer-${index}`}>
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

        <section className="pricing-consult-cta" aria-labelledby="pricing-consult-title">
          <div className="pricing-consult-note">
            <p>
              Share your project details and we&rsquo;ll get back to you with a recommended approach and estimated scope.
            </p>
          </div>

          <div className="pricing-consult-action">
            <div className="pricing-consult-kicker">
              <span aria-hidden="true" />
              <p>Get Started</p>
            </div>
            <h2 id="pricing-consult-title">Not Sure Which Option Fits?</h2>
            <p>
              Every project is different. Tell us what you&rsquo;re working with and what you&rsquo;d like to achieve, and
              we&rsquo;ll recommend a scope based on your data, goals, and deliverables.
            </p>
            <a className="cta-button pricing-consult-button" href="#start-project" onClick={handleProjectClick}>
              <span>Get Started</span>
              <ArrowRight aria-hidden="true" strokeWidth={2.3} />
            </a>
          </div>
        </section>
      </section>

      <section
        id="pricing-retail-sales-analysis"
        className="pricing-project-detail view-first-section"
        aria-labelledby="pricing-retail-title"
        hidden={activePage !== 'pricing-retail-sales-analysis'}
      >
        <div className="pricing-project-detail-grid">
          <a
            className="pricing-project-detail-close"
            href="#pricing"
            aria-label="Close demo project"
            title="Close demo project"
            onClick={(event) => handleNavClick(event, 'pricing')}
          >
            <X aria-hidden="true" strokeWidth={2.3} />
          </a>

          <div className="pricing-project-detail-copy">
            <p className="pricing-project-detail-eyebrow">Demo Project</p>
            <h1 id="pricing-retail-title">Retail Sales Performance Analysis</h1>

            <dl className="pricing-project-metrics">
              <div>
                <dt>Net Product Revenue</dt>
                <dd>£9.77M</dd>
              </div>
              <div>
                <dt>Net Units Sold</dt>
                <dd>5.29M</dd>
              </div>
              <div>
                <dt>Known Customers</dt>
                <dd>4.36K</dd>
              </div>
            </dl>
          </div>

          <figure className="pricing-project-detail-cover">
            <img
              src="/pricing-retail-sales-analysis.jpg"
              alt="Illuminated shopping cart sign above a retail entrance"
            />
          </figure>
        </div>
      </section>

      <section
        id="pricing-skincare-competitive-analysis"
        className="pricing-project-detail view-first-section"
        aria-labelledby="pricing-skincare-title"
        hidden={activePage !== 'pricing-skincare-competitive-analysis'}
      >
        <div className="pricing-project-detail-grid">
          <a
            className="pricing-project-detail-close"
            href="#pricing"
            aria-label="Close demo project"
            title="Close demo project"
            onClick={(event) => handleNavClick(event, 'pricing')}
          >
            <X aria-hidden="true" strokeWidth={2.3} />
          </a>

          <div className="pricing-project-detail-copy">
            <p className="pricing-project-detail-eyebrow">Demo Project</p>
            <h1 id="pricing-skincare-title">Skincare Competitive Analysis</h1>

            <dl className="pricing-project-metrics">
              <div>
                <dt>Products Analyzed</dt>
                <dd>304</dd>
              </div>
              <div>
                <dt>Competitors Compared</dt>
                <dd>6</dd>
              </div>
              <div>
                <dt>Core Categories</dt>
                <dd>5</dd>
              </div>
            </dl>
          </div>

          <figure className="pricing-project-detail-cover pricing-project-detail-cover--skincare">
            <img
              src="/pricing-demo-2.jpg"
              alt="Pastel cosmetic products arranged on a display table"
            />
          </figure>
        </div>
      </section>

      <section
        className="pricing-project-story"
        aria-label="Skincare Competitive Analysis project details"
        hidden={activePage !== 'pricing-skincare-competitive-analysis'}
      >
        <article className="pricing-project-story-module">
          <h2>Project Overview</h2>
          <div className="pricing-project-story-body">
            <p>
              This demo project analyzes six selected skincare brands using Sephora product data to understand
              competitive positioning across pricing, product portfolios, and customer response.
            </p>
            <p>
              By comparing product pricing, category coverage, and customer engagement metrics, the analysis identifies
              competitive patterns and explores potential opportunities for market differentiation.
            </p>
            <p>
              The project demonstrates how competitor data can be transformed into actionable insights that support
              product positioning, portfolio planning, and business strategy.
            </p>
            <div className="pricing-project-story-group">
              <h3>Project Scope</h3>
              <ul>
                <li>304 products analyzed</li>
                <li>6 competitors compared</li>
                <li>3 core analysis dimensions</li>
                <li>5 product categories examined</li>
              </ul>
              <p className="pricing-project-tools">
                <strong>Tools:</strong> Python · Pandas · Matplotlib · Excel
              </p>
              <p>
                <strong>Dataset Source:</strong> Sephora Products and Skincare Reviews — Kaggle
              </p>
            </div>
          </div>
        </article>

        <article className="pricing-project-story-module">
          <h2>The Challenge</h2>
          <div className="pricing-project-story-body">
            <p>
              The skincare market offers a wide range of products across different price points, categories, and brand
              positioning strategies.
            </p>
            <p>
              For businesses considering entering or expanding within this market, understanding how competitors
              position their products is an important first step.
            </p>
            <div className="pricing-project-story-group">
              <p>This project focuses on four business questions:</p>
              <ul>
                <li>
                  <strong>Pricing Positioning:</strong> How do selected skincare brands differ in pricing strategy?
                </li>
                <li>
                  <strong>Product Portfolio:</strong> Which competitors focus on specific product categories, and which
                  offer more diversified portfolios?
                </li>
                <li>
                  <strong>Customer Response:</strong> How do customer ratings, reviews, and Sephora Loves vary across
                  competitors?
                </li>
                <li>
                  <strong>Market Opportunity:</strong> Where might potential opportunities for differentiation exist?
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article className="pricing-project-story-module">
          <h2>Our Approach</h2>
          <div className="pricing-project-story-body">
            <p>
              We evaluated competitor performance through a structured analytical workflow, combining product-level
              data preparation, comparative analysis, and strategic interpretation.
            </p>
            <ul>
              <li>
                <strong>Data Preparation:</strong> Selected six skincare competitors, validated product-level
                information, and prepared a consistent dataset for analysis.
              </li>
              <li>
                <strong>Pricing Analysis:</strong> Compared median prices and product price distributions to identify
                distinct competitive pricing positions.
              </li>
              <li>
                <strong>Portfolio Analysis:</strong> Examined category coverage, product mix, and portfolio concentration
                to understand differences in product strategies.
              </li>
              <li>
                <strong>Customer Response Analysis:</strong> Evaluated product ratings, review counts, and Sephora Loves
                to compare customer response signals.
              </li>
              <li>
                <strong>Competitive Positioning:</strong> Combined pricing, portfolio concentration, and engagement
                metrics to visualize how competitors differ.
              </li>
              <li>
                <strong>Strategic Recommendations:</strong> Translated analytical findings into potential opportunities
                for pricing, product development, and competitive differentiation.
              </li>
            </ul>
          </div>
        </article>

        <article className="pricing-project-story-module pricing-project-insights-module">
          <h2>Key Insights</h2>
          <div className="pricing-project-insights-grid">
            <section className="pricing-project-insight-card">
              <p className="pricing-project-insight-value">2.7×</p>
              <h3>Pricing Gap</h3>
              <p>
                The lowest median price among higher-priced competitors was approximately 2.7 times the highest median
                price in the accessible group.
              </p>
            </section>

            <section className="pricing-project-insight-card">
              <p className="pricing-project-insight-value">73.3%</p>
              <h3>Portfolio Concentration</h3>
              <p>
                The Ordinary allocated 73.3% of its analyzed product portfolio to Treatments, demonstrating a highly
                focused category strategy.
              </p>
            </section>

            <section className="pricing-project-insight-card">
              <p className="pricing-project-insight-value">147K</p>
              <h3>Customer Engagement</h3>
              <p>
                The Ordinary recorded the highest average Sephora Loves per product among the six selected brands.
              </p>
            </section>

            <section className="pricing-project-insight-card">
              <p className="pricing-project-insight-value">4.40 / 5</p>
              <h3>Highest Average Rating</h3>
              <p>Paula&rsquo;s Choice achieved the highest average product rating among the analyzed competitors.</p>
            </section>
          </div>
        </article>

        <article className="pricing-project-story-module skincare-positioning-feature">
          <h2>Competitive Positioning</h2>
          <div className="skincare-positioning-feature-card">
            <figure>
              <img
                src="/skincare-competitive-positioning.png"
                alt="Bubble chart comparing the competitive positioning of six skincare brands"
              />
            </figure>
            <div className="skincare-positioning-feature-copy">
              <p>
                Explore how pricing, portfolio concentration, and customer engagement shape the position of six
                selected skincare brands.
              </p>
              <a
                className="pricing-project-deliverable-link"
                href="#preview-skincare-competitive-positioning"
                onClick={(event) => handleNavClick(event, 'preview-skincare-competitive-positioning')}
              >
                <span>Online Preview</span>
                <ArrowRight aria-hidden="true" strokeWidth={2.3} />
              </a>
            </div>
          </div>
        </article>

        <article className="pricing-project-story-module skincare-positioning-insights-module skincare-recommendations-module">
          <h2>Business Recommendations</h2>
          <p className="skincare-recommendations-intro">
            Based on the competitive analysis, three strategic directions emerge for businesses evaluating
            opportunities within the skincare market.
          </p>

          <div className="skincare-positioning-insights-grid">
            <section className="skincare-positioning-insight-card">
              <span>01</span>
              <h3>Target the Accessible Mid-Market</h3>
              <p>Explore positioning between ultra-accessible skincare brands and higher-priced competitors.</p>
              <p>
                A carefully defined mid-market strategy may offer opportunities to reach price-conscious consumers
                while supporting differentiated product value.
              </p>
            </section>

            <section className="skincare-positioning-insight-card">
              <span>02</span>
              <h3>Build a Balanced Product Portfolio</h3>
              <p>
                Develop broader category coverage across essential skincare needs rather than relying heavily on a
                single product category.
              </p>
              <p>
                A balanced portfolio may help brands address different customer needs and reduce dependence on
                individual product segments.
              </p>
            </section>

            <section className="skincare-positioning-insight-card">
              <span>03</span>
              <h3>Compete Beyond Price</h3>
              <p>Pair competitive pricing with a strong product value proposition and customer engagement strategy.</p>
              <p>
                Customer ratings, review activity, and Sephora Loves provide complementary signals that can help
                businesses evaluate product appeal and competitive positioning.
              </p>
            </section>
          </div>

          <section className="skincare-recommendations-takeaway">
            <p>Recommended Positioning</p>
            <h3>Accessible Pricing + Diversified Portfolio + Strong Customer Engagement</h3>
          </section>
        </article>

        <article className="pricing-project-deliverables skincare-project-deliverables">
          <header className="pricing-project-deliverables-header">
            <h2>Sample Deliverables</h2>
            <p>
              This project demonstrates how competitor data can be transformed into structured analysis, clear visual
              reporting, and strategic recommendations.
            </p>
          </header>

          <div className="pricing-project-deliverables-grid">
            <section className="pricing-project-deliverable-card pricing-project-deliverable-card-document">
              <div className="pricing-project-deliverable-copy">
                <h3>Executive Slide Report</h3>
                <p>
                  A nine-page visual report summarizing competitive pricing, portfolio strategies, customer response,
                  market positioning, and strategic recommendations.
                </p>
                <a
                  className="pricing-project-deliverable-link"
                  href="#preview-skincare-slide-report"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Online Preview</span>
                  <ArrowRight aria-hidden="true" strokeWidth={2.3} />
                </a>
              </div>
            </section>

            <section className="pricing-project-deliverable-card pricing-project-deliverable-card-document">
              <div className="pricing-project-deliverable-copy">
                <h3>Competitive Analysis Notebook</h3>
                <p>
                  A Python analysis notebook documenting data validation, competitive benchmarking, visualization, and
                  strategic findings.
                </p>
                <a
                  className="pricing-project-deliverable-link"
                  href="#preview-skincare-analysis-notebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Online Preview</span>
                  <ArrowRight aria-hidden="true" strokeWidth={2.3} />
                </a>
              </div>
            </section>

            <section className="pricing-project-deliverable-card pricing-project-deliverable-card-media skincare-deliverable-dataset-card">
              <figure>
                <img
                  src="/demo2-dataset-preview-1.png"
                  alt="Cleaned skincare product dataset in Excel"
                />
              </figure>
              <div className="pricing-project-deliverable-copy">
                <h3>Cleaned Dataset</h3>
                <p>
                  A validated, analysis-ready Excel dataset containing 304 products across six selected brands,
                  accompanied by a data dictionary.
                </p>
                <a
                  className="pricing-project-deliverable-link"
                  href="#preview-skincare-dataset"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Online Preview</span>
                  <ArrowRight aria-hidden="true" strokeWidth={2.3} />
                </a>
              </div>
            </section>
          </div>
        </article>

        <article className="pricing-project-story-module skincare-project-outcome">
          <h2>Project Outcome</h2>
          <div className="pricing-project-story-body">
            <p>
              The analysis identified clear differences in pricing, product portfolio structure, and customer response
              among six selected skincare brands.
            </p>
            <p>
              Accessible competitors demonstrated more concentrated category strategies, while higher-priced brands
              generally maintained broader product portfolios.
            </p>
            <p>
              By integrating these findings, the project identified a potential differentiation opportunity centered
              on accessible pricing, diversified product coverage, and strong customer engagement.
            </p>
            <p>
              The results provide a data-informed foundation for further market research, product planning, and
              competitive strategy development.
            </p>

            <section className="skincare-project-outcome-highlight">
              <p>From Competitive Data to Strategic Direction</p>
              <h3>
                Transforming product-level competitor information into insights that support business planning and
                market positioning.
              </h3>
            </section>
          </div>
        </article>
      </section>

      <section
        id="skincare-project-contact"
        className="cta-section pricing-project-cta skincare-project-cta"
        aria-labelledby="skincare-project-cta-title"
        hidden={activePage !== 'pricing-skincare-competitive-analysis'}
      >
        <div className="cta-inner">
          <div className="cta-kicker">
            <span aria-hidden="true" />
            <p>Interested in a Similar Project?</p>
          </div>
          <div className="cta-copy">
            <h2 id="skincare-project-cta-title">Understand Your Competitors. Find Your Opportunity.</h2>
            <p>
              Whether you&rsquo;re evaluating competitors, planning a new product, or exploring market opportunities,
              BAO Data Studio can help turn your data into clear insights and actionable recommendations.
            </p>
            <p>Tell us about your business, your competitors, and the questions you&rsquo;re trying to answer.</p>
            <p>We&rsquo;ll help define an analytical approach tailored to your goals.</p>
            <a className="cta-button" href="#start-project" onClick={handleProjectClick}>
              <span>Get Started</span>
              <ArrowRight aria-hidden="true" strokeWidth={2.3} />
            </a>
          </div>
        </div>
      </section>

      <section
        className="pricing-project-story"
        aria-label="Retail Sales Performance Analysis project details"
        hidden={activePage !== 'pricing-retail-sales-analysis'}
      >
        <article className="pricing-project-story-module">
          <h2>Project Overview</h2>
          <div className="pricing-project-story-body">
            <p>
              This demo project explores retail transaction data from December 2010 to December 2011 to understand
              sales performance, product contribution, geographic markets, and customer behavior.
            </p>
            <p>
              The project demonstrates an end-to-end analytics workflow—from data preparation and validation to
              business analysis, interactive visualization, and decision-ready recommendations.
            </p>
            <div className="pricing-project-story-group">
              <h3>Project Scope</h3>
              <ul>
                <li>530K+ transaction records analyzed</li>
                <li>£9.77M net product revenue</li>
                <li>23K+ orders</li>
                <li>5.29M net units</li>
                <li>4,362 identified customers</li>
              </ul>
            </div>
          </div>
        </article>

        <article className="pricing-project-story-module">
          <h2>The Challenge</h2>
          <div className="pricing-project-story-body">
            <p>
              The goal was to transform transaction-level retail data into clear business insights that could support
              commercial and operational decision-making.
            </p>
            <div className="pricing-project-story-group">
              <p>The analysis focused on four questions:</p>
              <ul>
                <li>How does sales performance change over time?</li>
                <li>Which products contribute most to revenue and volume?</li>
                <li>Which geographic markets drive the business?</li>
                <li>How do repeat purchasing and customer concentration affect revenue?</li>
              </ul>
            </div>
          </div>
        </article>

        <article className="pricing-project-story-module">
          <h2>Our Approach</h2>
          <div className="pricing-project-story-body">
            <p>
              We built the analysis from the transaction level up, using a structured workflow designed to keep the
              results consistent across reporting and visualization.
            </p>
            <ul>
              <li>Cleaned and validated transaction-level data</li>
              <li>Calculated net revenue while retaining returns and cancellations</li>
              <li>Analyzed monthly revenue and order trends</li>
              <li>Compared product performance by revenue and unit volume</li>
              <li>Evaluated geographic revenue distribution</li>
              <li>Measured repeat purchasing and customer revenue concentration</li>
              <li>Translated findings into practical business recommendations</li>
            </ul>
            <p className="pricing-project-tools">
              <strong>Tools:</strong> Python · Excel · Tableau
            </p>
          </div>
        </article>

        <article className="pricing-project-story-module pricing-project-dashboard-module">
          <h2>Interactive Dashboard</h2>
          <div className="pricing-project-story-body">
            <h3>Retail Sales Performance Dashboard</h3>
            <p>
              An interactive Tableau dashboard brings the core performance metrics into one view, allowing users to
              explore revenue trends, product performance, customer retention, and geographic distribution.
            </p>
            <div className="pricing-project-story-group">
              <p>The dashboard includes:</p>
              <ul>
                <li>Net Revenue, Orders, AOV, and Units KPIs</li>
                <li>Monthly Revenue Trend</li>
                <li>Top 10 Revenue Products</li>
                <li>Customer Repeat Rate</li>
                <li>Revenue by Market</li>
                <li>Country-level filtering</li>
              </ul>
            </div>
            <a
              className="pricing-project-dashboard-link"
              href="https://public.tableau.com/views/BAORetailSalesPerformanceDashboardDemoproject1/Dashboard1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Dashboard</span>
              <ArrowRight aria-hidden="true" strokeWidth={2.3} />
            </a>
          </div>
        </article>

        <article className="pricing-project-story-module pricing-project-insights-module">
          <h2>Key Insights</h2>
          <div className="pricing-project-insights-grid">
            <section className="pricing-project-insight-card">
              <p className="pricing-project-insight-value">104%</p>
              <h3>Revenue Growth</h3>
              <p>Monthly net revenue increased by approximately 104% from August to November 2011.</p>
            </section>
            <section className="pricing-project-insight-card">
              <p className="pricing-project-insight-value">84.75%</p>
              <h3>UK Revenue Share</h3>
              <p>The United Kingdom generated 84.75% of total net product revenue.</p>
            </section>
            <section className="pricing-project-insight-card">
              <p className="pricing-project-insight-value">69.6%</p>
              <h3>Repeat Customer Rate</h3>
              <p>Nearly seven in ten identified customers placed more than one order.</p>
            </section>
            <section className="pricing-project-insight-card">
              <p className="pricing-project-insight-value">60.3%</p>
              <h3>High-Value Customer Share</h3>
              <p>The top 10% of identified customers generated approximately 60.3% of customer-attributed revenue.</p>
            </section>
          </div>
        </article>

        <article className="pricing-project-story-module pricing-project-recommendations-module">
          <h2>Business Recommendations</h2>
          <div className="pricing-project-story-body">
            <p>The analysis identified four areas where the business could focus its next steps.</p>
            <div className="pricing-project-recommendations">
              <section>
                <h3>Prepare for seasonal demand</h3>
                <p>Plan inventory and fulfillment capacity ahead of the September–November sales increase.</p>
              </section>
              <section>
                <h3>Manage a diversified product portfolio</h3>
                <p>Evaluate products using both revenue and unit volume rather than relying only on top-selling SKUs.</p>
              </section>
              <section>
                <h3>Develop established international markets</h3>
                <p>
                  Explore growth opportunities in markets such as the Netherlands, EIRE, Germany, France, and
                  Australia while maintaining the core UK business.
                </p>
              </section>
              <section>
                <h3>Retain high-value repeat customers</h3>
                <p>
                  Combine broad retention efforts with targeted engagement for customer segments that contribute
                  disproportionately to revenue.
                </p>
              </section>
            </div>
          </div>
        </article>

        <article className="pricing-project-deliverables">
          <header className="pricing-project-deliverables-header">
            <h2>Sample Deliverables</h2>
            <p>
              A BAO Data Studio project can combine analysis, visualization, and reporting into a set of practical
              deliverables tailored to the business question.
            </p>
          </header>

          <div className="pricing-project-deliverables-grid">
            <section className="pricing-project-deliverable-card pricing-project-deliverable-card-document">
              <div className="pricing-project-deliverable-copy">
                <h3>Written Analysis Report</h3>
                <p>A detailed explanation of the analysis, findings, and strategic recommendations.</p>
                <a
                  className="pricing-project-deliverable-link"
                  href="#preview-written-analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Online Preview</span>
                  <ArrowRight aria-hidden="true" strokeWidth={2.3} />
                </a>
              </div>
            </section>

            <section className="pricing-project-deliverable-card pricing-project-deliverable-card-document">
              <div className="pricing-project-deliverable-copy">
                <h3>Executive Slide Report</h3>
                <p>A visual summary of key findings, business implications, and recommendations.</p>
                <a
                  className="pricing-project-deliverable-link"
                  href="#preview-slide-report"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Online Preview</span>
                  <ArrowRight aria-hidden="true" strokeWidth={2.3} />
                </a>
              </div>
            </section>

            <section className="pricing-project-deliverable-card pricing-project-deliverable-card-media">
              <figure>
                <img
                  src="/demo-project-tableau-dashboard.png"
                  alt="Retail Sales Performance Tableau dashboard"
                />
              </figure>
              <div className="pricing-project-deliverable-copy">
                <h3>Interactive Dashboard</h3>
                <p>A Tableau dashboard for exploring KPIs, trends, products, customers, and markets.</p>
                <a
                  className="pricing-project-deliverable-link"
                  href="https://public.tableau.com/views/BAORetailSalesPerformanceDashboardDemoproject1/Dashboard1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Dashboard</span>
                  <ArrowRight aria-hidden="true" strokeWidth={2.3} />
                </a>
              </div>
            </section>

            <section className="pricing-project-deliverable-card pricing-project-deliverable-card-media">
              <figure>
                <img
                  src="/demo-project-cleaned-dataset.png"
                  alt="Cleaned retail sales dataset in Excel"
                />
              </figure>
              <div className="pricing-project-deliverable-copy">
                <h3>Cleaned Dataset</h3>
                <p>A structured, analysis-ready Excel dataset with supporting data documentation.</p>
                <a
                  className="pricing-project-deliverable-link"
                  href="/demo-project-cleaned-dataset.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Dataset</span>
                  <ArrowRight aria-hidden="true" strokeWidth={2.3} />
                </a>
              </div>
            </section>
          </div>
        </article>
      </section>

      <section
        id="pricing-project-contact"
        className="cta-section pricing-project-cta"
        aria-labelledby="pricing-project-cta-title"
        hidden={activePage !== 'pricing-retail-sales-analysis'}
      >
        <div className="cta-inner">
          <div className="cta-kicker">
            <span aria-hidden="true" />
            <p>Get Started</p>
          </div>
          <div className="cta-copy">
            <h2 id="pricing-project-cta-title">Have data. Need clarity?</h2>
            <p>Let's turn your data into insights you can actually use.</p>
            <a className="cta-button" href="#start-project" onClick={handleProjectClick}>
              <span>Start a Project</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section
        id="preview-skincare-competitive-positioning"
        className="report-preview-page skincare-positioning-preview-page view-first-section"
        aria-labelledby="preview-skincare-positioning-title"
        hidden={activePage !== 'preview-skincare-competitive-positioning'}
      >
        <header className="report-preview-header">
          <a
            className="report-preview-close"
            href="#pricing-skincare-competitive-analysis"
            aria-label="Close preview"
            title="Close preview"
            onClick={(event) => handleNavClick(event, 'pricing-skincare-competitive-analysis')}
          >
            <X aria-hidden="true" strokeWidth={2.3} />
          </a>
          <div>
            <p>Demo Project</p>
            <h1 id="preview-skincare-positioning-title">Competitive Positioning</h1>
            <span>Skincare Competitive Analysis</span>
          </div>
          <a
            href="#pricing-skincare-competitive-analysis"
            onClick={(event) => handleNavClick(event, 'pricing-skincare-competitive-analysis')}
          >
            <ArrowLeft aria-hidden="true" strokeWidth={2.3} />
            <span>Back to Project</span>
          </a>
        </header>

        <div className="skincare-positioning-preview-content">
          <article className="pricing-project-story-module">
            <h2>Competitive Positioning</h2>
            <div className="pricing-project-story-body">
              <p>
                By combining median product price, portfolio concentration, and average Sephora Loves per product, this
                analysis highlights distinct positioning strategies among the six selected skincare brands.
              </p>
              <p>
                The visualization reveals two broad competitive groups: accessible brands with more concentrated
                portfolios and higher-priced competitors offering more diversified product ranges.
              </p>
              <div className="pricing-project-story-group">
                <h3>Competitive Positioning of Selected Skincare Brands</h3>
                <figure className="skincare-positioning-chart">
                  <img
                    src="/skincare-competitive-positioning.png"
                    alt="Bubble chart comparing median product price, largest category share, and average Sephora Loves per product"
                  />
                </figure>
                <div className="skincare-positioning-chart-key">
                  <p><strong>X-Axis:</strong> Median Product Price (USD)</p>
                  <p><strong>Y-Axis:</strong> Largest Category Share (%)</p>
                  <p><strong>Bubble Size:</strong> Average Sephora Loves per Product</p>
                </div>
              </div>
            </div>
          </article>

          <article className="pricing-project-story-module skincare-positioning-insights-module">
            <h2>Insights</h2>
            <div className="skincare-positioning-insights-grid">
              <section className="skincare-positioning-insight-card">
                <span>01</span>
                <h3>Accessible &amp; Focused</h3>
                <p>
                  The Ordinary and The INKEY List occupy accessible price positions, with median product prices of
                  $10.00 and $12.99, respectively.
                </p>
                <p>Both brands demonstrate relatively concentrated product portfolios, particularly within Treatments.</p>
              </section>

              <section className="skincare-positioning-insight-card">
                <span>02</span>
                <h3>Higher-Priced &amp; Diversified</h3>
                <p>
                  The remaining four competitors have median product prices between $34.75 and $46.00, with broader
                  category coverage and lower concentration in their largest product categories.
                </p>
              </section>

              <section className="skincare-positioning-insight-card">
                <span>03</span>
                <h3>Potential Market Whitespace</h3>
                <p>
                  The findings suggest a potential opportunity for brands that can combine accessible pricing with a
                  more diversified skincare portfolio.
                </p>
                <p>
                  This opportunity would require further validation through consumer demand, profitability, and market
                  research.
                </p>
              </section>
            </div>
          </article>
        </div>
      </section>

      {reportPreviews.map((report) => (
        <section
          key={report.page}
          id={report.page}
          className="report-preview-page view-first-section"
          aria-labelledby={`${report.page}-title`}
          hidden={activePage !== report.page}
        >
          <header className="report-preview-header">
            <a
              className="report-preview-close"
              href={`#${report.backPage}`}
              aria-label="Close preview"
              title="Close preview"
              onClick={(event) => handleNavClick(event, report.backPage)}
            >
              <X aria-hidden="true" strokeWidth={2.3} />
            </a>
            <div>
              <p>Demo Project</p>
              <h1 id={`${report.page}-title`}>{report.title}</h1>
              <span>{report.description}</span>
            </div>
            <a
              href={`#${report.backPage}`}
              onClick={(event) => handleNavClick(event, report.backPage)}
            >
              <ArrowLeft aria-hidden="true" strokeWidth={2.3} />
              <span>Back to Project</span>
            </a>
          </header>

          <div className="report-preview-pages">
            {report.pages.map((src, index) => (
              <figure key={src}>
                <img src={src} alt={`${report.title}, page ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} />
                <figcaption>Page {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section
        id="preview-skincare-analysis-notebook"
        className="report-preview-page view-first-section"
        aria-labelledby="preview-skincare-analysis-notebook-title"
        hidden={activePage !== 'preview-skincare-analysis-notebook'}
      >
        <header className="report-preview-header">
          <a
            className="report-preview-close"
            href="#pricing-skincare-competitive-analysis"
            aria-label="Close preview"
            title="Close preview"
            onClick={(event) => handleNavClick(event, 'pricing-skincare-competitive-analysis')}
          >
            <X aria-hidden="true" strokeWidth={2.3} />
          </a>
          <div>
            <p>Demo Project</p>
            <h1 id="preview-skincare-analysis-notebook-title">Competitive Analysis Notebook</h1>
            <span>Skincare Competitive Analysis - Python Notebook</span>
          </div>
          <a
            href="#pricing-skincare-competitive-analysis"
            onClick={(event) => handleNavClick(event, 'pricing-skincare-competitive-analysis')}
          >
            <ArrowLeft aria-hidden="true" strokeWidth={2.3} />
            <span>Back to Project</span>
          </a>
        </header>

        <div className="notebook-preview-shell">
          <iframe
            src="/demo2-analysis-notebook.html"
            title="Skincare Competitive Analysis Python notebook"
            loading="eager"
          />
        </div>
      </section>

      <section
        id="preview-skincare-dataset"
        className="report-preview-page view-first-section"
        aria-labelledby="preview-skincare-dataset-title"
        hidden={activePage !== 'preview-skincare-dataset'}
      >
        <header className="report-preview-header">
          <a
            className="report-preview-close"
            href="#pricing-skincare-competitive-analysis"
            aria-label="Close preview"
            title="Close preview"
            onClick={(event) => handleNavClick(event, 'pricing-skincare-competitive-analysis')}
          >
            <X aria-hidden="true" strokeWidth={2.3} />
          </a>
          <div>
            <p>Demo Project</p>
            <h1 id="preview-skincare-dataset-title">Cleaned Dataset</h1>
            <span>Skincare Competitive Analysis - Excel Dataset Preview</span>
          </div>
          <a
            href="#pricing-skincare-competitive-analysis"
            onClick={(event) => handleNavClick(event, 'pricing-skincare-competitive-analysis')}
          >
            <ArrowLeft aria-hidden="true" strokeWidth={2.3} />
            <span>Back to Project</span>
          </a>
        </header>

        <div className="dataset-preview-carousel">
          <div className="dataset-preview-controls">
            <button
              type="button"
              aria-label="Show previous dataset columns"
              title="Previous dataset view"
              onClick={() => scrollDatasetPreview(-1)}
            >
              <ArrowLeft aria-hidden="true" strokeWidth={2.3} />
            </button>
            <button
              type="button"
              aria-label="Show next dataset columns"
              title="Next dataset view"
              onClick={() => scrollDatasetPreview(1)}
            >
              <ArrowRight aria-hidden="true" strokeWidth={2.3} />
            </button>
          </div>
          <div
            ref={datasetPreviewRef}
            className="dataset-preview-viewport"
            aria-label="Excel dataset preview"
            tabIndex={0}
          >
            <div className="dataset-preview-track">
              {[1, 2, 3].map((index) => (
                <figure key={index}>
                  <img
                    src={`/demo2-dataset-preview-${index}.png`}
                    alt={`Cleaned skincare dataset columns, view ${index} of 3`}
                    loading={index === 1 ? 'eager' : 'lazy'}
                  />
                </figure>
              ))}
            </div>
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
            action="https://formsubmit.co/baodatastudio@gmail.com"
            method="POST"
            onSubmit={handleProjectSubmit}
            onChange={() => {
              if (projectSubmitStatus !== 'idle' && projectSubmitStatus !== 'submitting') {
                setProjectSubmitStatus('idle');
              }
            }}
          >
            <input type="hidden" name="_subject" value="We’ve received your request — BAO Data Studio" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_next"
              value="https://bao-data-studio.joeey1175.workers.dev/?sent=1#start-project"
            />
            <input type="hidden" name="_autoresponse" defaultValue="" />
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
              <a href="#pricing" onClick={(event) => handleNavClick(event, 'pricing')}>Pricing</a>
              <a href="#pricing-faq" onClick={handlePricingFaqClick}>FAQ</a>
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
