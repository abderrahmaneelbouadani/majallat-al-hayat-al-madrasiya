"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Brain,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Earth,
  Eye,
  GraduationCap,
  HeartPulse,
  Layers3,
  Leaf,
  Lightbulb,
  ListChecks,
  Map,
  NotebookTabs,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound
} from "lucide-react";

type Domain = {
  id: string;
  title: string;
  shortTitle: string;
  definition: string;
  summary: string;
  keywords: string[];
  goals: string[];
  subtopics: {
    title: string;
    detail: string;
  }[];
  icon: React.ElementType;
  color: string;
  tint: string;
};

const domains: Domain[] = [
  {
    id: "citizenship",
    title: "المواطنة",
    shortTitle: "المواطنة",
    definition:
      "مجال يروم ترسيخ الانتماء والحقوق والواجبات داخل المؤسسة، وتنمية سلوك مسؤول يقوم على القيم والمشاركة واحترام القانون.",
    summary:
      "يركز هذا المجال على جعل المتعلم فاعلا داخل الحياة المدرسية: يعرف حقوقه، يلتزم بواجباته، يشارك في المبادرات، ويتعلم قيم الإنصاف والتعاون والمسؤولية.",
    keywords: ["القيم", "الحقوق", "الواجبات", "المشاركة", "الإنصاف", "المسؤولية"],
    goals: [
      "تنمية الإحساس بالانتماء إلى المؤسسة والوطن.",
      "ربط الحقوق بالواجبات في السلوك اليومي.",
      "تشجيع المشاركة في المجالس والأندية والمبادرات.",
      "ترسيخ الإنصاف وتكافؤ الفرص داخل الفضاء المدرسي."
    ],
    subtopics: [
      {
        title: "التربية على القيم",
        detail:
          "تعلم قيم الاحترام والتسامح والنزاهة والتعاون عبر أنشطة مدرسية تجعل القيم ممارسة يومية لا مجرد شعارات."
      },
      {
        title: "الواجب والالتزام",
        detail:
          "فهم النظام الداخلي واحترام الزمن المدرسي والممتلكات والعلاقات، لأن المواطنة تبدأ من الالتزام داخل المؤسسة."
      },
      {
        title: "الإنصاف وتكافؤ الفرص",
        detail:
          "ضمان استفادة المتعلمات والمتعلمين من فرص التعلم والمشاركة والدعم دون تمييز أو إقصاء."
      },
      {
        title: "المشاركة التلاميذية",
        detail:
          "إشراك التلاميذ في الأندية والمجالس والمشاريع حتى يتدربوا على الحوار واتخاذ المبادرة وتحمل المسؤولية."
      }
    ],
    icon: UsersRound,
    color: "#2563eb",
    tint: "#dbeafe"
  },
  {
    id: "environment",
    title: "البيئة والتنمية المستدامة",
    shortTitle: "البيئة",
    definition:
      "مجال يربط التعلم بحماية المحيط وترشيد الموارد، ويحول المؤسسة إلى فضاء يربي على السلوك البيئي والمبادرة المستدامة.",
    summary:
      "يساعد المتعلم على فهم علاقته بالبيئة المدرسية والمحلية والعالمية، وعلى الانتقال من الوعي بالمشكلات إلى إنجاز مشاريع عملية قابلة للتقويم.",
    keywords: ["المحيط", "الاستدامة", "ترشيد الموارد", "النظافة", "المشاريع", "الشركاء"],
    goals: [
      "تنمية وعي بيئي عملي داخل المؤسسة.",
      "ترسيخ سلوكيات النظافة وترشيد الماء والطاقة.",
      "ربط المدرسة بمحيطها المحلي وشركائها.",
      "تحويل القضايا البيئية إلى مشاريع تربوية ملموسة."
    ],
    subtopics: [
      {
        title: "البيئة المدرسية",
        detail:
          "الاهتمام بنظافة المؤسسة وجمالية الفضاءات واحترام الموارد المشتركة بوصفها جزءا من جودة الحياة المدرسية."
      },
      {
        title: "البيئة المحلية",
        detail:
          "ربط الأنشطة بمشكلات المحيط القريب مثل النفايات والماء والمساحات الخضراء، والعمل مع الشركاء المحليين."
      },
      {
        title: "القضايا البيئية العالمية",
        detail:
          "تبسيط قضايا كالتغير المناخي والتنوع البيولوجي والاستهلاك المسؤول وربطها بسلوك المتعلم اليومي."
      },
      {
        title: "مشاريع بيئية",
        detail:
          "تنظيم حملات ومبادرات مثل التشجير والفرز وإعادة التدوير والتوعية، مع تتبع النتائج وتقويم الأثر."
      }
    ],
    icon: Leaf,
    color: "#16a34a",
    tint: "#dcfce7"
  },
  {
    id: "health",
    title: "الصحة المدرسية",
    shortTitle: "الصحة",
    definition:
      "مجال يهدف إلى حماية صحة المتعلم وتعزيز أنماط الحياة السليمة، عبر التربية الصحية والوقاية والمواكبة النفسية والجسدية.",
    summary:
      "يجمع بين التوعية والمراقبة والوقاية والدعم، حتى تصبح المدرسة فضاء يساند التعلم بسلامة الجسد والنفس والعلاقات.",
    keywords: ["الوقاية", "النظافة", "التغذية", "المراقبة", "الصحة النفسية", "السلامة"],
    goals: [
      "تنمية عادات صحية سليمة لدى المتعلم.",
      "دعم الوقاية والكشف المبكر عن المشكلات الصحية.",
      "تعزيز الصحة النفسية والعلاقات الإيجابية.",
      "جعل الصحة شرطا مساعدا على التعلم والاندماج."
    ],
    subtopics: [
      {
        title: "التربية الصحية",
        detail:
          "توعية المتعلمين بالنظافة والتغذية والنشاط البدني والوقاية من السلوكات الخطرة بأسلوب تربوي قريب من حياتهم."
      },
      {
        title: "المراقبة الصحية",
        detail:
          "تتبع الحالة الصحية والتنسيق مع الأسر والمصالح المختصة للتدخل عند الحاجة وحماية المتعلمين."
      },
      {
        title: "الحياة السليمة",
        detail:
          "تشجيع نمط يومي متوازن يجمع بين النظافة والنوم والتغذية والحركة واحترام شروط السلامة."
      },
      {
        title: "الصحة النفسية",
        detail:
          "الانتباه إلى التوتر والعنف والعزلة وصعوبات التكيف، وبناء مناخ مدرسي داعم وآمن."
      }
    ],
    icon: HeartPulse,
    color: "#e11d48",
    tint: "#ffe4e6"
  },
  {
    id: "security",
    title: "الأمن الإنساني",
    shortTitle: "الأمن",
    definition:
      "مجال يهتم بحماية الأشخاص داخل المؤسسة والوقاية من المخاطر، وتنمية ثقافة السلامة والتصرف السليم في الوضعيات الطارئة.",
    summary:
      "ينقل السلامة من رد فعل متأخر إلى ثقافة مدرسية منظمة: خطط واضحة، تدريب على الطوارئ، وقاية، وحماية من المخاطر المادية والمعنوية.",
    keywords: ["السلامة", "الوقاية", "الطوارئ", "المخاطر", "الحماية", "التدخل"],
    goals: [
      "إرساء ثقافة الأمن والسلامة داخل المؤسسة.",
      "تدريب المتعلمين على التصرف في الطوارئ.",
      "الوقاية من العنف والحوادث والمخاطر المختلفة.",
      "تنظيم المسؤوليات والتدخلات عند حدوث الخطر."
    ],
    subtopics: [
      {
        title: "مخطط الأمن المدرسي",
        detail:
          "وثيقة وإجراءات تحدد المخاطر المحتملة والمسؤوليات ومسارات التدخل حتى يكون التصرف منظما عند الحاجة."
      },
      {
        title: "التربية على الطوارئ",
        detail:
          "تدريب المتعلمين على الإخلاء والإسعافات الأولية والتصرف الهادئ في الحريق أو الزلزال أو الحوادث."
      },
      {
        title: "الحماية والوقاية",
        detail:
          "الحد من العنف والإيذاء والحوادث، وتأمين الفضاءات والعلاقات بما يحفظ الكرامة والسلامة."
      },
      {
        title: "تدبير المخاطر",
        detail:
          "تحديد المخاطر وترتيب أولوياتها ووضع إجراءات قبلية وبعدية، مع إشراك الأطر والشركاء عند الضرورة."
      }
    ],
    icon: ShieldCheck,
    color: "#7c3aed",
    tint: "#ede9fe"
  }
];

