'use client';

import type { ReactNode } from 'react';

import { useModal } from './useModal';
import styles from './PhotoModal.module.css';

interface PhotoModalProps {
  children: ReactNode;
  photoId: string;
  title: string;
  standaloneHref?: string;
}

export function PhotoModal({ children, photoId, title, standaloneHref }: PhotoModalProps) {
  const { dialogRef, closeRef, closeModal, handleCancel } = useModal(photoId);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={title}
      onCancel={handleCancel}
    >
      <div className={styles.toolbar}>
        <span>Vista rápida</span>
        <button ref={closeRef} className={styles.close} type="button" onClick={closeModal}>
          Cerrar <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className={styles.content}>
        {children}
        {standaloneHref ? (
          <a className={styles.standalone} href={standaloneHref} target="_blank" rel="noopener">
            Abrir como página (nueva pestaña) <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </dialog>
  );
}
