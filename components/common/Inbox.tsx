import { useState, useMemo, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardIcon, CalendarIcon, LapTimerIcon } from "@radix-ui/react-icons"
import { TaskProps, Priority } from '../../types/task';
import InboxItem from "./InboxItem";


interface InboxProps {
    tasks: TaskProps[];
}

const Inbox: React.FC<InboxProps> = ({ tasks }) => {
    const tabStyle = "gap-2 font-bold h-11 pl-0 text-gray-700 justify-start hover:bg-gray-100 data-[state=active]:border-b-4 data-[state=active]:border-black	data-[state=active]:shadow-none"

    const [activeTab, setActiveTab] = useState("all");
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (tasks) {
            setIsLoading(false)
        }
    }, [tasks])

    if (isLoading) {
        <div>loading</div>
    }
    const priorityToNumber = (priority: Priority): number => {
        switch (priority.toLowerCase()) {
            case 'high': return 3;
            case 'medium': return 2;
            case 'low': return 1;
            default: return 0;
        }
    };

    const filteredTasks = useMemo(() => {
        switch (activeTab) {
            case "upcoming":
                return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            case "priority":
                return [...tasks].sort((a, b) => priorityToNumber(b.priority) - priorityToNumber(a.priority));
            default:
                return tasks;
        }
    }, [tasks, activeTab]);

    const renderTasks = () => (
        <ul className="space-y-2">
            {tasks && filteredTasks?.map((task) => (
                <InboxItem
                    key={task.id}
                    id={task.id}
                    taskName={task.taskName}
                    emoji={task.emoji}
                    status={task.status}
                    color={task.color}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    isCompleted={task.isCompleted}
                />
            ))}
        </ul>
    );

    return (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-12 grid w-full grid-cols-3 gap-2 bg-white  border-b-4 border-gray-200 rounded-none">
                <TabsTrigger
                    value="all"
                    className={`${tabStyle}`}
                >
                    <DashboardIcon />
                    All
                </TabsTrigger>
                <TabsTrigger
                    value="upcoming"
                    className={`${tabStyle}`}
                >
                    <CalendarIcon />
                    Up Coming
                </TabsTrigger>
                <TabsTrigger
                    value="priority"
                    className={`${tabStyle}`}
                >
                    <LapTimerIcon /> Priority
                </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="p-4  mt-2"> {renderTasks()}</TabsContent>
            <TabsContent value="upcoming" className="p-4 mt-2"> {renderTasks()}</TabsContent>
            <TabsContent value="priority" className="p-4  mt-2"> {renderTasks()}</TabsContent>
        </Tabs>
    );
}

export default Inbox