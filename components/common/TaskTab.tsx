import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Circle, CheckCircle, Calendar, Flag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Types } from 'mongoose';
import { getIdString } from "@/utils/formatUtils";
import { Task, Priority, TaskInput } from "@/types/task"
import Link from 'next/link'


interface TodoProps {
    tasks: Task[];
    isLoading?: boolean;
    onAddTask?: (task: TaskInput) => Promise<void>;
    onUpdateTask?: (taskId: Types.ObjectId | string, updates: Partial<Task>) => Promise<void>;
}

const getPriorityColor = (priority: Priority) => {
    const colors = {
        High: 'bg-red-100 text-red-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-green-100 text-green-800'
    };
    return colors[priority];
};

const TaskTab: React.FC<TodoProps> = ({ tasks, onAddTask, onUpdateTask, isLoading }) => {
    const [newTask, setNewTask] = useState('');
    const [updatingTaskId, setUpdatingTaskId] = useState<Types.ObjectId | string | null>(null);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim() || isLoading) return;

        try {
            await onAddTask?.({ taskName: newTask });
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };


    const handleTaskComplete = async (taskId: Types.ObjectId | string, isCompleted: boolean) => {

        if (!onUpdateTask || updatingTaskId !== null) return;

        try {
            setUpdatingTaskId(taskId);
            await onUpdateTask(taskId, {
                isCompleted,
                status: isCompleted ? 'Completed' : 'Not Started'
            });

        } catch (error) {
            console.error('Error updating task:', error);
        } finally {
            setUpdatingTaskId(null);
        }
    };

    return (
        <div className="mt-12 max-w-screen-lg mx-auto flex flex-col gap-8">
            <Card className="">
                <CardHeader>
                    <CardTitle>Add Task</CardTitle>
                    <CardDescription>
                        Add your tasks that you would like to complete
                    </CardDescription>
                </CardHeader>
                <CardContent className=''>
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <Input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="rounded-lg min-h-11 bg-white"
                            placeholder="Enter your task"
                            required
                        />
                        <Button type="submit" className="min-h-11 rounded-full">
                            Add Task
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>List of Tasks</CardTitle>
                    <Badge variant="secondary">
                        {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {tasks.length == 0 && <p className='text-gray-500'>No tasks added yet</p>}
                        {tasks.map((task) => (
                            <Link
                                href={`/task/${task._id}`}
                                key={getIdString(task._id)}>
                                <li
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <button
                                        onClick={() => handleTaskComplete(task._id, !task.isCompleted)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        {task.isCompleted ? (
                                            <CheckCircle className="text-green-500" />
                                        ) : (
                                            <Circle />
                                        )}
                                    </button>

                                    <div className="flex-1 flex items-center gap-3">
                                        <span className="text-xl">{task.emoji}</span>
                                        <p className={task.isCompleted ? 'line-through text-gray-500' : ''}>
                                            {task.taskName}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge className={`${getPriorityColor(task.priority)} rounded-full`}>
                                            <Flag className="w-3 h-3 mr-1" />
                                            {task.priority}
                                        </Badge>
                                        <Badge variant="outline" className="rounded-full">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </Badge>
                                    </div>
                                </li>

                            </Link>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default TaskTab;