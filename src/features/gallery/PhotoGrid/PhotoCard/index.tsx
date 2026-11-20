import Image from 'next/image';
import Link from 'next/link';

import type { Photo } from '../../catalog';
import styles from './PhotoCard.module.css';

interface PhotoCardProps {
  photo: Photo;
  position: number;
}

export function PhotoCard({ photo, position }: PhotoCardProps) {
  return (
    <Link
      className={styles.card}
      href={`/foto/${photo.id}`}
      data-photo-id={photo.id}
      id={`gallery-photo-${photo.id}`}
      scroll={false}
    >
      <div className={styles.frame}>
        <Image
          alt=""
          fill
          src={photo.src}
          sizes="(max-width: 38rem) 94vw, (max-width: 56rem) 46vw, (max-width: 74rem) 30vw, 22rem"
          className={styles.image}
          unoptimized
        />
      </div>

      <div className={styles.caption}>
        <span className={styles.number} aria-hidden="true">
          {String(position).padStart(2, '0')}
        </span>
        <span className={styles.name}>{photo.title}</span>
        <span className={styles.arrow} aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}
