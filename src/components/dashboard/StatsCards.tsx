import { Card } from "@/components/ui/Card";
import type { Plan } from "@/types";

interface StatsCardsProps {
  plan: Plan;
}

export function StatsCards({ plan }: StatsCardsProps) {
  const isPro = plan === "pro";

  const stats = [
    {
      label: "API Requests",
      value: isPro ? "Unlimited" : "500",
      sub: isPro ? "this month" : "per month",
      icon: "🔗",
      color: "from-violet-50 to-purple-50",
      iconBg: "bg-violet-100",
    },
    {
      label: "Workspaces",
      value: isPro ? "Unlimited" : "1",
      sub: "available",
      icon: "🗂️",
      color: "from-blue-50 to-sky-50",
      iconBg: "bg-blue-100",
    },
    {
      label: "Support Level",
      value: isPro ? "Priority" : "Community",
      sub: isPro ? "24/7 response" : "forum access",
      icon: isPro ? "⚡" : "👥",
      color: isPro ? "from-amber-50 to-yellow-50" : "from-slate-50 to-gray-50",
      iconBg: isPro ? "bg-amber-100" : "bg-slate-100",
    },
    {
      label: "Model Fine-Tuning",
      value: isPro ? "Enabled" : "Locked",
      sub: isPro ? "custom models" : "Pro feature",
      icon: "🧠",
      color: isPro ? "from-emerald-50 to-teal-50" : "from-slate-50 to-gray-50",
      iconBg: isPro ? "bg-emerald-100" : "bg-slate-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          padding="sm"
          className={`bg-gradient-to-br ${stat.color} border-0 shadow-sm`}
        >
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {stat.label}
            </p>
            <span className={`h-8 w-8 rounded-xl ${stat.iconBg} flex items-center justify-center text-base shrink-0`}>
              {stat.icon}
            </span>
          </div>
          <p className="text-xl font-extrabold text-slate-800">{stat.value}</p>
          <p className="text-xs text-slate-500 mt-0.5">{stat.sub}</p>
        </Card>
      ))}
    </div>
  );
}
