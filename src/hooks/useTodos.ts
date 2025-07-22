import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TodoApi from '../api/todoApi';
import type { ITodo, ICreateTodoRequest, IUpdateTodoRequest } from '../types';

export const QUERY_KEYS = {
  TODOS: ['todos'] as const,
} as const;

// fetch all todos
export const useTodos = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TODOS,
    queryFn: TodoApi.getTodos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (cache time)
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateTodoRequest) => TodoApi.createTodo(data),
    onSuccess: (newTodo) => {
      // update the cache
      queryClient.setQueryData<ITodo[]>(QUERY_KEYS.TODOS, (oldTodos) => {
        return oldTodos ? [...oldTodos, newTodo] : [newTodo];
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdateTodoRequest) => TodoApi.updateTodo(data),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<ITodo[]>(QUERY_KEYS.TODOS, (oldTodos) => {
        return oldTodos?.map(todo => 
          todo.id === updatedTodo.id ? updatedTodo : todo
        ) || [];
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TodoApi.deleteTodo(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<ITodo[]>(QUERY_KEYS.TODOS, (oldTodos) => {
        return oldTodos?.filter(todo => todo.id !== deletedId) || [];
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};
