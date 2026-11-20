
import React, { useEffect, useRef, useState } from 'react';

import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Wifi,
  RadioTower,
  Sparkles,
  HeartHandshake,
  BrainCircuit,
  Globe2,
  ShieldCheck,
  Zap,
  Laptop,
  Coffee,
  GraduationCap,
  MapPin,
  Clock3,
  BriefcaseBusiness,
  ChevronDown,
  Send,
  CheckCircle2,
  Facebook,
  Linkedin,
  Instagram,
  MessageCircle,
  Bot,
  Search,
  Sun,
  Moon
} from 'lucide-react';


const roles = [
  {
    title: 'Full-Stack Developer',
    team: 'Engineering',
    type: 'Full-time',
    place: 'Hyderabad · Hybrid',
    level: '5–10 years',
    desc: 'Build thoughtful product experiences across our student, teacher and business workflows. Own features from data model to polished UI.',
    tags: ['React', 'JavaScript', 'Node.js', 'SQL']
  },
  {
    title: 'Network & RADIUS Integration Engineer',
    team: 'Network Engineering',
    type: 'Full-time',
    place: 'Hyderabad · On-site / Remote',
    level: '4–6 years',
    desc: 'Design and troubleshoot reliable guest WiFi and RADIUS integrations across real-world network environments.',
    tags: ['RADIUS', 'MikroTik', 'Linux', 'Networking']
  },
  {
    title: 'DevOps Engineer',
    team: 'Infrastructure',
    type: 'Full-time',
    place: 'India · Hybrid',
    level: 'Senior',
    desc: 'Help build resilient infrastructure, dependable deployment pipelines and the systems that keep our platform running.',
    tags: ['AWS', 'Docker', 'CI/CD', 'Kubernetes']
  }
];


function CyberCardEffects() {
  return (
    <div className="cyber-card-effects" aria-hidden="true">
      <div className="cyber-card-glare" />

      <div className="cyber-card-lines">
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="cyber-card-glows">
        <i />
        <i />
        <i />
      </div>

      <div className="cyber-card-corners">
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="cyber-card-scan" />
    </div>
  );
}


const chatPrompts = [
  'What roles are open?',
  'What is life at TheWiFy like?',
  'How do I apply?'
];

function getChatReply(message) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes('role') || normalizedMessage.includes('open') || normalizedMessage.includes('job')) {
    return `We currently have ${roles.length} opportunities: ${roles.map(role => role.title).join(', ')}. You can explore each role in the Open roles section below.`;
  }

  if (
    normalizedMessage.includes('life') ||
    normalizedMessage.includes('culture') ||
    normalizedMessage.includes('benefit') ||
    normalizedMessage.includes('work')
  ) {
    return 'TheWiFy values ownership, continuous learning and collaboration. We aim to give people the trust, clarity and space to do their best work.';
  }

  if (
    normalizedMessage.includes('apply') ||
    normalizedMessage.includes('application') ||
    normalizedMessage.includes('resume') ||
    normalizedMessage.includes('cv')
  ) {
    return 'Choose a role above to start an application, or use the introduction form at the bottom of the page to tell us what you do best.';
  }

  if (
    normalizedMessage.includes('where') ||
    normalizedMessage.includes('location') ||
    normalizedMessage.includes('remote') ||
    normalizedMessage.includes('hybrid')
  ) {
    return 'Our current opportunities are based in Hyderabad or India, with hybrid, on-site and remote arrangements depending on the role.';
  }

  return 'I can help with open roles, team culture, locations and how to apply. Try one of the quick questions below.';
}

