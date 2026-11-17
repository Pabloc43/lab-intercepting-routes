import { photos } from '@/features/gallery/catalog';
import { PhotoGrid } from '@/features/gallery/PhotoGrid';

export default function GalleryPage() {
  return <PhotoGrid photos={photos} />;
}
