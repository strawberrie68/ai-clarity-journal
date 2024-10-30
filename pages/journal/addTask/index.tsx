import axios from "axios"
import { z } from "zod"
import { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/router';
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { useAuth } from "../../AuthContext.js";
import { TaskProps } from "../../../types/task.js"
import { taskFormSchema } from "../../../schema/task";
import { colors } from "@/constants/colors";
import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Header from "@/components/common/Header"

const AddTask = () => {
    const router = useRouter();
    const { task } = router.query;
    const [color, setColor] = useState("#ffffff");
    const [open, setOpen] = useState(false);
    const { userId } = useAuth();
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });

    const form = useForm<z.infer<typeof taskFormSchema>>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            emoji: "",
            color: "#ffffff",
            taskName: "",
            priority: "medium",
            dueDate: new Date().toISOString(),
            isCompleted: false,
            status: "not started",
        },
    })

    const { register, watch, setValue, formState: { errors } } = form

    useEffect(() => {
        if (task && typeof task === 'string') {
            try {
                const taskObject = JSON.parse(task);
                setValue("color", taskObject.color ? taskObject.color : "#ffffff")
                setValue("emoji", taskObject.emoji);
                setValue("priority", taskObject.priority);
                setValue("taskName", taskObject.taskName);
            } catch (error) {
                console.error("Failed to parse task:", error);
            }
        }
    }, [task]);


    const AddTaskToDoList = async (formValue: TaskProps) => {
        console.log("AddTaskToDoList called with:", formValue);
        if (!userId) {
            console.error("No userId available");
            throw new Error("No userId available");
        }

        try {
            console.log("Making API request to:", `/api/users/${userId}/todo/addToDo`);
            const response = await axios.post(`/api/users/${userId}/todo/addToDo`, formValue);
            return response.data;
        } catch (error) {
            console.error("Error in AddTaskToDoList:", error);
            throw error;
        }

    }

    const handleBack = () => { router.back() }

    const onSubmit = async (values: z.infer<typeof taskFormSchema>) => {

        try {
            if (!values.taskName) {
                console.error("Task name is required");
                setAlert({ message: 'Task name is required', type: 'error', visible: true });
                return;
            }

            await AddTaskToDoList(values);
            setAlert({ message: 'Task added successfully!', type: 'success', visible: true });
            setTimeout(() => {
                console.log("Redirecting...");
                router.back();
            }, 3000);

        } catch (error) {
            console.error("Error in onSubmit:", error);
            setAlert({
                message: 'Failed to add task. Please try again.',
                type: 'error',
                visible: true
            });
        }
    }

    const parseDate = (dateString: string | undefined): Date | null => {
        if (!dateString) return null;
        const parsedDate = new Date(dateString);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
    }

    return (
        <div className="bg-white mx-6 mt-10 pb-4 lg:max-w-screen-md lg:mx-auto">
            <Header handleClick={handleBack} />
            <h1 className="text-5xl font-bold mt-16">
                <span className="block">New</span>
                <span className="block">Tasks</span>
            </h1>
            <p className="mt-4 mb-8 text-lg">Add new tasks to your to do list</p>
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
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                    onSubmitCapture={(e) => {
                        console.log("Form submit captured");
                    }}
                >
                    <div className="flex gap-4 flex-col">
                        <label htmlFor="emojiInput" className="block font-semibold">
                            Icon:
                        </label>
                        <div className="flex w-full md:w-3/4 max-w-sm justify-between">
                            <div
                                className="flex items-center justify-center h-20 w-20 rounded-full basis-20"
                                style={{ backgroundColor: color }}
                            >
                                <span className="text-5xl">{watch("emoji") || "😊"}</span>
                            </div>
                            <div>
                                <label htmlFor="emojiInput" className="block pb-2 text-sm">
                                    Emoji:
                                </label>
                                <input
                                    id="emojiInput"
                                    {...register("emoji")}
                                    type="text"
                                    placeholder="👻"
                                    className="flex justify-center border rounded-full px-4 py-1 mb-4 w-12 h-12"
                                />
                            </div>

                            {/* Color Picker */}
                            <div className="flex items-center mb-4 flex-col">
                                <label htmlFor="colorPicker" className="block mr-2 pb-2 text-sm">
                                    Pick a color:
                                </label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger>
                                        <div
                                            className="h-11 w-11 border rounded-full"
                                            style={{ backgroundColor: color }}
                                            onClick={() => setOpen((prev) => !prev)}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className="rounded-xl">
                                        <div className="grid grid-cols-4 gap-2 p-2">
                                            {colors.map((col) => (
                                                <div
                                                    key={col}
                                                    className="h-8 w-8 border rounded-full cursor-pointer"
                                                    style={{ backgroundColor: col }}
                                                    onClick={() => {
                                                        setColor(col);
                                                        setValue("color", col);
                                                        setOpen(false);
                                                    }}
                                                />
                                            ))}
                                            <div className="col-span-3 flex flex-col mt-2">
                                                <input
                                                    type="color"
                                                    value={color}
                                                    onChange={(e) => {
                                                        const selectedColor = e.target.value;
                                                        setColor(selectedColor);
                                                        setValue("color", selectedColor);
                                                    }}
                                                    className="rounded-xl mt-2 border-0"
                                                />
                                                <span className="mt-2 text-gray-500">Or pick your own color</span>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="taskName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Task name</FormLabel>
                                    <FormControl>
                                        <Input className="rounded-xl h-11" placeholder="Task Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <PrioritySelector /> */}
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
                                            {['low', 'medium', 'high'].map((level) => (
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
                                                        {level.charAt(0).toUpperCase() + level.slice(1)}
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
                    <Button className="rounded-3xl w-full mx-auto sticky bottom-4 h-14 text-2xl" type="submit" onClick={() => console.log("Submit button clicked")}>Add new task</Button>
                </form>
            </Form>
        </div>
    )
}

export default AddTask