import React from 'react'

function ModalWithCancel({show, handleClose, modalAction, modalContent}) {
    const handleClick = () =>{
        if(typeof handleClose === 'function'){
            handleClose()
        }else{
            console.warn('typeof handleClose is '+ typeof handleClose+', expected function')
        }
    }
    
    return (
        <>
            <input type="checkbox" readOnly checked={show} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={handleClick} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    { modalContent }
                    <div className="modal-action">
                        { modalAction }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalWithCancel