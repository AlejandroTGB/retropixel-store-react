import { useState, useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ mensaje, tipo, duracion = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duracion);

    return () => clearTimeout(timer);
  }, [duracion, onClose]);

  if (!visible) return null;

  return (
    <div className={`${styles.toast} ${styles[tipo]}`}>
      <div className={styles.contenido}>
        <span className={styles.icono}>
          {tipo === 'exito' && '✓'}
          {tipo === 'error' && '✕'}
          {tipo === 'info' && 'i'}
        </span>
        <p>{mensaje}</p>
      </div>
    </div>
  );
}
