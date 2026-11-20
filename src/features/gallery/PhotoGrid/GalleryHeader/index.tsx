import styles from './GalleryHeader.module.css';

export function GalleryHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.wordmark}>Cuaderno de ruta</p>
      <p className={styles.edition}>Laboratorio · 01</p>
    </header>
  );
}
