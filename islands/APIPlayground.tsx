// islands/APIPlayground.tsx
import { useState } from "preact/hooks";
import { CheckCircle2, Terminal, XCircle } from "lucide-preact";

interface TestResult {
  test: string;
  passed: boolean;
}

export default function APIPlayground() {
  const [endpoint, setEndpoint] = useState("users");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const mockAPI: Record<string, any> = {
    users: {
      id: 1,
      name: "Brian Lehrer",
      email: "brian.s.lehrer@gmail.com",
      status: "active",
      role: "SDET",
    },
    posts: {
      id: 42,
      title: "Reducing Manual Testing by 98%",
      author: "Brian Lehrer",
      likes: 127,
      tags: ["automation", "quality"],
    },
    error: null,
  };

  const runTests = (data: any): TestResult[] => {
    const results: TestResult[] = [];

    if (endpoint === "users") {
      results.push({ test: "Status Code: 200", passed: true });
      results.push({
        test: "Response has id field",
        passed: data && "id" in data,
      });
      results.push({
        test: "Email format is valid",
        passed: data?.email?.includes("@"),
      });
      results.push({
        test: "User status is active",
        passed: data?.status === "active",
      });
    } else if (endpoint === "posts") {
      results.push({ test: "Status Code: 200", passed: true });
      results.push({ test: "Post has title", passed: data && "title" in data });
      results.push({ test: "Likes count > 0", passed: data?.likes > 0 });
    } else {
      results.push({ test: "Status Code: 404", passed: true });
      results.push({ test: "Error handling works", passed: data === null });
    }

    return results;
  };

  const executeRequest = async () => {
    setLoading(true);
    setResponse(null);
    setTestResults([]);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const data = mockAPI[endpoint];
    setResponse(data);
    setTestResults(runTests(data));
    setLoading(false);
  };

  return (
    <div class="card">
      <div class="flex items-center gap-3 mb-6">
        <Terminal color="#83c092" size={32} />
        <h2 class="card-title">API Testing Playground</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block text-fg-light text-sm mb-2">Method</label>
          <select
            value={method}
            onChange={(e) => setMethod((e.target as HTMLSelectElement).value)}
            class="input-field"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div>
          <label class="block text-fg-light text-sm mb-2">Endpoint</label>
          <select
            value={endpoint}
            onChange={(e) => setEndpoint((e.target as HTMLSelectElement).value)}
            class="input-field"
          >
            <option value="users">/api/users</option>
            <option value="posts">/api/posts</option>
            <option value="error">/api/invalid</option>
          </select>
        </div>
      </div>

      <button
        onClick={executeRequest}
        disabled={loading}
        class="btn-primary w-full mb-6 flex items-center justify-center gap-2"
      >
        {loading ? "Testing..." : "Execute & Test"}
      </button>

      {response !== null && (
        <div class="flex flex-col gap-4">
          <div class="bg-bg-dark p-4 rounded-lg border border-bg-light">
            <div class="text-accent-aqua text-sm font-mono mb-2">Response:</div>
            <pre class="text-fg-mid text-sm overflow-x-auto m-0">
              {JSON.stringify(response, null, 2) || 'null'}
            </pre>
          </div>

          <div class="bg-bg-dark p-4 rounded-lg border border-bg-light">
            <div class="text-accent-aqua text-sm font-mono mb-3">
              Test Results:
            </div>
            <div class="flex flex-col gap-2">
              {testResults.map((result, idx) => (
                <div key={idx} class="flex items-center gap-2">
                  {result.passed
                    ? <CheckCircle2 color="#a7c080" size={18} />
                    : <XCircle color="#e67e80" size={18} />}
                  <span
                    class={`text-sm ${
                      result.passed ? "text-status-green" : "text-status-red"
                    }`}
                  >
                    {result.test}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

