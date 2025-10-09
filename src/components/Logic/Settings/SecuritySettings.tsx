import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/button';

interface SecuritySettingsProps {
  currentPassword: string;
  setCurrentPassword: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
}

const SecuritySettings = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
}: SecuritySettingsProps) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl text-white mb-1 font-semibold">Security</h2>
      <p className="text-gray-400 text-xs">Manage your security settings and password</p>
    </div>
    <div className="space-y-4">
      <div>
        <PasswordInput
          label="Current Password"
          value={currentPassword}
          placeholder="••••••••"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <PasswordInput
          label="New Password"
          value={newPassword}
          placeholder="••••••••"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <PasswordInput
          label="Confirm New Password"
          value={newPassword}
          placeholder="••••••••"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="bg-black border border-[#3a3a3a] rounded-lg p-4 flex items-center justify-between opacity-60 cursor-not-allowed relative group select-none">
        <div>
          <h3 className="text-white text-sm mb-1">Two-Factor Authentication</h3>
          <p className="text-gray-400 text-xs">Add an extra layer of security to your account</p>
        </div>
        <div className="relative">
          <button
            disabled
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 cursor-not-allowed"
            tabIndex={-1}
          >
            <span className="inline-block h-4 w-4 transform rounded-full bg-black transition-transform translate-x-1" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 top-10 z-20 hidden group-hover:block bg-black text-white text-xs rounded px-3 py-1 border border-[#CD9C20] whitespace-nowrap pointer-events-none">
            Coming soon
          </span>
        </div>
      </div>
      <Button
        variant="primary"
        width="w-45"
        onClick={() => console.log('Update Password clicked')}
      >
        Update Password
      </Button>
    </div>
  </div>
);

export default SecuritySettings;