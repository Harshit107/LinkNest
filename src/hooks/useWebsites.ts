import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addWebsite, deleteWebsite, fetchWebsites } from '../api';

export const useWebsites = (folderId: string | null) => {
  const queryClient = useQueryClient();

  const websitesQuery = useQuery({
    queryKey: ['websites', folderId],
    queryFn: () => folderId ? fetchWebsites(folderId) : Promise.resolve([]),
    enabled: !!folderId,
  });

  const addWebsiteMutation = useMutation({
    mutationFn: (website: { title: string; url: string; folderId: string }) => addWebsite(website),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['websites', variables.folderId] });
    },
  });

  const deleteWebsiteMutation = useMutation({
    mutationFn: (id: string) => deleteWebsite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
    },
  });

  return {
    websites: websitesQuery.data || [],
    isLoading: websitesQuery.isLoading,
    addWebsite: addWebsiteMutation.mutateAsync,
    isAdding: addWebsiteMutation.isPending,
    deleteWebsite: deleteWebsiteMutation.mutateAsync,
    isDeleting: deleteWebsiteMutation.isPending,
  };
};
