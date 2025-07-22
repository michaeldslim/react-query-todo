export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  created_at: string; // Match Supabase snake_case convention
}

export interface ICreateTodoRequest {
  text: string;
  completed?: boolean;
}

export interface IUpdateTodoRequest {
  id: string;
  text?: string;
  completed?: boolean;
}

// Supabase specific types
export interface ISupabaseTodo {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
}
