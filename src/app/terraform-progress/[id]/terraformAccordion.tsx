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
  terraformApply,
  terraformDestroy,
} from "@/services/deployements/deploymentService";

interface AccordionItemProps {
  title: string;
  status?: React.ReactNode;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, status, children }) => {
  const [open, setOpen] = useState(false);
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
};

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

  const stepNames = ["init", "plan", "apply", "destroy"];

  const getStepStatus = (step?: DeploymentStep) => {
    if (!step) return { label: "Pending", color: "#F5A623", bg: "#F5A62333" };
    if (step.stepStatus === "in_progress") return { label: "In Progress", color: "#3B82F6", bg: "#3B82F633" };
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
    await runStep("apply");
  };

  const handleDeny = () => {
    
  };

  const handleReload = () => {
    setSteps([]);
    setInitDeploymentId(null);
    setInitDeploymentName(null);
    setStartedAt(null);
    runStep("init");
  };

  const handleDestroyClick = () => {
    setIsDestroyModalOpen(true);
  };

  const handleDestroyConfirm = async () => {
    await runStep("destroy");
    setIsDestroyModalOpen(false);
  };

  const handleDestroyCancel = () => {
    setIsDestroyModalOpen(false);
  };

  const allSuccessful = stepNames.every((stepName) => {
    const step = steps.find((s) => s.step === stepName);
    return step && step.stepStatus === "successful";
  });

  if (!isClient) return null;

  return (
    <div className="w-full h-full max-h-screen mx-auto p-6 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white text-2xl font-semibold">{deployment?.deploymentName || initDeploymentName || "New Deployment"}</h2>
        {!deployment && (
          <div className="ml-4">
            <PrimaryButton
              onClick={() => {
                setStartedAt(new Date().toISOString());
                runStep("init");
              }}
              className="w-auto px-6 py-2 text-sm font-semibold cursor-pointer"
            >
              Deploy
            </PrimaryButton>
          </div>
        )}
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
          const applyStep = steps.find((s) => s.step === "apply");

          if (stepName === "destroy" && (!applyStep || applyStep.stepStatus !== "successful")) {
            return null;
          }

          return (
            <AccordionItem
              key={stepName}
              title={`Terraform ${stepName.charAt(0).toUpperCase() + stepName.slice(1)}`}
              status={
                <div className="flex items-center gap-2">
                  {stepName === "destroy" && applyStep?.stepStatus === "successful" && !step && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDestroyClick();
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs cursor-pointer"
                      disabled={loadingSteps["destroy"]}
                    >
                      Destroy
                    </button>
                  )}
                  <StatusBadge label={status.label} color={status.color} bg={status.bg} title={status.label === "Failed" ? step?.message : undefined} />
                </div>
              }
            >
              {step?.stepStatus === "in_progress" ? (
                <div className="text-white">
                  <span>Running{dots}</span>
                </div>
              ) : (
                renderColoredMessage(step?.message, stepName)
              )}
              {stepName === "plan" && !allSuccessful && planStep?.stepStatus === "successful" &&(
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleApprove}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                    disabled={allSuccessful || loadingSteps["plan"]}
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleDeny}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={true || allSuccessful || loadingSteps["plan"]}
                  >
                    Deny
                  </button>
                </div>
              )}
            </AccordionItem>
          );
        })}
      </div>

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