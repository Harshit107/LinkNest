import { Folder as FolderIcon, FolderOpen, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, SPACING } from '../../constants/ui.constants';
import { useFolders } from '../../hooks/useFolders';
import { ConfirmationModal } from '../Modals/ConfirmationModal';

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
  background-color: ${(props) => (props.$isActive ? props.theme.background : 'transparent')};
  color: ${(props) => (props.$isActive ? props.theme.primary : props.theme.text.secondary)};
  font-weight: ${(props) => (props.$isActive ? 600 : 400)};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text.primary};
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
  color: ${({ theme }) => theme.text.muted};
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.danger};
    background-color: ${({ theme }) => theme.danger}20; /* 20% opacity */
  }
`;

export const FolderList: React.FC<FolderListProps> = ({ selectedFolderId, onSelectFolder }) => {
  const { folders, deleteFolder, isDeleting } = useFolders();
  const [deletingFolderId, setDeletingFolderId] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingFolderId(id);
  };

  const confirmDelete = async () => {
    if (deletingFolderId) {
      await deleteFolder(deletingFolderId);
      if (selectedFolderId === deletingFolderId) {
        onSelectFolder(''); // Deselect if deleted
      }
      setDeletingFolderId(null);
    }
  };

  return (
    <>
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
              onClick={(e) => handleDeleteClick(e, folder.id)}
              disabled={isDeleting}
            >
              <Trash2 size={14} />
            </DeleteButton>
          </FolderItem>
        ))}
      </ListContainer>

      <ConfirmationModal
        isOpen={!!deletingFolderId}
        onClose={() => setDeletingFolderId(null)}
        onConfirm={confirmDelete}
        title="Delete Folder"
        message="Are you sure you want to delete this folder? All websites inside it will also be deleted. This action cannot be undone."
        confirmText="Delete"
        isDestructive
      />
    </>
  );
};
