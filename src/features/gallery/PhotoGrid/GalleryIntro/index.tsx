import styles from './GalleryIntro.module.css';

export function GalleryIntro() {
  return (
    <section className={styles.intro} aria-labelledby="gallery-title">
      <div className={styles.lead}>
        <p className={styles.eyebrow}>Next.js App Router</p>
        <h1 id="gallery-title">
          Una foto, dos
          <br className={styles.break} /> formas de verla.
        </h1>
      </div>

      <div className={styles.instructions}>
        <p>
          Desde la galería, la foto se abre encima sin perder tu lugar. La misma URL,
          abierta en otra pestaña, muestra una página completa.
        </p>
        <p className={styles.routeHint}>
          <code>/galeria</code>
          <span aria-hidden="true"> → </span>
          <code>/foto/[id]</code>
        </p>
      </div>
    </section>
  );
}
