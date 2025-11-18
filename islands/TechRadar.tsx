// islands/TechRadar.tsx
interface Skill {
  name: string;
  level: number;
  color: string;
}

export default function TechRadar() {
  const skills: Skill[] = [
    { name: 'Test Automation', level: 95, color: '#a7c080' },
    { name: 'Cloud Architecture (AWS)', level: 90, color: '#83c092' },
    { name: 'Backend Testing', level: 90, color: '#7fbbb3' },
    { name: 'CI/CD & DevOps', level: 85, color: '#d699b6' },
    { name: 'Performance & Load Testing', level: 80, color: '#a7c080' },
    { name: 'UI/E2E Automation', level: 85, color: '#dbbc7f' }
  ];

  return (
    <div class="card">
      <h2 class="card-title mb-6">Tech Stack</h2>
      <div class="flex flex-col gap-4">
        {skills.map((skill, idx) => (
          <div key={idx} class="group">
            <div class="flex justify-between mb-2">
              <span class="text-fg-mid font-medium">{skill.name}</span>
              <span class="text-accent-green font-mono text-sm">{skill.level}%</span>
            </div>
            <div class="skill-bar">
              <div
                class="skill-bar-fill"
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: skill.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}