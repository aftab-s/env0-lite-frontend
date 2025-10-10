import React, { useState } from 'react';
import TextInput from '@/components/ui/TextInput';
import Dropdown from '@/components/ui/Dropdown';

const regionOptions = [
  { label: 'us-east-1', value: 'us-east-1' },
  { label: 'us-west-2', value: 'us-west-2' },
  { label: 'eu-west-1', value: 'eu-west-1' },
];

const AWSProfileSettings = () => {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [profileName, setProfileName] = useState('');
  const [region, setRegion] = useState(regionOptions[0].value);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-white mb-1 font-semibold">AWS Profile</h2>
        <p className="text-gray-400 text-xs">Configure your AWS credentials and region</p>
      </div>
      <div className="space-y-4">
        <TextInput
          label="Access Key ID"
          value={accessKey}
          onChange={e => setAccessKey(e.target.value)}
          placeholder="AKIA..."
        />
        <TextInput
          label="Secret Access Key"
          value={secretKey}
          onChange={e => setSecretKey(e.target.value)}
          placeholder="••••••••"
          type="text"
        />
        <TextInput
          label="Profile Name"
          value={profileName}
          onChange={e => setProfileName(e.target.value)}
          placeholder="default"
        />
        <Dropdown
          label="Region"
          options={regionOptions}
          value={region}
          onChange={setRegion}
        />
      </div>
    </div>
  );
};

export default AWSProfileSettings;
