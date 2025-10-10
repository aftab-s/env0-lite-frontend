import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { getUserById, updateUser } from '@/redux/slice/Auth/userManagementSlice';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/button';
import { setUser } from '@/redux/slice/authSlice';

const GeneralSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.userManagement);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data on component mount if not already loaded
  useEffect(() => {
    if (!user) {
      dispatch(getUserById());
    }
  }, [dispatch, user]);

  // Populate form fields when user data is available
  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  // Handle edit/save toggle
  const handleEdit = () => {
    if (isEditing) {
      // Save changes: dispatch update with name and email (username is not editable)
      dispatch(updateUser({ name: fullName, email: email }));
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-white mb-1 font-semibold">General</h2>
        <p className="text-gray-400 text-xs">Manage your general account settings</p>
      </div>
      <div className="space-y-4">
        <div>
          <TextInput
            label="Full Name"
            placeholder=""
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            disabled={!isEditing}
          />
        </div>
        <div>
          <TextInput
            label="Email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            disabled={!isEditing}
          />
        </div>
        <div>
          <TextInput
            label="Username"
            placeholder=""
            value={username}
            type="text"
            disabled={true} // Username is not editable
          />
        </div>
      </div>
      <div>
        <Button variant="primary" width="w-45" onClick={handleEdit} disabled={loading}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;