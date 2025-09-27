
import InputField from "../../components/ui/inputField";
import PasswordField from "../../components/ui/passwordField";
import Button from "../../components/ui/button";

export default function LoginUI() {
  return (
    <div className="h-screen w-screen bg-[#f7f7f7] flex items-center justify-center">
      <div className="h-[93%] w-[97%] flex items-center rounded border bg-[#ffffff] border-[#e4e4e4] justify-center">
        <div className="h-full w-[60%] flex flex-col items-center justify-center">

          <div className="flex flex-col items-start justify-start">
            <h1 className="text-[24px] font-semibold text-[#000000] mt-10 mb-2">
              Login to your account
            </h1>
            <h1 className="text-[14px] font-meidum text-[#71717A] mb-8">
              Step Into Fig: Log In with Your Credentials
            </h1>
            <div className="h-[1px] w-full bg-[#e4e4e4] mb-4"></div>
            <InputField
              label="Email Address"
              placeholder="Enter your Email ID"
              width="w-80"
            />
              <PasswordField
              label="Password"
              placeholder="Enter your Password"
              width="w-80"
            />
            <Button variant="primary">Sign In</Button>
            <h3 className="text-sm font-medium text-[#71717A] mt-4">
              Dont have an account? <a href="#" className="text-[#000000]">Sign up</a>
            </h3>
          </div>
        </div>
        <div className="h-full w-[40%] flex items-center justify-end text-white overflow-hidden p-3">
        </div>
      </div>
    </div>
  );
}