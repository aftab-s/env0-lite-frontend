
import InputField from '@/components/ui/inputField';
import Button from '@/components/ui/button';

function Step({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <div className="w-[97%] bg-[#09090B] flex items-start justify-start rounded-lg border gap-5 border-[#333333] p-4 mt-4">
      <h1 className="text-[#ffffff] font-regular w-8 h-8 flex items-center justify-center border border-[#333333] text-[14px] rounded-md">
        {number}
      </h1>
      <h1 className="text-[#ffffff] font-regular text-[14px] flex items-center h-8">
        {children}
      </h1>
    </div>
  );
}

export default function LoginUI() {
  return (
    <div className="h-screen w-screen bg-[#111111] flex flex-col items-center pt-10 overflow-x-hidden">
      <h1 className="text-[#CD9C20] font-semibold text-[30px]">GitHub Personal Access Token</h1>
      <h1 className="text-[#ffffff] font-regular text-[14px]">
        We need a GitHub Personal Access Token to access your repositories and manage deployments.
      </h1>
      <div className="w-[60%] min-h-[200px] bg-[#18181B] mt-9 flex flex-col items-center justify-center rounded-lg border border-[#333333] p-4">
        <h1 className="text-[#ffffff] font-semibold text-[16px]">GitHub Personal Access Token</h1>
        <h1 className="text-[#A1A1AA] font-regular text-[14px] mb-5">
          Your token is stored securely and encrypted. You will only be using it to access your
          repositories
        </h1>
        <InputField placeholder="gph_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" width="w-120" />
        <div className="w-[54%]">
          <Button variant="primary">Verify Token</Button>
        </div>
      </div>
      <div className="w-[60%] bg-[#09090B] mt-9 flex flex-col items-center justify-center rounded-lg mb-10 border border-[#333333] p-4">
        <h1 className="text-[#ffffff] font-regular mb-2 text-[14px]">
          How to generate a Personal Access Token?
        </h1>
        <Step number={1}>
          Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
        </Step>
        <Step number={2}>
          Click &quot;Generate new token&quot; → &quot;Generate new token (classic)&quot; (classic)
        </Step>
          <Step number={3}>
          Add a note (e.g., &quot;TerraForm Deploy&quot;) and select these scopes: (classic)
        </Step>
        <Step number={4}>
          Click &quot;Generate token&quot; and copy the token
        </Step>
      </div>
    </div>
  );
}
