import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent
} from "react";
import "./App.css";

type TimelineItem = {
  timeframe: string;
  title: string;
  summary: string;
  details: string;
  image: string;
  accent: string;
};

type Certificate = {
  name: string;
  issuer: string;
  logo: string;
  credential?: string;
};

const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = (matches: boolean) => {
      setPrefersReducedMotion((previous) => (previous === matches ? previous : matches));
    };

    updatePreference(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      updatePreference(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
};

const languages = [
  { code: "en", label: "EN" },
  { code: "he", label: "HE" }
] as const;

type LanguageCode = (typeof languages)[number]["code"];

type TranslatedContent = {
  subtitle: string;
  heroBio: string;
  scrollLabel: string;
  experienceTitle: string;
  timeline: readonly TimelineItem[];
};

const translations: Record<LanguageCode, TranslatedContent> = {
  en: {
    subtitle: "DevOps · Platform Engineer",
    heroBio:
      "I’ve spent years building and automating platforms that teams can depend on. I care about clean systems, clear processes, and helping developers move faster without the noise.",
    scrollLabel: "Scroll down to career journey",
    experienceTitle: "Career Journey · passion for Technology",
    timeline: [
      {
        timeframe: "2023 — Present",
        title: "Senior DevOps Engineer · Keep Learning!",
        summary:
          "What started as a curiosity for improving systems turned into a passion for automation and platform engineering.",
        details:
          "Today I lead initiatives around automation strategy, multi-cloud infrastructure, and platform reliability. I stay hands-on with Terraform, Kubernetes, and observability tooling to deliver robust systems that empower developers and keep production secure, efficient, and always improving.",
        image: "/image3.png",
        accent: "rgba(56, 189, 248, 0.55)"
      },
      {
        timeframe: "2020 — 2023",
        title: "DevOps & Platform Focus · This is fun!",
        summary:
          "Scaled developer platforms and delivery pipelines across rapid-growth teams.",
        details:
          "I doubled down on CI/CD practices, infrastructure as code, and automated guardrails. From building scalable pipelines to integrating security and compliance into every deployment, the goal was clear: help teams ship faster with confidence.",
        image: "/image2.png",
        accent: "rgba(168, 85, 247, 0.55)"
      },
      {
        timeframe: "2018 — 2020",
        title: "Early DevOps Journey · So it begins!",
        summary:
          "Kept customer-critical services resilient while exploring automation from the ground up.",
        details:
          "Curiosity met opportunity as I wrote my first Bash and Python scripts to remove toil, learned the fundamentals of clean infrastructure, and discovered how observability and steady processes keep teams moving.",
        image: "/image.png",
        accent: "rgba(2, 13, 6, 0.45)"
      }
    ]
  },
  he: {
    subtitle: "מהנדס DevOps · מהנדס פלטפורמות",
    heroBio:
      "במשך שנים אני בונה ומאוטומט פלטפורמות שעליהן צוותים יכולים לסמוך. מערכות נקיות, תהליכים ברורים והאצה של צוותי פיתוח ללא רעשי רקע הם העיקר עבורי.",
    scrollLabel: "גלול למסע הקריירה",
    experienceTitle: "מסע הקריירה · תשוקה לטכנולוגיה",
    timeline: [
      {
        timeframe: "2023 — כיום",
        title: "מהנדס DevOps בכיר · תמיד לומד!",
        summary:
          "מה שהתחיל כסקרנות לשיפור מערכות הפך לתשוקה לאוטומציה ולהנדסת פלטפורמות.",
        details:
          "היום אני מוביל יוזמות של אסטרטגיית אוטומציה, תשתיות מולטי-קלאוד ואמינות פלטפורמות. אני נשאר מעורב בעבודה עם Terraform, Kubernetes וכלי תצפית כדי לספק מערכות יציבות, להעצים מפתחים ולשמור על הפרודקשן בטוח ויעיל.",
        image: "/image3.png",
        accent: "rgba(56, 189, 248, 0.55)"
      },
      {
        timeframe: "2020 — 2023",
        title: "פוקוס על DevOps ופלטפורמות · זה ממש כיף!",
        summary:
          "הרחבתי פלטפורמות פיתוח וצנרות פריסה עבור צוותים בצמיחה מהירה.",
        details:
          "העמקתי ב-CI/CD, תשתית כקוד ומנגנוני בקרה אוטומטיים. בניתי צנרות סקיילבּליות, שילבתי אבטחה ורגולציה בכל פריסה ודאגתי שהצוותים יוכלו לשחרר מהר ובביטחון.",
        image: "/image2.png",
        accent: "rgba(168, 85, 247, 0.55)"
      },
      {
        timeframe: "2018 — 2020",
        title: "תחילת הדרך ב-DevOps · כל יום משהו חדש",
        summary:
          "שמרתי על שירותים קריטיים ללקוחות תוך חקר עולם האוטומציה מהיסוד.",
        details:
          "הסקרנות הובילה אותי לכתוב סקריפטים ראשונים ב-Bash וב-Python, להסיר עבודת כפיים וללמוד את יסודות התשתיות הנקיות, התצפיתיות והיעילות — ומשם נולדה התשוקה ארוכת הטווח ל-DevOps.",
        image: "/image.png",
        accent: "rgba(2, 13, 6, 0.45)"
      }
    ]
  }
};

const OPEN_FOR_WORK = true;

const certificates: readonly Certificate[] = [
  {
    name: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    logo: "/logos/aws-sa-pro.svg",
    credential: "Credential ID: AWS-0000"
  },
  {
    name: "AWS Certified DevOps Engineer – Professional",
    issuer: "Amazon Web Services",
    logo: "/logos/aws-devops-pro.svg",
    credential: "Credential ID: AWS-1111"
  },
  {
    name: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    logo: "/logos/terraform-associate.svg",
    credential: "Credential ID: TF-2222"
  }
] as const;

const resolveAssetUrl = (path: string): string => {
  if (!path) {
    return "";
  }
  if (/^(?:[a-z]+:)?\/\//i.test(path)) {
    return path;
  }
  const base = import.meta.env.BASE_URL ?? "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}${normalizedPath}`;
};

const App = () => {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isAboutVisible, setAboutVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const aboutRef = useRef<HTMLElement | null>(null);
  const tiltFrame = useRef<number | null>(null);
  const ringPathId = useId();
  const [areCertsOpen, setCertsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const content = translations[language];
  const timeline = content.timeline;
  const fallbackItem: TimelineItem =
    translations.en.timeline[0] ?? {
      timeframe: "",
      title: "",
      summary: "",
      details: "",
      image: "/profilepic.jpeg",
      accent: "rgba(56, 189, 248, 0.55)"
    };
  const profileImageUrl = useMemo(() => resolveAssetUrl("/profilepic.jpeg"), []);
  const activeItem = useMemo(
    () => timeline[activeIndex] ?? timeline[0] ?? fallbackItem,
    [activeIndex, timeline, fallbackItem]
  );
  const portraitImageUrl = useMemo(() => {
    const resolved = resolveAssetUrl(activeItem.image);
    return resolved || profileImageUrl;
  }, [activeItem.image, profileImageUrl]);
  const isHebrew = language === "he";
  const displayFirstName = isHebrew ? "דן" : "Dan";
  const displayLastName = isHebrew ? "אפשטיין" : "Epstein";
  const displayFullName = `${displayFirstName} ${displayLastName}`;
  const figureLabel = useMemo(
    () => (isHebrew ? `תמונה של ${displayFullName}` : `Portrait of ${displayFullName}`),
    [displayFullName, isHebrew]
  );
  const appDirection = isHebrew ? "rtl" : "ltr";

  useEffect(() => {
    const node = aboutRef.current;
    if (!node) {
      return;
    }

    if (typeof window === "undefined" || typeof window.IntersectionObserver !== "function") {
      setAboutVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting && entry.intersectionRatio > 0.15;
        setAboutVisible((previous) => (previous === nextVisible ? previous : nextVisible));
      },
      {
        threshold: [0, 0.15, 0.35, 0.6, 1],
        rootMargin: "-10% 0px"
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAboutVisible) {
      setActiveIndex((previous) => (previous === 0 ? previous : 0));
    }
  }, [isAboutVisible]);

  useEffect(() => {
    setActiveIndex((previous) => (previous === 0 ? previous : 0));
  }, [language]);

  useEffect(() => {
    return () => {
      if (tiltFrame.current) {
        cancelAnimationFrame(tiltFrame.current);
      }
    };
  }, []);

  const handleTimelineBlur = useCallback((event: FocusEvent<HTMLOListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setActiveIndex((previous) => (previous === 0 ? previous : 0));
    }
  }, []);

  const handleTimelineActivate = useCallback((index: number) => {
    setActiveIndex((previous) => (previous === index ? previous : index));
  }, []);

  const handleTimelineKeyDown = useCallback(
    (event: KeyboardEvent<HTMLLIElement>) => {
      if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") {
        return;
      }
      const index = Number((event.currentTarget as HTMLLIElement).dataset.index);
      if (!Number.isNaN(index)) {
        event.preventDefault();
        handleTimelineActivate(index);
      }
    },
    [handleTimelineActivate]
  );

  const handleLanguageChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as LanguageCode;
    if (translations[value]) {
      setLanguage(value);
    }
  }, []);

  const handleCardMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width;
      const relY = (event.clientY - rect.top) / rect.height;
      const rotateY = (relX - 0.5) * 22;
      const rotateX = (0.5 - relY) * 18;

      if (tiltFrame.current) {
        cancelAnimationFrame(tiltFrame.current);
      }

      tiltFrame.current = requestAnimationFrame(() => {
        setTilt((previous) => {
          if (
            Math.abs(previous.x - rotateX) < 0.1 &&
            Math.abs(previous.y - rotateY) < 0.1
          ) {
            return previous;
          }
          return { x: rotateX, y: rotateY };
        });
        tiltFrame.current = null;
      });
    },
    [prefersReducedMotion]
  );

  const handleCardMouseLeave = useCallback(() => {
    if (tiltFrame.current) {
      cancelAnimationFrame(tiltFrame.current);
      tiltFrame.current = null;
    }
    setTilt((previous) => {
      if (previous.x === 0 && previous.y === 0) {
        return previous;
      }
      return { x: 0, y: 0 };
    });
  }, []);

  const handleToggleCertificates = useCallback(() => {
    setCertsOpen((prev) => !prev);
  }, []);

  const handleScrollToAbout = useCallback(() => {
    aboutRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  }, [prefersReducedMotion]);

  const handleTimelineMouseEnter = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      const index = Number(event.currentTarget.dataset.index);
      if (!Number.isNaN(index)) {
        handleTimelineActivate(index);
      }
    },
    [handleTimelineActivate]
  );

  const handleTimelineFocus = useCallback(
    (event: FocusEvent<HTMLLIElement>) => {
      const index = Number(event.currentTarget.dataset.index);
      if (!Number.isNaN(index)) {
        handleTimelineActivate(index);
      }
    },
    [handleTimelineActivate]
  );

  const handleTimelineClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      const index = Number(event.currentTarget.dataset.index);
      if (!Number.isNaN(index)) {
        handleTimelineActivate(index);
      }
    },
    [handleTimelineActivate]
  );

  const handleTimelineMouseLeave = useCallback(() => {
    setActiveIndex((previous) => (previous === 0 ? previous : 0));
  }, []);

  const cardStyle = useMemo(
    () =>
      ({
        "--card-rotate-x": `${prefersReducedMotion ? 0 : tilt.x}deg`,
        "--card-rotate-y": `${prefersReducedMotion ? 0 : tilt.y}deg`
      }) as CSSProperties,
    [prefersReducedMotion, tilt.x, tilt.y]
  );

  return (
    <main className={`app ${isHebrew ? "app--rtl" : ""}`} dir={appDirection}>
      <div className="space" aria-hidden="true">
        <div className="space__gradient" />
        <div className="star-field star-field--distant" />
        <div className="star-field star-field--mid" />
        <div className="star-field star-field--near" />
      </div>
      <div className="hero">
        <section
          style={cardStyle}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="profile-card"
        >
            <div className="language-switch" aria-live="polite">
              <label className="sr-only" htmlFor="language-picker">
                Language
              </label>
              <select
                id="language-picker"
                className="language-switch__select"
                value={language}
                onChange={handleLanguageChange}
                aria-label="Select language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <header className="profile-card__header">
              <figure
                className={`avatar ${OPEN_FOR_WORK ? "avatar--open" : ""}`}
                aria-label={figureLabel}
                style={
                  {
                    "--avatar-image": `url(${profileImageUrl})`
                  } as CSSProperties
                }
              >
                {OPEN_FOR_WORK && (
                  <>
                    <svg className="avatar__ring" viewBox="0 0 120 120" aria-hidden="true">
                      <defs>
                        <path
                          id={ringPathId}
                          d="M60 60 m0 -54 a54 54 0 1 1 0 108 a54 54 0 1 1 0 -108"
                        />
                      </defs>
                      <circle className="avatar__ring-track" cx="60" cy="60" r="54" />
                      <text className="avatar__ring-text">
                        <textPath
                          xlinkHref={`#${ringPathId}`}
                          href={`#${ringPathId}`}
                          startOffset="50%"
                          textAnchor="middle"
                        >
                          OPEN FOR WORK • OPEN FOR WORK •
                        </textPath>
                      </text>
                    </svg>
                    <span className="avatar__sparkles" aria-hidden="true">
                      <span className="avatar__sparkle avatar__sparkle--one" />
                      <span className="avatar__sparkle avatar__sparkle--two" />
                      <span className="avatar__sparkle avatar__sparkle--three" />
                    </span>
                  </>
                )}
              </figure>

              <div className="profile-card__headline translate-group">
                <p
                  key={`${language}-subtitle`}
                  className="profile-card__subtitle translate-item"
                >
                  {content.subtitle}
                </p>
                <h1
                  key={`${language}-title`}
                  className="profile-card__title translate-item"
                >
                  <span className="profile-card__title-first">{displayFirstName}</span>
                  <span className="profile-card__title-last">{displayLastName}</span>
                </h1>
              </div>
            </header>

            <div className="profile-card__body">
              <p
                key={`${language}-bio`}
                className="profile-card__bio translate-item"
              >
                {content.heroBio}
              </p>

              <nav className="profile-card__links" aria-label="Primary social links">
                <a
                  className="action-button"
                  href="https://www.linkedin.com/in/dan-epstein"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a
                  className="action-button"
                  href="https://github.com/Depsteino/depsteino.github.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon />
                  GitHub
                </a>
                {/* <a className="action-button" href="/Dan-Epstein-Resume.pdf" download>
                  <DownloadIcon />
                  Resume
                </a> */}
              </nav>

              {/* <button
                type="button"
                className={`certificates-button ${areCertsOpen ? "certificates-button--active" : ""}`}
                onClick={handleToggleCertificates}
                aria-expanded={areCertsOpen}
                aria-controls="certificates-panel"
              >
                <span aria-hidden="true">★</span>
                <span>Show Certificates</span>
              </button> */}

              <button
                type="button"
                className="scroll-indicator"
                onClick={handleScrollToAbout}
                aria-controls="about"
              >
                <span
                  key={`${language}-scroll`}
                  className="scroll-indicator__label translate-item"
                >
                  {content.scrollLabel}
                </span>
                <ScrollWheelIcon />
              </button>
              <p className="profile-card__tagline translate-item" aria-live="polite">
                ❤ deployed via GitHub Pages <span aria-hidden="true">❤</span>
              </p>
            </div>
          </section>
          <aside
            id="certificates-panel"
            className={`certificates-panel ${areCertsOpen ? "certificates-panel--visible" : ""}`}
            aria-live="polite"
          >
            <header className="certificates-panel__header">
              <h3>Professional Certifications</h3>
              <button type="button" onClick={handleToggleCertificates} className="certificates-panel__close">
                Close
              </button>
            </header>
            <ul className="certificates-panel__list">
              {certificates.map((certificate) => (
                <li key={certificate.name} className="certificates-panel__item">
                  <span
                    className="certificates-panel__logo"
                    style={
                      {
                        "--certificate-logo": `url(${resolveAssetUrl(certificate.logo)})`
                      } as CSSProperties
                    }
                    aria-hidden="true"
                  />
                  <div className="certificates-panel__details">
                    <p className="certificates-panel__name">{certificate.name}</p>
                    <p className="certificates-panel__issuer">{certificate.issuer}</p>
                    {certificate.credential ? (
                      <p className="certificates-panel__credential">{certificate.credential}</p>
                    ) : null}
                  </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section
        id="about"
        className={`about ${isAboutVisible ? "about--visible" : ""}`}
        ref={aboutRef}
      >
        <div className="about__timeline">
          <h2
            key={`${language}-heading`}
            className="about__title translate-item"
          >
            {content.experienceTitle}
          </h2>
          <ol className="timeline" onMouseLeave={handleTimelineMouseLeave} onBlur={handleTimelineBlur}>
            {timeline.map((item, index) => {
              const isActive = activeIndex === index;
              const detailId = `timeline-details-${index}`;
              return (
                <li
                  key={item.timeframe}
                  data-index={index}
                  className={`timeline__item ${isActive ? "timeline__item--active" : ""}`}
                  tabIndex={0}
                  onMouseEnter={handleTimelineMouseEnter}
                  onFocus={handleTimelineFocus}
                  onClick={handleTimelineClick}
                  onKeyDown={handleTimelineKeyDown}
                  role="button"
                  aria-expanded={isActive}
                  aria-controls={detailId}
                >
                  <span className="timeline__marker" aria-hidden="true" />
                  <div className="timeline__content translate-group">
                    <p className="timeline__date translate-item">
                      {item.timeframe}
                    </p>
                    <h3 className="timeline__role translate-item">{item.title}</h3>
                    <p className="timeline__summary translate-item">
                      {item.summary}
                    </p>
                    <p className="timeline__details translate-item" id={detailId}>
                      {item.details}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <figure
          className="about__portrait"
          style={
            {
              "--portrait-image": `url(${portraitImageUrl})`,
              "--portrait-accent": activeItem.accent
            } as CSSProperties
          }
        >
          <div
            className="about__portrait-frame"
            aria-hidden="true"
            data-active-index={activeIndex}
          />
          <span className="sr-only">
            Portrait corresponding to {activeItem.timeframe}: {activeItem.title}
          </span>
        </figure>
      </section>
    </main>
  );
};

const LinkedInIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.15" />
    <path
      d="M8.535 17.25H6.045V9.705h2.49V17.25Zm-1.245-8.625c-.81 0-1.44-.63-1.44-1.41 0-.765.63-1.395 1.44-1.395.795 0 1.425.63 1.44 1.395 0 .78-.645 1.41-1.44 1.41Zm11.16 8.625h-2.49v-3.93c0-.99-.36-1.665-1.26-1.665-.69 0-1.095.465-1.275.915-.06.15-.075.36-.075.57v4.11h-2.49V9.705h2.49v1.035c.36-.555.915-1.095 2.07-1.095 1.5 0 3.03.99 3.03 3.15v4.455Z"
      fill="currentColor"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.476 2 2 6.588 2 12.223c0 4.502 2.865 8.315 6.839 9.661.5.1.682-.222.682-.495 0-.244-.009-.889-.014-1.746-2.782.615-3.369-1.37-3.369-1.37-.455-1.177-1.11-1.49-1.11-1.49-.908-.64.069-.627.069-.627 1.003.073 1.531 1.06 1.531 1.06.892 1.566 2.341 1.114 2.91.852.091-.664.35-1.114.637-1.37-2.22-.258-4.555-1.138-4.555-5.07 0-1.12.387-2.036 1.025-2.753-.103-.259-.445-1.302.098-2.714 0 0 .84-.273 2.75 1.051A9.354 9.354 0 0 1 12 7.46a9.35 9.35 0 0 1 2.502.347c1.91-1.324 2.748-1.051 2.748-1.051.545 1.412.203 2.455.1 2.714.64.717 1.024 1.633 1.024 2.753 0 3.943-2.341 4.807-4.568 5.058.359.319.678.95.678 1.916 0 1.383-.012 2.497-.012 2.835 0 .275.18.598.688.494A10.036 10.036 0 0 0 22 12.223C22 6.588 17.522 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a.997.997 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 0 1 1-1Z"
      fill="currentColor"
    />
    <path
      d="M5 17a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"
      fill="currentColor"
    />
  </svg>
);

const ScrollWheelIcon = () => (
  <svg
    aria-hidden="true"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="7"
      y="2"
      width="10"
      height="20"
      rx="5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="rgba(148, 163, 184, 0.08)"
    />
    <rect
      x="11"
      y="6"
      width="2"
      height="4"
      rx="1"
      fill="currentColor"
    />
    <path
      d="M12 14.5v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 18.5s1 1 2 1 2-1 2-1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TechStackIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="5"
      y="4"
      width="14"
      height="5"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="rgba(94, 231, 255, 0.12)"
    />
    <rect
      x="5"
      y="10"
      width="14"
      height="5"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="rgba(94, 231, 255, 0.18)"
    />
    <rect
      x="5"
      y="16"
      width="14"
      height="4"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="rgba(94, 231, 255, 0.24)"
    />
  </svg>
);

const BackIcon = () => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.5 7.5 4 12l5.5 4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 12h13.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default App;
