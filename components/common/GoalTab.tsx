import Link from "next/link";
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { GoalInput, PopulatedGoals } from "@/types/goal";
import { Badge } from "@/components/ui/badge";
import { Calendar, Flag, EllipsisVertical, CircleArrowRight } from "lucide-react";
import { Priority } from "@/types/task"


interface GoalTabProps {
    goals: PopulatedGoals[];
    onAddGoal: (goalName: GoalInput) => Promise<void>;
}

const GoalTab: React.FC<GoalTabProps> = ({ goals, onAddGoal }) => {
    const [newGoal, setNewGoal] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoal.trim() || isLoading) return;

        try {
            await onAddGoal?.({ goalName: newGoal });
            setNewGoal('');
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };
    const getPriorityColor = (priority: Priority) => {
        const colors = {
            High: 'bg-red-100 text-red-800',
            Medium: 'bg-yellow-100 text-yellow-800',
            Low: 'bg-green-100 text-green-800'
        };
        return colors[priority];
    };

    const getDateStatus = (dueDate: string | Date) => {
        const today = new Date();
        const due = new Date(dueDate);

        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        const timeDiff = due.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysDiff < 0) {
            return {
                status: 'Overdue',
                className: 'text-red-600'
            };
        } else if (daysDiff === 0) {
            return {
                status: 'Due Today',
                className: 'text-yellow-600'
            };
        } else {
            return {
                status: `${daysDiff} days remaining`,
                className: 'text-green-600'
            };
        }
    };


    console.log("goals", goals)
    return (
        <section className="mt-12 max-w-screen-lg mx-auto">
            <div className="border rounded-lg p-4 bg-gray-100">

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <label className="pt-6 font-semibold">Add Goal</label>
                    <p className="text-gray-500">Add your goals that you would like to complete</p>

                    <div className="flex gap-4 min-h-11 pt-4">
                        <Input className="rounded-lg min-h-11 bg-white"
                            placeholder="Enter your goal"
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            required
                        />

                        <button type="submit" className="bg-white rounded-lg border px-6">+</button>
                    </div>
                </form>

            </div>

            <section className="mt-10">
                {goals.map((goal) => {
                    return (
                        <Accordion type="single" collapsible>
                            <AccordionItem className="px-6" value="item-1">
                                <AccordionTrigger className="text-xl font-semibold w-full py-4 flex justify-between">
                                    <div className="flex w-full items-center gap-8 ">
                                        <div className="border rounded-full w-4 h-4 border-black"></div>
                                        <h2 className="grow">🛠️ {goal.goalName}</h2>
                                        <Progress value={33} className="basis-24" />
                                    </div>
                                    <Link href={`/goal/${goal._id}`}>
                                        <div className="px-2">
                                            <EllipsisVertical width="18" height="18" />
                                        </div>


                                    </Link>
                                </AccordionTrigger>

                                {goal.tasks.length > 0 && <AccordionContent className="text-lg pl-12">
                                    <ul>
                                        {goal.tasks.map((task) => {
                                            const dateStatus = getDateStatus(task.dueDate);

                                            return (
                                                <li className="py-1">
                                                    <div className="flex justify-between">
                                                        <div className="flex gap-2 items-center">
                                                            <CircleArrowRight width="16" height="16" />
                                                            <p>{task.emoji}</p>
                                                            <p> {task.taskName}</p>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Badge className={`${getPriorityColor(task.priority)} rounded-full`}>
                                                                <Flag className="w-3 h-3 mr-1" />
                                                                {task.priority}
                                                            </Badge>
                                                            <Badge variant="outline" className="rounded-full">
                                                                <Calendar className="w-3 h-3 mr-1" />
                                                                {new Date(task.dueDate).toLocaleDateString()}
                                                                {` (${dateStatus.status})`}
                                                            </Badge>
                                                        </div>

                                                    </div>

                                                </li>)
                                        })}

                                    </ul>
                                </AccordionContent>}
                                {goal.tasks.length === 0 &&
                                    <AccordionContent className="text-lg pl-12">
                                        <p>No Tasks yet</p>
                                    </AccordionContent>}

                            </AccordionItem>
                        </Accordion>

                    )
                })}


            </section>

        </section>
    )
}

export default GoalTab