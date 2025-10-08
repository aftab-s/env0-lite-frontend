"use client";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  Deployment,
  DeploymentStep,
  TerraformCommandResponse,
  TerraformPlanResponse,
  TerraformApplyResponse,
} from "@/types/deployment.types";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import {
  terraformInit,
  terraformPlan,
  terraformApply,
} from "@/services/deployements/deploymentService";

interface AccordionItemProps {
  title: string;
  status?: React.ReactNode;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, status, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-md overflow-hidden mb-3 bg-[#09090B] w-full border-t border-[#27272A]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 text-left text-sm"
      >
        <span className="text-white font-medium text-sm">{title}</span>
        <div className="flex items-center gap-2">
          {status}
          <ChevronDown
            className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
            size={16}
            color="#A1A1AA"
          />
        </div>
      </button>

      {open && <div className="mx-4 border-t border-[#27272A]"></div>}

      {open && (
        <div className="px-4 py-2 max-h-64 overflow-auto text-sm scrollbar-custom">
          {children}
        </div>
      )}
    </div>
  );
};

const StatusBadge: React.FC<{ label: string; color: string; bg: string }> = ({
  label,
  color,
  bg,
}) => (
  <div
    className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium"
    style={{ backgroundColor: bg }}
  >
    <span className="w-2 h-2 rounded-md" style={{ backgroundColor: color }}></span>
    <span style={{ color }}>{label}</span>
  </div>
);

const renderColoredMessage = (message?: string) => {
  if (!message) return null;
  const lines = message.split("\n");
  let lastColor = "#FFFFFF";

  return lines.map((line, idx) => {
    let color = "#FFFFFF";
    if (line.trim().startsWith("+")) color = "#00B15C";
    else if (line.trim().startsWith("-")) color = "#F87171";
    else if (line.trim() === "}" && idx > 0) {
      const prevLine = lines[idx - 1]?.trim();
      if (prevLine?.startsWith("+") || prevLine?.startsWith("-")) color = lastColor;
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

  const stepNames = ["init", "plan", "apply"];

  const getStepStatus = (step?: DeploymentStep) => {
    if (!step) return { label: "Pending", color: "#F5A623", bg: "#F5A62333" };
    if (step.stepStatus === "in_progress") return { label: "In Progress", color: "#3B82F6", bg: "#3B82F633" };
    if (step.stepStatus === "successful") return { label: "Completed", color: "#00B15C", bg: "#00B15C33" };
    if (step.stepStatus === "failed") return { label: "Failed", color: "#F87171", bg: "#F8717133" };
    return { label: "Pending", color: "#F5A623", bg: "#F5A62333" };
  };

  const runStep = async (stepName: string) => {
    setLoadingSteps((prev) => ({ ...prev, [stepName]: true }));

    // Set stepStatus to in_progress before API call
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

    try {
      if (stepName === "init") {
        response = await terraformInit(
          (deployment?.projectId ?? projectId) || "",
          (deployment?.spaceId ?? spaceId) || "",
          (deployment?.deploymentId ?? deployment?._id) || null
        );
        // Store deploymentId for later plan/apply
        if (response && typeof response === "object" && "deploymentId" in response) {
          setInitDeploymentId(response.deploymentId);
        }
        if (response && typeof response === "object" && "deploymentName" in response) {
          setInitDeploymentName(response.deploymentName);
        }
        // Store stdout in stepObj.message below
      } else if (stepName === "plan") {
        response = await terraformPlan(
          (deployment?.projectId ?? projectId) || "",
          (deployment?.spaceId ?? spaceId) || "",
          initDeploymentId || (deployment?.deploymentId ?? deployment?._id) || ""
        );
        // Store rawFormat in stepObj.message below
      } else if (stepName === "apply") {
        response = await terraformApply(
          (deployment?.projectId ?? projectId) || "",
          (deployment?.spaceId ?? spaceId) || "",
          initDeploymentId || (deployment?.deploymentId ?? deployment?._id) || ""
        );
      } else throw new Error("Unknown step");


      // For init, use stdout; for plan, use rawFormat; for apply, use stdout
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
    } catch (err) {
      console.error(err);
      const failedStep: DeploymentStep = {
        _id: `${stepName}-generated`,
        step: stepName,
        stepStatus: "failed",
        message: (err as Error).message,
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


  // Common function to run init and plan sequentially
  const runInitAndPlan = async () => {
    await runStep("init");
    await runStep("plan");
  };

  useEffect(() => {
    if (!deployment) {
      runInitAndPlan();
    }
    if (!steps || steps.length === 0) {
      if (!deployment) return;
      stepNames.forEach((name) => runStep(name));
    }
  }, []);

  const handleApprove = async () => {
    await runStep("apply");
  };

  const handleDeny = () => {
    alert("Deployment denied");
  };

  const allSuccessful = steps.length === 3 && steps.every((s) => s.stepStatus === "successful");

  return (
    <div className="w-full h-full max-h-screen mx-auto p-6 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white text-2xl font-semibold">{deployment?.deploymentName || initDeploymentName}</h2>
        {deployment?.deploymentName && (
          <div className="ml-4">
            <PrimaryButton
              onClick={runInitAndPlan}
              className="w-auto px-6 py-2 text-sm font-semibold"
            >
              Re-deploy
            </PrimaryButton>
          </div>
        )}
      </div>

      <div className="flex items-center justify-start gap-2 bg-[#09090B] border border-[#27272A] rounded-md px-4 py-2 mb-5 text-gray-300 text-sm">
        <span>{projectId}</span>
        <span>•</span>
        <span>Deployment ID: {deployment?.deploymentId || initDeploymentId}</span>
        <span>•</span>
        <span>Started: {deployment?.startedAt ? new Date(deployment.startedAt).toLocaleString() : "N/A"}</span>
      </div>

      <div className="w-full mx-auto p-4 rounded-md bg-[#18181B] flex-1 overflow-auto">
        {stepNames.map((stepName) => {
          const step = steps.find((s) => s.step === stepName);
          const status = loadingSteps[stepName]
            ? { label: "In Progress", color: "#3B82F6", bg: "#3B82F633" }
            : getStepStatus(step);

          return (
            <AccordionItem
              key={stepName}
              title={`Terraform ${stepName.charAt(0).toUpperCase() + stepName.slice(1)}`}
              status={<StatusBadge label={status.label} color={status.color} bg={status.bg} />}
            >
              {renderColoredMessage(step?.message)}
              {stepName === "plan" && !allSuccessful && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleApprove}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                    disabled={allSuccessful || loadingSteps["plan"]}
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleDeny}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                    disabled={allSuccessful || loadingSteps["plan"]}
                  >
                    Deny
                  </button>
                </div>
              )}
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
};

export default TerraformAccordions;
