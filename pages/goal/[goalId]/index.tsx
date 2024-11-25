import axios from "axios"
import { z } from "zod"
import { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/router';
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { useAuth } from "../../AuthContext.js";

import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Header from "@/components/common/Header"
import EmojiPickerInput from "@/components/common/EmojiInputPicker"
import { Goal } from "@/types/goal"
import { getIdString } from '@/utils/formatUtils';
import { goalFormSchema } from "@/schema/goal";
import { X, Plus } from "lucide-react";
import { Types } from 'mongoose';
import { getPriorityColor } from "@/utils/colorUtils"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types/task.js";
import { Priority } from '@/types/task';

const SpecificGoal = () => {
    const router = useRouter();
    const { userId } = useAuth();
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [goal, setGoal] = useState<Goal | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<string>('');
    const { goalId } = router.query;

    const handleBack = () => { router.back() }

    const form = useForm<z.infer<typeof goalFormSchema>>({
        resolver: zodResolver(goalFormSchema),
        defaultValues: {
            emoji: "",
            goalName: "",
            description: "",
            priority: "Medium",
            dueDate: new Date().toISOString(),
            isCompleted: false,
            tasks: [],
        },
    })

    const fetchAvailableTasks = async (userId: Types.ObjectId | string, goal: Goal) => {
        if (!userId) return;

        try {
            const response = await axios.get(`/api/tasks/getTasks`, {
                params: { userId }
            });

            const allTasks: Task[] = response.data;

            if (!goal || !goal.tasks) {
                setAvailableTasks(allTasks);
                return;
            }

            const goalTaskIds = goal.tasks.map(task =>
                typeof task._id === 'string' ? task._id : task._id.toString()
            );

            const filteredTasks = allTasks.filter(task => {
                const taskId = typeof task._id === 'string' ? task._id : task._id.toString();
                return !goalTaskIds.includes(taskId);
            });

            setAvailableTasks(filteredTasks);

        } catch (error) {
            console.error("Error fetching tasks:", error);
            setAlert({
                message: 'Failed to fetch available tasks',
                type: 'error',
                visible: true
            });
        }
    };



    const getGoal = async (goalId: string) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/goals/${goalId}`);
            const goalData = response.data;
            setGoal(goalData);

            form.reset({
                emoji: goalData.emoji || "",
                goalName: goalData.goalName || "",
                description: goalData.description || "",
                priority: goalData.priority || "Medium",
                dueDate: goalData.dueDate ? new Date(goalData.dueDate).toISOString() : new Date().toISOString(),
                isCompleted: goalData.isCompleted || false,
                tasks: Array.isArray(goalData.tasks) ? goalData.tasks : []
            });
            return goalData;
        } catch (error) {
            console.error("Error fetching specific goal", error);
            setAlert({
                message: 'Failed to fetch goal details',
                type: 'error',
                visible: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (typeof goalId === 'string') {
            getGoal(goalId);
        }
    }, [goalId]);

    useEffect(() => {
        if (userId && goal) {
            fetchAvailableTasks(userId, goal);
        }
    }, [userId, goal]);

    const { setValue, watch } = form;
    const tasks = watch('tasks');

    const handleAddTask = () => {
        if (!selectedTaskId) return;

        const taskToAdd = availableTasks.find(task => task._id === selectedTaskId);
        if (!taskToAdd) return;

        const currentTasks = form.getValues('tasks') || [];
        if (!currentTasks.some(task => task.id === taskToAdd._id)) {
            setValue('tasks', [...currentTasks, taskToAdd]);
        }

        setSelectedTaskId('');
    };

    const handleRemoveTask = (taskId: string) => {
        console.log("taskId", taskId)
        const currentTasks = form.getValues('tasks') || [];
        setValue('tasks', currentTasks.filter(task => task._id !== taskId));
    };

    const parseDate = (dateString: string | undefined): Date | null => {
        if (!dateString) return null;
        const parsedDate = new Date(dateString);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
    }

    const onSubmit = async (values: z.infer<typeof goalFormSchema>) => {
        if (isSubmitting || !goalId) return;

        try {
            setIsSubmitting(true);

            if (!values.goalName?.trim()) {
                setAlert({
                    message: 'Goal name is required',
                    type: 'error',
                    visible: true
                });
                return;
            }

            const updateData = {
                goalName: values.goalName,
                description: values.description,
                emoji: values.emoji,
                priority: values.priority,
                dueDate: values.dueDate,
                isCompleted: values.isCompleted,
                tasks: values.tasks || [],
                userId,
                goalId
            };

            await axios.patch(`/api/goals/updateGoal`, updateData);

            setAlert({
                message: 'Goal updated successfully!',
                type: 'success',
                visible: true
            });

            await getGoal(goalId as string);

        } catch (error) {
            console.error("Detailed Submission error:", error);
            setAlert({
                message: error instanceof Error ? error.message : 'Failed to update Goal. Please try again.',
                type: 'error',
                visible: true
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.handleSubmit(onSubmit, (errors) => {
            console.error("Form validation failed:", errors);
        })();
    };


    if (isLoading) {
        return (
            <div className="bg-white mx-6 mt-10 pb-4 lg:max-w-screen-md lg:mx-auto">
                <Header handleClick={handleBack} />
                <div className="mt-16 space-y-4">
                    <div className="h-12 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="space-y-8 mt-8">
                        <div className="h-11 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-11 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-11 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!goal) {
        return (
            <div className="bg-white mx-6 mt-10 pb-4 lg:max-w-screen-md lg:mx-auto">
                <Header handleClick={handleBack} />
                <div className="mt-16">
                    <Alert className="bg-red-100">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Goal not found or failed to load. Please try again.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white mx-6 mt-10 pb-4 lg:max-w-screen-md lg:mx-auto">
            <Header handleClick={handleBack} />
            <h1 className="text-5xl font-bold mt-16">
                <span className="block">Edit</span>
                <span className="block">Goal</span>
            </h1>
            <p className="mt-4 mb-8 text-lg">Edit goal to your to do list</p>
            {alert.visible &&
                <Alert className={cn("mb-4", {
                    "bg-green-100": alert.type === 'success',
                    "bg-red-100": alert.type === 'error'
                })}>
                    <AlertTitle>{alert.type === 'success' ? 'Success!' : 'Error'}</AlertTitle>
                    <AlertDescription>
                        {alert.message}
                    </AlertDescription>
                </Alert>
            }
            <Form {...form}>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    <div className="flex gap-4 flex-col">
                        <label htmlFor="emojiInput" className="block font-semibold">
                            Icon:
                        </label>
                        <div className="flex w-full md:w-3/4 max-w-sm justify-between">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="emoji"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm">Emoji:</FormLabel>
                                            <FormControl>
                                                <EmojiPickerInput
                                                    value={field.value}
                                                    onChange={(emoji: string) => {
                                                        field.onChange(emoji);
                                                        setValue("emoji", emoji);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="goalName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Goal name</FormLabel>
                                    <FormControl>
                                        <Input className="rounded-xl h-11" placeholder="Goal Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Description</FormLabel>
                                    <FormControl>
                                        <Input className="rounded-xl h-11" placeholder="Goal Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <>
                            <div>

                            </div>
                            <FormLabel className="font-semibold block mb-2">Tasks</FormLabel>
                            <div className="space-y-6 p-6  rounded-xl border border-gray-200">
                                {/* Task Selection Area */}
                                <div>
                                    <p className="text-gray-600 text-sm mb-4">Select tasks to add to this goal</p>
                                    <div className="flex gap-2">
                                        <Select
                                            value={selectedTaskId}
                                            onValueChange={setSelectedTaskId}
                                        >
                                            <SelectTrigger className="w-full rounded-xl h-11 bg-white">
                                                <SelectValue placeholder="Select a task to add" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableTasks
                                                    .filter(task => !tasks?.some(t => t.id === task._id))
                                                    .map(task => (
                                                        <SelectItem key={getIdString(task._id)} value={getIdString(task._id)}>
                                                            {task.taskName}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            type="button"
                                            onClick={handleAddTask}
                                            className="px-4 h-11 rounded-xl"
                                            variant="default"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add
                                        </Button>
                                    </div>
                                </div>

                                {/* Task List Area */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium text-sm text-gray-700">Current Tasks</p>
                                        <p className="text-sm text-gray-500">{tasks?.length || 0} tasks</p>
                                    </div>

                                    <div className="space-y-2">
                                        {tasks?.length === 0 && (
                                            <div className="text-center py-6 text-gray-500 bg-gray-100 rounded-xl">
                                                No tasks added yet
                                            </div>
                                        )}

                                        {tasks?.map((task) => (
                                            <div
                                                key={task._id}
                                                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                                            >
                                                <div className="flex gap-3 items-center">
                                                    <span className="text-lg">{task.emoji}</span>
                                                    <span className="font-medium">{task.taskName}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${getPriorityColor(task.priority)}`}>
                                                        {task.priority}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveTask(task._id)}
                                                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>

                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex space-x-4 flex-col">
                                        <FormLabel className="block text-sm font-semibold pb-3">
                                            Priority
                                        </FormLabel>
                                        <div className="relative -left-6">
                                            {['Low', 'Medium', 'High'].map((level) => (
                                                <label key={level} className="cursor-pointer px-2">
                                                    <input
                                                        type="radio"
                                                        name="priority"
                                                        value={level}
                                                        className="hidden"
                                                        checked={field.value === level}
                                                        onChange={() => field.onChange(level)}
                                                    />
                                                    <span
                                                        className={`inline-block px-4 py-2 h-11 border-2 rounded-full transition-colors ${field.value === level
                                                            ? 'bg-black text-white border-black'
                                                            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-300'
                                                            }`}
                                                    >
                                                        {level}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="font-semibold">Complete by</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] pl-3 text-left font-normal h-11 rounded-xl mt-3",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(parseDate(field.value) || new Date(), "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={parseDate(field.value) || undefined}
                                                onSelect={(date) => {
                                                    field.onChange(date ? date.toISOString() : new Date().toISOString());
                                                }}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="rounded-3xl w-full mx-auto sticky bottom-4 h-14 text-2xl"
                        type="submit"
                        disabled={isSubmitting}>
                        {isSubmitting ? 'Updating...' : 'Update goal'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SpecificGoal