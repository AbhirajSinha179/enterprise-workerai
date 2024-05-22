import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CrossCircledIcon,
} from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge";
const DoubleCheckIcon = () => (
    <div className="flex items-center space-x-1 mx-2">
        <CheckCircledIcon />
        <CheckCircledIcon />
    </div>
);
const SingleCheckIcon = () => (
    <div className="flex items-center space-x-1 mx-2">
        <CheckCircledIcon />
    </div>
);
const TripleCheckIcon = () => (
    <div className="flex items-center space-x-1 mx-2">
        <CheckCircledIcon />
        <CheckCircledIcon />
        <CheckCircledIcon />
    </div>
);
const NotEngaged = () => (
    <div className="flex items-center space-x-1 mx-2">
        <Badge > Not Engaged</Badge>
    </div>
);
const Engaged = () => (
    <div className="flex items-center space-x-1 mx-2">
        <Badge>Engaged</Badge>
    </div>
);

export const labels = [
    {
        value: "bug",
        label: "Bug",
    },
    {
        value: "feature",
        label: "Feature",
    },
    {
        value: "documentation",
        label: "Documentation",
    },
]

export const statuses = [
    {
        value: "doneFirst",
        label: "DoneFirst",
        icon: SingleCheckIcon,
    },
    {
        value: "doneSecond",
        label: "DoneSecond",
        icon: DoubleCheckIcon,
    },
    {
        value: "doneThird",
        label: "DoneThird",
        icon: TripleCheckIcon,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: CrossCircledIcon,
    },
]

export const priorities = [
    {
        label: "Yes",
        value: "yes",
        icon: Engaged,
    },
    {
        label: "No",
        value: "no",
        icon: NotEngaged,
    },
]