/*import React from 'react';
const Wrapper =({children})=>{
 return(
 <div style={{border:'2px solid red',padding:'30px',color:'black'}}> 
  {children}
  </div>

);
}
export default Wrapper;

import React from 'react';
const Comp =()=>{
 return(
 <>
 <h1>Hello</h1>
 <p>This is</p>
 </>

);
}
export default Comp;

import React,{useRef}from 'react';

const refTest=()=>{
 const MyRef=useRef(null);
}
const handleClick()=>{
 myRef.current.focus();
}

return(
 <div
)



import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className='modal'>
      <div className='modal-container'>
        <div className='modal-body'>
          <p>My modal</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;


import React, { useRef } from 'react';

const RefTest = () => {
  const myRef = useRef(null);

  const handleClick = () => {
    myRef.current.focus();
  };

  return (
    <div>
      <input ref={myRef} type="text" />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
};

export default RefTest;*/
 import React,{useState,useEffect}from 'react';
 const Loading=()=>{
const[data,setData]=useState(null);
const[loading,setLoading]=useState(false);
const[error,setError]=useState(null);

 

 useEffect(()=>{
  setLoading(true);
  fetch('http://localhost:3000/drive')
  .then(response=>response.json)
  .then(data=>setData(data))
  .catch(error=>setError(error))
  .catch(()=>setLoading(false))


 } ,[]);

 if(loading){return <div>Loading...</div>}
 if(error){return <div>error:{error.message}</div>}
 if(!data){return null}

 return(
  <div>
   <h1>here:{data.title}</h1>
  </div>
 )
}
export default Loading
