// components/RepoTree.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';

interface TreeNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

interface RepoTreeProps {
  nodes: TreeNode[];
  darkMode?: boolean;
}

export default function RepoTree({ nodes, darkMode = false }: RepoTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleFolder = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (nodes: TreeNode[], level = 0) =>
  nodes.map((node) => (
    <div key={node.id} className="flex flex-col">
      <div
        className={`flex items-center ${
          node.type === 'file' ? 'cursor-default' : 'cursor-pointer select-none'
        }`}
        style={{ paddingLeft: level > 0 ? level * 16 : 0 }}
        onClick={() => node.type === 'folder' && toggleFolder(node.id)}
      >
        {node.type === 'folder' ? (
          <Image
            src={'/Folder.svg'}
            alt="folder"
            width={16}
            height={16}
          />
        ) : (
          <Image src="/File.svg" alt="file" width={16} height={16} />
        )}
        <span className={`${darkMode ? 'text-white' : 'text-black'} ml-1`}>
          {node.name}
        </span>
      </div>
      {node.children && expanded[node.id] && renderTree(node.children, level + 1)}
    </div>
  ));


  return <div>{renderTree(nodes)}</div>;
}
