import Link from 'next/link';

import styles from './page.module.css';

export default function PhotoNotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.notFound}>
        <p className={styles.eyebrow}>Archivo de paisajes</p>
        <h1>Foto no encontrada</h1>
        <p>El enlace no corresponde a ninguna foto de esta galería.</p>
        <Link className={styles.back} href="/galeria">
          <span aria-hidden="true">←</span> Volver a la galería
        </Link>
      </div>
    </main>
  );
}
