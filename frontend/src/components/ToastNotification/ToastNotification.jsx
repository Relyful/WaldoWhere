import { useEffect, useState } from 'react';
import styles from './ToastNotification.module.css';
import { createPortal } from "react-dom";

export default function ToastNotification({ message, onClose }) {
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    setVisible(true);

    const fadeOutTimer = setTimeout(() => setVisible(false), 4500)
    const removeTimer = setTimeout(() => onClose(), 5000)

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    }
  }, [])

  return createPortal(
    <div className={`${styles.modalContainer}`}>
      <div className={`${styles.modal} ${visible ? styles.open : "" }`}>
        {message}
      </div>
    </div>,
    document.body
  )
}