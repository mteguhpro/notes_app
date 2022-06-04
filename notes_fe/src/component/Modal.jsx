import React, { useState } from 'react'

function Modal(props) {
    const [toggle, setToggle] = useState(false)

    const handleClick = (e) => {
        e.preventDefault();
        setToggle(!toggle);
    }

    return (
        <>
            <button onClick={handleClick} className="btn modal-button">open modal</button>

            <input type="checkbox" readOnly checked={toggle} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Interner user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <button onClick={handleClick} className="btn">Yay!  {props.text}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal