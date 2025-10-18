/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import {
  Deployment,
  DeploymentStep,
  TerraformCommandResponse,
  TerraformPlanResponse,
  TerraformApplyResponse,
} from "@/types/deployment.types";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import DestroyConfirmationModal from "@/components/DestroyConfirmationModal/DestroyConfirmationModal";
import {
  terraformInit,
  terraformPlan,
  terraformPlanDeny,
  terraformApply,
  terraformDestroy,
} from "@/services/deployements/deploymentService";

interface AccordionItemProps {
  title: string;
  status?: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, status, children, defaultOpen = false }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  // keep open state in sync if parent controls defaultOpen
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className="rounded-md overflow-hidden mb-3 bg-[#000000] w-full border-t border-[#27272A]">
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-medium text-sm">{title}</span>
        <div className="flex items-center gap-2 ml-2">
          {status}
          <ChevronDown
            className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
            size={16}
            color="#A1A1AA"
          />
        </div>
      </div>

      {open && <div className="mx-4 border-t border-[#27272A]"></div>}

      {open && (
        <div className="px-4 py-2 max-h-64 overflow-auto text-sm scrollbar-custom">
          {children}
        </div>
      )}
    </div>
  );
};

const StatusBadge: React.FC<{ label: string; color: string; bg: string; title?: string }> = ({
  label,
  color,
  bg,
  title,
}) => (
  <div
    className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium"
    style={{ backgroundColor: bg }}
    title={title}
  >
    <span className="w-2 h-2 rounded-md" style={{ backgroundColor: color }}></span>
    <span style={{ color }}>{label}</span>
  </div>
);

const renderColoredMessage = (message?: string, stepName?: string) => {
  if (!message) return null;
  const lines = message.split("\n");
  let lastColor = "#FFFFFF";
  let errorMode = false;

  return lines.map((line, idx) => {
    if (line.trim().toLowerCase().startsWith("error")) {
      errorMode = true;
    }

    let color = "#FFFFFF";
    if (errorMode) {
      color = "#F87171";
    } else {
      if (stepName === "init") {
        if (line.trim().startsWith("+") || line.trim().startsWith("-")) color = "#3B82F6";
      } else {
        if (line.trim().startsWith("+")) color = "#00B15C";
        else if (line.trim().startsWith("-")) color = "#F87171";
        else if (line.trim() === "}" && idx > 0) {
          const prevLine = lines[idx - 1]?.trim();
          if (prevLine?.startsWith("+") || prevLine?.startsWith("-")) color = lastColor;
        }
      }
    }
    if (color !== "#FFFFFF") lastColor = color;

    return (
      <div
        key={idx}
        className="text-[0.7rem]"
        style={{ color, whiteSpace: "pre-wrap", fontFamily: "monospace" }}
      >
        {line}
      </div>
    );
});
}

interface TerraformAccordionsProps {
  deployment: Deployment | null;
  projectId?: string;
  spaceId?: string;
}

