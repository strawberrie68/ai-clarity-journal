import axios from "axios";
import { useState, useEffect } from "react";
import { Types } from 'mongoose';
import { useAuth } from "../../pages/AuthContext";
import { getIdString } from "../../utils/formatUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TodayTab from "./TodayTab";
import { Task, TaskInput } from '../../types/task';
import { PopulatedGoals, GoalInput } from "../../types/goal";
import { Journal } from "@/types/journals";
import GoalTab from "./GoalTab";
import TaskTab from "./TaskTab";
import "../../styles/global.css";


type NavBarProps = {
  journal: Journal | null;
  onTabChange: (tab: string) => void;
};

const NavBar: React.FC<NavBarProps> = ({ journal, onTabChange }) => {
  const [goals, setGoals] = useState<PopulatedGoals[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const { userId } = useAuth();

  const tabStyle = "border max-w-36 text-black data-[state=active]:shadow-none rounded-full h-11 px-4 md:px-12 data-[state=active]:bg-black data-[state=active]:text-white";

  useEffect(() => {
    const lastActiveTab = localStorage.getItem('lastActiveTab') || 'today';
    onTabChange(lastActiveTab);
  }, [onTabChange]);

  const fetchGoals = async (userId: Types.ObjectId | string) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/goals/getGoals`, {
        params: { userId }
      });
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTasks = async (userId: Types.ObjectId | string) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/tasks/getTasks`, {
        params: { userId }
      });
      setTasks(response.data as Task[]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      Promise.all([
        fetchGoals(userId),
        fetchTasks(userId)
      ]);
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleUpdateTask = async (taskId: Types.ObjectId | string, updates: Partial<Task>) => {
    setIsUpdating(true);
    try {
      const response = await axios.put('/api/tasks/updateTask', {
        taskId: getIdString(taskId),
        isCompleted: updates.isCompleted,
        status: updates.status,
        priority: updates.priority
      });

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, ...response.data } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddTask = async (formValue: TaskInput) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    setIsLoading(true);
    try {
      const formattedTodo = {
        ...formValue,
        userId,
        status: 'Not Started',
        priority: 'Medium',
        emoji: '📝',
        dueDate: new Date(),
        isCompleted: false,
        color: '#fff'
      };

      const response = await axios.post('/api/tasks/addTask', formattedTodo);
      setTasks(prevTasks => [...prevTasks, response.data]);
      return response.data;
    } catch (error: any) {
      console.error("Full error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
      });
      setError('Failed to add task');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGoal = async (goalFormValue: GoalInput) => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    setIsLoading(true);
    try {
      const formattedGoal = {
        ...goalFormValue,
        description: "",
        userId: userId,
        priority: 'Medium',
        emoji: '📝',
        dueDate: new Date(),
        isCompleted: false,
        tasks: []
      };

      const response = await axios.post('/api/goals/addGoal', formattedGoal);
      setGoals(prevGoals => [...prevGoals, response.data]);
      return response.data;
    } catch (error: any) {
      console.error("Full error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
      });
      setError('Failed to add goal');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const handleTabChange = (value: string) => {
    localStorage.setItem('lastActiveTab', value);
    onTabChange(value);
  };

  return (
    <Tabs
      defaultValue={localStorage.getItem('lastActiveTab') || 'today'}
      className="w-full mt-6 pb-12"
      onValueChange={handleTabChange}
    >
      <TabsList className="h-12 grid min-w-16 w-full max-w-screen-lg mx-auto gap-2 bg-white grid-cols-3 md:grid-cols-5">
        <TabsTrigger className={tabStyle} value="today">Today</TabsTrigger>
        <TabsTrigger className={tabStyle} value="tasks">Tasks</TabsTrigger>
        <TabsTrigger className={tabStyle} value="goals">Goals</TabsTrigger>
        {/* <TabsTrigger className={tabStyle} value="areas">Areas</TabsTrigger> */}
      </TabsList>

      <div className="mt-4">
        <TabsContent value="today">
          <TodayTab
            journal={journal}
            tasks={tasks}
            handleUpdateTask={handleUpdateTask}
          />
        </TabsContent>
        <TabsContent value="tasks">
          <TaskTab tasks={tasks} onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} />
        </TabsContent>
        <TabsContent value="goals">
          <GoalTab goals={goals} onAddGoal={handleAddGoal} />
        </TabsContent>
        {/* <TabsContent value="areas">
          <div className="p-4">The list of areas.</div>
        </TabsContent> */}
      </div>
    </Tabs>
  );
};

export default NavBar;
