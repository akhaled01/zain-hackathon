import { Brain, Users, Cog } from "lucide-react";
import { Challenge } from "./types";

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Turning Information into Intelligence",
    shortDescription:
      "Transform scattered data into actionable intelligence that empowers smart, strategic decisions.",
    description:
      "Zain is a data-rich organization, but raw data is not inherently valuable. The real challenge is transforming scattered information from customer behavior to financial trends into a clear, actionable intelligence that empowers smart, strategic decisions. We're looking for an AI solution that breaks down internal data silos and uncovers hidden connections, moving beyond simple reporting to provide proactive insights.",
    category: "Data Intelligence",
    icon: Brain,
    registeredTeams: 12,

    exampleIdeas: [
      "Early Warning Radar: A solution that blends customer support tickets, network logs, and social media sentiment to flag issues before they escalate.",
      "Market Pulse Tracker: A tool that links internal financial reports with external market data to highlight new business opportunities or risks.",
      "One-Click Data Copilot: A chatbot that instantly answers natural-language questions like 'What was churn last month in prepaid customers?'"
    ],

    toolsAndTech: {
      "Low-code / No-code": ["Power BI", "Google Looker Studio", "Tableau", "Retool"],
      "AI / Data": ["OpenAI", "Claude", "Gemini", "Hugging Face", "LangChain"],
      "Development": ["Python", "Pandas", "FastAPI", "Streamlit", "JavaScript", "TypeScript", "Next.js", "Supabase"]
    },

    deliverables: [
      "Presentation",
      "Proof of concept",
      "Any schematics or supporting documents"
    ],

    dataNote: "Data will be provided when applicable, but participants are encouraged to bring their own mock datasets to shape and test their ideas. If you choose to use real data, it must be anonymized to ensure privacy and security. You are also welcome to draw from publicly available sources (e.g., Kaggle, World Bank, open telecom datasets) to enrich your solution."
  },
  {
    id: 2,
    title: "Redefining Engagement & Experiences",
    shortDescription:
      "Leverage AI as a creative partner to build new, more personalized, and inspiring forms of engagement.",
    description:
      "Every interaction with Zain whether for a customer or an employee contributes to the brand experience. The challenge is to leverage AI as a creative partner to build new, more personalized, and inspiring forms of engagement. This theme is about using AI to make Zain feel more human, fun, and memorable, fostering stronger connections and a vibrant brand culture.",
    category: "Experience Design",
    icon: Users,
    registeredTeams: 8,

    exampleIdeas: [
      "Zain Storyteller: An AI that generates personalized, interactive video stories or creative campaigns based on a user's interests.",
      "Culture Guide: An AI assistant that recommends training, team-building, or community groups tailored to employees' career goals.",
      "Smart Engagement Optimizer: A tool that finds the best timing, channel, and tone to maximize interaction with customers or staff."
    ],

    toolsAndTech: {
      "No-code / Creative": ["Canva", "Adobe Firefly", "RunwayML"],
      "Chat & Bots": ["ChatGPT", "Voiceflow", "Rasa", "Typeform"],
      "Development": ["Next.js", "Supabase", "Hugging Face", "Twilio"],
      "AR/VR": ["Unity"]
    },

    deliverables: [
      "Presentation",
      "Proof of concept",
      "Any schematics or supporting documents"
    ],

    dataNote: "Data will be provided when applicable, but participants are encouraged to bring their own mock datasets. If real data is used, it must be anonymized. Publicly available sources (e.g., Kaggle, open cultural or engagement datasets) are also welcome to enrich your solution."
  },
  {
    id: 3,
    title: "Reinventing How Work Gets Done",
    shortDescription:
      "Design intelligent automation that fundamentally changes how work flows across departments.",
    description:
      "Many daily business processes are repetitive, time-consuming, and inefficient. The challenge is to design intelligent automation that fundamentally changes how work flows across departments. By eliminating manual tasks and streamlining complex workflows, this theme aims to free people from mundane work, allowing them to focus on higher-value, more creative efforts.",
    category: "Process Automation",
    icon: Cog,
    registeredTeams: 15,

    exampleIdeas: [
      "Intelligent Approval System: AI that analyzes and routes multi-step approvals for HR onboarding, procurement, or finance requests.",
      "Proactive Operations Assistant: Predictive analytics that anticipate issues (like outages or supply bottlenecks) and trigger workflows before they cause impact.",
      "AI Meeting Scribe: An assistant that listens to meetings, extracts action points, and assigns tasks automatically."
    ],

    toolsAndTech: {
      "Automation": ["UiPath", "Blue Prism", "Power Automate"],
      "AI Assistants": ["LangChain", "Rasa", "Dialogflow"],
      "Workflow": ["Camunda", "Apache Airflow", "n8n"],
      "RPA": ["Automation Anywhere", "Robocorp"],
      "Infrastructure": ["Kubernetes", "Docker"]
    },

    deliverables: [
      "Presentation",
      "Proof of concept",
      "Any schematics or supporting documents"
    ],

    dataNote: "Data will be provided when applicable, but participants are encouraged to bring their own mock datasets. If real data is used, it must be anonymized. You can also draw on publicly available sources (e.g., Kaggle, open workflow datasets) to build your solution."
  }
];

