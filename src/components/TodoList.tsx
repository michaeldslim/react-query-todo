import React from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { data: todos, isLoading, error, isError } = useTodos();

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error">
        <p>Error loading todos: {error?.message}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Create your first todo above!</p>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-list">
      <div className="todo-stats">
        <p>
          {completedCount} of {totalCount} completed
          {completedCount === totalCount && totalCount > 0 && ' 🎉'}
        </p>
      </div>
      
      <div className="todos">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