function CareersChat({ onApply }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I’m Nova, an AI assistant here to help you explore careers at TheWiFy. What would you like to know?'
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const sendMessage = message => {
    const text = message.trim();

    if (!text) {
      return;
    }

    setMessages(currentMessages => [
      ...currentMessages,
      { id: `${Date.now()}-user`, sender: 'user', text },
      { id: `${Date.now()}-bot`, sender: 'bot', text: getChatReply(text) }
    ]);
    setDraft('');
  };

  const submitMessage = event => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <div className={`careers-chat${isOpen ? ' is-open' : ''}`}>
      {isOpen && (
        <section
          className="careers-chat-panel"
          aria-label="Nova AI careers assistant"
        >
          <div className="careers-chat-header">
            <div className="careers-chat-agent">
              <span className="careers-chat-avatar">
                <Bot size={19} />
              </span>
              <div>
                <strong>Nova</strong>
                <span><i /> Usually replies instantly</span>
              </div>
            </div>

            <button
              className="careers-chat-close"
              type="button"
              aria-label="Close careers assistant"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="careers-chat-messages" aria-live="polite">
            {messages.map(message => (
              <div
                className={`careers-chat-message ${message.sender}`}
                key={message.id}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="careers-chat-prompts">
            {chatPrompts.map(prompt => (
              <button
                type="button"
                key={prompt}
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className="careers-chat-form" onSubmit={submitMessage}>
            <input
              value={draft}
              onChange={event => setDraft(event.target.value)}
              placeholder="Ask about careers..."
              aria-label="Ask the careers assistant"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
            >
              <Send size={16} />
            </button>
          </form>

          <button
            className="careers-chat-roles"
            type="button"
            onClick={() => {
              onApply();
              setIsOpen(false);
            }}
          >
            Explore open roles <ArrowUpRight size={14} />
          </button>
        </section>
      )}

      <button
        className="careers-chat-launcher"
        type="button"
        aria-label={isOpen ? 'Close careers assistant' : 'Open careers assistant'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(currentState => !currentState)}
      >
        <span className="careers-chat-launcher-icon">
          {isOpen ? <X size={21} /> : <MessageCircle size={21} />}
        </span>
        <span className="careers-chat-launcher-label">Chat with Nova</span>
      </button>
    </div>
  );
}

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem('thewify-cookie-consent');

    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = value => {
    window.localStorage.setItem('thewify-cookie-consent', value);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="cookie-consent" aria-label="Cookie consent" role="dialog">
      <div className="cookie-consent-icon" aria-hidden="true">
        <ShieldCheck size={19} />
      </div>

      <div className="cookie-consent-copy">
        <strong>Your privacy matters</strong>
        <p>
          By clicking "Accept", you agree to the storing of cookies on your device to give you the most optimal experience using our website. We may also use cookies to enhance performance,
           analyse site usage and to personalise your experience.
        </p>
      </div>

      <div className="cookie-consent-actions">
        <button
          type="button"
          className="cookie-consent-decline"
          onClick={() => saveConsent('declined')}
        >
          Decline
        </button>
        <button
          type="button"
          className="cookie-consent-accept"
          onClick={() => saveConsent('accepted')}
        >
          Accept
        </button>
      </div>
    </aside>
  );
}


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [jobSearch, setJobSearch] = useState('');
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('thewify-theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('thewify-theme', theme);
  }, [theme]);

  const filteredRoles = roles.filter(role => {
    const searchableText = [
      role.title,
      role.team,
      role.type,
      role.place,
      role.level,
      role.desc,
      ...role.tags
    ].join(' ').toLowerCase();

    return searchableText.includes(jobSearch.trim().toLowerCase());
  });

  useEffect(() => {
    const pointerMove = event => {
      document.documentElement.style.setProperty(
        '--pointer-x',
        `${event.clientX}px`
      );

      document.documentElement.style.setProperty(
        '--pointer-y',
        `${event.clientY}px`
      );
    };

    window.addEventListener('pointermove', pointerMove, { passive: true });

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: .12 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', pointerMove);
    };
  }, []);

  const goToApply = (role = '') => {
    setActiveRole(role);
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const searchJobs = event => {
    event.preventDefault();
    document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const submit = e => {
    e.preventDefault();
    setSubmitted(true);
  };


  return (
    <>

      {/* CYBER CARD STYLES */}

      <style>{`
        .cyber-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transform-style: preserve-3d;
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }

        .cyber-card > :not(.cyber-card-effects) {
          position: relative;
          z-index: 1;
        }

        .cyber-card-effects {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
        }

        .cyber-card-glare {
          position: absolute;
          inset: -40%;
          opacity: 0;
          background: linear-gradient(115deg, transparent 42%, rgba(57,211,233,.19) 50%, transparent 58%);
          transform: translateX(-35%);
          transition: opacity .35s ease, transform .65s ease;
        }

        .cyber-card-lines i {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(57,211,233,.25), transparent);
          opacity: .35;
          animation: thewifyCyberLine 4s ease-in-out infinite;
        }

        .cyber-card-lines i:nth-child(1) {
          top: 20%;
        }

        .cyber-card-lines i:nth-child(2) {
          top: 40%;
          animation-delay: .6s;
        }

        .cyber-card-lines i:nth-child(3) {
          top: 60%;
          animation-delay: 1.2s;
        }

        .cyber-card-lines i:nth-child(4) {
          top: 80%;
          animation-delay: 1.8s;
        }

        .cyber-card-glows i {
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: rgba(57,211,233,.19);
          filter: blur(38px);
          opacity: .28;
          transition: opacity .35s ease;
        }

        .cyber-card-glows i:nth-child(1) {
          top: -45px;
          left: -35px;
        }

        .cyber-card-glows i:nth-child(2) {
          right: -45px;
          top: 35%;
        }

        .cyber-card-glows i:nth-child(3) {
          bottom: -55px;
          left: 35%;
        }

        .cyber-card-corners i {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: #39d3e9;
          border-style: solid;
          opacity: .55;
        }

        .cyber-card-corners i:nth-child(1) {
          top: 9px;
          left: 9px;
          border-width: 1px 0 0 1px;
        }

        .cyber-card-corners i:nth-child(2) {
          top: 9px;
          right: 9px;
          border-width: 1px 1px 0 0;
        }

        .cyber-card-corners i:nth-child(3) {
          bottom: 9px;
          left: 9px;
          border-width: 0 0 1px 1px;
        }

        .cyber-card-corners i:nth-child(4) {
          bottom: 9px;
          right: 9px;
          border-width: 0 1px 1px 0;
        }

        .cyber-card-scan {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent, rgba(57,211,233,.075), transparent);
          transform: translateY(-110%);
          animation: thewifyCyberScan 6s linear infinite;
        }

        .cyber-card:hover {
          transform: translateY(-6px) rotateX(1.5deg);
          border-color: rgba(57,211,233,.65);
          box-shadow: 0 18px 42px rgba(0,12,35,.24), 0 0 24px rgba(57,211,233,.13);
        }

        .cyber-card:hover .cyber-card-glare {
          opacity: 1;
          transform: translateX(35%);
        }

        .cyber-card:hover .cyber-card-glows i {
          opacity: .75;
        }

        @keyframes thewifyCyberLine {
          0%, 100% {
            opacity: .12;
          }
          50% {
            opacity: .55;
          }
        }

        @keyframes thewifyCyberScan {
          to {
            transform: translateY(110%);
          }
        }

        @media (hover:none) {
          .cyber-card:hover {
            transform: none;
          }

          .cyber-card-glows i {
            opacity: .38;
          }
        }

        @media (prefers-reduced-motion:reduce) {
          .cyber-card,
          .cyber-card * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>


      {/* HEADER / NAVBAR */}

      <header className="header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">
            <Wifi size={23} />
          </span>

          <span>
            The<span>Wi</span>Fy
          </span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#life" onClick={closeMenu}>Life at TheWiFy</a>
          <a href="#benefits" onClick={closeMenu}>Why TheWiFy</a>
          <a href="#openings" onClick={closeMenu}>Open roles</a>
          <a href="#about" onClick={closeMenu}>Our story</a>

          <form className="nav-search" role="search" onSubmit={searchJobs}>
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={jobSearch}
              onChange={event => setJobSearch(event.target.value)}
              placeholder="Search jobs"
              aria-label="Search open jobs"
            />
            {jobSearch && (
              <button
                type="button"
                className="nav-search-clear"
                aria-label="Clear job search"
                onClick={() => setJobSearch('')}
              >
                <X size={14} />
              </button>
            )}
          </form>

          <a className="nav-cta" href="#openings" onClick={closeMenu}>
            Find your role <ArrowUpRight size={16} />
          </a>

          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => setTheme(currentTheme => (
              currentTheme === 'dark' ? 'light' : 'dark'
            ))}
          >
            <span className="theme-toggle-icon">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </span>
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </nav>
      </header>


      {/* MAIN CONTENT */}

      <main>

        {/* HERO SECTION */}

        <section className="hero" id="home">
          <div className="hero-grid"></div>
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>

          <div className="hero-content">
            <div className="eyebrow">
              <span className="pulse-dot"></span>
              CAREERS AT THEWIFY
            </div>

            <h1>
              Build what<br />
              <span>connects</span> the world.
            </h1>

            <p className="hero-copy">
              Great technology starts with curious people. Join a team making connectivity smarter, experiences better, and possibilities bigger.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#openings">
                Explore open roles <ArrowUpRight size={18} />
              </a>

              <a className="text-link" href="#life">
                Get to know us <ArrowRight size={17} />
              </a>
            </div>

            <div className="hero-meta">
              <div className="avatar-stack">
                <i>W</i>
                <i>i</i>
                <i>F</i>
                <i>y</i>
              </div>

              <span>A small team. A connected world.</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Abstract connected network illustration">
            <div className="orbit orbit-a"></div>
            <div className="orbit orbit-b"></div>
            <div className="orbit orbit-c"></div>

            <div className="network-line line-a"></div>
            <div className="network-line line-b"></div>
            <div className="network-line line-c"></div>

            <div className="node node-a"><RadioTower /></div>
            <div className="node node-b"><Globe2 /></div>
            <div className="node node-c"><ShieldCheck /></div>
            <div className="node node-d"><Zap /></div>

            <div className="core">
              <div className="core-inner">
                <Wifi size={56} />
                <span>
                  THEWIFY<br />
                  NETWORK
                </span>
              </div>
            </div>

            <div className="float-tag tag-one">
              <span className="tiny-pulse"></span>
              Always connected
            </div>

            <div className="float-tag tag-two">
              ✦ Ideas in motion
            </div>
          </div>

          <div className="hero-bottom">
            <span>PEOPLE FIRST. PROGRESS ALWAYS.</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>


        {/* INTRO / ABOUT SECTION */}

        <section className="intro section-pad" id="about">
          <div className="section-kicker reveal">
            01 / WHO WE ARE
          </div>

          <div className="intro-layout">
            <h2 className="reveal">
              We make the<br />
              <em>invisible</em> feel<br />
              effortless.
            </h2>

            <div className="intro-text reveal">
              <p className="lead">
                TheWiFy is building the technology layer behind better connected places and people.
              </p>

              <p>
                From secure guest WiFi and cloud networking to customer engagement and intelligent insights, we bring complex systems together in one practical platform. We are a team of builders who care about the details—and the difference those details make.
              </p>

              <a
                href="https://www.thewify.com/"
                target="_blank"
                rel="noreferrer"
                className="under-link"
              >
                Discover TheWiFy <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="stat-strip reveal">
            <div>
              <strong>01</strong>
              <span>One connected<br />platform mindset</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Room to learn<br />and experiment</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Technology that<br />keeps people moving</span>
            </div>

            <div>
              <strong>YOU</strong>
              <span>A meaningful part<br />of what comes next</span>
            </div>
          </div>
        </section>


        {/* VALUES MARQUEE */}

        <section className="signal-marquee" aria-label="TheWiFy values">
          <div className="marquee-track">
            <span>BUILD BOLDLY <b>✳</b></span>
            <span>STAY CURIOUS <b>✳</b></span>
            <span>CONNECT EVERYTHING <b>✳</b></span>
            <span>MAKE IT MATTER <b>✳</b></span>
            <span>BUILD BOLDLY <b>✳</b></span>
            <span>STAY CURIOUS <b>✳</b></span>
            <span>CONNECT EVERYTHING <b>✳</b></span>
            <span>MAKE IT MATTER <b>✳</b></span>
          </div>
        </section>


        {/* LIFE AT THEWIFY SECTION */}

        <section className="life-section section-pad" id="life">
          <div className="section-kicker reveal">
            02 / LIFE AT THEWIFY
          </div>

          <div className="section-heading reveal">
            <h2>
              Good work.<br />
              <em>Good people.</em><br />
              Big possibilities.
            </h2>

            <p>
              We believe the best work happens when people have the trust, clarity and space to do their best thinking.
            </p>
          </div>

          <div className="life-grid">

            <article className="life-card life-card-large reveal cyber-card">
              <CyberCardEffects />

              <div className="card-art art-collab">
                <div className="mini-window">
                  <div className="window-dots">
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="window-lines">
                    <b />
                    <b />
                    <b />
                    <b />
                  </div>

                  <div className="window-spark">✳</div>
                </div>

                <div className="art-caption">
                  MAKE IT<br />
                  MATTER<span>↗</span>
                </div>
              </div>

              <div className="life-card-copy">
                <span>01 — OWNERSHIP</span>
                <h3>
                  Make an impact<br />
                  from day one.
                </h3>
                <p>
                  Bring ideas forward, take initiative and see the real-world impact of what you build.
                </p>
              </div>
            </article>


            <article className="life-card reveal cyber-card">
              <CyberCardEffects />

              <div className="card-art art-growth">
                <div className="growth-ring ring-1"></div>
                <div className="growth-ring ring-2"></div>
                <div className="growth-ring ring-3"></div>

                <Sparkles className="growth-star" size={48} />

                <span className="growth-label">
                  STAY<br />
                  CURIOUS
                </span>
              </div>

              <div className="life-card-copy">
                <span>02 — GROWTH</span>
                <h3>
                  Keep learning.<br />
                  Keep moving.
                </h3>
                <p>
                  Explore new tools, sharpen your craft and grow alongside a team that shares what it knows.
                </p>
              </div>
            </article>


            <article className="life-card reveal cyber-card">
              <CyberCardEffects />

              <div className="card-art art-team">
                <div className="team-bubble bubble-1">Ideas</div>
                <div className="team-bubble bubble-2">Build</div>
                <div className="team-bubble bubble-3">Together</div>
                <div className="team-sun">✳</div>
                <div className="team-grid-lines"></div>
              </div>

              <div className="life-card-copy">
                <span>03 — COLLABORATION</span>
                <h3>Better, together.</h3>
                <p>
                  Work across disciplines, ask better questions and celebrate progress as one team.
                </p>
              </div>
            </article>

          </div>
        </section>


        {/* BENEFITS SECTION */}

        <section className="benefits section-pad" id="benefits">
          <div className="section-kicker reveal">
            03 / THE GOOD STUFF
          </div>

          <div className="benefit-head reveal">
            <h2>
              Space to do<br />
              <em>your best work.</em>
            </h2>

            <p>
              A thoughtful environment helps good people do great things. Here's what we aim to make possible.
            </p>
          </div>

          <div className="benefit-grid">

            <div className="benefit-item reveal cyber-card">
              <CyberCardEffects />
              <span className="benefit-icon"><HeartHandshake /></span>
              <h3>People over process</h3>
              <p>Open conversations, mutual respect and a team that has your back.</p>
            </div>

            <div className="benefit-item reveal cyber-card">
              <CyberCardEffects />
              <span className="benefit-icon"><BrainCircuit /></span>
              <h3>Continuous learning</h3>
              <p>Learn by building, experiment with ideas and keep expanding your skills.</p>
            </div>

            <div className="benefit-item reveal cyber-card">
              <CyberCardEffects />
              <span className="benefit-icon"><Laptop /></span>
              <h3>Meaningful ownership</h3>
              <p>Take responsibility, make decisions and see your work reach real users.</p>
            </div>

            <div className="benefit-item reveal cyber-card">
              <CyberCardEffects />
              <span className="benefit-icon"><Zap /></span>
              <h3>Room to move fast</h3>
              <p>Work with a focused team where good ideas can become real improvements.</p>
            </div>

            <div className="benefit-item reveal cyber-card">
              <CyberCardEffects />
              <span className="benefit-icon"><Globe2 /></span>
              <h3>Real-world challenges</h3>
              <p>Solve interesting problems across connectivity, cloud and customer experience.</p>
            </div>

            <div className="benefit-item reveal cyber-card">
              <CyberCardEffects />
              <span className="benefit-icon"><GraduationCap /></span>
              <h3>Grow your craft</h3>
              <p>Build depth, try new things and shape the direction of your career.</p>
            </div>

          </div>

          <p className="benefit-note">
            *Benefits and working arrangements may vary by role and location.
          </p>
        </section>


        {/* QUOTE SECTION */}

        <section className="quote-band">
          <div className="quote-mark">“</div>

          <blockquote>
            Stay curious. Build with care.<br />
            <span>Make technology feel human.</span>
          </blockquote>

          <div className="quote-orbit"></div>
        </section>


        {/* OPEN ROLES SECTION */}

        <section className="roles section-pad" id="openings">
          <div className="section-kicker reveal">
            04 / FIND YOUR PLACE
          </div>

          <div className="roles-head reveal">
            <div>
              <h2>
                Let's build<br />
                <em>what's next.</em>
              </h2>

              <p>
                Bring your perspective. We'll bring meaningful problems to solve.
              </p>
            </div>

            <div className="roles-count">
              <strong>{String(filteredRoles.length).padStart(2, '0')}</strong>
              <span>
                {jobSearch ? 'MATCHING ROLES' : 'OPPORTUNITIES'}<br />
                {jobSearch ? 'FOUND' : 'TO EXPLORE'}
              </span>
            </div>
          </div>

          <div className="role-list">
            {filteredRoles.map((role, i) => (
              <article
                className="role-card cyber-card reveal is-visible"
                key={role.title}
              >
                <CyberCardEffects />

                <div className="role-index">0{i + 1}</div>

                <div className="role-main">
                  <div className="role-team">{role.team}</div>
                  <h3>{role.title}</h3>

                  <div className="role-tags">
                    {role.tags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="role-details">
                  <span><MapPin size={15} />{role.place}</span>
                  <span><BriefcaseBusiness size={15} />{role.type}</span>
                  <span><Clock3 size={15} />{role.level}</span>
                </div>

                <button
                  className="role-arrow"
                  aria-label={`Apply for ${role.title}`}
                  onClick={() => goToApply(role.title)}
                >
                  <ArrowUpRight />
                </button>
              </article>
            ))}

            {filteredRoles.length === 0 && (
              <div className="roles-empty">
                <Search size={22} />
                <strong>No roles found</strong>
                <p>Try a different title, skill, location or team.</p>
                <button type="button" onClick={() => setJobSearch('')}>
                  Clear search
                </button>
              </div>
            )}
          </div>

          <p className="roles-footnote">
            Role details shown as a starting point for this careers page. Confirm current vacancies, locations and requirements with your hiring team before publishing.
          </p>
        </section>


        {/* APPLICATION SECTION */}

        <section className="apply-section section-pad" id="apply">

          <div className="apply-copy reveal">
            <div className="section-kicker">
              05 / YOUR NEXT CHAPTER
            </div>

            <h2>
              Don't see<br />
              your role?<br />
              <em>Say hello.</em>
            </h2>

            <p>
              We're always interested in meeting thoughtful people who love solving meaningful problems. Tell us what you do best.
            </p>

            <div className="apply-contact">
              <span className="contact-icon">
                <Send size={17} />
              </span>

              <div>
                <small>START A CONVERSATION</small>

                <a
                  href="https://www.thewify.com/contact"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get in touch with TheWiFy <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>


          <div className="apply-form-wrap reveal">
            <div className="form-top">
              <span>LET'S CONNECT</span>
              <span className="form-asterisk">✳</span>
            </div>

            {submitted ? (
              <div className="success-state">
                <CheckCircle2 size={42} />

                <h3>Thanks for reaching out.</h3>

                <p>
                  This is a front-end demo form. Connect it to your hiring inbox or ATS to receive applications.
                </p>

                <button
                  className="btn btn-dark"
                  onClick={() => setSubmitted(false)}
                >
                  Send another response <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              
        <form className="apply-form" onSubmit={submit}>

          {/* FIRST ROW: NAME AND EMAIL */}
          <div className="form-row">

            <label className="form-field">
              Your name
              <input
                required
                type="text"
                placeholder="How should we call you?"
              />
            </label>

            <label className="form-field">
              Email address
              <input
                required
                type="email"
                placeholder="you@example.com"
              />
            </label>

          </div>


          {/* SECOND ROW: ROLE AND LINKEDIN */}
          <div className="form-row">

            <label className="form-field">
              Role you're interested in

              <div className="select-wrap">
                <select
                  value={activeRole}
                  onChange={e => setActiveRole(e.target.value)}
                >
                  <option value="">Choose a role</option>

                  {roles.map(r => (
                    <option key={r.title} value={r.title}>
                      {r.title}
                    </option>
                  ))}

                  <option value="Something else">Something else</option>
                </select>

                <ChevronDown className="select-chevron" size={17}/>
              </div>
            </label>


            <label className="form-field">
              LinkedIn or portfolio
              {/* <span className="optional">OPTIONAL</span> */}

              <input
                type="url"
                placeholder="https://"
              />
            </label>

          </div>


          {/* MESSAGE FIELD */}
          <label className="form-field message-label">
            A little about you

            <textarea
              required
              rows="3"
              placeholder="What would you love to work on?"
            />
          </label>


          {/* SUBMIT BUTTON */}
          <button
            className="btn btn-dark submit-btn"
            type="submit"
          >
            Send your introduction
            <ArrowUpRight size={17}/>
          </button>

          <p className="form-privacy">
            By submitting, you agree that TheWiFy may use these details to respond to your enquiry.
          </p>

        </form>

            )}
          </div>
        </section>


        {/* CLOSING SECTION */}

        <section className="closing">
          <div className="closing-grid"></div>

          <div className="closing-content reveal">
            <span>THE FUTURE IS A TEAM SPORT.</span>

            <h2>
              Make your next<br />
              <em>connection count.</em>
            </h2>

            <a href="#openings" className="btn btn-primary">
              Explore opportunities <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="closing-signal">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <Wifi size={36} />
          </div>
        </section>

      </main>


      {/* FOOTER */}

      <footer className="footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark">
              <Wifi size={21} />
            </span>

            <span>
              The<span>Wi</span>Fy
            </span>
          </a>

          <p>
            Connecting people, places<br />
            and possibilities.
          </p>

          <div className="footer-connect">
            <div className="footer-links">
              <a
                href="https://guestwifi.thewify.com/"
                target="_blank"
                rel="noreferrer"
              >
                Guest WiFy <ArrowUpRight size={14} />
              </a>

              <a
                href="https://www.thewify.com/contact"
                target="_blank"
                rel="noreferrer"
              >
                Contact <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="footer-social" aria-label="Social media links">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle size={17} />
              </a>

              <a
                href="https://www.facebook.com/thewify1"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <Facebook size={17} />
              </a>

              <a
                href="https://www.instagram.com/thewify.pvt.ltd?avpt=MXN5cjA3MzQ3djZsaw=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram size={17} />
              </a>

              <a
                href="https://www.linkedin.com/company/thewify1/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} TheWiFy Technologies. All rights reserved.
          </span>

          <a href="#home">BACK TO TOP ↑</a>

          <span>MADE FOR WHAT'S NEXT.</span>
        </div>
      </footer>

      <CareersChat onApply={() => goToApply()} />
      <CookieConsent />

    </>
  );
}

export default App;
