import React, { useState } from 'react';
import { useCreateTodo } from '../hooks/useTodos';

const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const createTodoMutation = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim()) {
      createTodoMutation.mutate(
        { text: text.trim() },
        {
          onSuccess: () => {
            setText('');
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          disabled={createTodoMutation.isPending}
          className="todo-input"
        />
        <button 
          type="submit" 
          disabled={!text.trim() || createTodoMutation.isPending}
          className="add-btn"
        >
          {createTodoMutation.isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
      
      {createTodoMutation.isError && (
        <div className="error-message">
          Failed to add todo. Please try again.
        </div>
      )}
    </form>
  );
};

export default AddTodo;
