export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
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

export interface ISupabaseTodo {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
}
