import { Folder as FolderIcon, FolderOpen, Trash2 } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, COLORS, SPACING } from '../../constants/ui.constants';
import { useFolders } from '../../hooks/useFolders';

interface FolderListProps {
  selectedFolderId: string | null;
  onSelectFolder: (id: string) => void;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
  margin-top: ${SPACING.md};
`;

const FolderItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: ${BORDER_RADIUS.md};
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? COLORS.background : 'transparent')};
  color: ${(props) => (props.$isActive ? COLORS.primary : COLORS.text.secondary)};
  font-weight: ${(props) => (props.$isActive ? 600 : 400)};
  transition: all 0.2s;

  &:hover {
    background-color: ${COLORS.background};
    color: ${COLORS.text.primary};
  }

  .delete-icon {
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover .delete-icon {
    opacity: 1;
  }
`;

const FolderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.text.muted};
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${COLORS.danger};
    background-color: #fee2e2;
  }
`;

export const FolderList: React.FC<FolderListProps> = ({ selectedFolderId, onSelectFolder }) => {
  const { folders, deleteFolder, isDeleting } = useFolders();

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this folder?')) {
      await deleteFolder(id);
      if (selectedFolderId === id) {
        onSelectFolder(''); // Deselect if deleted
      }
    }
  };

  return (
    <ListContainer>
      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          $isActive={folder.id === selectedFolderId}
          onClick={() => onSelectFolder(folder.id)}
        >
          <FolderInfo>
            {folder.id === selectedFolderId ? <FolderOpen size={18} /> : <FolderIcon size={18} />}
            {folder.name}
          </FolderInfo>
          <DeleteButton
            className="delete-icon"
            onClick={(e) => handleDelete(e, folder.id)}
            disabled={isDeleting}
          >
            <Trash2 size={14} />
          </DeleteButton>
        </FolderItem>
      ))}
    </ListContainer>
  );
};
