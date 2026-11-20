import type { Photo } from '../catalog';
import { GalleryFooter } from './GalleryFooter';
import { GalleryHeader } from './GalleryHeader';
import { GalleryIntro } from './GalleryIntro';
import { PhotoCard } from './PhotoCard';
import styles from './PhotoGrid.module.css';

interface PhotoGridProps {
  photos: readonly Photo[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <main className={styles.page} data-testid="photo-grid">
      <GalleryHeader />

      <GalleryIntro />

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

      <GalleryFooter />
    </main>
  );
}
