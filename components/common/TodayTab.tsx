import Card from "@/components/common/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatQuote } from "@/utils/formatUtils";
import { Journal } from "@/types/journals"
import Inbox2 from "@/components/common/Inbox2"
import { Task } from "@/types/task"
import GoalInbox from "@/components/common/GoalInbox";
import { PlusCircleIcon } from "lucide-react";
import { Broom } from "@phosphor-icons/react";
import { Types } from 'mongoose';


type NavBarProps = {
    journal: Journal | null;
    tasks: Task[];
    handleUpdateTask: (taskId: Types.ObjectId | string, updates: Partial<Task>) => Promise<void>
};

const TodayTab: React.FC<NavBarProps> = ({ journal, tasks, handleUpdateTask }) => {
    const router = useRouter()
    const handleAddTask = () => {
        router.push(`/journal/addTask`)
    }


    return (
        <section className="flex flex-col lg:flex-row gap-8 w-full max-w-screen-lg	m-auto">
            <div className="w-full overflow-scroll lg:overflow-auto	lg:basis-3/5 flex lg:flex-col gap-4">
                <div className="mt-10 flex gap-4 ">
                    <Link href="/journal/add">
                        <Card
                            text="Enter Your Daily Journal"
                            icon="/book-white.svg"
                            secondaryBackground="bg-[#D3AC1E]"
                            background="bg-[#F0E2AE]"
                            textBackground="bg-white/50"
                        />
                    </Link>
                    <Card
                        text="Tips: Everyday is a good day to start"
                        icon="/lightbulb.svg"
                        secondaryBackground="bg-[#D3AC1E]"
                        background="bg-gradient-to-br from-lime-200 to-pink-400"
                        textBackground="bg-white/70"
                    />
                    <Card
                        text={
                            !journal
                                ? "Tips: Everyday is a good day to start"
                                : journal.keyInsight || "Tips: Everyday is a good day to start"
                        }
                        icon="/lightbulb.svg"
                        secondaryBackground="bg-[#D3AC1E]"
                        background="bg-lime-100"
                        textBackground="bg-[#f0f0f0]"
                    />
                </div>
                <article className="mt-10 text-gray-400 lg:mt-0 h-44 min-w-40 max-w-lg rounded-2xl relative bg-gray-100 px-4 py-4 flexCenter">
                    {!journal && (
                        <p>Excitement is a better motivator than discipline.</p>
                    )}
                    {journal && journal.quote && (
                        <p className="line-clamp-4">{formatQuote(journal.quote)}</p>
                    )}
                </article>

            </div>


            <div className="flex flex-col gap-8 mt-8 lg:mt-10 lg:basis-2/5">
                <GoalInbox />
                <section className="">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Inbox</h3>
                        <div className="flex gap-4 pr-3">
                            <button className="group flex items-center gap-1 text-gray-400 min-h-11" onClick={handleAddTask}>
                                <PlusCircleIcon width={14} height={14} className="text-gray-400 group-hover:text-black" />
                                <p className="text-sm text-gray-400 font-bold group-hover:text-black">Add</p>
                            </button>
                            {/* TODO: need to push tasks to review when completed */}
                            {/* <button className="group flex items-center gap-1 text-gray-400 min-h-11">
                                <span className="text-gray-400 group-hover:text-black">
                                    <Broom size={15} weight="light" />
                                </span>
                                <p className="text-sm text-gray-400 font-bold group-hover:text-black">Clean up Tasks</p>
                            </button> */}
                        </div>
                    </div>
                    <Inbox2 tasks={tasks} updateTask={handleUpdateTask} />
                </section>
            </div>

        </section>

    )
}


export default TodayTab