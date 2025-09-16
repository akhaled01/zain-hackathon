"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomBadge } from "@/components/global/custom-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Search,
  Trophy,
  Users,
  Clock
} from "lucide-react";
import { challenges } from "@/lib/consts";
import { ScoringDialog } from "./scoring-dialog";

import { SubmissionWithTeam, CriteriaScores } from "@/lib/types";

interface SubmissionsTableProps {
  submissions: SubmissionWithTeam[];
  onSubmitScore?: (submissionId: string, scores: CriteriaScores, totalScore: number) => Promise<void>;
  isLoading?: boolean;
}

export function SubmissionsTable({ 
  submissions, 
  onSubmitScore,
  isLoading = false 
}: SubmissionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [scoringDialogOpen, setScoringDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithTeam | null>(null);
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);

  // Handle opening scoring dialog
  const handleJudgeSubmission = (submission: SubmissionWithTeam) => {
    setSelectedSubmission(submission);
    setScoringDialogOpen(true);
  };

  // Handle score submission
  const handleSubmitScore = async (submissionId: string, scores: CriteriaScores, totalScore: number) => {
    if (!onSubmitScore) return;
    
    setIsSubmittingScore(true);
    try {
      await onSubmitScore(submissionId, scores, totalScore);
    } finally {
      setIsSubmittingScore(false);
    }
  };

  // Enhance submissions with additional data
  const enhancedSubmissions = useMemo(() => {
    return submissions.map(submission => {
      const challenge = challenges.find(c => c.id === submission.challengeId);
      const judgeCount = submission.judgements?.length || 0;
      const totalJudges = 3; // Assuming 3 judges per submission
      
      let status: "pending" | "in-progress" | "completed" = "pending";
      if (judgeCount === totalJudges) {
        status = "completed";
      } else if (judgeCount > 0) {
        status = "in-progress";
      }

      return {
        ...submission,
        challengeName: challenge?.title || `Challenge ${submission.challengeId}`,
        judgeCount,
        status,
      };
    });
  }, [submissions]);

  const columns: ColumnDef<SubmissionWithTeam>[] = useMemo(
    () => [
      {
        accessorKey: "team.name",
        header: "Team Name",
        cell: ({ row }) => {
          const teamName = row.original.team?.name || "Unknown Team";
          const memberCount = row.original.team?.members?.length || 0;
          return (
            <div className="flex flex-col">
              <span className="font-medium">{teamName}</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                {memberCount} member{memberCount !== 1 ? 's' : ''}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "challengeName",
        header: "Challenge",
        cell: ({ row }) => {
          const challenge = challenges.find(c => c.id === row.original.challengeId);
          return (
            <div className="flex flex-col">
              <span className="font-medium">{row.getValue("challengeName")}</span>
              <span className="text-sm text-muted-foreground">
                {challenge?.category || "Unknown Category"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          const judgeCount = row.original.judgeCount || 0;
          const totalJudges = 3;
          
          const statusConfig = {
            pending: { 
              label: "Pending", 
              variant: "warning" as const,
              icon: Clock 
            },
            "in-progress": { 
              label: `${judgeCount}/${totalJudges} Judged`, 
              variant: "info" as const,
              icon: Clock 
            },
            completed: { 
              label: "Completed", 
              variant: "success" as const,
              icon: Trophy 
            },
          };
          
          const config = statusConfig[status as keyof typeof statusConfig];
          const Icon = config.icon;
          
          return (
            <CustomBadge variant={config.variant} className="flex items-center gap-1 w-fit">
              <Icon className="h-3 w-3" />
              {config.label}
            </CustomBadge>
          );
        },
      },
      {
        accessorKey: "finalScore",
        header: "Score",
        cell: ({ row }) => {
          const score = row.getValue("finalScore") as number;
          const status = row.original.status;
          
          if (status !== "completed") {
            return <span className="text-muted-foreground">-</span>;
          }
          
          return (
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium">{score.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          );
        },
      },
      {
        accessorKey: "_creationTime",
        header: "Submitted",
        cell: ({ row }) => {
          const timestamp = row.getValue("_creationTime") as number;
          const date = new Date(timestamp);
          return (
            <div className="flex flex-col">
              <span className="text-sm">{date.toLocaleDateString()}</span>
              <span className="text-xs text-muted-foreground">
                {date.toLocaleTimeString()}
              </span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const submission = row.original;
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleJudgeSubmission(submission)}
                disabled={submission.status === "completed"}
              >
                <Trophy className="h-4 w-4 mr-1" />
                Judge
              </Button>
            </div>
          );
        },
      },
    ],
    [handleJudgeSubmission]
  );

  const table = useReactTable({
    data: enhancedSubmissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Submissions ({enhancedSubmissions.length})</span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No submissions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Scoring Dialog */}
      <ScoringDialog
        open={scoringDialogOpen}
        onOpenChange={setScoringDialogOpen}
        submission={selectedSubmission}
        onSubmitScore={handleSubmitScore}
        isSubmitting={isSubmittingScore}
      />
    </Card>
  );
}