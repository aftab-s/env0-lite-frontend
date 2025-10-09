import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/button';

interface GithubPatSettingsProps {
  patToken: string;
  setPatToken: (val: string) => void;
}

const GithubPatSettings = ({ patToken, setPatToken }: GithubPatSettingsProps) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl text-white mb-1 font-semibold">Update PAT Token</h2>
      <p className="text-gray-400 text-xs">Manage your GitHub Personal Access Token for repository access</p>
    </div>
    <div className="space-y-4">
      <div>
        <PasswordInput
          label="Github PAT"
          value={patToken}
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          onChange={(e) => setPatToken(e.target.value)}
        />
      </div>
    </div>
    <div>
      <Button variant="primary" width="w-45" onClick={() => console.log('Update PAT clicked')}>
        Update PAT
      </Button>
    </div>
  </div>
);

export default GithubPatSettings;