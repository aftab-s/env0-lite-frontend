'use client';
import { useState } from 'react';
import Image from 'next/image';

interface TreeNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

interface RepoTreeProps {
  nodes: TreeNode[];
  darkMode?: boolean;
  onSelect?: (path: string) => void;  // ✅ new prop
}

export default function RepoTree({ nodes, darkMode = false, onSelect }: RepoTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const bgColor = darkMode ? '#111111' : '#F3F4F6';

  const toggleFolder = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClick = (node: TreeNode) => {
    if (node.type === 'folder') {
      toggleFolder(node.id);
    }
    if (onSelect) {
      onSelect(node.path); // ✅ notify parent
    }
  };

  const renderTree = (nodes: TreeNode[], level = 0) =>
    nodes.map((node) => (
      <div key={node.id} className="flex flex-col">
        <div
          className={`flex items-center ${
            node.type === 'file'
              ? 'cursor-pointer'
              : 'cursor-pointer select-none'
          }`}
          style={{ paddingLeft: level > 0 ? level * 16 : 0 }}
          onClick={() => handleClick(node)}
        >
          {node.type === 'folder' ? (
            <Image src="/Folder.svg" alt="folder" width={16} height={16} />
          ) : (
            <Image src="/file.svg" alt="file" width={16} height={16} />
          )}
          <span className={`${darkMode ? 'text-white' : 'text-black'} ml-1`}>
            {node.name}
          </span>
        </div>
        {node.children &&
          expanded[node.id] &&
          renderTree(node.children, level + 1)}
      </div>
    ));

  return (
    <div
      className="scrollbar-custom"
      style={{
        maxHeight: '40vh',
        overflowY: 'auto',
        padding: '4px',
        borderRadius: '6px',
      }}
    >
      {renderTree(nodes)}

      {/* Scrollbar styling */}
      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: ${bgColor};
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: ${darkMode ? '#4B5563' : '#9CA3AF'};
          border-radius: 10px;
        }
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: ${darkMode ? '#4B5563' : '#9CA3AF'} ${bgColor};
        }
      `}</style>
    </div>
  );
}
