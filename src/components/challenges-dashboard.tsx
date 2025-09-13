"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  NodeTypes,
  Handle,
  Position,
} from "@xyflow/react";
import { challenges } from "@/lib/consts";
import { Challenge } from "@/lib/types";
import { ChallengeDetailsDialog } from "./challenges/challenge-details-dialog";
import { ChallengesMobile } from "./challenges/challenges-mobile";
import "@xyflow/react/dist/style.css";

// Custom Challenge Node Component
const ChallengeNode = ({
  data,
}: {
  data: {
    challenge: Challenge;
    onChallengeClick: (challenge: Challenge) => void;
    isUserTeamChallenge?: boolean;
  };
}) => {
  const { challenge, onChallengeClick, isUserTeamChallenge } = data;
  const IconComponent = challenge.icon;

  // Cycle through theme gradient borders based on challenge ID
  const getThemeGradient = (id: number) => {
    const colorIndex = id % 3;
    switch (colorIndex) {
      case 0:
        return {
          borderGradient: "linear-gradient(45deg, #FE8BBB, #9E7AFF)",
          glow: "#FE8BBB",
        };
      case 1:
        return {
          borderGradient: "linear-gradient(45deg, #9E7AFF, #262626)",
          glow: "#9E7AFF",
        };
      default:
        return {
          borderGradient: "linear-gradient(45deg, #262626, #FE8BBB)",
          glow: "#262626",
        };
    }
  };

  const gradientColors = getThemeGradient(challenge.id);

  // Alternate between two different floating animations for variety
  const floatClass =
    challenge.id % 2 === 0
      ? "challenge-node-float"
      : "challenge-node-float-delayed";

  return (
    <div
      className={`relative group cursor-pointer ${floatClass}`}
      onClick={() => onChallengeClick(challenge)}
    >
      {/* Connection handle for incoming edges */}
      <Handle
        type="target"
        position={Position.Top}
        className="!opacity-0 !w-1 !h-1"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />

      {/* Glowing background effect */}
      <div
        className="absolute inset-0 w-32 h-32 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
        style={{ backgroundColor: `${gradientColors.glow}30` }}
      />

      {/* Gradient border container */}
      <div
        className="relative w-32 h-32 rounded-full p-[2px] transition-all duration-300 hover:scale-105"
        style={{
          background: gradientColors.borderGradient,
          boxShadow: `0 4px 20px ${gradientColors.glow}40`,
        }}
      >
        {/* Main circular container with neutral background */}
        <div className="w-full h-full rounded-full bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          {/* Challenge icon */}
          <div className="flex flex-col items-center gap-1">
            <div className="p-2 rounded-full bg-muted/20">
              <IconComponent className="h-6 w-6 text-foreground/80" />
            </div>

            {/* Challenge label */}
            <div className="text-center">
              <div
                className="text-[10px] font-semibold text-foreground/70"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {challenge.category.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Central Hub Node Component
const HubNode = () => {
  return (
    <div className="relative group">
      {/* Single central connection handle */}
      <Handle
        type="source"
        position={Position.Top}
        id="center"
        className="!opacity-0 !w-1 !h-1"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />

      {/* Animated glow rings */}
      <div
        className="absolute inset-0 w-full h-full rounded-full animate-pulse"
        style={{ backgroundColor: "#9E7AFF20" }}
      />

      {/* Gradient border container */}
      <div
        className="relative w-full h-full rounded-full p-[3px] transition-transform duration-300 hover:scale-105"
        style={{
          background: "linear-gradient(45deg, #9E7AFF, #FE8BBB, #262626)",
          boxShadow: "0 4px 20px #9E7AFF40",
        }}
      >
        {/* Main hub with logo */}
        <div className="w-full h-full rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
          <img
            src="/zain-icon.png"
            alt="zain Logo"
            className="w-12 h-12 object-contain"
            onError={(e) => {
              // Fallback if logo doesn't exist
              e.currentTarget.style.display = "none";
              const nextElement = e.currentTarget
                .nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = "block";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Custom node types
const nodeTypes: NodeTypes = {
  challenge: ChallengeNode,
  hub: HubNode,
};

// Initial nodes setup - now takes challenges with counts as parameter
const createInitialNodes = (challengesData: Challenge[]): Node[] => {
  const hubNode: Node = {
    id: "hub",
    type: "hub",
    position: { x: 400, y: 300 },
    data: {},
    draggable: true,
  };

  const challengeNodes: Node[] = challengesData.map((challenge, index) => {
    // Position nodes in a circle around the hub
    const angle = (index * 2 * Math.PI) / challengesData.length;
    const radius = 180; // Reduced radius for shorter connections
    const x = 400 + radius * Math.cos(angle);
    const y = 300 + radius * Math.sin(angle);

    return {
      id: `challenge-${challenge.id}`,
      type: "challenge",
      position: { x: x - 75, y: y - 75 }, // Center the node
      data: { challenge },
      draggable: true,
    };
  });

  return [hubNode, ...challengeNodes];
};

// Initial edges setup
const createInitialEdges = (): Edge[] => {
  return challenges.map((challenge) => ({
    id: `hub-to-${challenge.id}`,
    source: "hub",
    sourceHandle: "center",
    target: `challenge-${challenge.id}`,
    type: "straight",
    animated: true,
    style: {
      strokeDasharray: "8,4",
      strokeWidth: 2,
      stroke: "#9E7AFF",
      opacity: 0.7,
    },
  }));
};

export const ChallengesDashboard = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    createInitialNodes(challenges)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(createInitialEdges());

  // Handle challenge node clicks
  const handleChallengeClick = useCallback((challenge: Challenge) => {
    setSelectedChallenge(challenge);
  }, []);

  // Update node data with click handler
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "challenge") {
          return {
            ...node,
            data: {
              ...node.data,
              onChallengeClick: handleChallengeClick,
              isUserTeamChallenge: false,
            },
          };
        }
        return node;
      })
    );
  }, [handleChallengeClick, setNodes]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (isMobile) {
    return <ChallengesMobile />;
  }

  return (
    <div className="w-full bg-muted/50 h-screen p-12">
      {/* React Flow Constellation */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-muted/30 min-w-full min-h-full"
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={50} size={1} className="opacity-40" />
      </ReactFlow>

      {/* Challenge Details Dialog */}
      <ChallengeDetailsDialog
        selectedChallenge={selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
      />
    </div>
  );
};
