import ReactDom from "react-dom";
import React from 'react'
import "./Modal.css"
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface ModalProps {
    open: boolean
    children?: React.ReactElement[] | React.ReactElement
    onClose: () => void
    modalMessage: string
    content?: React.ReactElement
    cardTitle?: string
    flexibleContainer?: boolean
}

export default function Modal({
                                  open,
                                  children,
                                  onClose,
                                  modalMessage,
                                  content,
                                  flexibleContainer,
                                  cardTitle
                              }: ModalProps) {

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='overlayStyles' onClick={onClose}/>
            {/* Fixed container width and height or not fixed */}
            <div className={flexibleContainer ? "flexibleContainer" : "fixedContainer"}>
                <div className="topBar">
                    <h5>{cardTitle ?? "Welcome To Bunkmate"}</h5>
                    <IconButton onClick={onClose}>
                        <CloseRoundedIcon className="closeButton"/>
                    </IconButton>
                </div>
                <div className="modalBody">
                    <h3>{modalMessage}</h3>
                    {children}
                    {content}
                </div>
            </div>
        </>,
        document.getElementById('portal')!
    )
}
;