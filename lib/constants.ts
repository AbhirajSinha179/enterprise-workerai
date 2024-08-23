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

const DASHBOARD_PATH = "/dashboard"

export const CLIENT_ID = "205356801177-sgo5c1okrp6j5vlpjp291ilk66idpnml.apps.googleusercontent.com"

export function getMenuList(pathname: string): Group[] {
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
