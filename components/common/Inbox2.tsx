import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Types } from 'mongoose';
import { getIdString } from "@/utils/formatUtils";
import { Task, Priority, Status } from "@/types/task"


interface TodoCardProps {
    todo: Task;
    activeTab: string;
    onStatusChange: (id: Types.ObjectId | string, newStatus: Status) => void;
    onCompletionToggle: (id: Types.ObjectId | string, isCompleted: boolean) => void;
    onPriorityChange: (id: Types.ObjectId | string, newPriority: Priority) => void;
}

const priorityMap: Record<Priority, number> = {
    High: 3,
    Medium: 2,
    Low: 1
};

const statusMap: Record<Status, number> = {
    "Not Started": 0,
    "In Progress": 1,
    "Completed": 2
};

interface TodoTabsProps {
    tasks: Task[];
    updateTask: (taskId: Types.ObjectId | string, updates: Partial<Task>) => Promise<void>;
}

const TodoTabs: React.FC<TodoTabsProps> = ({ tasks, updateTask }) => {

    if (!tasks) {
        return <div className="w-full h-32 flex items-center justify-center">No tasks available</div>;
    }

    console.log("tasks:", tasks)


    const handleStatusChange = async (id: Types.ObjectId | string, newStatus: Status) => {
        await updateTask(id, { status: newStatus });
    };

    const handleCompletionToggle = async (id: Types.ObjectId | string) => {
        const task = tasks.find(t => t._id === id);
        if (!task) return;

        const updates = {
            isCompleted: !task.isCompleted,
            status: !task.isCompleted ? "Completed" : "Not Started" as Status
        };

        await updateTask(id, updates);
    };

    const handlePriorityChange = async (id: Types.ObjectId | string, newPriority: Priority) => {
        await updateTask(id, { priority: newPriority });
    };

    const sortByCompletion = (todosToSort: Task[]): Task[] => {
        return [...todosToSort].sort((a, b) => {
            if (a.isCompleted && !b.isCompleted) return 1;
            if (!a.isCompleted && b.isCompleted) return -1;
            return 0;
        });
    };

    const sortByPriorityAndCompletion = (todosToSort: Task[]): Task[] => {
        return sortByDateAndCompletion([...todosToSort].sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]));
    };

    const sortByDateAndCompletion = (todosToSort: Task[]): Task[] => {
        return sortByCompletion([...todosToSort].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
    };

    const sortByDateAndStatus = (todosToSort: Task[]): Task[] => {
        return sortByCompletion([...todosToSort].sort((a, b) => {
            const statusComparison = statusMap[a.status] - statusMap[b.status];
            if (statusComparison !== 0) return statusComparison;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }));
    };

    const TodoCard: React.FC<TodoCardProps> = ({ todo, activeTab, onStatusChange, onCompletionToggle, onPriorityChange }) => {
        return (
            <Card className={`mb-4 flex border-none shadow-none items-center ${todo.isCompleted ? 'opacity-50' : ''}`}>
                <CardHeader className="flex flex-row items-center gap-4 pl-0 space-y-0 pb-2 basis-40 flex-grow">
                    <Checkbox
                        checked={todo.isCompleted}
                        onCheckedChange={() => {
                            console.log("Checkbox toggled:", todo._id);
                            handleCompletionToggle(todo._id);  // Remove the second parameter
                        }}
                        className="rounded-full w-6 h-6 bg-white"
                    />
                    <div className="flex gap-2">
                        <span className="text-xl">{todo.emoji}</span>
                        <div>
                            <CardTitle className={`text-sm font-bold ${todo.isCompleted ? 'line-through' : ''}`}>
                                {todo.taskName}
                            </CardTitle>
                            <span className="text-sm text-gray-500">
                                {new Date(todo.dueDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </CardHeader>

                {activeTab === "priority" && (
                    <Select
                        onValueChange={(value: string) => onPriorityChange(todo._id, value as Priority)}
                        value={todo.priority as Priority}
                    >
                        <SelectTrigger className={`rounded-full basis-28 px-4 py-2 ${todo.priority === "Low" ? "bg-green-200 text-green-700" :
                            todo.priority === "Medium" ? "bg-amber-100 text-yellow-700" :
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
                )}

                {activeTab === "all" && (
                    <Select
                        onValueChange={(value: string) => {
                            console.log('New Status:', value);
                            onStatusChange(todo._id, value as Status);
                        }}
                        value={todo.status as Status}
                    >
                        <SelectTrigger className={`rounded-full basis-28 px-4 py-2 ${todo.status === "Completed" ? "bg-green-200 text-green-700" :
                            todo.status === "In Progress" ? "bg-amber-100 text-yellow-700" :
                                "bg-gray-200 text-gray-700"
                            }`}>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem className="rounded-full px-6" value="Not Started">Not Started</SelectItem>
                            <SelectItem className="rounded-full px-6" value="In Progress">In Progress</SelectItem>
                            <SelectItem className="rounded-full px-6" value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </Card>
        );
    };

    const tabStyle = "gap-2 font-bold h-11 pl-0 text-gray-700 justify-start hover:bg-gray-100 data-[state=active]:border-b-4 data-[state=active]:border-black data-[state=active]:shadow-none";

    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList className="h-12 grid w-full grid-cols-3 gap-2 bg-white border-b-4 border-gray-200 rounded-none">
                <TabsTrigger className={tabStyle} value="all">All</TabsTrigger>
                <TabsTrigger className={tabStyle} value="status">Status</TabsTrigger>
                <TabsTrigger className={tabStyle} value="priority">By Priority</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                {sortByDateAndCompletion(tasks).length === 0 ? (
                    <div className="py-4 text-gray-500">No tasks available</div>
                ) : (
                    sortByDateAndCompletion(tasks).map(todo => (
                        <TodoCard
                            key={getIdString(todo._id)}
                            todo={todo}
                            activeTab="all"
                            onStatusChange={handleStatusChange}
                            onCompletionToggle={handleCompletionToggle}
                            onPriorityChange={handlePriorityChange}
                        />
                    ))
                )}
            </TabsContent>
            <TabsContent value="status">
                {sortByDateAndStatus(tasks).length == 0 ?
                    (<div className="py-4 text-gray-500">No tasks available</div>
                    ) :
                    sortByDateAndStatus(tasks).map(todo => (
                        <TodoCard
                            key={getIdString(todo._id)}
                            todo={todo}
                            activeTab="all"
                            onStatusChange={handleStatusChange}
                            onCompletionToggle={handleCompletionToggle}
                            onPriorityChange={handlePriorityChange}
                        />
                    ))}

            </TabsContent>
            <TabsContent value="priority">
                {sortByPriorityAndCompletion(tasks).length === 0 ? (
                    <div className="py-4 text-gray-500">No tasks available</div>)
                    :
                    sortByPriorityAndCompletion(tasks).map(todo => (
                        <TodoCard
                            key={getIdString(todo._id)}
                            todo={todo}
                            activeTab="priority"
                            onStatusChange={handleStatusChange}
                            onCompletionToggle={handleCompletionToggle}
                            onPriorityChange={handlePriorityChange}
                        />
                    ))

                }

            </TabsContent>
        </Tabs>
    );
};

export default TodoTabs;