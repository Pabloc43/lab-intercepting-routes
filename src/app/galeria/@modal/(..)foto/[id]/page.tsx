import { findPhoto } from '@/features/gallery/catalog';
import { PhotoDetail } from '@/features/gallery/PhotoDetail';
import { PhotoModal } from '@/features/gallery/PhotoModal';

interface InterceptedPhotoPageProps {
  params: Promise<{ id: string }>;
}

export default async function InterceptedPhotoPage({ params }: InterceptedPhotoPageProps) {
  const { id } = await params;
  const photo = findPhoto(id);

  if (!photo) {
    return (
      <PhotoModal photoId={id} title="Foto no encontrada">
        <h2>Foto no encontrada</h2>
        <p>El enlace no corresponde a ninguna foto de esta galería.</p>
      </PhotoModal>
    );
  }

  return (
    <PhotoModal photoId={id} title={photo.title} standaloneHref={`/foto/${id}`}>
      <PhotoDetail photo={photo} mode="modal" />
    </PhotoModal>
  );
}
