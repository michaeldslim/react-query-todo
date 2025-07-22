import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { ITodo, ICreateTodoRequest, IUpdateTodoRequest, ISupabaseTodo } from '../types';

class TodoApi {
  private static TABLE_NAME = 'todos';

  private static transformSupabaseTodo(supabaseTodo: ISupabaseTodo): ITodo {
    return {
      id: supabaseTodo.id,
      text: supabaseTodo.text,
      completed: supabaseTodo.completed,
      created_at: supabaseTodo.created_at,
    };
  }

  static async getTodos(): Promise<ITodo[]> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up your environment variables in .env.local file. See SUPABASE_SETUP.md for instructions.');
    }

    const { data, error } = await supabase
      .from(TodoApi.TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching todos:', error);
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }

    return data?.map(TodoApi.transformSupabaseTodo) || [];
  }

  static async createTodo(data: ICreateTodoRequest): Promise<ITodo> {
    const { data: newTodo, error } = await supabase
      .from(TodoApi.TABLE_NAME)
      .insert({
        text: data.text,
        completed: data.completed || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating todo:', error);
      throw new Error(`Failed to create todo: ${error.message}`);
    }

    return TodoApi.transformSupabaseTodo(newTodo);
  }

  static async updateTodo(data: IUpdateTodoRequest): Promise<ITodo> {
    const { id, ...updateData } = data;
    
    const { data: updatedTodo, error } = await supabase
      .from(TodoApi.TABLE_NAME)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating todo:', error);
      throw new Error(`Failed to update todo: ${error.message}`);
    }

    if (!updatedTodo) {
      throw new Error('Todo not found');
    }

    return TodoApi.transformSupabaseTodo(updatedTodo);
  }

  static async deleteTodo(id: string): Promise<void> {
    const { error } = await supabase
      .from(TodoApi.TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error);
      throw new Error(`Failed to delete todo: ${error.message}`);
    }
  }
}

export default TodoApi;
