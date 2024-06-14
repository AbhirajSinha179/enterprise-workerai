import {
  ArrowBigRightDash,
  BarChart,
  Bookmark,
  Calendar,
  Clock10,
  InboxIcon,
  LayoutGrid,
  LucideSquareArrowOutUpRight,
  Mail,
  PersonStanding,
  PersonStandingIcon,
  Settings,
  SquarePen,
  Tag,
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

// export const content = [
//   {
//     title: "Collaborative Editing",
//     description:
//       "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
//     content: (
//       <div className="flex size-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
//         Collaborative Editing
//       </div>
//     ),
//   },
//   {
//     title: "Real time changes",
//     description:
//       "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
//     content: (
//       <div className="flex size-full  items-center justify-center text-white">
//         <Image
//           src="/linear.webp"
//           width={300}
//           height={300}
//           className="size-full object-cover"
//           alt="linear board demo"
//         />
//       </div>
//     ),
//   },
//   {
//     title: "Version control",
//     description:
//       "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
//     content: (
//       <div className="flex size-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
//         Version control
//       </div>
//     ),
//   },
//   {
//     title: "Running out of content",
//     description:
//       "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
//     content: (
//       <div className="flex size-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
//         Running out of content
//       </div>
//     ),
//   },
// ]
