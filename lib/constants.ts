import { ArrowBigRightDash, BarChart, Bookmark, Clock10, InboxIcon, LayoutGrid, LucideSquareArrowOutUpRight, Mail, PersonStanding, PersonStandingIcon, Settings, SquarePen, Tag, Users } from "lucide-react"

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
          icon: Clock10,
          submenus: [
          ],
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
          href: `${DASHBOARD_PATH}/analytics`,
          label: "Analytics",
          active: pathname.includes("/analytics"),
          icon: BarChart,
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
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/dashboard/outbound",
          label: "Outbound",
          active: pathname.includes("/account"),
          icon: LucideSquareArrowOutUpRight, // change this icon
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
