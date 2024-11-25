import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Journal } from '@/types/task';
import { formattedHaiku } from '@/utils/formatUtils';

interface JournalTrendsProps {
  journals: Journal[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      date: string;
      sentiment: number;
      highlight?: string;
      mood?: string;
      emoji?: string;
      title?: string;
      haiku?: string;
    }
  }>;
  label?: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

const sentimentColor = (sentiment: number) => {
  if (sentiment > 0) {
    return "bg-green-100";  // Positive
  } else if (sentiment < 0) {
    return "bg-red-100";    // Negative
  } else {
    return "bg-gray-100";   // Neutral
  }
};

const JournalTrends: React.FC<JournalTrendsProps> = ({ journals }) => {
  const [metric, setMetric] = useState('sentiment');
  const [activeTooltipData, setActiveTooltipData] = useState<any>(null);

  const chartData = useMemo(() => {
    if (!journals) return [];

    return journals.map(journal => {
      const date = formatDate(journal.date);

      return {
        date,
        sentiment: journal.sentiment,
        highlight: journal.highlight,
        haiku: journal.haiku,
        mood: journal.mood,
        emoji: journal.emoji,
        title: journal.title
      };
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [journals]);

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      setActiveTooltipData(data);
      return null; // We'll render the tooltip content separately
    }
    return null;
  };

  return (
    <div className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Journal Trends</CardTitle>
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[180px] rounded-xl">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sentiment">Sentiment</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: 'gray', strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey={metric}
                  stroke="#000"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tooltip rendered below the chart */}
      {activeTooltipData && (
        <div className="w-full bg-white p-6 flex flex-col gap-6 rounded-lg shadow-lg border space-y-2">
          <div className=''>
            <div className='flex gap-4'>
              <span className='text-xl'>{activeTooltipData.emoji}</span>
              <span className='font-bold'>{activeTooltipData.title}</span>
            </div>
            <div className="flex gap-4 py-2">
              <span className="font-bold text-sm bg-gray-100 rounded-lg px-4">
                {activeTooltipData.date}
              </span>
              <span className={`rounded-lg text-sm px-4 ${sentimentColor(activeTooltipData.sentiment)}`}>
                {activeTooltipData.sentiment > 0 ? 'Positive' : activeTooltipData.sentiment < 0 ? 'Negative' : 'Neutral'}
              </span>
            </div>
          </div>
          <div className='flex gap-16 max-w-screen-lg p-4'>
            <div className='flex flex-col basis-2/5'>
              {activeTooltipData.mood && <p><span className='font-bold text-gray-700'>☁️ Mood:</span> {activeTooltipData.mood}</p>}
              {activeTooltipData.highlight && <p><span className='font-bold text-gray-700'>✨ Highlight:</span> {activeTooltipData.highlight}</p>}
            </div>
            {activeTooltipData.haiku && (
              <div>
                <span className='font-bold text-gray-700'>🎨 Haiku:</span>
                {formattedHaiku(activeTooltipData.haiku)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalTrends;