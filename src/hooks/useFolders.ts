import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFolder, deleteFolder, fetchFolders } from '../api';

export const useFolders = () => {
  const queryClient = useQueryClient();

  const foldersQuery = useQuery({
    queryKey: ['folders'],
    queryFn: fetchFolders,
  });

  const createFolderMutation = useMutation({
    mutationFn: (name: string) => createFolder(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });

  const deleteFolderMutation = useMutation({
    mutationFn: (id: string) => deleteFolder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      // Also strictly need to handle websites associated with this folder, 
      // but for this mock level we just delete the folder.
    },
  });

  return {
    folders: foldersQuery.data || [],
    isLoading: foldersQuery.isLoading,
    createFolder: createFolderMutation.mutateAsync,
    deleteFolder: deleteFolderMutation.mutateAsync,
    isCreating: createFolderMutation.isPending,
    isDeleting: deleteFolderMutation.isPending,
  };
};
