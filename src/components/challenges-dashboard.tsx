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
        className={`absolute inset-0 w-32 h-32 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse ${
          isUserTeamChallenge ? "bg-primary/30" : "bg-white/20"
        }`}
      />

      {/* Main circular container */}
      <div
        className={`relative w-32 h-32 rounded-full bg-background/80 backdrop-blur-sm border-2 transition-all duration-300 flex flex-col items-center justify-center p-4 ${
          isUserTeamChallenge
            ? "border-primary/60 hover:border-primary shadow-lg shadow-primary/20"
            : "border-white/60 hover:border-white/80"
        }`}
      >
        {/* Challenge icon */}
        <div className="flex flex-col items-center gap-1">
          <div
            className={`p-2 rounded-full ${
              isUserTeamChallenge ? "bg-primary/20" : "bg-white/20"
            }`}
          >
            <IconComponent
              className={`h-6 w-6 ${
                isUserTeamChallenge ? "text-primary" : "text-white/60"
              }`}
            />
          </div>

          {/* Challenge label */}
          <div className="text-center">
            <div
              className={`text-[10px] font-semibold ${
                isUserTeamChallenge ? "text-primary" : "text-white/60"
              }`}
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              {challenge.category.toUpperCase()}
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
      <div className="absolute inset-0 w-full h-full bg-primary/10 rounded-full animate-pulse" />

      {/* Main hub with logo */}
      <div className="relative bg-transparent backdrop-blur-sm rounded-full p-4 border-1 border-primary/50 w-full h-full flex items-center justify-center">
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
    draggable: false,
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
      draggable: false,
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
      strokeWidth: 1,
      stroke: "#14b8a6",
      opacity: 0.8,
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

  // Add periodic glow effect to edges
  useEffect(() => {
    const interval = setInterval(() => {
      setEdges((eds) =>
        eds.map((edge) => {
          return {
            ...edge,
            style: {
              ...edge.style,
              stroke: "#f8fafc",
              opacity: Math.random() > 0.5 ? 0.9 : 0.6,
              filter:
                Math.random() > 0.7 ? `drop-shadow(0 0 8px #64748b)` : "none",
            },
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [setEdges]);

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
