import { useState } from 'react';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/button';
import { updatePAT } from '@/services/githubPAT/updatePat';
import Swal from 'sweetalert2';

interface GithubPatSettingsProps {
  patToken: string;
  setPatToken: (val: string) => void;
}

const GithubPatSettings = ({ patToken, setPatToken }: GithubPatSettingsProps) => {
  const [loading, setLoading] = useState(false);

  const handleUpdatePAT = async () => {
    if (!patToken) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please enter a PAT token.',
      });
      return;
    }

    // Basic validation for GitHub PAT format (starts with ghp_ or github_pat_)
    const patPattern = /^ghp_[A-Za-z0-9]{36}$|^github_pat_[A-Za-z0-9_]{22,255}$/;
    if (!patPattern.test(patToken)) {
      Swal.fire({
        title: 'Invalid PAT Format',
        text: 'Please enter a valid GitHub Personal Access Token.',
      });
      return;
    }

    setLoading(true);
    try {
      await updatePAT(patToken);
      Swal.fire({
        title: 'Success',
        text: 'PAT updated successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
      // Clear the field for security
      setPatToken('');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <Button
          variant="primary"
          width="w-45"
          onClick={handleUpdatePAT}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update PAT'}
        </Button>
      </div>
    </div>
  );
};

export default GithubPatSettings;