const TerraformAccordions: React.FC<TerraformAccordionsProps> = ({ deployment, projectId, spaceId }) => {
  const [steps, setSteps] = useState<DeploymentStep[]>(deployment?.steps || []);
  const [loadingSteps, setLoadingSteps] = useState<Record<string, boolean>>({});
  const [initDeploymentId, setInitDeploymentId] = useState<string | null>(null);
  const [initDeploymentName, setInitDeploymentName] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [dots, setDots] = useState(".");
  const [isDestroyModalOpen, setIsDestroyModalOpen] = useState(false);
  const [showDestroyAccordion, setShowDestroyAccordion] = useState(false);
  const [isDestroyClicked, setIsDestroyClicked] = useState(false);

  // Prevent multiple approve/deny clicks for the same plan until a new plan is produced
  const [planActionTaken, setPlanActionTaken] = useState(false);
  // disable approve action while apply is running (prevents double-click)
  const [planActionClicked, setPlanActionClicked] = useState(false);

  const stepNames = ["init", "plan", "apply", "destroy"];

  const getStepStatus = (step?: DeploymentStep) => {
    if (!step) return { label: "Pending", color: "#F5A623", bg: "#F5A62333" };
    if (step.stepStatus === "in_progress") return { label: "In Progress", color: "#3B82F6", bg: "#3B82F633" };
    // cancelled -> orange theme (keep special handling for destroy)
    if (step.stepStatus === "cancelled") {
      // For destroy step, show failed instead of "Cancelled"
      if (step.step === "destroy") return { label: "Failed", color: "#F87171", bg: "#F8717133" };
      return { label: "Cancelled", color: "#F97316", bg: "#F9731633" }; // orange theme
    }
    // For destroy step, show Terminated instead of Completed
    if (step.step === "destroy" && step.stepStatus === "successful") return { label: "Terminated", color: "#9CA3AF", bg: "#9CA3AF33" };
    if (step.stepStatus === "successful") return { label: "Completed", color: "#00B15C", bg: "#00B15C33" };
    if (step.stepStatus === "failed") return { label: "Failed", color: "#F87171", bg: "#F8717133" };
    return { label: "Pending", color: "#F5A623", bg: "#F5A62333" };
  };

  const runStep = async (stepName: string, deploymentIdOverride?: string) => {
    setLoadingSteps((prev) => ({ ...prev, [stepName]: true }));

    setSteps((prev) => {
      const filtered = prev.filter((s) => s.step !== stepName);
      return [
        ...filtered,
        {
          _id: `${stepName}-inprogress`,
          step: stepName,
          stepStatus: "in_progress",
          message: "Running...",
          timestamp: new Date().toISOString(),
        },
      ];
    });

    let response:
      | TerraformCommandResponse
      | TerraformPlanResponse
      | TerraformApplyResponse;
    let deploymentIdFromResponse = "";

    try {
      if (stepName === "init") {
        response = await terraformInit(
          (deployment?.projectId ?? projectId) || "",
          (deployment?.spaceId ?? spaceId) || "",
          (deployment?.deploymentId ?? deployment?._id) || null
        );
        if (response && typeof response === "object" && "deploymentId" in response) {
          deploymentIdFromResponse = response.deploymentId;
          setInitDeploymentId(response.deploymentId);
        } else {
          deploymentIdFromResponse = (deployment?.spaceId ?? spaceId) || "";
          setInitDeploymentId(deploymentIdFromResponse);
        }
        if (response && typeof response === "object" && "deploymentName" in response) {
          setInitDeploymentName(response.deploymentName);
        }
      } else if (stepName === "plan") {
        response = await terraformPlan(
          (deployment?.projectId ?? projectId) || "",
          (deployment?.spaceId ?? spaceId) || "",
          deploymentIdOverride || initDeploymentId || (deployment?.deploymentId ?? deployment?._id) || ""
        );
      } else if (stepName === "apply") {
        response = await terraformApply(
          (deployment?.projectId ?? projectId) || "",
          (deployment?.spaceId ?? spaceId) || "",
          deploymentIdOverride || initDeploymentId || (deployment?.deploymentId ?? deployment?._id) || ""
        );
      } else if (stepName === "destroy") {
        response = await terraformDestroy(
          (deployment?.projectId ?? projectId) || "",
          (deployment?.spaceId ?? spaceId) || "",
          deploymentIdOverride || initDeploymentId || (deployment?.deploymentId ?? deployment?._id) || ""
        );
      } else throw new Error("Unknown step");

      let message = "";
      if (stepName === "plan" && response && typeof response === "object" && "rawFormat" in response) {
        message = response.rawFormat || "";
      } else if (response && typeof response === "object" && "stdout" in response) {
        message = response.stdout || "";
      }

      const stepObj: DeploymentStep = {
        _id: `${stepName}-generated`,
        step: stepName,
        stepStatus: "successful",
        message,
        timestamp: new Date().toISOString(),
      };

      // If this was a newly produced plan, allow actions again
      if (stepName === "plan") {
        setPlanActionTaken(false);
      }

      setSteps((prev) => {
        const filtered = prev.filter((s) => s.step !== stepName);
        return [...filtered, stepObj];
      });

      if (stepName === "init" && !deployment) {
        setLoadingSteps((prev) => ({ ...prev, [stepName]: false }));
        await runStep("plan", deploymentIdFromResponse);
      }
    } catch (err) {
      console.error(err);
      let errorMessage = "Unknown error";
      if (typeof err === "object" && err !== null) {
        const e = err as { response?: { data?: { error?: unknown } } };
        const apiError = e.response?.data?.error;
        if (typeof apiError === "string") {
          errorMessage = apiError;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      const failedStep: DeploymentStep = {
        _id: `${stepName}-generated`,
        step: stepName,
        stepStatus: "failed",
        message: errorMessage,
        timestamp: new Date().toISOString(),
      };
      setSteps((prev) => {
        const filtered = prev.filter((s) => s.step !== stepName);
        return [...filtered, failedStep];
      });
    } finally {
      setLoadingSteps((prev) => ({ ...prev, [stepName]: false }));
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (deployment) {
      setSteps(deployment.steps);
    }
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "....") return ".";
        if (prev === "...") return "....";
        if (prev === "..") return "...";
        if (prev === ".") return "..";
        return ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleApprove = async () => {
    // mark that an action was taken for this plan to disable further approve/deny until a new plan arrives
    if (planActionTaken) return;
    setPlanActionTaken(true);
    // prevent double-click during apply
    if (planActionClicked || loadingSteps["apply"]) return;
    setPlanActionClicked(true);
    try {
      await runStep("apply");
    } finally {
      setPlanActionClicked(false);
    }
  };

  const handleDeny = async () => {
    // disable plan buttons while denying
    setLoadingSteps((prev) => ({ ...prev, plan: true }));
    // mark action taken to prevent re-clicks
    setPlanActionTaken(true);
    try {
      const deploymentId = initDeploymentId || (deployment?.deploymentId ?? deployment?._id) || "";
      const response = await terraformPlanDeny(
        (deployment?.projectId ?? projectId) || "",
        (deployment?.spaceId ?? spaceId) || "",
        deploymentId
      );

      const message =
        (response && typeof response === "object" && ("stdout" in response ? response.stdout : (response as any).message)) ||
        JSON.stringify(response || {});

      const cancelledStep: DeploymentStep = {
        _id: `plan-cancelled-${Date.now()}`,
        step: "plan",
        stepStatus: "cancelled",
        message: message,
        timestamp: new Date().toISOString(),
      };

      setSteps((prev) => {
        const filtered = prev.filter((s) => s.step !== "plan");
        return [...filtered, cancelledStep];
      });
    } catch (err) {
      console.error("Deny failed", err);
      const errMsg = (err && typeof err === "object" && (err as any).response?.data?.error) || (err instanceof Error ? err.message : "Unknown error");
      const failedStep: DeploymentStep = {
        _id: `plan-failed-${Date.now()}`,
        step: "plan",
        stepStatus: "failed",
        message: errMsg,
        timestamp: new Date().toISOString(),
      };
      setSteps((prev) => {
        const filtered = prev.filter((s) => s.step !== "plan");
        return [...filtered, failedStep];
      });
    } finally {
      setLoadingSteps((prev) => ({ ...prev, plan: false }));
    }
  };

  const handleReload = () => {
    setSteps([]);
    setInitDeploymentId(null);
    setInitDeploymentName(null);
    setStartedAt(null);
    // hide any destroy UI when redeploying
    setShowDestroyAccordion(false);
    setIsDestroyClicked(false);
    setIsDestroyModalOpen(false);
    runStep("init");
    setStartedAt(new Date().toISOString());
  };

  const handleDestroyClick = () => {
    // open the destroy accordion with an initial warning message
    setShowDestroyAccordion(true);
    // mark clicked so approve button is disabled once user clicks it (until action completes)
    setIsDestroyClicked(false);
  };

  const handleDestroyConfirm = async () => {
    // prevent double confirm clicks by using loadingSteps flag
    if (loadingSteps["destroy"]) return;
    setLoadingSteps((prev) => ({ ...prev, destroy: true }));
    try {
      await runStep("destroy");
    } finally {
      setLoadingSteps((prev) => ({ ...prev, destroy: false }));
      setIsDestroyModalOpen(false);
      // keep destroy accordion hidden after running
      setShowDestroyAccordion(false);
      setIsDestroyClicked(false);
    }
  };

  const handleDestroyCancel = () => {
    setIsDestroyModalOpen(false);
  };

  const allSuccessful = stepNames.every((stepName) => {
    const step = steps.find((s) => s.step === stepName);
    return step && step.stepStatus === "successful";
  });

  if (!isClient) return null;

  // find the apply step once so it's available in the header and accordion rendering
  const applyStep = steps.find((s) => s.step === "apply");

  return (
    <div className="w-full h-full max-h-screen mx-auto p-6 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white text-2xl font-semibold">{deployment?.deploymentName || initDeploymentName || "New Deployment"}</h2>
        <div className="ml-4 flex items-center gap-2">
          {/* Move Destroy button next to Deploy button (left side) */}
          {applyStep?.stepStatus === "successful" && (
            <PrimaryButton
              onClick={() => {
                // ensure destroy UI is reset when user opens destroy flow
                setShowDestroyAccordion(true);
                setIsDestroyClicked(false);
                setIsDestroyModalOpen(false);
              }}
               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
               disabled={loadingSteps["destroy"]}
             >
               Destroy
             </PrimaryButton>
           )}
          {!deployment && (
            <PrimaryButton
              onClick={() => {
                setStartedAt(new Date().toISOString());
                runStep("init");
              }}
              className="w-auto px-6 py-2 text-sm font-semibold cursor-pointer"
            >
              Deploy
            </PrimaryButton>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center justify-start gap-2 bg-[#09090B] border border-[#27272A] rounded-md px-4 py-2 text-gray-300 text-sm">
          <span>{deployment?.projectId || projectId}</span>
          <span>•</span>
          <span>Deployment ID: {deployment?.deploymentId || initDeploymentId || "_____-_____-_____-_____"}</span>
          <span>•</span>
          <span>
            Started: {(startedAt || deployment?.startedAt)
              ? new Date(startedAt ?? deployment?.startedAt ?? "").toISOString().replace('T', ' ').slice(0, -5)
              : "N/A"}
          </span>
        </div>
        <button
          onClick={handleReload}
          className="w-8 h-8 bg-[#CD9C20] hover:bg-[#E5B040] rounded-md flex items-center justify-center transition-colors cursor-pointer"
          title="Reload Deployment"
        >
          <RotateCcw size={16} color="black" />
        </button>
      </div>

      <div className="w-full mx-auto mt-4 rounded-md bg-[#09090B] flex-1 overflow-auto">
        {stepNames.map((stepName) => {
          const step = steps.find((s) => s.step === stepName);
          const status = loadingSteps[stepName]
            ? { label: "In Progress", color: "#3B82F6", bg: "#3B82F633" }
            : getStepStatus(step);
          const planStep = steps.find((s) => s.step === "plan");
          // const applyStep = steps.find((s) => s.step === "apply"); // removed duplicate

          // show destroy accordion when user clicked Destroy OR when a destroy step already exists
          if (stepName === "destroy" && !showDestroyAccordion && !step) {
            return null;
          }

          return (
            <AccordionItem
              key={stepName}
              title={`Terraform ${stepName.charAt(0).toUpperCase() + stepName.slice(1)}`}
              defaultOpen={true}
              status={
                <div className="flex items-center gap-2">
                  {/* removed inline destroy button from accordion status (moved to header) */}
                  <StatusBadge label={status.label} color={status.color} bg={status.bg} title={status.label === "Failed" ? step?.message : undefined} />
                </div>
              }
            >
              {/* Destroy initial message shown when user opened destroy accordion but destroy step not yet present */}
              {stepName === "destroy" && showDestroyAccordion && !step && (
                <div className="mb-3 text-sm text-gray-300">
                  This action will terminate the deployed resources and cannot be undone. All running infrastructure associated with this deployment will be destroyed.
                </div>
              )}
              {step?.stepStatus === "in_progress" ? (
                <div className="text-white">
                  <span>Running{dots}</span>
                </div>
              ) : (
                renderColoredMessage(step?.message, stepName)
              )}

              {/* PLAN: show Approve/Deny only when plan is successful */}
              {stepName === "plan" && planStep?.stepStatus === "successful" && !allSuccessful && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (planActionTaken || planActionClicked || loadingSteps["apply"]) return;
                      setPlanActionTaken(true); // immediate guard
                      setPlanActionClicked(true);
                      handleApprove();
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={allSuccessful || loadingSteps["plan"] || planActionTaken || planActionClicked || loadingSteps["apply"]}
                  >
                    Approve
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (planActionTaken || loadingSteps["plan"]) return;
                      setPlanActionTaken(true);
                      handleDeny();
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loadingSteps["plan"] || planActionTaken || planActionClicked || loadingSteps["apply"]}
                  >
                    Deny
                  </button>
                </div>
              )}

              {/* DESTROY: only show Approve/Cancel BEFORE a destroy step exists (pre-action). Once a destroy step is present (successful/failed/cancelled) controls are hidden */}
              {stepName === "destroy" && !step && showDestroyAccordion && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // mark clicked so user can't click approve twice before modal opens
                      setIsDestroyClicked(true);
                      // open confirmation modal — actual destroy runs on modal confirm
                      setIsDestroyModalOpen(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                    disabled={loadingSteps["destroy"] || isDestroyClicked}
                  >
                    Approve Destroy
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDestroyAccordion(false);
                      setIsDestroyClicked(false);
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                    disabled={loadingSteps["destroy"]}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </AccordionItem>
          );
        })}
      </div>

      {/*
        Optional: keep legacy modal if needed. It's left here but not used when
        user opens destroy via the header button. If you prefer to remove it,
        you can delete the component below.
      */}
      <DestroyConfirmationModal
        isOpen={isDestroyModalOpen}
        onClose={handleDestroyCancel}
        onConfirm={handleDestroyConfirm}
        deploymentName={deployment?.deploymentName || initDeploymentName || "New Deployment"}
        isLoading={loadingSteps["destroy"]}
      />
    </div>
  );
};

export default TerraformAccordions;