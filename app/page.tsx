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
  HelpCircle,
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
  Trophy,
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

const creators = [
  "عبد الرحمان البوعداني",
  "عبد الحكيم ظريف",
  "عبد العلي العلوي الماحي",
  "محمد البكرفاوي",
  "سكينة طريقي"
];

const qcmQuestions = [
  {
    question: "ما الغاية العامة من مجالات الحياة المدرسية؟",
    options: [
      "جعل المؤسسة فضاء للتعلم والسلوك والمسؤولية",
      "تعويض الدروس الصفية بأنشطة فقط",
      "حصر دور المتعلم في التلقي",
      "فصل المدرسة عن محيطها"
    ],
    answer: 0,
    explanation: "المجالات تجعل المؤسسة فضاء للتعلم والحياة والسلوك والمشاركة والمسؤولية."
  },
  {
    question: "أي مجال يرتبط بالحقوق والواجبات والمشاركة التلاميذية؟",
    options: ["الصحة المدرسية", "المواطنة", "الأمن الإنساني", "البيئة والتنمية المستدامة"],
    answer: 1,
    explanation: "المواطنة تركز على القيم والحقوق والواجبات والإنصاف والمشاركة."
  },
  {
    question: "ما الفكرة الأساسية في مجال البيئة والتنمية المستدامة؟",
    options: [
      "حماية المحيط وترشيد الموارد",
      "تنظيم الفحوصات الطبية فقط",
      "وضع مخطط الإخلاء",
      "تدبير المجالس التلاميذية"
    ],
    answer: 0,
    explanation: "هذا المجال يربط الحياة المدرسية بحماية البيئة وترشيد الموارد والمشاريع البيئية."
  },
  {
    question: "أي عنصر يدخل ضمن الصحة المدرسية؟",
    options: ["التربية على الطوارئ", "المراقبة الصحية", "مشاريع التشجير", "الإنصاف وتكافؤ الفرص"],
    answer: 1,
    explanation: "المراقبة الصحية والتربية الصحية والحياة السليمة والصحة النفسية من محاور الصحة المدرسية."
  },
  {
    question: "ما المجال الذي يهتم بتدبير المخاطر والطوارئ والحماية؟",
    options: ["الأمن الإنساني", "المواطنة", "التنمية المستدامة", "المشاركة التلاميذية"],
    answer: 0,
    explanation: "الأمن الإنساني يهتم بالسلامة والوقاية والتصرف في الوضعيات الطارئة."
  },
  {
    question: "أي عبارة تلخص تكامل المجالات الأربعة؟",
    options: [
      "كل مجال مستقل تماما عن باقي المجالات",
      "المجالات الأربعة تتكامل لتكوين متعلم متوازن",
      "الحياة المدرسية لا ترتبط بالمحيط",
      "الأندية لا علاقة لها بالمشاركة"
    ],
    answer: 1,
    explanation: "المواطنة والبيئة والصحة والأمن تتكامل لبناء متعلم متوازن ومسؤول."
  },
  {
    question: "ما المقصود بالمشاركة التلاميذية؟",
    options: [
      "حضور التلميذ دون إبداء رأيه",
      "إشراك المتعلم في الأندية والمجالس والمشاريع",
      "الاقتصار على حفظ الدروس",
      "منع المبادرات داخل المؤسسة"
    ],
    answer: 1,
    explanation: "المشاركة التلاميذية تعني إشراك المتعلمين في الحياة المدرسية عبر المجالس والأندية والمبادرات."
  },
  {
    question: "أي سلوك يعبر عن الواجب والالتزام داخل المؤسسة؟",
    options: [
      "احترام النظام الداخلي والزمن المدرسي",
      "إتلاف الممتلكات المشتركة",
      "تجاهل التعليمات الوقائية",
      "عدم المشاركة في الأنشطة"
    ],
    answer: 0,
    explanation: "الواجب والالتزام يظهران في احترام النظام الداخلي والوقت والمرافق والعلاقات داخل المؤسسة."
  },
  {
    question: "ما معنى الإنصاف وتكافؤ الفرص في الحياة المدرسية؟",
    options: [
      "تمييز بعض المتعلمين على حساب الآخرين",
      "ضمان فرص التعلم والمشاركة للجميع دون إقصاء",
      "إلغاء الدعم المدرسي",
      "حصر الأنشطة في فئة واحدة"
    ],
    answer: 1,
    explanation: "الإنصاف يقوم على تمكين جميع المتعلمين من فرص عادلة في التعلم والمشاركة والدعم."
  },
  {
    question: "أي نشاط يناسب مجال البيئة والتنمية المستدامة؟",
    options: [
      "حملة تشجير وفرز النفايات",
      "تدريب الإخلاء فقط",
      "انتخاب مجلس القسم فقط",
      "فحص طبي دوري فقط"
    ],
    answer: 0,
    explanation: "المشاريع البيئية مثل التشجير والفرز والتوعية تترجم الوعي البيئي إلى ممارسة عملية."
  },
  {
    question: "ما المقصود بترشيد الموارد؟",
    options: [
      "الإسراف في استعمال الماء والطاقة",
      "استعمال الموارد بشكل عقلاني ومستدام",
      "إهمال نظافة المؤسسة",
      "منع الأنشطة البيئية"
    ],
    answer: 1,
    explanation: "ترشيد الموارد يعني استعمال الماء والطاقة والوسائل بشكل مسؤول ومستدام."
  },
  {
    question: "ما علاقة المدرسة بالمحيط في مجال البيئة؟",
    options: [
      "لا علاقة للمؤسسة بالمحيط",
      "تربط الأنشطة المدرسية بمشكلات البيئة المحلية والشركاء",
      "تكتفي المؤسسة بنظافة القسم فقط",
      "تلغي العمل بالمشاريع"
    ],
    answer: 1,
    explanation: "الحياة المدرسية تنفتح على المحيط المحلي والشركاء لمعالجة قضايا البيئة والتنمية."
  },
  {
    question: "أي عنصر يدخل ضمن الحياة السليمة؟",
    options: [
      "النوم والتغذية والنشاط البدني والنظافة",
      "العنف المدرسي",
      "الإسراف في استهلاك الموارد",
      "إهمال السلامة الطرقية"
    ],
    answer: 0,
    explanation: "الحياة السليمة تجمع بين النظافة والتغذية والنوم والحركة واحترام شروط السلامة."
  },
  {
    question: "لماذا تعد الصحة النفسية جزءا من الصحة المدرسية؟",
    options: [
      "لأنها تساعد على التكيف والأمان والعلاقات الإيجابية",
      "لأنها لا تؤثر في التعلم",
      "لأنها تعوض التربية الصحية",
      "لأنها تخص الأسرة فقط"
    ],
    answer: 0,
    explanation: "الصحة النفسية تدعم التعلم والاندماج وتحد من التوتر والعزلة والعنف."
  },
  {
    question: "ما الهدف من المراقبة الصحية داخل المؤسسة؟",
    options: [
      "الكشف المبكر والتتبع والتنسيق عند الحاجة",
      "إلغاء الأنشطة الصحية",
      "تدبير المخاطر الرقمية",
      "تعويض مجال المواطنة"
    ],
    answer: 0,
    explanation: "المراقبة الصحية تساعد على التتبع والكشف المبكر والتدخل بتنسيق مع الأسر والمختصين."
  },
  {
    question: "ما وظيفة مخطط الأمن المدرسي؟",
    options: [
      "تحديد المخاطر والمسؤوليات ومسارات التدخل",
      "تنظيم حملات التشجير",
      "تحديد كلمات مفتاحية للحفظ",
      "إلغاء تمارين الطوارئ"
    ],
    answer: 0,
    explanation: "مخطط الأمن المدرسي ينظم الوقاية والتدخل والمسؤوليات عند حدوث الخطر."
  },
  {
    question: "أي مثال يناسب التربية على الطوارئ؟",
    options: [
      "التدريب على الإخلاء والإسعافات الأولية",
      "المشاركة في مجلس التلاميذ فقط",
      "الاقتصاد في الماء فقط",
      "تنظيم ملصق بيئي فقط"
    ],
    answer: 0,
    explanation: "التربية على الطوارئ تدرب المتعلمين على التصرف السليم في الحريق أو الزلزال أو الحوادث."
  },
  {
    question: "ما المقصود بالحماية والوقاية في الأمن الإنساني؟",
    options: [
      "الحد من العنف والحوادث والمخاطر وحفظ الكرامة",
      "إهمال العلاقات داخل المؤسسة",
      "منع التواصل مع الشركاء",
      "التركيز على الحفظ فقط"
    ],
    answer: 0,
    explanation: "الحماية والوقاية تهدفان إلى تأمين الأشخاص والفضاءات والعلاقات داخل المؤسسة."
  },
  {
    question: "أي مجال يجعل المتعلم يربط حقوقه بواجباته داخل المؤسسة؟",
    options: ["المواطنة", "الصحة المدرسية", "الأمن الرقمي", "البيئة المحلية"],
    answer: 0,
    explanation: "المواطنة تدرب المتعلم على فهم الحقوق والالتزام بالواجبات داخل الحياة المدرسية."
  },
  {
    question: "ما العنصر المشترك بين المجالات الأربعة؟",
    options: [
      "أنها تجمع بين قيم وأهداف وأنشطة وتقويم",
      "أنها تركز على الحفظ فقط",
      "أنها منفصلة عن مشروع المؤسسة",
      "أنها تخص الإدارة دون المتعلمين"
    ],
    answer: 0,
    explanation: "كل مجال من مجالات الحياة المدرسية يجمع بين قيم وأهداف وأنشطة قابلة للتتبع والتقويم."
  }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSubtitle, setActiveSubtitle] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedDomains, setCompletedDomains] = useState<string[]>([]);
  const [flippedPoint, setFlippedPoint] = useState<number | null>(0);
  const [expandedDomain, setExpandedDomain] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qcmAnswers, setQcmAnswers] = useState<Record<number, number>>({});
  const scope = useRef<HTMLElement | null>(null);
  const activeDomain = domains[activeIndex];
  const ActiveIcon = activeDomain.icon;
  const progressPercent = Math.round((completedDomains.length / domains.length) * 100);
  const pdfPath = "./majallat-mindmap.pdf";
  const activeQuestion = qcmQuestions[currentQuestion];
  const selectedAnswer = qcmAnswers[currentQuestion];
  const isCurrentQuestionCorrect = selectedAnswer === activeQuestion.answer;
  const qcmScore = qcmQuestions.reduce(
    (total, question, index) => total + (qcmAnswers[index] === question.answer ? 1 : 0),
    0
  );
  const answeredQuestions = Object.keys(qcmAnswers).length;

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

  const chooseAnswer = (optionIndex: number) => {
    setQcmAnswers((current) => ({ ...current, [currentQuestion]: optionIndex }));
  };

  const resetQcm = () => {
    setCurrentQuestion(0);
    setQcmAnswers({});
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
          <a href="#workflow">الخريطة الذهنية</a>
          <a href="#domains">المجالات</a>
          <a href="#memorize">نقاط للحفظ</a>
          <a href="#qcm">QCM</a>
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
              document.querySelector("#workflow")?.scrollIntoView({ behavior: "smooth" });
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

      <section id="workflow" className="workflow-section section-shell">
        <div className="section-heading" data-animate>
          <div>
            <div className="section-kicker">
              <Map size={18} />
              الخريطة الذهنية
            </div>
            <h2>الخريطة الذهنية</h2>
          </div>
          <div className="result-pill">
            <Eye size={16} />
            ملف PDF
          </div>
        </div>

        <div className="pdf-viewer-card" data-animate>
          <div className="pdf-toolbar">
            <div>
              <strong>الخريطة الذهنية</strong>
            </div>
            <a href={pdfPath} target="_blank" rel="noreferrer">
              <Eye size={18} />
              فتح الملف
            </a>
          </div>
          <iframe
            title="الخريطة الذهنية لمجالات الحياة المدرسية"
            src={`${pdfPath}#toolbar=1&navpanes=0&view=FitH`}
          />
        </div>
      </section>

      <section id="domains" className="section-shell domains-section">
        <div className="section-heading" data-animate>
          <div>
            <h2>المجالات الأربعة</h2>
            <div className="section-kicker">
              <NotebookTabs size={18} />
              بطاقات تفصيلية
            </div>
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

      <section id="qcm" className="qcm-section section-shell" data-animate>
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              <HelpCircle size={18} />
              QCM
            </div>
            <h2>اختبار تفاعلي سريع للمراجعة</h2>
          </div>
          <div className="result-pill">
            <Trophy size={16} />
            {qcmScore} / {qcmQuestions.length}
          </div>
        </div>

        <div className="qcm-card">
          <div className="qcm-progress">
            <span>
              السؤال {currentQuestion + 1} من {qcmQuestions.length}
            </span>
            <div>
              <i style={{ width: `${(answeredQuestions / qcmQuestions.length) * 100}%` }} />
            </div>
          </div>

          <h3>{activeQuestion.question}</h3>

          <div className="qcm-options">
            {activeQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = activeQuestion.answer === index;
              const isWrong = isSelected && !isCorrect;
              return (
                <button
                  key={option}
                  type="button"
                  className={`${selectedAnswer !== undefined && isCorrect ? "correct" : ""} ${
                    isWrong ? "wrong" : ""
                  } ${isSelected ? "selected" : ""}`}
                  onClick={() => chooseAnswer(index)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== undefined && (
            <div className={selectedAnswer === activeQuestion.answer ? "qcm-feedback correct" : "qcm-feedback wrong"}>
              <strong>{selectedAnswer === activeQuestion.answer ? "إجابة صحيحة" : "إجابة غير صحيحة"}</strong>
              <p>{activeQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer !== undefined && !isCurrentQuestionCorrect && (
            <p className="qcm-lock-message">صحح الإجابة أولا للمرور إلى السؤال التالي.</p>
          )}

          <div className="qcm-actions">
            <button
              type="button"
              onClick={() => setCurrentQuestion((current) => Math.max(0, current - 1))}
              disabled={currentQuestion === 0}
            >
              <ChevronRight size={18} />
              السابق
            </button>
            <button type="button" onClick={resetQcm}>
              <RotateCcw size={18} />
              إعادة
            </button>
            <button
              type="button"
              onClick={() => setCurrentQuestion((current) => Math.min(qcmQuestions.length - 1, current + 1))}
              disabled={currentQuestion === qcmQuestions.length - 1 || !isCurrentQuestionCorrect}
            >
              التالي
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="creators-section section-shell" data-animate>
        <div className="creators-heading">
          <div className="section-kicker">
            <UsersRound size={18} />
            إنجاز الطلبة
          </div>
          <h2>أعد هذا العمل</h2>
        </div>
        <div className="creators-grid" aria-label="أسماء الطلبة الذين أنجزوا هذا العمل">
          {creators.map((creator, index) => (
            <div className={index === 0 ? "creator-card lead" : "creator-card"} key={creator}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{creator}</strong>
            </div>
          ))}
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
