import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: "⚡",
    title: "Blazing-Fast AI",
    description:
      "Sub-100ms response times with our optimized inference engine, powered by state-of-the-art hardware.",
  },
  {
    icon: "🧠",
    title: "Smart Automation",
    description:
      "Let AI handle repetitive tasks — from content generation to data analysis and code reviews.",
  },
  {
    icon: "📊",
    title: "Deep Analytics",
    description:
      "Real-time dashboards with actionable insights, usage trends, and performance metrics.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    description:
      "SOC 2 Type II compliant. End-to-end encryption, RBAC, SSO, and full audit logs.",
  },
  {
    icon: "🔗",
    title: "100+ Integrations",
    description:
      "Connect to Slack, GitHub, Notion, Zapier, and hundreds of other tools out of the box.",
  },
  {
    icon: "👥",
    title: "Team Collaboration",
    description:
      "Shared workspaces, role management, comments, and version history for full transparency.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Everything you need to ship faster
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            NovaAI gives your team the tools to automate, analyze, and collaborate — all in one place.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} hover className="flex flex-col gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-2xl shadow-sm">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-slate-800">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
