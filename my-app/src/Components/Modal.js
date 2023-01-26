import ReactDom from "react-dom";
import "./Modal.css"
import { IoIosCloseCircle } from 'react-icons/io';

export default function Modal({ open, children, onClose, modalMessage, content }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className='overlayStyles' />
      <div className='modalStyles'>
        <div className="topBar">
          <h5>Welcome To Bunkmate</h5>
          <label>
            <IoIosCloseCircle size={30} className="closeButton" />
            <button style={{ display: 'none' }} onClick={onClose}></button>
          </label>
        </div>

        <div className="body">
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