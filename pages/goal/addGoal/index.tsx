import axios from "axios"
import { z } from "zod"
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/router';
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { useAuth } from "../../AuthContext.js";
import { goalFormSchema } from "../../../schema/goal";
import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Header from "@/components/common/Header"
import EmojiPickerInput from "@/components/common/EmojiInputPicker"
import { GoalProps } from "@/types/goal.js";

const AddGoal = () => {
    const router = useRouter();
    const { userId } = useAuth();
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof goalFormSchema>>({
        resolver: zodResolver(goalFormSchema),
        defaultValues: {
            goalName: "",
            description: "",
            priority: "Medium",
            dueDate: new Date().toISOString(),
            isCompleted: false,
            tasks: [],
            emoji: ""
        },
    })

    const { setValue, formState: { errors } } = form;

    const addGoal = async (formValue: GoalProps) => {
        if (!userId) {
            throw new Error("User ID is required");
        }
        try {
            const formattedGoal = {
                ...formValue,
                userId
            }
            const response = await axios.post(`/api/goals/addGoal`, formattedGoal);
            return response.data;
        } catch (error: any) {
            console.error("Full error details:", {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                url: error.config?.url,
            });
            throw error;
        }
    }

    const handleBack = () => { router.back(); }

    const onSubmit = async (values: z.infer<typeof goalFormSchema>) => {
        if (isSubmitting) {
            console.log("Form is already submitting, returning");
            return;
        }

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

            if (!userId) {
                setAlert({
                    message: 'Please log in to add Goal',
                    type: 'error',
                    visible: true
                });
                return;
            }

            await addGoal(values);

            setAlert({ message: 'Goal added successfully!', type: 'success', visible: true });
            setTimeout(() => {
                router.back();
            }, 3000);

        } catch (error) {
            console.error("Submission error:", error);
            setAlert({
                message: error instanceof Error ? error.message : 'Failed to add goal. Please try again.',
                type: 'error',
                visible: true
            });
        } finally {
            setIsSubmitting(false);
        }
    }


    const handleSubmit = (e: React.FormEvent) => {
        form.handleSubmit((data) => {
            console.error("Form is valid, data:", data);
            onSubmit(data);
        }, (errors) => {
            console.error("Form validation failed:", errors);
        })(e);
    };

    return (
        <div className="bg-white mx-6 mt-10 pb-4 lg:max-w-screen-md lg:mx-auto">
            <Header handleClick={handleBack} />
            <h1 className="text-5xl font-bold mt-16">
                <span className="block">New</span>
                <span className="block">Goal</span>
            </h1>
            <p className="mt-4 mb-8 text-lg">Add new goal that you would like to track</p>
            {alert.visible &&
                <Alert className="bg-amber-100">
                    <AlertTitle>Success!</AlertTitle>
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
                        <FormField
                            control={form.control}
                            name="emoji"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm"> Emoji:</FormLabel>
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

                    <div className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="goalName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Your Goal</FormLabel>
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
                                    <FormLabel className="font-semibold">Goal Description</FormLabel>
                                    <FormControl>
                                        <Input className="rounded-xl h-11" placeholder="Goal Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                                        format(new Date(field.value), "PPP")
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
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) => {
                                                    field.onChange(date?.toISOString())
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
                        disabled={isSubmitting} >
                        {isSubmitting ? 'Adding...' : 'Add new task'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddGoal;

