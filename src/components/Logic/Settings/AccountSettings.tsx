import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import Button from '@/components/ui/button';
import { deleteAccount } from '@/services/account/deleteAccount';
import { clearUser } from '@/redux/slice/authSlice';
import Cookies from 'js-cookie';

const AccountSettings = () => {
  const { user } = useSelector((state: RootState) => state.userManagement);
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAccount();
      // Clear cookies
      Cookies.remove('token');
      Cookies.remove('name');
      Cookies.remove('email');
      Cookies.remove('username');
      Cookies.remove('userId');
      Cookies.remove('role');
      // Clear Redux state
      dispatch(clearUser()); // Reset auth state
      // Redirect to root
      window.location.href = '/';
    } catch (error) {
      alert(`Failed to delete account: ${(error as Error).message}`);
      setShowConfirm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-white mb-1 font-semibold">Account</h2>
        <p className="text-gray-400 text-xs">Manage your account settings</p>
      </div>
      <div className="bg-black border border-gray-800 rounded-lg p-3 space-y-1">
        <h3 className="text-white mb-2">Account Information</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs">Account ID</span>
          <span className="text-white text-xs">{user?.username || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs">Member Since</span>
          <span className="text-white text-xs">{user?.memberSince || 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs">Plan</span>
          <span className="text-white text-xs">{user?.plan || 'N/A'}</span>
        </div>
      </div>
      <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-3">
        <h3 className="text-red-500 mb-1">Danger Zone</h3>
        <p className="text-gray-400 text-xs mb-4">
          {showConfirm
            ? 'Are you sure you want to delete your account? This action cannot be undone.'
            : 'Once you delete your account, there is no going back. Please be certain.'
          }
        </p>
        {showConfirm ? (
          <div className="flex gap-2">
            <Button variant="secondary" width="w-32" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="destructive" width="w-32" onClick={handleConfirmDelete}>
              Yes. Delete
            </Button>
          </div>
        ) : (
          <Button variant="destructive" width="w-45" onClick={handleDeleteClick}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;