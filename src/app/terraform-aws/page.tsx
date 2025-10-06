"use client";

import Button from "@/components/ui/button";

export default function TerraformAwsPage() {

  const headingColor = "text-gray-900";
  const cardBg = "bg-white";
  const mutedText = "text-gray-500";
  const borderColor = "border-gray-200";
  const codeBg = "bg-[#0B1221]";

  const handleApprove = () => {
    // placeholder for future integration
    console.log("approve clicked");
  };

  const handleDeny = () => {
    console.log("deny clicked");
  };

  return (
    <div className="px-10 pb-10">
      {/* Title and breadcrumb */}
      <div className="flex flex-col gap-3 mb-6">
        <h1 className={`text-[40px] font-extrabold ${headingColor}`}>Terraform Aws Infrastructure</h1>
        <div
          className={`h-10 w-full max-w-[1000px] ${cardBg} ${borderColor} border rounded-md flex items-center px-4 text-sm ${mutedText}`}
        >
          another-repo • main branch • ./terraform
        </div>
      </div>

      {/* Card: Enter Credentials */}
      <div className={`rounded-lg ${cardBg} ${borderColor} border p-6 max-w-[1000px]`}> 
        <h2 className={`text-xl font-semibold ${headingColor}`}>Enter Credentials</h2>

        {/* Default Region field */}
        <div className="mt-6">
          <label className={`block text-xs ${mutedText} mb-2`}>Default Region</label>
          {/* <div className={`h-10 rounded-md border ${borderColor} ${cardBg}`}></div> */}
        </div>

        {/* Terraform Init status row */}
        <div className="mt-2">
          <div className={`h-12 rounded-md border ${borderColor} ${cardBg} flex items-center justify-between px-4`}>
            <span className={`text-sm ${headingColor}`}>Terraform Init</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-sm text-emerald-400">Completed</span>
              <button className={`${mutedText}`}>▾</button>
            </div>
          </div>
        </div>

        {/* Terraform Plan block */}
        <div className="mt-6">
          <div className={`rounded-md border ${borderColor} overflow-hidden`}>
            <div className={`h-12 ${cardBg} flex items-center justify-between px-4 border-b ${borderColor}`}>
              <span className={`text-sm ${headingColor}`}>Terraform Plan</span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                <span className="text-sm text-sky-400">In Progress</span>
                <button className={`${mutedText}`}>▾</button>
              </div>
            </div>
            <div className={`${codeBg} px-5 py-4 text-sm font-mono text-[#C8D2E0]`}> 
              <div className="opacity-90">Refreshing Terraform state in-memory...</div>
              <div className="mt-2">Terraform will perform the following actions:</div>
              <div className="mt-2 text-emerald-400">+ aws_instance.web</div>
              <div className="text-emerald-400">+ aws_security_group.web_sg</div>
              <div className="mt-3">Plan: 2 to add, 0 to change, 0 to destroy.</div>
              <div className={`mt-4 flex items-center gap-3 ${cardBg} p-3 rounded-md`}> 
                <Button variant="primary" width="w-auto" onClick={handleApprove}>Approve</Button>
                <Button variant="tertiary" width="w-auto" className="bg-rose-200 text-rose-800 hover:bg-rose-300" onClick={handleDeny}>Deny</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Terraform Apply row */}
        <div className="mt-6">
          <div className={`h-12 rounded-md border ${borderColor} ${cardBg} flex items-center justify-between px-4`}>
            <span className={`text-sm ${headingColor}`}>Terraform Apply</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span className="text-sm text-amber-400">Pending</span>
              <button className={`${mutedText}`}>▾</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


