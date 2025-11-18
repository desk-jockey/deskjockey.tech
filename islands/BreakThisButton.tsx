// islands/BreakThisButton.tsx
import { useRef, useState } from "preact/hooks";
import { Bug, CheckCircle2 } from "lucide-preact";

interface BugType {
  id: string;
  name: string;
  trigger: number;
}

export default function BreakThisButton() {
  const [clicks, setClicks] = useState(0);
  const [rapidClicks, setRapidClicks] = useState(0);
  const [doubleClick, setDoubleClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bugsFound, setBugsFound] = useState(new Set<string>());
  const lastClick = useRef(0);
  const rapidTimer = useRef<number | null>(null);

  const bugs: BugType[] = [
    { id: "double", name: "Double-click Handler Missing", trigger: 2 },
    { id: "rapid", name: "Race Condition on Rapid Clicks", trigger: 5 },
    { id: "loading", name: "No Loading State", trigger: 1 },
    { id: "overflow", name: "Counter Overflow", trigger: 100 },
  ];

  const handleClick = () => {
    const now = Date.now();
    setClicks((c) => c + 1);

    if (now - lastClick.current < 300) {
      setDoubleClick(true);
      if (!bugsFound.has("double")) {
        setBugsFound(new Set([...bugsFound, "double"]));
      }
      setTimeout(() => setDoubleClick(false), 500);
    }
    lastClick.current = now;

    if (rapidTimer.current) {
      setRapidClicks((r) => r + 1);
    } else {
      setRapidClicks(1);
    }

    if (rapidTimer.current) clearTimeout(rapidTimer.current);
    rapidTimer.current = setTimeout(() => {
      setRapidClicks(0);
      rapidTimer.current = null;
    }, 1000) as unknown as number;

    if (rapidClicks >= 4 && !bugsFound.has("rapid")) {
      setBugsFound(new Set([...bugsFound, "rapid"]));
    }

    if (!loading && !bugsFound.has("loading")) {
      setLoading(true);
      setBugsFound(new Set([...bugsFound, "loading"]));
      setTimeout(() => setLoading(false), 1000);
    }

    if (clicks >= 99 && !bugsFound.has("overflow")) {
      setBugsFound(new Set([...bugsFound, "overflow"]));
    }
  };

  return (
    <div class="card">
      <div class="flex items-center gap-3 mb-6">
        <Bug color="#e67e80" size={32} />
        <h2 class="card-title">Break This Button</h2>
      </div>

      <p class="text-fg-light mb-6">
        Think you can find all the edge cases? Try clicking, double-clicking,
        rapid-firing... see what breaks!
      </p>

      <div class="flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={handleClick}
          class={`px-8 py-4 text-xl font-bold rounded-lg transition-all transform border-none
            ${
            doubleClick
              ? "bg-red-900 scale-110 rotate-2"
              : "bg-[#a7c080] hover:scale-105"
          }
            ${loading ? "opacity-50 cursor-wait" : "cursor-pointer"}
            text-bg-dark`}
        >
          {loading ? "Processing..." : `Clicked ${clicks} times`}
        </button>

        <div class="w-full bg-bg-dark p-4 rounded-lg border border-bg-light">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[#a7c080] font-mono text-sm">Bugs Found:</span>
            <span class="text-fg-bright font-bold">
              {bugsFound.size}/{bugs.length}
            </span>
          </div>
          <div class="flex flex-col gap-2">
            {bugs.map((bug) => (
              <div key={bug.id} class="flex items-center gap-2">
                {bugsFound.has(bug.id)
                  ? <CheckCircle2 color="#a7c080" size={16} />
                  : (
                    <div class="w-4 h-4 rounded-full border-2 border-bg-lighter">
                    </div>
                  )}
                <span
                  class={`text-sm ${
                    bugsFound.has(bug.id)
                      ? "text-status-green"
                      : "text-fg-light"
                  }`}
                >
                  {bug.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

