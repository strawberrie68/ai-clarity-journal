import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
import { Broom } from "@phosphor-icons/react";
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "../../pages/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getIdString } from "@/utils/formatUtils";
import { Goal } from "@/types/goal"


type GoalUpdate = Partial<Pick<Goal, 'isCompleted' | 'priority'>>;
type Priority = 'High' | 'Medium' | 'Low';


const GoalInbox = () => {
    const [goals, setGoals] = useState<Goal[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { userId } = useAuth()

    const handleAddGoal = () => {
        router.push("/goal/addGoal")
    }

    const fetchGoals = async (userId: string) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/api/goals/getGoals`, {
                params: { userId }
            })
            setGoals(response.data)
        } catch (error) {
            console.error("error on fetching goals", error)
        } finally {
            setIsLoading(false)
        }
    }


    const updateGoal = async (goalId: string, updates: GoalUpdate) => {
        try {
            await axios.patch(`/api/goals/updateGoal`, {
                goalId,
                ...updates
            });

            setGoals(goals.map(goal =>
                goal._id === goalId
                    ? { ...goal, ...updates }
                    : goal
            ));
        } catch (error) {
            console.error("Error updating goal", error);
        }
    };

    const handleCleanup = async () => {
        try {
            await axios.delete(`/api/goals/cleanupCompleted`, {
                params: { userId }
            });
            setGoals(goals.filter(goal => !goal.isCompleted));
        } catch (error) {
            console.error("Error cleaning up completed goals", error);
        }
    };




    useEffect(() => {
        if (userId) {
            fetchGoals(userId)
        }
    }, [userId])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p>Loading goals...</p>
            </div>
        )
    }

    return (
        <section>
            <div className="flex justify-between pt-5 items-center">
                <h3 className="text-xl font-bold">Goals</h3>
                <div className="flex gap-4 pr-3">
                    <button
                        className="group flex items-center gap-1 text-gray-400 min-h-11"
                        onClick={handleAddGoal}
                        disabled={isLoading}
                    >
                        <PlusCircleIcon
                            width={14}
                            height={14}
                            className="text-gray-400 group-hover:text-black"
                        />
                        <p className="text-sm text-gray-400 font-bold group-hover:text-black">
                            Add
                        </p>
                    </button>
                    {/* TODO: need to push tasks to review when completed */}

                    {/* <button
                        className="group flex items-center gap-1 text-gray-400 min-h-11"
                        disabled={isLoading}
                    >
                        <span className="text-gray-400 group-hover:text-black">
                            <Broom size={15} weight="light" />
                        </span>
                        <p className="text-sm text-gray-400 font-bold group-hover:text-black">
                            Clean up Tasks
                        </p>
                    </button> */}
                </div>
            </div>
            <hr className="w-full h-1 bg-gray-200" />
            <form>
                <ul className="space-y-2">
                    {goals.length === 0 ? (
                        <li className="py-4 text-gray-500">No Goals yet</li>
                    ) : (
                        goals.map((goal) => (
                            <li key={getIdString(goal._id)} className="py-4">
                                <div className="flex justify-between items-center">
                                    <div className="gap-2 flex items-center">
                                        <Checkbox
                                            className="rounded-full"
                                            id={`goal-${goal._id}`}
                                            checked={goal.isCompleted}
                                            onCheckedChange={(checked) =>
                                                updateGoal(getIdString(goal._id), { isCompleted: checked as boolean })
                                            }
                                        />
                                        <span className="text-2xl">{goal.emoji || '🎯'}</span>
                                        <label
                                            htmlFor={`goal-${goal._id}`}
                                            className={`font-bold ${goal.isCompleted ? 'line-through text-gray-400' : ''}`}
                                        >
                                            {goal.goalName}
                                        </label>
                                    </div>
                                    <Select
                                        onValueChange={(value: string) =>
                                            updateGoal(getIdString(goal._id), { priority: value as Priority })
                                        }
                                        value={goal.priority as Priority}
                                    >
                                        <SelectTrigger className={`rounded-full basis-28 px-4 py-2 ${goal.priority === "Low" ? "bg-green-200 text-green-700" :
                                            goal.priority === "Medium" ? "bg-amber-100 text-yellow-700" :
                                                "bg-rose-200 text-rose-950"
                                            }`}>
                                            <SelectValue placeholder="Priority" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem className="text-sm rounded-full px-6" value="High">High</SelectItem>
                                            <SelectItem className="text-sm rounded-full px-6" value="Medium">Medium</SelectItem>
                                            <SelectItem className="text-sm rounded-full px-6" value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </li>
                        ))
                    )}

                </ul>
            </form>
        </section>
    )
}

export default GoalInbox