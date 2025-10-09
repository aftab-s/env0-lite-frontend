import Button from '@/components/ui/button';

const AccountSettings = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl  text-white mb-1 font-semibold">Account</h2>
      <p className="text-gray-400 text-xs">Manage your account settings</p>
    </div>
    <div className="bg-black border border-gray-800 rounded-lg p-3 space-y-1">
      <h3 className="text-white mb-2">Account Information</h3>
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-xs">Account ID</span>
        <span className="text-white text-xs">acc_2kj3h4kj5h6k7j8</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-xs">Member Since</span>
        <span className="text-white text-xs">January 15, 2024</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-xs">Plan</span>
        <span className="text-white text-xs">Pro</span>
      </div>
    </div>
    <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-3">
      <h3 className="text-red-500 mb-1">Danger Zone</h3>
      <p className="text-gray-400 text-xs mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <Button variant="destructive" width="w-45" onClick={() => console.log('Delete clicked')}>
        Delete
      </Button>
    </div>
  </div>
);

export default AccountSettings;