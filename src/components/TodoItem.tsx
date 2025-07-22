import React, { useState } from 'react';
import type { ITodo } from '../types';
import { useUpdateTodo, useDeleteTodo } from '../hooks/useTodos';

interface ITodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleToggleComplete = () => {
    updateTodoMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== todo.text) {
      updateTodoMutation.mutate({
        id: todo.id,
        text: editText.trim(),
      });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={updateTodoMutation.isPending}
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSaveEdit}
            className="edit-input"
            autoFocus
          />
        ) : (
          <span 
            className={`todo-text ${todo.completed ? 'completed-text' : ''}`}
            onDoubleClick={handleEdit}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {!isEditing && (
          <>
            <button 
              onClick={handleEdit}
              disabled={updateTodoMutation.isPending}
              className="edit-btn"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete}
              disabled={deleteTodoMutation.isPending}
              className="delete-btn"
            >
              {deleteTodoMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
