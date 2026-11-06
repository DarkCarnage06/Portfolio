import React from "react";
import {
  SiPython,
  SiTensorflow,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
  SiScikitlearn,
} from "react-icons/si";
import { Cpu, Database } from "lucide-react";

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = "w-5 h-5",
  size = 20,
  color,
}) => {
  const normalized = name.toLowerCase().replace(/[\s\/\-\.]/g, "");

  switch (normalized) {
    case "python":
      return <SiPython size={size} color={color || "#3776AB"} className={className} />;
    case "tensorflow":
      return <SiTensorflow size={size} color={color || "#FF6F00"} className={className} />;
    case "react":
      return <SiReact size={size} color={color || "#61DAFB"} className={className} />;
    case "nextjs":
    case "next":
      return <SiNextdotjs size={size} color={color || "#FFFFFF"} className={className} />;
    case "nodejs":
    case "node":
      return <SiNodedotjs size={size} color={color || "#5FA04E"} className={className} />;
    case "postgresql":
    case "postgres":
      return <SiPostgresql size={size} color={color || "#4169E1"} className={className} />;
    case "git":
      return <SiGit size={size} color={color || "#F05032"} className={className} />;
    case "scikitlearn":
    case "sklearn":
      return <SiScikitlearn size={size} color={color || "#F7931E"} className={className} />;
    case "ml":
    case "machinelearning":
      return <Cpu size={size} color={color || "#A855F7"} className={className} />;
    case "rag":
    case "database":
    case "pgvector":
      return <Database size={size} color={color || "#38BDF8"} className={className} />;
    default:
      return <Cpu size={size} color={color || "#7C6CFF"} className={className} />;
  }
};

