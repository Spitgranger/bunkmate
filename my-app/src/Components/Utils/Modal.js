import ReactDom from "react-dom";
import "./Modal.css"
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function Modal({ open, children, onClose, modalMessage, content }) {

  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className='overlayStyles' onClick={onClose} />
      <div className='modalStyles'>
        <div className="topBar">
          <h5>Welcome To Bunkmate</h5>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon className="closeButton" />
          </IconButton>
        </div>
        <div className="modalBody">
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