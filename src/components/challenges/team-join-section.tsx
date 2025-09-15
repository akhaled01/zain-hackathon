"use client";

import { useConvexTeamFuncs } from "@/lib/hooks/convex/teams";
import { useUserConvexFuncs } from "@/lib/hooks/convex/users";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomBadge } from "@/components/global/custom-badge";
import { Users, Crown, Copy, Check, ExternalLink } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  createTeamSchema,
  joinTeamSchema,
  CreateTeamForm,
  JoinTeamForm,
} from "@/lib/zod";

export const TeamJoinSection = ({ challengeId }: { challengeId: number }) => {
  // State for team creation/joining
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Form setup with Zod validation
  const createForm = useForm<CreateTeamForm>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      teamName: "",
    },
  });

  const joinForm = useForm<JoinTeamForm>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: {
      teamCode: "",
    },
  });

  const { getUserByClerkId } = useUserConvexFuncs();

  const convexUserResponse = getUserByClerkId;
  const convexUser = convexUserResponse?.success
    ? convexUserResponse.data
    : null;

  const { getTeamByUser, createTeam, joinTeam } = useConvexTeamFuncs(undefined, convexUser?._id);

  const userTeamResponse = getTeamByUser;
  const userTeam = userTeamResponse?.success ? userTeamResponse.data : null;

  const handleCreateTeam = async (data: CreateTeamForm) => {
    setIsLoading(true);
    try {
      await createTeam({ name: data.teamName, challengeId: challengeId, creatorId: convexUser?._id });
      createForm.reset();
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinTeam = async (data: JoinTeamForm) => {
    setIsLoading(true);
    try {
      await joinTeam({ teamCode: data.teamCode, userId: convexUser?._id });
      joinForm.reset();
    } catch (error) {
      console.error("Error joining team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyTeamCode = async () => {
    if (userTeam?.teamCode) {
      await navigator.clipboard.writeText(userTeam.teamCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const isCreator = convexUser?._id === userTeam?.creatorId;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="team-management">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold cursor-pointer">Team Management</h2>
              {userTeam && (
                <span className="text-sm text-muted-foreground">
                  ({userTeam.name})
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {userTeam ? (
              <div className="space-y-6">
                {/* Team Header Card */}
                <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-foreground">
                            {userTeam.name}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {userTeam.members.length + 1} member{userTeam.members.length !== 0 ? 's' : ''}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCreator && (
                          <CustomBadge variant="info" className="flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            Creator
                          </CustomBadge>
                        )}
                        <CustomBadge 
                          variant={userTeam.confirmed ? "success" : "warning"}
                          className="text-sm"
                        >
                          {userTeam.confirmed ? "Confirmed" : "Pending"}
                        </CustomBadge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {!userTeam.confirmed && (
                    <CardContent className="pt-0">
                      <div className="bg-background/50 rounded-lg p-4 border">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                              Team Code
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="font-mono bg-muted/80 border px-3 py-2 rounded-md text-lg font-bold tracking-wider">
                                {userTeam.teamCode}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyTeamCode}
                                className="h-9 w-9 p-0 hover:bg-muted/80"
                                title="Copy team code"
                              >
                                {copiedCode ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Share this code with teammates
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Code expires when team is confirmed
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Team Actions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5" />
                      Team Dashboard
                    </CardTitle>
                    <CardDescription>
                      Manage your team, view members, and track progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => window.location.href = '/dashboard/team'}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Go to Team Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  You are not part of any team yet. Create a new team or join an
                  existing one.
                </p>

                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                  <Button
                    variant={activeTab === "create" ? "default" : "ghost"}
                    className="flex-1"
                    onClick={() => setActiveTab("create")}
                  >
                    Create Team
                  </Button>
                  <Button
                    variant={activeTab === "join" ? "default" : "ghost"}
                    className="flex-1"
                    onClick={() => setActiveTab("join")}
                  >
                    Join Team
                  </Button>
                </div>

                {/* Create Team Tab */}
                {activeTab === "create" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Team</CardTitle>
                      <CardDescription>
                        Start a new team for your hackathon project
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <form
                        onSubmit={createForm.handleSubmit(handleCreateTeam)}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="team-name">Team Name</Label>
                          <Input
                            id="team-name"
                            placeholder="Enter your team name"
                            {...createForm.register("teamName")}
                          />
                          {createForm.formState.errors.teamName && (
                            <p className="text-sm text-destructive">
                              {createForm.formState.errors.teamName.message}
                            </p>
                          )}
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                          {isLoading ? "Creating..." : "Create Team"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Join Team Tab */}
                {activeTab === "join" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Join Existing Team</CardTitle>
                      <CardDescription>
                        Enter the 6-digit team code to join a team
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <form
                        onSubmit={joinForm.handleSubmit(handleJoinTeam)}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="team-code">Team Code</Label>
                          <div className="flex justify-center">
                            <InputOTP
                              maxLength={6}
                              value={joinForm.watch("teamCode")}
                              onChange={(value) =>
                                joinForm.setValue("teamCode", value.toUpperCase())
                              }
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                          {joinForm.formState.errors.teamCode && (
                            <p className="text-sm text-destructive text-center">
                              {joinForm.formState.errors.teamCode.message}
                            </p>
                          )}
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                          {isLoading ? "Joining..." : "Join Team"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
