import './modal.css';

export const Modal = ({ children, setOpen }) => {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-close' onClick={() => setOpen(false)}>
                    &times;
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};
