"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TColumnProps = {
  title: string;
  count: number;
  children: ReactNode;
  className?: string;
};

export function Column({ title, count, children, className }: TColumnProps) {
  return (
    <Card className={cn("w-full min-h-[500px] flex flex-col", className)}>
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium tracking-wide">
            {title}
          </CardTitle>
          <Badge variant="secondary" className="text-xs font-semibold">
            {count}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 flex-1 overflow-y-auto space-y-3">
        {children}
      </CardContent>
    </Card>
  );
}
