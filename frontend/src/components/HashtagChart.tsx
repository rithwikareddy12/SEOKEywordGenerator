
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HashtagData {
  tag: string;
  count: number;
  relevance: number;
}

interface HashtagChartProps {
  data: HashtagData[];
}

export const HashtagChart = ({ data }: HashtagChartProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hashtag Popularity Analysis</CardTitle>
        <CardDescription>
          Explore the most popular hashtags related to your video content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="tag" 
                angle={-45} 
                textAnchor="end" 
                tick={{ fontSize: 12 }} 
                interval={0}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "count") return [`${value}k users`, "Usage Count"];
                  if (name === "relevance") return [`${value}%`, "Relevance Score"];
                  return [value, name];
                }}
                labelFormatter={(label) => `#${label}`}
              />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Usage Count" 
                fill="#6E59A5" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="relevance" 
                name="Relevance Score" 
                fill="#9b87f5" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
