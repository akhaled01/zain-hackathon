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
              <Card>
                <CardHeader>
                  <CardTitle>Your Team</CardTitle>
                  <CardDescription>You are currently part of a team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Team Name</Label>
                    <p className="text-lg font-medium">{userTeam.name}</p>
                  </div>
                  <div>
                    <Label>Team Code</Label>
                    <p className="text-lg font-mono bg-muted px-3 py-2 rounded-md inline-block">
                      {userTeam.teamCode}
                    </p>
                  </div>
                </CardContent>
              </Card>
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
