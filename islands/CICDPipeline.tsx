// islands/CICDPipeline.tsx
import { useRef, useState } from "preact/hooks";
import {
  CheckCircle2,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe,
  LucideIcon,
  Play,
  Zap,
} from "lucide-preact";

interface Stage {
  id: string;
  name: string;
  icon: LucideIcon;
  duration: number;
  desc: string;
}

export default function CICDPipeline() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const runningRef = useRef(false);

  const stages: Stage[] = [
    {
      id: "unit",
      name: "Unit Tests",
      icon: Code2,
      duration: 800,
      desc: "JUnit, TestNG, Jest - Fast feedback loops with high coverage",
    },
    {
      id: "integration",
      name: "Integration",
      icon: Database,
      duration: 1200,
      desc:
        "RestAssured, WireMock - API contract testing & service integration",
    },
    {
      id: "e2e",
      name: "E2E Tests",
      icon: Globe,
      duration: 1500,
      desc: "Selenium, WebDriver, Playwright - Full user journey validation",
    },
    {
      id: "performance",
      name: "Performance",
      icon: Gauge,
      duration: 1000,
      desc: "JMeter, Gatling - Load testing & capacity planning",
    },
    {
      id: "deploy",
      name: "Deploy",
      icon: Zap,
      duration: 600,
      desc: "AWS CloudFormation, Docker, Kubernetes - Infrastructure as Code",
    },
  ];

  const runPipeline = async () => {
    if (runningRef.current) return;

    runningRef.current = true;
    setRunning(true);
    setCompletedStages([]);
    setActiveStage(null);

    for (const stage of stages) {
      if (!runningRef.current) break;
      setActiveStage(stage.id);
      await new Promise((resolve) => setTimeout(resolve, stage.duration));
      setCompletedStages((prev) => [...prev, stage.id]);
    }

    setActiveStage(null);
    runningRef.current = false;
    setRunning(false);
  };

  return (
    <div class="card">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div class="flex items-center gap-3">
          <GitBranch color="#83c092" size={32} />
          <h2 class="card-title">CI/CD Pipeline</h2>
        </div>
        <button
          type="button"
          onClick={runPipeline}
          disabled={running}
          class="flex items-center gap-2 px-6 py-2 bg-status-green text-bg-dark rounded-lg font-bold 
                 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-green transition-colors border-none cursor-pointer"
        >
          <Play size={16} />
          {running ? "Running..." : "Run Pipeline"}
        </button>
      </div>

      <div class="flex flex-col gap-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;
          const isCompleted = completedStages.includes(stage.id);

          return (
            <div
              key={stage.id}
              onClick={() =>
                !running &&
                setActiveStage(activeStage === stage.id ? null : stage.id)}
              class={`stage-card ${
                isActive ? "active" : isCompleted ? "completed" : "inactive"
              }`}
            >
              <div class="flex items-center gap-4">
                <div
                  class={`p-2 rounded-lg ${
                    isActive
                      ? "bg-accent-aqua"
                      : isCompleted
                      ? "bg-status-green"
                      : "bg-bg-lighter"
                  }`}
                >
                  <Icon
                    color={isActive || isCompleted ? "#272e33" : "#d3c6aa"}
                    size={24}
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <h3 class="text-fg-bright font-bold">{stage.name}</h3>
                    {isCompleted && <CheckCircle2 color="#a7c080" size={20} />}
                    {isActive && (
                      <div class="w-2 h-2 bg-accent-aqua rounded-full animate-pulse-slow">
                      </div>
                    )}
                  </div>
                  {activeStage === stage.id && (
                    <p class="text-fg-light text-sm mt-2">{stage.desc}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

