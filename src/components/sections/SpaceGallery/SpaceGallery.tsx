/**
 * SpaceGallery Section — Dream Centre
 * Photographic gallery of the physical space
 */

import { Container, OptimizedImage } from '@/components/ui';
import { getGalleryImages } from '@/lib/content';
import styles from './SpaceGallery.module.css';

export function SpaceGallery() {
  const images = getGalleryImages();

  return (
    <section 
      id="gallery" 
      className={styles.section}
      aria-labelledby="gallery-heading"
    >
      <Container size="wide">
        <header className={styles.header}>
          <p className={styles.label}>The Space</p>
          <h2 id="gallery-heading" className={styles.heading}>
            A Place of Quiet Inspiration
          </h2>
        </header>

        <div className={styles.grid}>
          {images.map((image) => (
            <figure key={image.id} className={styles.gridItem}>
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
              />
              {image.caption && (
                <figcaption className={styles.caption}>
                  <span className={styles.captionText}>{image.caption}</span>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
