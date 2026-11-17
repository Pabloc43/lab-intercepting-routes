import Link from 'next/link';
import { notFound } from 'next/navigation';

import { findPhoto } from '@/features/gallery/catalog';
import { PhotoDetail } from '@/features/gallery/PhotoDetail';

import styles from './page.module.css';

interface PhotoPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params;
  const photo = findPhoto(id);

  if (!photo) {
    notFound();
  }

  return (
    <main className={styles.page} data-testid="photo-page">
      <Link className={styles.back} href="/galeria">
        <span aria-hidden="true">←</span> Volver a la galería
      </Link>
      <PhotoDetail photo={photo} mode="page" />
    </main>
  );
}
