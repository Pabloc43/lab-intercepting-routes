import { useRouter } from 'next/navigation';
import { useLayoutEffect, useRef, type SyntheticEvent } from 'react';

export function useModal(photoId: string) {
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

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    closeModal();
  }

  return { dialogRef, closeRef, closeModal, handleCancel };
}
