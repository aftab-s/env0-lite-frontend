import React, { useState } from 'react';
import TextInput from '@/components/ui/TextInput';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { updateAwsProfile } from '@/services/awsCreds/credsUpdate';
import Swal from 'sweetalert2';


const regionOptions = [
  { label: 'US East (N. Virginia) - us-east-1', value: 'us-east-1' },
  { label: 'US East (Ohio) - us-east-2', value: 'us-east-2' },
  { label: 'US West (N. California) - us-west-1', value: 'us-west-1' },
  { label: 'US West (Oregon) - us-west-2', value: 'us-west-2' },
  { label: 'Europe (Ireland) - eu-west-1', value: 'eu-west-1' },
  { label: 'Europe (London) - eu-west-2', value: 'eu-west-2' },
  { label: 'Europe (Frankfurt) - eu-central-1', value: 'eu-central-1' },
  { label: 'Asia Pacific (Singapore) - ap-southeast-1', value: 'ap-southeast-1' },
  { label: 'Asia Pacific (Sydney) - ap-southeast-2', value: 'ap-southeast-2' },
  { label: 'Asia Pacific (Tokyo) - ap-northeast-1', value: 'ap-northeast-1' },
];


const AWSProfileSettings = () => {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [profileName, setProfileName] = useState('');
  const [region, setRegion] = useState(regionOptions[0].value);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const projectId = params?.projectId as string;
  // Get projectName from Redux
  const projectName = useSelector((state: RootState) => {
    const projects = state.projectList.projects;
    return projects.find(p => p.projectId === projectId)?.projectName || 'Project';
  });

  const handleUpdate = async () => {
    if (!projectId) {
      Swal.fire({ icon: 'error', title: 'No project selected', text: 'Project ID is missing.' });
      return;
    }
    // Debug: log the request body before validation
    console.log('AWS Profile Update Request:', {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      profileName,
      region,
    });
    if (!profileName || !accessKey || !secretKey || !region) {
      Swal.fire({ icon: 'warning', title: 'Missing fields', text: 'All fields are required to update the AWS profile.' });
      return;
    }
    setLoading(true);
    const result = await updateAwsProfile(projectId, {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      profileName,
      region,
    });
    setLoading(false);
    if (result.success) {
      Swal.fire({ icon: 'success', title: 'AWS Profile Updated', text: result.message || 'Profile updated successfully.' });
    } else {
      Swal.fire({ icon: 'error', title: 'Update Failed', text: result.message || 'Failed to update AWS profile.' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Box */}
      <div className="w-full bg-yellow-900/30 border border-yellow-600/40 text-yellow-200 rounded-lg px-6 py-3 mb-4 flex items-center gap-3">
        <svg className="w-5 h-5 text-yellow-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.658-1.14 1.105-2.045l-6.928-12.02c-.526-.912-1.684-.912-2.21 0l-6.928 12.02c-.553.905.051 2.045 1.105 2.045z"/>
        </svg>
        <span className='text-xs'>
          In order to update the AWS profile, <b>all fields must be filled</b> (Profile Name, Access Key ID, Secret Access Key, and Region).
        </span>
      </div>
      <div>
        <h2 className="text-2xl text-white mb-1 font-semibold">AWS Profile</h2>
        <p className="text-gray-400 text-xs">
          Configure your AWS credentials and region for the project <span className="font-semibold text-yellow-400">{projectName}</span>
        </p>
      </div>
      <div className="space-y-4">
                <TextInput
          label="Profile Name *"
          value={profileName}
          onChange={e => setProfileName(e.target.value)}
          placeholder="default"
        />
        <TextInput
          label="Access Key ID *"
          value={accessKey}
          onChange={e => setAccessKey(e.target.value)}
          placeholder="AKIA..."
        />
        <TextInput
          label="Secret Access Key *"
          value={secretKey}
          onChange={e => setSecretKey(e.target.value)}
          placeholder="••••••••"
          type="text"
        />

        <Dropdown
          label="Region *"
          options={regionOptions}
          value={region}
          onChange={setRegion}
        />
        <div className="pt-2">
          <Button variant="primary" width="w-40" onClick={handleUpdate} disabled={loading}>
            {loading ? 'Updating...' : 'Update AWS Profile'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AWSProfileSettings;
