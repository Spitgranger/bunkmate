import ReactDom from "react-dom";
import "./Modal.css"
import { IoIosCloseCircle } from 'react-icons/io';
import { useState } from "react";


export default function Modal({ open, children, onClose, modalMessage, content }) {
  const [hover, setHover] = useState(false);

  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className='overlayStyles' onClick={onClose} />
      <div className='modalStyles'>
        <div className="topBar">
          <h5>Welcome To Bunkmate</h5>
          <label>
            <IoIosCloseCircle
              onClick={onClose}
              style={{ cursor: "pointer" }}
              color={hover ? "grey" : "black"}
              size={30}
              className="closeButton"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onMouseDown={() => setHover(false)}
            />
          </label>
        </div>

        <div className="ModalBody">
          <h3>{modalMessage}</h3>
          {children}
          {content}
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
;