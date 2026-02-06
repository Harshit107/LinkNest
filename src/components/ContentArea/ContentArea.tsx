import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, SPACING } from '../../constants/ui.constants';
import { useFolders } from '../../hooks/useFolders';
import { useWebsites } from '../../hooks/useWebsites';
import { AddWebsiteModal } from '../Modals/AddWebsiteModal';
import { ConfirmationModal } from '../Modals/ConfirmationModal';
import { WebsiteCard } from '../WebsiteCard/WebsiteCard';

interface ContentAreaProps {
  folderId: string;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${SPACING.xl};
`;

const FolderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${SPACING.sm};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: ${SPACING.sm} ${SPACING.md};
  border-radius: ${BORDER_RADIUS.md};
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${SPACING.lg};
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  padding: ${SPACING.xl};
  color: ${({ theme }) => theme.text.muted};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${SPACING.xxl};
  background-color: ${({ theme }) => theme.surface};
  border-radius: ${BORDER_RADIUS.lg};
  border: 1px dashed ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text.secondary};

  h3 {
    margin-bottom: ${SPACING.sm};
    color: ${({ theme }) => theme.text.primary};
  }

  p {
    margin-bottom: ${SPACING.lg};
  }
`;

export const ContentArea: React.FC<ContentAreaProps> = ({ folderId }) => {
  const { websites, isLoading, addWebsite, deleteWebsite } = useWebsites(folderId);
  const { folders } = useFolders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingWebsiteId, setDeletingWebsiteId] = useState<string | null>(null);

  const currentFolder = folders.find(f => f.id === folderId);

  const handleAddWebsite = async (data: { title: string; url: string }) => {
    await addWebsite({ ...data, folderId });
  };

  const handleDeleteRequest = (id: string) => {
    setDeletingWebsiteId(id);
  };

  const confirmDelete = async () => {
    if (deletingWebsiteId) {
      await deleteWebsite(deletingWebsiteId);
      setDeletingWebsiteId(null);
    }
  };

  if (isLoading) return <LoadingState>Loading websites...</LoadingState>;

  return (
    <Container>
      <ContentHeader>
        <FolderTitle>{currentFolder?.name || 'Folder'}</FolderTitle>
        <HeaderActions>
          <AddButton onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add Website
          </AddButton>
        </HeaderActions>
      </ContentHeader>

      {websites.length === 0 ? (
        <EmptyState>
          <h3>No websites yet</h3>
          <p>Add your first website to this collection.</p>
          <AddButton onClick={() => setIsModalOpen(true)}>
            Add Website
          </AddButton>
        </EmptyState>
      ) : (
        <Grid>
          {websites.map(site => (
            <WebsiteCard 
              key={site.id} 
              website={site} 
              onDelete={handleDeleteRequest}
            />
          ))}
        </Grid>
      )}

      <AddWebsiteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddWebsite}
      />

      <ConfirmationModal
        isOpen={!!deletingWebsiteId}
        onClose={() => setDeletingWebsiteId(null)}
        onConfirm={confirmDelete}
        title="Delete Website"
        message="Are you sure you want to delete this website? This action cannot be undone."
        confirmText="Delete"
        isDestructive
      />
    </Container>
  );
};
