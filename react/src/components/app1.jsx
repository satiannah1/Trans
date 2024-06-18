// 



import React, { useState } from 'react';
const Todo = ({ sendDataToParent }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const handleChange = (event) => {
    setTaskTitle(event.target.value);
  };
  const sendDataToParentHandler = () => {
  
    sendDataToParent(taskTitle);
  };
  return (
    <div>
      <h2>Child Component</h2>
      <input type="text" value={taskTitle} onChange={handleChange} />
      <button onClick={sendDataToParentHandler}>Send Data to Parent</button>
    </div>
  );
};
export default Todo;