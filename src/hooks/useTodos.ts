import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TodoApi from '../api/todoApi';
import type { ITodo, ICreateTodoRequest, IUpdateTodoRequest } from '../types';

// Query keys for React Query
export const QUERY_KEYS = {
  TODOS: ['todos'] as const,
} as const;

// Hook to fetch all todos
export const useTodos = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TODOS,
    queryFn: TodoApi.getTodos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

// Hook to create a new todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateTodoRequest) => TodoApi.createTodo(data),
    onSuccess: (newTodo) => {
      // Optimistically update the cache
      queryClient.setQueryData<ITodo[]>(QUERY_KEYS.TODOS, (oldTodos) => {
        return oldTodos ? [...oldTodos, newTodo] : [newTodo];
      });
    },
    onError: () => {
      // Invalidate and refetch on error
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};

// Hook to update a todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateTodoRequest) => TodoApi.updateTodo(data),
    onSuccess: (updatedTodo) => {
      // Optimistically update the cache
      queryClient.setQueryData<ITodo[]>(QUERY_KEYS.TODOS, (oldTodos) => {
        return oldTodos?.map(todo => 
          todo.id === updatedTodo.id ? updatedTodo : todo
        ) || [];
      });
    },
    onError: () => {
      // Invalidate and refetch on error
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};

// Hook to delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TodoApi.deleteTodo(id),
    onSuccess: (_, deletedId) => {
      // Optimistically update the cache
      queryClient.setQueryData<ITodo[]>(QUERY_KEYS.TODOS, (oldTodos) => {
        return oldTodos?.filter(todo => todo.id !== deletedId) || [];
      });
    },
    onError: () => {
      // Invalidate and refetch on error
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};
