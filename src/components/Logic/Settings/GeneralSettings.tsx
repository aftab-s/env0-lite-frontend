import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/button';

interface GeneralSettingsProps {
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
}

const GeneralSettings = ({ fullName, setFullName, email, setEmail }: GeneralSettingsProps) => (
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
        />
      </div>
      <div>
        <TextInput
          label="Email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>
    </div>
    <div>
      <Button variant="primary" width="w-45" onClick={() => console.log('Save clicked')}>
        Save
      </Button>
    </div>
  </div>
);

export default GeneralSettings;