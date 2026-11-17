'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

import styles from './PhotoModal.module.css';

interface PhotoModalProps {
  children: ReactNode;
  photoId: string;
  title: string;
  standaloneHref?: string;
}

export function PhotoModal({ children, photoId, title, standaloneHref }: PhotoModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const trigger = document.getElementById(`gallery-photo-${photoId}`);
    const previousFocus = document.activeElement;
    closing.current = false;

    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      const target = trigger ?? previousFocus;
      if (target instanceof HTMLElement && target.isConnected) {
        target.focus({ preventScroll: true });
      }
    };
  }, [photoId]);

  function closeModal() {
    if (closing.current) return;
    closing.current = true;
    router.back();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
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
