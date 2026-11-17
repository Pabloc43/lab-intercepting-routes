import Image from 'next/image';

import type { Photo } from '../catalog';
import styles from './PhotoDetail.module.css';

interface PhotoDetailProps {
  photo: Photo;
  mode: 'modal' | 'page';
}

export function PhotoDetail({ photo, mode }: PhotoDetailProps) {
  const Heading = mode === 'page' ? 'h1' : 'h2';
  const sizes = mode === 'page' ? '(max-width: 74rem) 90vw, 68rem' : '(max-width: 47rem) 90vw, 44rem';

  return (
    <article className={styles.detail} data-testid="photo-detail">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{photo.location}</p>
        <Heading>{photo.title}</Heading>
        <p className={styles.description}>{photo.description}</p>
      </div>
      <figure className={styles.media}>
        <div className={styles.imageFrame}>
          <Image
            fill
            src={photo.src}
            alt={photo.alt}
            sizes={sizes}
            className={styles.image}
            unoptimized
          />
        </div>
        <figcaption className={styles.caption}>{photo.credit}</figcaption>
      </figure>
    </article>
  );
}