const memorizationPoints = [
  "مجالات الحياة المدرسية تجعل المؤسسة فضاء للتعلم والسلوك والمسؤولية.",
  "كل مجال يجمع بين قيم وأهداف وأنشطة وتقويم.",
  "المتعلم يشارك في الأندية والمجالس والمشاريع والمبادرات.",
  "الحياة المدرسية ترتبط بالمحيط والشركاء.",
  "المجالات الأربعة تتكامل لتكوين متعلم متوازن."
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSubtitle, setActiveSubtitle] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedDomains, setCompletedDomains] = useState<string[]>([]);
  const [flippedPoint, setFlippedPoint] = useState<number | null>(0);
  const [expandedDomain, setExpandedDomain] = useState<string>(domains[0].id);
  const scope = useRef<HTMLElement | null>(null);
  const activeDomain = domains[activeIndex];
  const ActiveIcon = activeDomain.icon;
  const progressPercent = Math.round((completedDomains.length / domains.length) * 100);

  const selectedSubtopic = useMemo(
    () => activeDomain.subtopics[activeSubtitle] ?? activeDomain.subtopics[0],
    [activeDomain, activeSubtitle]
  );

  const filteredDomains = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();
    if (!value) return domains;

    return domains.filter((domain) => {
      const searchable = [
        domain.title,
        domain.definition,
        domain.summary,
        ...domain.keywords,
        ...domain.goals,
        ...domain.subtopics.flatMap((subtopic) => [subtopic.title, subtopic.detail])
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(value);
    });
  }, [searchTerm]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from("[data-animate]", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08
      });
    }, scope);
    return () => context.revert();
  }, []);

  useEffect(() => {
    setActiveSubtitle(0);
    gsap.fromTo(
      "[data-domain-panel]",
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.36, ease: "power2.out" }
    );
  }, [activeIndex]);

  const selectDomain = (index: number) => {
    setActiveIndex(index);
    setExpandedDomain(domains[index].id);
    document.documentElement.style.setProperty("--active-color", domains[index].color);
  };

  const goToDomain = (direction: "next" | "prev") => {
    const nextIndex =
      direction === "next"
        ? (activeIndex + 1) % domains.length
        : (activeIndex - 1 + domains.length) % domains.length;
    selectDomain(nextIndex);
  };

  const toggleCompleted = (domainId: string) => {
    setCompletedDomains((current) =>
      current.includes(domainId) ? current.filter((id) => id !== domainId) : [...current, domainId]
    );
  };

  const resetProgress = () => {
    setCompletedDomains([]);
    setFlippedPoint(0);
  };

  const handleTilt = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    event.currentTarget.style.setProperty("--tilt-x", `${y.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x.toFixed(2)}deg`);
  };

  const resetTilt = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <main ref={scope}>
      <div className="ambient-scene" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="الرئيسية">
          <GraduationCap size={22} />
          <span>دفتر المراجعة</span>
        </a>
        <nav aria-label="التنقل الرئيسي">
          <a href="#home">الرئيسية</a>
          <a href="#map">الخريطة</a>
          <a href="#domains">المجالات</a>
          <a href="#memorize">نقاط للحفظ</a>
        </nav>
      </header>

      <section id="home" className="hero section-shell">
        <div className="hero-copy" data-animate>
          <div className="eyebrow">
            <BookOpenCheck size={18} />
            مراجعة مركزة ومنظمة
          </div>
          <h1>مجالات الحياة المدرسية</h1>
          <p>
            مساحة مراجعة تفاعلية تساعدك على تثبيت التعاريف، الخلاصات، الكلمات
            المفتاحية، والأهداف الأساسية للمجالات الأربعة بطريقة سريعة وواضحة.
          </p>
          <div className="domain-tabs" role="tablist" aria-label="اختيار المجال">
            {domains.map((domain, index) => {
              const Icon = domain.icon;
              return (
                <button
                  key={domain.id}
                  type="button"
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => selectDomain(index)}
                  role="tab"
                  aria-selected={index === activeIndex}
                >
                  <Icon size={18} />
                  {domain.shortTitle}
                </button>
              );
            })}
          </div>
          <div className="study-tools" data-animate>
            <label className="search-box">
              <Search size={18} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="ابحث عن قيمة، هدف، محور..."
                aria-label="البحث في محتوى المراجعة"
              />
            </label>
            <div className="progress-widget">
              <div className="progress-ring" style={{ "--progress": `${progressPercent}%` } as React.CSSProperties}>
                <span>{progressPercent}%</span>
              </div>
              <div>
                <strong>تقدم المراجعة</strong>
                <p>{completedDomains.length} من 4 مجالات محددة كمراجعة</p>
              </div>
            </div>
          </div>
        </div>

        <article
          className="revision-panel tilt-card"
          data-animate
          data-domain-panel
          onPointerMove={handleTilt}
          onPointerLeave={resetTilt}
        >
          <div className="panel-top">
            <div className="domain-icon" style={{ background: activeDomain.tint, color: activeDomain.color }}>
              <ActiveIcon size={30} />
            </div>
            <div>
              <span>المجال النشط</span>
              <h2>{activeDomain.title}</h2>
            </div>
          </div>
          <div className="info-block">
            <h3>تعريف مختصر</h3>
            <p>{activeDomain.definition}</p>
          </div>
          <div className="info-block highlight">
            <h3>Résumé</h3>
            <p>{activeDomain.summary}</p>
          </div>
          <div className="chips">
            {activeDomain.keywords.map((keyword) => (
              <button key={keyword} type="button" onClick={() => setSearchTerm(keyword)}>
                {keyword}
              </button>
            ))}
          </div>
          <div className="goal-grid">
            {activeDomain.goals.slice(0, 2).map((goal) => (
              <div key={goal}>
                <BadgeCheck size={18} />
                <span>{goal}</span>
              </div>
            ))}
          </div>
          <div className="panel-actions">
            <button type="button" onClick={() => goToDomain("prev")}>
              <ChevronRight size={18} />
              السابق
            </button>
            <button
              type="button"
              className={completedDomains.includes(activeDomain.id) ? "done" : ""}
              onClick={() => toggleCompleted(activeDomain.id)}
            >
              <CheckCircle2 size={18} />
              {completedDomains.includes(activeDomain.id) ? "تمت المراجعة" : "تحديد كمراجع"}
            </button>
            <button type="button" onClick={() => goToDomain("next")}>
              التالي
              <ChevronLeft size={18} />
            </button>
          </div>
        </article>
      </section>

      <section className="focus-strip section-shell" data-animate>
        <div>
          <Target size={20} />
          <span>مسار سريع</span>
        </div>
        {domains.map((domain, index) => (
          <button
            key={domain.id}
            type="button"
            className={index === activeIndex ? "active" : ""}
            onClick={() => {
              selectDomain(index);
              document.querySelector("#map")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span style={{ background: domain.color }} />
            {domain.title}
            {completedDomains.includes(domain.id) && <CheckCircle2 size={16} />}
          </button>
        ))}
      </section>

      <section id="map" className="map-section">
        <div className="map-copy" data-animate>
          <div className="section-kicker">
            <Map size={18} />
            خريطة مراجعة تفاعلية
          </div>
          <h2>اربط المجال بمحاوره</h2>
          <p>
            اختر عقدة من الخريطة، ثم اختر عنوانا فرعيا لعرض شرحه. هذه الصفحة
            مصممة لتثبيت العلاقة بين المجال، الفكرة المركزية، والمحاور.
          </p>
        </div>

        <div className="map-workspace" data-animate>
          <div className="orbit-map" aria-label="خريطة مجالات الحياة المدرسية">
            <svg className="map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line className={activeIndex === 0 ? "active" : ""} x1="50" y1="50" x2="78" y2="18" />
              <line className={activeIndex === 1 ? "active" : ""} x1="50" y1="50" x2="22" y2="18" />
              <line className={activeIndex === 2 ? "active" : ""} x1="50" y1="50" x2="75" y2="82" />
              <line className={activeIndex === 3 ? "active" : ""} x1="50" y1="50" x2="25" y2="82" />
            </svg>
            <div className="center-node">
              <Sparkles size={24} />
              <span>الحياة المدرسية</span>
            </div>
            {domains.map((domain, index) => {
              const Icon = domain.icon;
              return (
                <button
                  key={domain.id}
                  type="button"
                  className={`map-node node-${index + 1} ${index === activeIndex ? "active" : ""}`}
                  onClick={() => selectDomain(index)}
                  style={{ "--node-color": domain.color } as React.CSSProperties}
                >
                  <Icon size={22} />
                  <span>{domain.title}</span>
                </button>
              );
            })}
          </div>

          <aside className="subtopic-panel" data-domain-panel>
            <div className="panel-top compact">
              <div className="domain-icon" style={{ background: activeDomain.tint, color: activeDomain.color }}>
                <ActiveIcon size={24} />
              </div>
              <div>
                <span>محاور {activeDomain.title}</span>
                <h3>{selectedSubtopic.title}</h3>
              </div>
            </div>
            <div className="subtopic-buttons">
              {activeDomain.subtopics.map((subtopic, index) => (
                <button
                  key={subtopic.title}
                  type="button"
                  className={index === activeSubtitle ? "active" : ""}
                  onClick={() => setActiveSubtitle(index)}
                >
                  <CircleDot size={15} />
                  {subtopic.title}
                </button>
              ))}
            </div>
            <p className="subtopic-detail">{selectedSubtopic.detail}</p>
            <div className="micro-summary">
              <h4>
                <Layers3 size={16} />
                تذكير سريع
              </h4>
              <p>{activeDomain.summary}</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="domains" className="section-shell domains-section">
        <div className="section-heading" data-animate>
          <div>
            <div className="section-kicker">
              <NotebookTabs size={18} />
              بطاقات تفصيلية
            </div>
            <h2>المجالات الأربعة في صفحة واحدة</h2>
          </div>
          <div className="result-pill">
            <Search size={16} />
            {filteredDomains.length} نتيجة
          </div>
        </div>
        <div className="domain-card-grid">
          {filteredDomains.map((domain) => {
            const Icon = domain.icon;
            const domainIndex = domains.findIndex((item) => item.id === domain.id);
            const isExpanded = expandedDomain === domain.id;
            return (
              <article
                className={`domain-card tilt-card ${activeDomain.id === domain.id ? "current" : ""}`}
                key={domain.id}
                data-animate
                onPointerMove={handleTilt}
                onPointerLeave={resetTilt}
              >
                <button
                  className="card-title card-toggle"
                  type="button"
                  onClick={() => {
                    selectDomain(domainIndex);
                    setExpandedDomain(isExpanded ? "" : domain.id);
                  }}
                >
                  <div className="domain-icon" style={{ background: domain.tint, color: domain.color }}>
                    <Icon size={25} />
                  </div>
                  <div>
                    <span>مجال</span>
                    <h3>{domain.title}</h3>
                  </div>
                  <Eye size={18} />
                </button>
                <p className="definition">{domain.definition}</p>
                {isExpanded && (
                  <div className="card-body">
                    <div className="mini-section">
                      <h4>
                        <ClipboardCheck size={16} />
                        خلاصة
                      </h4>
                      <p>{domain.summary}</p>
                    </div>
                <div className="chips tight">
                  {domain.keywords.map((keyword) => (
                    <button key={keyword} type="button" onClick={() => setSearchTerm(keyword)}>
                      {keyword}
                    </button>
                  ))}
                </div>
                    <div className="mini-section">
                      <h4>
                        <ListChecks size={16} />
                        أهداف وأفكار أساسية
                      </h4>
                      <ul>
                        {domain.goals.map((goal) => (
                          <li key={goal}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="subtopic-list">
                      {domain.subtopics.map((subtopic, index) => (
                        <button
                          type="button"
                          key={subtopic.title}
                          onClick={() => {
                            selectDomain(domainIndex);
                            setActiveSubtitle(index);
                            document.querySelector("#map")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          <strong>{subtopic.title}</strong>
                          <p>{subtopic.detail}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="memorize" className="memorize-section">
        <div className="memorize-card" data-animate>
          <div className="section-kicker">
            <Brain size={18} />
            نقاط للحفظ
          </div>
          <h2>خمس جمل كافية لتثبيت الفكرة العامة</h2>
          <div className="memory-toolbar">
            <button type="button" onClick={resetProgress}>
              <RotateCcw size={17} />
              إعادة ضبط
            </button>
          </div>
          <div className="memory-list">
            {memorizationPoints.map((point, index) => (
              <button
                type="button"
                key={point}
                className={flippedPoint === index ? "flipped" : ""}
                onClick={() => setFlippedPoint(flippedPoint === index ? null : index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{flippedPoint === index ? point : "اضغط لإظهار نقطة الحفظ"}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="quick-legend" data-animate>
          <div>
            <Lightbulb size={20} />
            <span>افهم المجال من تعريفه.</span>
          </div>
          <div>
            <Earth size={20} />
            <span>اربطه بالمؤسسة والمحيط.</span>
          </div>
          <div>
            <CheckCircle2 size={20} />
            <span>استحضر أثره على المتعلم.</span>
          </div>
        </div>
      </section>

      <footer>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ArrowRight size={18} />
          العودة إلى الأعلى
        </button>
        <span>
          <ArrowLeft size={16} />
          مراجعة مركزة لمجالات الحياة المدرسية
        </span>
      </footer>
    </main>
  );
}
