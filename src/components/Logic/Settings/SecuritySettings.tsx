import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/button';
import { updatePassword } from '@/redux/slice/Auth/updatePassword';
import Swal from 'sweetalert2';

interface SecuritySettingsProps {
  currentPassword: string;
  setCurrentPassword: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
}

const SecuritySettings = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}: SecuritySettingsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all password fields.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Validation Error',
        text: 'New password and confirm password do not match.',
      });
      return;
    }

    if (newPassword === currentPassword) {
      Swal.fire({
        title: 'Validation Error',
        text: 'New password cannot be the same as the current password.',
      });
      return;
    }

    setLoading(true);
    try {
      await dispatch(updatePassword({ oldPassword: currentPassword, newPassword })).unwrap();
      Swal.fire({
        title: 'Success',
        text: 'Password updated successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
      // Clear fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error as string,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
            value={confirmPassword}
            placeholder="••••••••"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <div>
          <Button
            variant="primary"
            width="w-45"
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;