import Image from "next/image";

export default function AuthForm() {
  return (
    <div className="w-screen h-full flex flex-col items-center justify-center bg-[#111111]">
      <div className="w-85 mb-5 flex flex-col items-start justify-center">
        <span className="font-semibold text-[20px]">Sign In to TerraFuel</span>
      </div>
      <div className="w-85">
        {/* OAuth Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 w-full border border-[#2A2A2A] rounded-[5px] py-1 hover:bg-[#3c3c3c]">
            <Image src="/login/Github.svg" alt="Github" width={20} height={20} priority className="m-2"/>
          </button>
          <button className="flex items-center justify-center gap-2 w-full border border-[#2A2A2A] rounded-[5px] py-1 hover:bg-[#3c3c3c]">
            <Image src="/login/Gitlab.svg" alt="Gitlab" width={20} height={20} priority/>
          </button>
          <button className="flex items-center justify-center gap-2 w-full border border-[#2A2A2A] rounded-[5px] py-1 hover:bg-[#3c3c3c]">
            <Image src="/login/Bitbucket.svg" alt="Bitbucket" width={20} height={20} priority/>
          </button>
          <button className="flex items-center justify-center gap-2 w-full border border-[#2A2A2A] rounded-[5px] py-1 hover:bg-[#3c3c3c]">
            <Image src="/login/Google.svg" alt="Google" width={20} height={20} priority/>
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-sm text-gray-500 bg-[#0A0A0A] pr-3 pl-3">or</span>
        </div>

        {/* Email/Password Form */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-[12px] font-normal mb-1 font-[#EDEDED]">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-[5px] border border-[#2A2A2A] px-3 py-2 text-sm focus:outline-none text-[14px]"
            />
          </div>
          <div>
            <label className="block text-[12px] font-normal mb-1 font-[#EDEDED]">Password</label>
            <input
              type="password"
              placeholder="password"
              className="w-full rounded-[5px] border border-[#2A2A2A] px-3 py-2 text-sm focus:outline-none "
            />
          </div>

          <button
            type="submit"
            className="w-full text-[14px] bg-[#FFFFFF] text-black rounded-[5px] py-2 font-medium hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 flex flex-col items-start gap-2 text-[12px]">
          <a href="#" className="text-[#A259FF] hover:underline">
            Sign in with SSO 
          </a>
          <p>
            Need an account?{" "}
            <a href="#" className="text-[#A259FF] hover:underline">
              Sign up
            </a>
          </p>
          <p>
            Forgot your password?{" "}
            <a href="#" className="text-[#A259FF] hover:underline">
              Reset it
            </a>
          </p>
        </div>
      </div>
      
    </div>
  );
}
