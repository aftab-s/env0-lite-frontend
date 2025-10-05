"use client";
import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  title: string;
  status: ReactNode;
  children?: ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, status, children }) => {
  const [open, setOpen] = useState(false);

  const bgColor = "#09090B";
  const thumbColor = "#4B5563";

  return (
    <div className="rounded-md overflow-hidden mb-3 bg-[#09090B] w-full border-t border-[#27272A]">
      {/* Accordion Heading */}
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

      {/* Divider */}
      {open && <div className="mx-4 border-t border-[#27272A]"></div>}

      {/* Accordion Content with scroll */}
      {open && (
        <div className="px-4 py-2 max-h-48 overflow-auto text-sm scrollbar-custom">
          {children}
          <style jsx>{`
            .scrollbar-custom::-webkit-scrollbar {
              width: 6px;
            }
            .scrollbar-custom::-webkit-scrollbar-track {
              background: ${bgColor};
            }
            .scrollbar-custom::-webkit-scrollbar-thumb {
              background-color: ${thumbColor};
              border-radius: 10px;
            }
            .scrollbar-custom {
              scrollbar-width: thin;
              scrollbar-color: ${thumbColor} ${bgColor};
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

interface StatusBadgeProps {
  label: string;
  color: string;
  bg: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, color, bg }) => (
  <div
    className="flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
    style={{ backgroundColor: bg }}
  >
    <span className="w-2 h-2 rounded-md" style={{ backgroundColor: color }}></span>
    <span style={{ color }}>{label}</span>
  </div>
);

const TerraformAccordions: React.FC = () => {
  const bgColor = "#18181B";
  const thumbColor = "#4B5563";

  return (
    <div className="w-full h-full max-h-screen mx-auto p-6 overflow-hidden box-border">
      {/* Main Heading */}
      <h2 className="text-white text-2xl font-semibold mb-2">
        Terraform Aws Infrastructure
      </h2>

      {/* Repo / Branch / Path Sub-header */}
      <div className="flex items-center justify-start gap-2 bg-[#09090B] border border-[#27272A] rounded-md px-4 py-2 mb-5 text-gray-300 text-sm box-border">
        <span>another-repo</span>
        <span>•</span>
        <span>main branch</span>
        <span>•</span>
        <span>./terraform</span>
      </div>

      <div className="w-full mx-auto p-4 rounded-md bg-[#18181B] h-[85%] overflow-hidden flex flex-col box-border">
        {/* Terraform Init - Completed */}
        <AccordionItem
          title="Terraform Init"
          status={<StatusBadge label="Completed" color="#00B15C" bg="#00B15C33" />}
        >
          <p className="text-gray-400 text-sm">
            Terraform initialization completed successfully.
          </p>
        </AccordionItem>

        {/* Terraform Plan - In Progress */}
        <AccordionItem
          title="Terraform Plan"
          status={<StatusBadge label="In Progress" color="#0070F3" bg="#1CCAFF33" />}
        >
          <div className="bg-[#0B0B0D] p-2 rounded-md font-mono text-xs text-gray-300 whitespace-pre-wrap scrollbar-custom">
            Refreshing Terraform state in-memory...
            {"\n"}Terraform will perform the following actions:
            {"\n"}
            <span className="text-[#00B15C]">+ aws_instance.web</span>
            {"\n"}
            <span className="text-[#00B15C]">+ aws_security_group.web_sg</span>
            {"\n"}Plan: <span className="text-[#00B15C]">2 to add</span>, 0 to change, 0 to destroy.
          </div>
          <div className="bg-[#0B0B0D] p-2 rounded-md font-mono text-xs text-gray-300 whitespace-pre-wrap scrollbar-custom mt-2">
            Refreshing Terraform state in-memory...
            {"\n"}Terraform will perform the following actions:
            {"\n"}
            <span className="text-[#00B15C]">+ aws_instance.web</span>
            {"\n"}
            <span className="text-[#00B15C]">+ aws_security_group.web_sg</span>
            {"\n"}Plan: <span className="text-[#00B15C]">2 to add</span>, 0 to change, 0 to destroy.
          </div>
          <div className="flex gap-3 mt-2">
            <button className="w-24 flex justify-center items-center bg-white text-black font-medium py-1.5 rounded-md hover:opacity-90 transition text-sm">
              Approve
            </button>
            <button className="w-24 flex justify-center items-center bg-[#F87171] text-[#FAFAFA] font-medium py-1.5 rounded-md hover:opacity-90 transition text-sm">
              Deny
            </button>
          </div>
        </AccordionItem>

        {/* Terraform Apply - Pending */}
        <AccordionItem
          title="Terraform Apply"
          status={<StatusBadge label="Pending" color="#F5A623" bg="#F5A62333" />}
        >
          <p className="text-gray-400 text-sm">
            Waiting for approval before applying changes.
          </p>
        </AccordionItem>
      </div>

      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: ${bgColor};
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: ${thumbColor};
          border-radius: 10px;
        }
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: ${thumbColor} ${bgColor};
        }
      `}</style>
    </div>
  );
};

export default TerraformAccordions;
