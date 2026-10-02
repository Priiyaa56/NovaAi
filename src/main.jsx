import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const tools = [
  {
    id: "chat",
    icon: "💬",
    name: "AI Chat Assistant",
    desc: "Ask questions and brainstorm ideas.",
  },
  {
    id: "image",
    icon: "🎨",
    name: "AI Image Generator",
    desc: "Create visual concepts from prompts.",
  },
  {
    id: "code",
    icon: "</>",
    name: "AI Code Generator",
    desc: "Generate starter code and explanations.",
  },
  {
    id: "summary",
    icon: "📝",
    name: "AI Text Summarizer",
    desc: "Turn long content into concise notes.",
  },
  {
    id: "email",
    icon: "✉️",
    name: "AI Email Generator",
    desc: "Draft polished professional emails.",
  },
  {
    id: "blog",
    icon: "✍️",
    name: "AI Blog Generator",
    desc: "Create structured blog content.",
  },
];
const seedHistory = [
  {
    id: 1,
    tool: "AI Chat Assistant",
    input: "Ideas for a SaaS landing page",
    output:
      "Build a clear hero, social proof, feature grid, pricing, FAQ and a strong call to action.",
    date: "Today",
  },
  {
    id: 2,
    tool: "AI Text Summarizer",
    input: "Productivity article",
    output:
      "A concise summary focused on prioritization, deep work and measurable habits.",
    date: "Yesterday",
  },
];
function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("nova_user") || "null"),
  );
  const [page, setPage] = useState(user ? "dashboard" : "landing");
  const [theme, setTheme] = useState(
    localStorage.getItem("nova_theme") || "dark",
  );
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("nova_theme", theme);
  }, [theme]);
  const login = (u) => {
    localStorage.setItem("nova_user", JSON.stringify(u));
    setUser(u);
    setPage("dashboard");
  };
  const logout = () => {
    localStorage.removeItem("nova_user");
    setUser(null);
    setPage("landing");
  };
  return (
    <>
      <Header
        user={user}
        page={page}
        go={setPage}
        theme={theme}
        toggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        logout={logout}
      />
      {user &&
      [
        "dashboard",
        "tools",
        "history",
        "profile",
        "settings",
        "pricing-app",
      ].includes(page) ? (
        <Dashboard page={page} go={setPage} user={user} logout={logout} />
      ) : (
        <Public
          page={page}
          go={setPage}
          login={login}
          theme={theme}
          setTheme={setTheme}
        />
      )}
      <Footer />
    </>
  );
}
function Header({ user, page, go, theme, toggle, logout }) {
  return (
    <header>
      <div className="nav wrap">
        <button
          className="brand"
          onClick={() => go(user ? "dashboard" : "landing")}
        >
          <span className="brandmark">✦</span> NovaAI
        </button>
        <nav className="desktop-nav">
          {!user && (
            <>
              <button onClick={() => go("landing")}>Home</button>
              <button onClick={() => go("landing")}>Features</button>
              <button onClick={() => go("pricing")}>Pricing</button>
              <button onClick={() => go("landing")}>FAQ</button>
            </>
          )}
          {user && (
            <>
              <button onClick={() => go("dashboard")}>Dashboard</button>
              <button onClick={() => go("tools")}>AI Tools</button>
              <button onClick={() => go("history")}>History</button>
            </>
          )}
        </nav>
        <div className="nav-actions">
          <button className="iconbtn" onClick={toggle} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          {user ? (
            <>
              <span className="userchip">
                {user.name || user.email?.split("@")[0]}
              </span>
              <button className="outline small" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="outline small" onClick={() => go("login")}>
                Log in
              </button>
              <button className="primary small" onClick={() => go("signup")}>
                Get started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
function Public({ page, go, login }) {
  if (["login", "signup", "forgot"].includes(page))
    return <Auth type={page} go={go} login={login} />;
  if (page === "pricing") return <Pricing go={go} />;
  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="pill">✦ AI productivity, reimagined</span>
            <h1>
              One workspace for <span className="gradient">every AI task.</span>
            </h1>
            <p>
              NovaAI brings chat, writing, coding, summarization and creative
              tools together in a fast, focused SaaS workspace.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={() => go("signup")}>
                Start creating free →
              </button>
              <button
                className="outline"
                onClick={() =>
                  document
                    .getElementById("features")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore features
              </button>
            </div>
            <div className="trust">
              <span>✓ No credit card</span>
              <span>✓ Free plan</span>
              <span>✓ Responsive workspace</span>
            </div>
          </div>
          <div className="hero-card">
            <div className="windowbar">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="mini-title">
              AI Workspace <span>● Live</span>
            </div>
            <div className="mini-chat">
              <div className="bubble user">
                Create a launch plan for my SaaS.
              </div>
              <div className="bubble ai">
                Absolutely. I’ll structure it into goals, channels, timeline and
                metrics.
              </div>
              <div className="mini-input">
                Ask NovaAI anything… <b>↗</b>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="section wrap">
        <SectionTitle
          eyebrow="Everything in one place"
          title="Tools that move your work forward"
          text="A practical dashboard designed around the AI workflows you actually use."
        />
        <div className="tool-grid">
          {tools.map((t) => (
            <article className="card tool-card" key={t.id}>
              <div className="tool-icon">{t.icon}</div>
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
              <button className="textbtn" onClick={() => go("signup")}>
                Try tool →
              </button>
            </article>
          ))}
        </div>
      </section>
      <section className="section alt">
        <div className="wrap stats">
          <div>
            <b>6</b>
            <span>AI tools</span>
          </div>
          <div>
            <b>1</b>
            <span>unified workspace</span>
          </div>
          <div>
            <b>24/7</b>
            <span>creative momentum</span>
          </div>
          <div>
            <b>100%</b>
            <span>responsive UI</span>
          </div>
        </div>
      </section>
      <Pricing go={go} />
      <section className="section wrap">
        <SectionTitle eyebrow="Questions" title="Frequently asked questions" />
        <div className="faq">
          {[
            "Is NovaAI free?",
            "Can I use the tools on mobile?",
            "Does my history persist?",
            "Can I change my plan?",
          ].map((q, i) => (
            <details key={q} open={i === 0}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>
                {i === 0
                  ? "Yes. The demo includes a free plan and no payment is required."
                  : i === 1
                    ? "Yes. The dashboard adapts to desktop, tablet and mobile screens."
                    : i === 2
                      ? "Yes. Demo-generated content is saved locally in your browser."
                      : "Yes. Pricing buttons are ready for a future payment integration."}
              </p>
            </details>
          ))}
        </div>
      </section>
      <section className="contact">
        <div className="wrap contact-box">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Have a question about NovaAI?</h2>
            <p>
              Tell us what you are building and we’ll help you find the right
              workflow.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! Your message has been received.");
            }}
          >
            <input required placeholder="Your email" type="email" />
            <textarea
              required
              placeholder="How can we help?"
              rows="3"
            ></textarea>
            <button className="primary">Send message</button>
          </form>
        </div>
      </section>
    </main>
  );
}
function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
function Pricing({ go }) {
  return (
    <section className="section wrap" id="pricing">
      <SectionTitle
        eyebrow="Simple pricing"
        title="Choose your workspace"
        text="Clear plans for different levels of AI usage."
      />
      <div className="pricing-grid">
        {[
          [
            "Free",
            "$0",
            "For trying the workspace",
            ["2 tools per day", "Basic history", "Community support"],
          ],
          [
            "Basic",
            "$12",
            "For regular creators",
            ["All AI tools", "Unlimited history", "Priority workflows"],
          ],
          [
            "Premium",
            "$29",
            "For power users",
            ["Everything in Basic", "Advanced workspace", "Priority support"],
          ],
        ].map((p, i) => (
          <article
            className={"price card " + (i === 1 ? "featured" : "")}
            key={p[0]}
          >
            {i === 1 && <span className="popular">Popular</span>}
            <h3>{p[0]}</h3>
            <p>{p[2]}</p>
            <div className="price-num">
              {p[1]}
              <small>/month</small>
            </div>
            {p[3].map((x) => (
              <div className="check" key={x}>
                ✓ {x}
              </div>
            ))}
            <button
              className={i === 1 ? "primary" : "outline"}
              onClick={() => go("signup")}
            >
              Buy now
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
function Auth({ type, go, login }) {
  const labels = {
    login: "Welcome back",
    signup: "Create your NovaAI account",
    forgot: "Reset your password",
  };
  return (
    <main className="auth-wrap">
      <div className="auth-card card">
        <span className="brandmark">✦</span>
        <h1>{labels[type]}</h1>
        <p>
          {type === "forgot"
            ? "Enter your email and we’ll show a demo reset confirmation."
            : "Use the form below to access the protected dashboard."}
        </p>
        {type === "forgot" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Password reset link sent (demo).");
              go("login");
            }}
          >
            <label>
              Email
              <input required type="email" placeholder="you@example.com" />
            </label>
            <button className="primary">Send reset link</button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              login({
                name: f.get("name") || "Nova User",
                email: f.get("email"),
              });
            }}
          >
            {type === "signup" && (
              <label>
                Full name
                <input name="name" required placeholder="Your name" />
              </label>
            )}
            <label>
              Email
              <input
                name="email"
                required
                type="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                name="password"
                required
                minLength="4"
                type="password"
                placeholder="••••••••"
              />
            </label>
            {type === "login" && (
              <button
                type="button"
                className="link"
                onClick={() => go("forgot")}
              >
                Forgot password?
              </button>
            )}
            <button className="primary">
              {type === "login" ? "Log in" : "Create account"}
            </button>
          </form>
        )}
        <button className="back" onClick={() => go("landing")}>
          ← Back to home
        </button>
      </div>
    </main>
  );
}
function Dashboard({ page, go, user }) {
  return (
    <main className="app-wrap">
      <aside className="sidebar">
        <div className="side-label">WORKSPACE</div>
        {[
          ["dashboard", "▦", "Overview"],
          ["tools", "✦", "AI Tools"],
          ["history", "◷", "History"],
          ["pricing-app", "◇", "Pricing"],
        ].map((x) => (
          <button
            className={page === x[0] ? "active" : ""}
            onClick={() => go(x[0])}
            key={x[0]}
          >
            {x[1]} {x[2]}
          </button>
        ))}
        <div className="side-label">ACCOUNT</div>
        {[
          ["profile", "◯", "Profile"],
          ["settings", "⚙", "Settings"],
        ].map((x) => (
          <button
            className={page === x[0] ? "active" : ""}
            onClick={() => go(x[0])}
            key={x[0]}
          >
            {x[1]} {x[2]}
          </button>
        ))}
        <div className="side-bottom">
          <span>NovaAI Pro</span>
          <small>Build faster with AI.</small>
        </div>
      </aside>
      <div className="dash-content">
        {page === "dashboard" && <Overview go={go} user={user} />}{" "}
        {page === "tools" && <Tools />}
        {page === "history" && <History />}
        {page === "profile" && <Profile user={user} />}{" "}
        {page === "settings" && <Settings />}
        {page === "pricing-app" && <Pricing go={go} />}
      </div>
    </main>
  );
}
function Top({ eyebrow, title, text }) {
  return (
    <div className="dash-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}
function Overview({ go, user }) {
  return (
    <>
      <Top
        eyebrow="Overview"
        title={`Good to see you, ${user.name || "there"} 👋`}
        text="Here’s what’s happening across your AI workspace."
      />
      <div className="stat-grid">
        {[
          ["✦", "Generations", "128", "+18% this week"],
          ["◷", "Saved history", "42", "+6 this week"],
          ["⚡", "Credits used", "68%", "32% remaining"],
          ["★", "Plan", "Free", "Upgrade anytime"],
        ].map((x) => (
          <div className="stat-card card" key={x[1]}>
            <span>{x[0]}</span>
            <small>{x[1]}</small>
            <b>{x[2]}</b>
            <em>{x[3]}</em>
          </div>
        ))}
      </div>
      <div className="two-col">
        <div className="card panel">
          <div className="panel-head">
            <h3>Recent activity</h3>
            <button className="textbtn" onClick={() => go("history")}>
              View all
            </button>
          </div>
          {seedHistory.map((x) => (
            <div className="activity" key={x.id}>
              <span>✦</span>
              <div>
                <b>{x.tool}</b>
                <p>{x.input}</p>
              </div>
              <time>{x.date}</time>
            </div>
          ))}
        </div>
        <div className="card panel">
          <h3>Quick start</h3>
          <p className="muted">
            Jump into a tool and generate your first result.
          </p>
          {tools.slice(0, 4).map((t) => (
            <button className="quick" onClick={() => go("tools")} key={t.id}>
              <span>{t.icon}</span>
              {t.name}
              <b>→</b>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
function Tools() {
  const [selected, setSelected] = useState("chat");
  return (
    <>
      <Top
        eyebrow="AI Tools"
        title="Create with NovaAI"
        text="Choose a tool, enter a prompt and generate a polished result."
      />
      <div className="tool-tabs">
        {tools.map((t) => (
          <button
            className={selected === t.id ? "active" : ""}
            onClick={() => setSelected(t.id)}
            key={t.id}
          >
            {t.icon} {t.name.replace("AI ", "")}
          </button>
        ))}
      </div>
      <ToolBox tool={tools.find((t) => t.id === selected)} />
    </>
  );
}
function ToolBox({ tool }) {
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setImageUrl("");
    if (tool.id === "image") {
      const prompt = input.trim();

      try {
        const response = await fetch(
          "http://localhost:5000/api/generate-image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Image generation failed.");
        }

        setImageUrl(data.imageUrl);
        setOut(`Image generated from: “${prompt}”`);
        saveHistory(`Image generated from: “${prompt}”`);
      } catch (error) {
        console.error(error);
        setOut(error.message || "Unable to generate image.");
      } finally {
        setLoading(false);
      }

      return;
    }
    setTimeout(() => {
      const templates = {
        chat: `Here’s a structured response to your request:\n\n${input}\n\n• Define the goal\n• Break it into clear steps\n• Measure the outcome\n• Iterate using feedback`,
        code: `// Starter solution for: ${input}\nfunction solution() {\n  // Add your implementation here\n  return { status: 'ready' };\n}`,
        summary: `Summary:\n${input.slice(0, 220)}${input.length > 220 ? "…" : ""}\n\nKey point: focus on the central idea, supporting evidence and next action.`,
        email: `Subject: ${input}\n\nHi there,\n\nI’m reaching out regarding ${input}. I’d love to discuss the next steps and find a practical way to move this forward.\n\nBest regards,\nNovaAI`,
        blog: `# ${input}\n\n## Introduction\nA clear introduction to the topic and why it matters.\n\n## Key ideas\nBreak the subject into useful sections, examples and actionable takeaways.\n\n## Conclusion\nSummarize the main insight and give the reader a next step.`,
      };
      setOut(templates[tool.id]);
      setLoading(false);
      saveHistory(templates[tool.id]);
    }, 650);
  };
  const saveHistory = (output) => {
    const h = JSON.parse(localStorage.getItem("nova_history") || "[]");
    localStorage.setItem(
      "nova_history",
      JSON.stringify([
        { id: Date.now(), tool: tool.name, input, output, date: "Just now" },
        ...h,
      ]),
    );
  };
  return (
    <div className="generator card">
      <div className="generator-head">
        <div className="tool-icon">{tool.icon}</div>
        <div>
          <h2>{tool.name}</h2>
          <p>{tool.desc}</p>
        </div>
      </div>
      <label>
        Input / Prompt
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Tell NovaAI what you want ${tool.name.toLowerCase()} to do…`}
          rows="7"
        />
      </label>
      <div className="gen-actions">
        <button className="primary" onClick={generate}>
          {loading ? "Generating…" : "✦ Generate"}
        </button>
        <button
          className="outline"
          onClick={() => {
            setInput("");
            setOut("");
            setImageUrl("");
          }}
        >
          Clear
        </button>
      </div>
      {loading && (
        <div className="loading">
          <i></i>
          <i></i>
          <i></i> NovaAI is generating…
        </div>
      )}
      {(out || imageUrl) && (
        <div className="output">
          <div className="panel-head">
            <h3>{tool.id === "image" ? "Generated Image" : "Result"}</h3>
            {out && (
              <button
                className="outline small"
                onClick={() => navigator.clipboard?.writeText(out)}
              >
                Copy
              </button>
            )}
          </div>
          {imageUrl && (
            <div className="image-result">
              <img src={imageUrl} alt={input} />
              <a
                className="primary small"
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open / Save Image
              </a>
            </div>
          )}
          {out && tool.id !== "image" && <pre>{out}</pre>}
          {out && tool.id === "image" && <p className="muted">{out}</p>}
        </div>
      )}
    </div>
  );
}

function History() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState(() =>
    JSON.parse(localStorage.getItem("nova_history") || "[]").concat(
      seedHistory,
    ),
  );
  const filtered = items.filter((x) =>
    (x.tool + x.input + x.output).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <Top
        eyebrow="History"
        title="Your generation history"
        text="Search, copy or delete previous results."
      />
      <div className="history-bar">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search history…"
        />
      </div>
      <div className="history-list">
        {filtered.length ? (
          filtered.map((x) => (
            <article className="card history-item" key={x.id}>
              <div>
                <span className="eyebrow">
                  {x.tool} · {x.date}
                </span>
                <h3>{x.input}</h3>
                <p>{x.output}</p>
              </div>
              <div className="history-actions">
                <button
                  className="outline small"
                  onClick={() => navigator.clipboard?.writeText(x.output)}
                >
                  Copy
                </button>
                <button
                  className="danger"
                  onClick={() => {
                    setItems(items.filter((i) => i.id !== x.id));
                    localStorage.setItem(
                      "nova_history",
                      JSON.stringify(items.filter((i) => i.id !== x.id)),
                    );
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="empty card">No matching history.</div>
        )}
      </div>
    </>
  );
}
function Profile({ user }) {
  return (
    <>
      <Top
        eyebrow="Profile"
        title="Your profile"
        text="Manage the information shown across your workspace."
      />
      <div className="card profile-card">
        <div className="avatar">{(user.name || "N")[0]}</div>
        <div>
          <h2>{user.name || "Nova User"}</h2>
          <p>{user.email}</p>
          <button
            className="outline"
            onClick={() => alert("Edit profile UI ready for integration.")}
          >
            Edit profile
          </button>
        </div>
      </div>
      <div className="card form-card">
        <h3>Account details</h3>
        <div className="form-grid">
          <label>
            Name
            <input defaultValue={user.name || ""} />
          </label>
          <label>
            Email
            <input defaultValue={user.email || ""} />
          </label>
        </div>
        <label>
          Change password
          <input type="password" placeholder="New password" />
        </label>
        <button
          className="primary"
          onClick={() => alert("Profile changes saved (demo).")}
        >
          Save changes
        </button>
      </div>
    </>
  );
}
function Settings() {
  const [dark, setDark] = useState(
    (document.body.dataset.theme || "dark") === "dark",
  );
  return (
    <>
      <Top
        eyebrow="Settings"
        title="Workspace settings"
        text="Control your theme, notifications and account preferences."
      />
      <div className="settings-list">
        <div className="card setting">
          <div>
            <h3>Dark mode</h3>
            <p>Use a dark workspace for focused sessions.</p>
          </div>
          <button
            className={"toggle " + (dark ? "on" : "")}
            onClick={() => {
              setDark(!dark);
              document.body.dataset.theme = !dark ? "dark" : "light";
              localStorage.setItem("nova_theme", !dark ? "dark" : "light");
            }}
          >
            <span></span>
          </button>
        </div>
        <div className="card setting">
          <div>
            <h3>Email notifications</h3>
            <p>Receive product and usage notifications.</p>
          </div>
          <button className="toggle on">
            <span></span>
          </button>
        </div>
        <div className="card setting">
          <div>
            <h3>Language</h3>
            <p>Select your preferred interface language.</p>
          </div>
          <select>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
        <div className="card setting">
          <div>
            <h3>Account</h3>
            <p>Manage account data and sessions.</p>
          </div>
          <button
            className="outline"
            onClick={() => alert("Account settings UI ready.")}
          >
            Manage
          </button>
        </div>
      </div>
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <div className="brand">
            <span className="brandmark">✦</span> NovaAI
          </div>
          <p>One workspace for every AI task.</p>
        </div>
        <div>
          <b>Product</b>
          <span>AI Tools</span>
          <span>Pricing</span>
          <span>History</span>
        </div>
        <div>
          <b>Company</b>
          <span>About</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
        <div>
          <b>Support</b>
          <span>FAQ</span>
          <span>Help Center</span>
          <span>Status</span>
        </div>
      </div>
      <div className="wrap copyright">
        © 2026 NovaAI. Internship Phase 2 project.
      </div>
    </footer>
  );
}
createRoot(document.getElementById("root")).render(<App />);
