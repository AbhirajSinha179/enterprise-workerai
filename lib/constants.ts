import {
  ArrowBigRightDash,
  BarChart,
  Calendar,
  InboxIcon,
  LayoutGrid,
  LucideSquareArrowOutUpRight,
  Mail,
  Users,
} from "lucide-react"

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: any
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

// const DASHBOARD_PATH = "/dashboard"

export const CLIENT_ID = "205356801177-sgo5c1okrp6j5vlpjp291ilk66idpnml.apps.googleusercontent.com"

export function getMenuList(pathname: string): Group[] {
  const DASHBOARD_PATH = pathname.includes("/tour") ? "/tour" : "/dashboard"
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `${DASHBOARD_PATH}`,
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Workspace",
      menus: [
        {
          href: `${DASHBOARD_PATH}/emails`,
          label: "Scheduler",
          active: pathname.includes("/emails"),
          icon: Calendar,
          submenus: [],
        },
        {
          href: `${DASHBOARD_PATH}/inbox`,
          label: "Inbox",
          active: pathname.includes("/inbox"),
          icon: InboxIcon,
          submenus: [],
        },
        {
          href: `${DASHBOARD_PATH}/leads`,
          label: "Leads",
          active: pathname.includes("/leads"),
          icon: ArrowBigRightDash,
          submenus: [],
        },
        {
          href: `${DASHBOARD_PATH}/mailbox`,
          label: "Mailbox",
          active: pathname.includes("/mailbox"),
          icon: Mail,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/outbound",
          label: "Outbound",
          active: pathname.includes("/account"),
          icon: Users,
          submenus: [],
        },
      ],
    },
  ]
}

export const getLandingNavList = () => [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
]

export const MESSAGE_BUBBLE_QUESTIONS = [
  "How do I find the best leads?",

  "How can I improve email deliverability?",

  "What is the best copy for emails?",

  "How can I decrease my email bounce rate?",

  "What is the best platform for finding leads?",

  "What is the best subject line for outbound emails?",

  "How can I automate and scale outbound emails?",

  "What is the best platform for researching prospects?",
]

export const ABOUT_US_SECTIONS = [
  {
    title: "Our Mission",
    description:
      "At Worker AI, our mission is to revolutionize the outbound sales process by automating the entire workflow using cutting-edge AI technology. We empower businesses to scale personalized outreach efforts, targeting the right prospects with hyper-personalized emails, optimized follow-ups, and seamless deliverability.",
  },
  {
    title: "Our Vision",
    description:
      "We envision a future where businesses of any size can harness the power of AI to streamline their sales process, build stronger relationships with clients, and grow faster without compromising personalization. Our goal is to become the go-to platform for AI-driven sales automation, replacing traditional, time-consuming methods.",
  },
  {
    title: "Our Story",
    description:
      "Worker AI started with a simple yet powerful idea: What if AI could not just assist in sending emails, but automate the entire outbound sales process? Born out of a need to solve real-world challenges faced by businesses trying to scale their outreach, Worker AI was founded by a team of passionate individuals who combine expertise in AI, technology, and sales to create a transformative product. We're driven by the belief that businesses should focus more on relationships, not the technicalities of sales outreach",
  },
]

export const landingConfig = {
  hero: {
    title: "Adapt Automate Accelerate",
    description: "Hyper-scale your outbounds with WorkerAI",
    cta: "Join the Waitlist",
  },
  imageCover: {
    // title: "Orthodox sales systems are slowing down your business growth.",
    // description: "Understand how to get through this bs",
    imageUri: "/assets/images/dashboard_workerai.jpeg",
  },
  featureSection: {
    title: "Orthodox sales systems are slowing down your business growth.",
    description: "Understand how to get through this bs",
    features: [
      {
        title: "Feature 2",
        description: "Manual lead research and email personalization are time-consuming, reducing productivity.",
      },
      {
        title: "Feature 1",
        description:
          "Traditional sales methods struggle to scale efficiently, needing more manpower for larger prospect lists.",
      },
      {
        title: "Feature 3",
        description: "Inconsistent and untimely follow-ups lead to missed opportunities and lower conversion rates.",
      },
    ],
    imageUri: "/assets/images/landing_features.png",
  },
}

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
}

export const MULTIDIRECTION_SLIDE_VARIANTS = {
  hidden: { opacity: 0, x: "-25vw" },
  visible: { opacity: 1, x: 0 },
  right: { opacity: 0, x: "25vw" },
}

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
}

export const wordVariants = {
  hidden: { opacity: 0 },
  visible: (i: any) => ({ y: 0, opacity: 1, transition: { delay: i * 0.1 } }),
}
export const pullupVariant = {
  initial: { y: 100, opacity: 0 },
  animate: (i: any) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
    },
  }),
}
