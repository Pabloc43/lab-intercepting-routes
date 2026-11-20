import type { Photo } from '../catalog';
import { PhotoCard } from './PhotoCard';
import styles from './PhotoGrid.module.css';

interface PhotoGridProps {
  photos: readonly Photo[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <main className={styles.page} data-testid="photo-grid">
      <header className={styles.header}>
        <p className={styles.wordmark}>Cuaderno de ruta</p>
        <p className={styles.edition}>Laboratorio · 01</p>
      </header>

      <section className={styles.intro} aria-labelledby="gallery-title">
        <div className={styles.lead}>
          <p className={styles.eyebrow}>Next.js App Router</p>
          <h1 id="gallery-title">Una foto, dos<br className={styles.break} /> formas de verla.</h1>
        </div>
        <div className={styles.instructions}>
          <p>Desde la galería, la foto se abre encima sin perder tu lugar. La misma URL, abierta en otra pestaña, muestra una página completa.</p>
          <p className={styles.routeHint}><code>/galeria</code><span aria-hidden="true"> → </span><code>/foto/[id]</code></p>
        </div>
      </section>

      <section aria-labelledby="collection-title">
        <div className={styles.sectionHeading}>
          <h2 id="collection-title">Galería de paisajes</h2>
          <span>{photos.length} fotos</span>
        </div>

        <ul className={styles.grid}>
          {photos.map((photo, index) => (
            <li key={photo.id}>
              <PhotoCard photo={photo} position={index + 1} />
            </li>
          ))}
        </ul>
      </section>

      <footer className={styles.footer}>
        <span>Intercepting Routes · Parallel Routes</span>
        <a href="/photos/CREDITS.md">Créditos de las imágenes</a>
      </footer>
    </main>
  );
}
