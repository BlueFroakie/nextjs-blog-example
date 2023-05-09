import { useEffect, PropsWithChildren } from 'react'
import modalStyles from './modal.module.scss'

interface Props {
  children: React.ReactNode;
  onClose(): void; 
  show: boolean;
  title: string;
}

const Modal = ({ children, onClose, show, title }: Props) => {

  const closeOnEscape = (e: { charCode: number; keyCode: number; }) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className={`${modalStyles.modal} ${show && modalStyles.show}` } onClick={onClose}>
      <div
        className={modalStyles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalStyles.modalHeader}>
          <h4 className={modalStyles.modalTitle}> {title} </h4>
        </div>
        <div className={modalStyles.modalBody}> {children} </div>
        <div className={modalStyles.modalFooter}>
          <button className={modalStyles.closeButton} onClick={onClose}>
            {" "}
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal