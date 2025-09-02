"use client";

import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface TechStackBadgeProps {
  name: string;
  className?: string;
}

// Static mapping of tech names to their official URLs
const techUrls: Record<string, string> = {
  // Low-code / No-code
  "power bi": "https://powerbi.microsoft.com/",
  "google looker studio": "https://lookerstudio.google.com/",
  "tableau": "https://www.tableau.com/",
  "retool": "https://retool.com/",
  
  // AI / Data
  "openai": "https://openai.com/",
  "claude": "https://claude.ai/",
  "gemini": "https://gemini.google.com/",
  "hugging face": "https://huggingface.co/",
  "langchain": "https://langchain.com/",
  
  // Development
  "python": "https://www.python.org/",
  "pandas": "https://pandas.pydata.org/",
  "fastapi": "https://fastapi.tiangolo.com/",
  "streamlit": "https://streamlit.io/",
  "javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "typescript": "https://www.typescriptlang.org/",
  "next.js": "https://nextjs.org/",
  "supabase": "https://supabase.com/",
  
  // No-code / Creative
  "canva": "https://www.canva.com/",
  "adobe firefly": "https://www.adobe.com/products/firefly.html",
  "runwayml": "https://runwayml.com/",
  
  // Chat & Bots
  "chatgpt": "https://chat.openai.com/",
  "voiceflow": "https://www.voiceflow.com/",
  "rasa": "https://rasa.com/",
  "typeform": "https://www.typeform.com/",
  
  // AR/VR
  "unity": "https://unity.com/",
  
  // Automation
  "uipath": "https://www.uipath.com/",
  "blue prism": "https://www.blueprism.com/",
  "power automate": "https://powerautomate.microsoft.com/",
  
  // AI Assistants
  "dialogflow": "https://cloud.google.com/dialogflow",
  
  // Workflow
  "camunda": "https://camunda.com/",
  "apache airflow": "https://airflow.apache.org/",
  "n8n": "https://n8n.io/",
  
  // RPA
  "automation anywhere": "https://www.automationanywhere.com/",
  "robocorp": "https://robocorp.com/",
  
  // Infrastructure
  "kubernetes": "https://kubernetes.io/",
  "docker": "https://www.docker.com/",
};

export const TechStackBadge = ({ name, className = "" }: TechStackBadgeProps) => {
  const normalizedName = name.toLowerCase().trim();
  const url = techUrls[normalizedName];

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Badge
      variant="outline"
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 cursor-pointer
        hover:bg-primary/10 hover:border-primary/50 transition-all duration-200
        ${url ? 'hover:shadow-sm' : 'cursor-default opacity-70'}
        ${className}
      `}
      onClick={handleClick}
    >
      <span className="text-sm font-medium">{name}</span>
      {url && <ExternalLink className="w-3 h-3 opacity-70" />}
    </Badge>
  );
};