export const judgingCriteria = {
  scoreGuide: {
    excellent: { range: "9-10", description: "Outstanding performance; clearly demonstrates high value, impact, or quality." },
    good: { range: "6-8", description: "Above average; shows strong value or impact but may require minor improvements." },
    fair: { range: "3-5", description: "Average; some value or impact is visible but limited or needs significant improvement." },
    poor: { range: "0-2", description: "Minimal value, impact, or clarity; does not meet expectations." }
  },
  
  criteria: [
    {
      id: 1,
      name: "Business Value & Corporate Impact",
      weight: 30,
      objective: "Assess how the solution creates measurable value for Zain's business, employees, or customers.",
      keyConsiderations: [
        "Does the solution address a real corporate problem?",
        "Will it improve efficiency, reduce costs, or increase revenue?",
        "Does it enhance customer satisfaction or employee experience?",
        "Are potential risks or challenges considered?"
      ],
      guidingQuestions: [
        "What problem is this solution solving for Zain?",
        "How does it benefit revenue, efficiency, or customer experience?",
        "Are the results measurable or quantifiable?",
        "How relevant is this solution to current corporate priorities?"
      ]
    },
    {
      id: 2,
      name: "Innovation & Creativity",
      weight: 20,
      objective: "Evaluate originality and the innovative use of AI and data.",
      keyConsiderations: [
        "Does the solution use AI in a creative way?",
        "Are new insights, methods, or experiences enabled?",
        "Does it stand out from existing tools or internal solutions?"
      ],
      guidingQuestions: [
        "What makes this solution unique compared to current corporate practices or tools?",
        "Does it push the boundaries of what AI can achieve in this domain?",
        "Are creative elements aligned with corporate goals?"
      ]
    },
    {
      id: 3,
      name: "Feasibility & Implementation",
      weight: 20,
      objective: "Assess practicality, technical feasibility, and potential for corporate deployment.",
      keyConsiderations: [
        "Is the solution technically feasible with available resources and infrastructure?",
        "Could it be realistically integrated into Zain's operations?",
        "Are data, tools, and regulatory requirements addressed?"
      ],
      guidingQuestions: [
        "What resources (data, AI models, infrastructure) are needed?",
        "Are there regulatory or compliance considerations?",
        "Could this solution be scaled or deployed in Zain's environment?"
      ]
    },
    {
      id: 4,
      name: "Scalability & Long-Term Potential",
      weight: 15,
      objective: "Evaluate if the solution can grow or evolve to deliver continued value.",
      keyConsiderations: [
        "Can it handle larger datasets, more users, or additional departments?",
        "Does it allow iterative improvement or AI model retraining?",
        "Will benefits increase over time as more data is collected?"
      ],
      guidingQuestions: [
        "Can it grow to support additional departments or users?",
        "Are there mechanisms for continuous improvement or updates?",
        "How sustainable is the solution in the corporate context?"
      ]
    },
    {
      id: 5,
      name: "Presentation & Clarity",
      weight: 15,
      objective: "Evaluate how clearly the team communicates the solution and its corporate value.",
      keyConsiderations: [
        "Is the problem, solution, and business impact clearly explained?",
        "Are visualizations, demos, or prototypes effective?",
        "Is it easy to understand for non-technical stakeholders?"
      ],
      guidingQuestions: [
        "Is the business problem and solution clearly articulated?",
        "Are visualizations, mockups, or demos effective?",
        "Can corporate stakeholders easily grasp the value proposition?"
      ]
    }
  ],
  
  totalWeight: 100,
  maxScore: 10
} as const;
