import { Brain, Users, Cog } from "lucide-react";

export const challenges = [
  {
    id: 1,
    title: "Turning Information into Intelligence",
    shortDescription:
      "Transform scattered data into actionable intelligence that empowers smart, strategic decisions.",
    description:
      "Zain is a data-rich organization, but raw data is not inherently valuable. The real challenge is transforming scattered information from customer behavior to financial trends into a clear, actionable intelligence that empowers smart, strategic decisions. We're looking for an AI solution that breaks down internal data silos and uncovers hidden connections, moving beyond simple reporting to provide proactive insights.",
    category: "Data Intelligence",
    difficulty: "Technical",
    icon: Brain,
    registeredTeams: 12,

    exampleIdeas: [
      "Early Warning Radar: A solution that blends customer support tickets, network logs, and social media sentiment to flag issues before they escalate.",
      "Market Pulse Tracker: A tool that links internal financial reports with external market data to highlight new business opportunities or risks.",
      "One-Click Data Copilot: A chatbot that instantly answers natural-language questions like 'What was churn last month in prepaid customers?'"
    ],

    toolsAndTech: [
      "Low-code / No-code: Power BI, Google Looker Studio, Tableau, Retool",
      "AI / Data: OpenAI / Claude / Gemini for natural language processing, Hugging Face, LangChain",
      "Development: Python (Pandas, FastAPI, Streamlit), JavaScript/TypeScript (Next.js, Supabase)"
    ],

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
    difficulty: "Creative",
    icon: Users,
    registeredTeams: 8,

    exampleIdeas: [
      "Zain Storyteller: An AI that generates personalized, interactive video stories or creative campaigns based on a user's interests.",
      "Culture Guide: An AI assistant that recommends training, team-building, or community groups tailored to employees' career goals.",
      "Smart Engagement Optimizer: A tool that finds the best timing, channel, and tone to maximize interaction with customers or staff."
    ],

    toolsAndTech: [
      "No-code / Creative: Canva + AI, Adobe Firefly, RunwayML (AI video/audio)",
      "Chat & Bots: ChatGPT Assistants, Voiceflow, Rasa, Typeform",
      "Development: Next.js + Supabase, Hugging Face Transformers, Twilio APIs",
      "AR/VR: Spark AR, Unity"
    ],

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
    difficulty: "Technical",
    icon: Cog,
    registeredTeams: 15,

    exampleIdeas: [
      "Intelligent Approval System: AI that analyzes and routes multi-step approvals for HR onboarding, procurement, or finance requests.",
      "Proactive Operations Assistant: Predictive analytics that anticipate issues (like outages or supply bottlenecks) and trigger workflows before they cause impact.",
      "AI Meeting Scribe: An assistant that listens to meetings, extracts action points, and assigns tasks automatically."
    ],

    toolsAndTech: [
      "Automation: UiPath, Blue Prism, Power Automate",
      "AI Assistants: LangChain, Rasa, Dialogflow",
      "Workflow: Camunda, Apache Airflow, n8n",
      "RPA: Automation Anywhere, Robocorp",
      "Infra: Kubernetes, Docker, APIs for integrations"
    ],

    deliverables: [
      "Presentation",
      "Proof of concept",
      "Any schematics or supporting documents"
    ],

    dataNote: "Data will be provided when applicable, but participants are encouraged to bring their own mock datasets. If real data is used, it must be anonymized. You can also draw on publicly available sources (e.g., Kaggle, open workflow datasets) to build your solution."
  }
];
