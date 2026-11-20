import styles from './GalleryFooter.module.css';

export function GalleryFooter() {
  return (
    <footer className={styles.footer}>
      <span>Intercepting Routes · Parallel Routes</span>
      <a href="/photos/CREDITS.md">Créditos de las imágenes</a>
    </footer>
  );
}
