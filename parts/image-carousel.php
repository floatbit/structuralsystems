<?php
$id = $args['id'];
$classes = $args['classes'] ?? 'acf-block block-image-carousel';
$images = $args['images'];
?>
<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($classes); ?>" role="region" aria-label="Image carousel">
    <div class="container">
        <div class="swiper image-carousel-track">
            <div class="swiper-wrapper">
                <?php foreach ($images as $image):
                    $ratio = max(1, (int) $image['width']) / max(1, (int) $image['height']);
                    $description = get_field('image_description', $image['ID']);
                    $label = !empty($image['alt']) ? $image['alt'] : $image['title'];
                ?>
                <div class="swiper-slide image" style="--image-ratio: <?php echo esc_attr($ratio); ?>;" data-image-enlarge>
                    <button type="button" class="image-carousel-zoom" aria-label="<?php echo esc_attr('Enlarge image: ' . $label); ?>">
                        <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" width="<?php echo esc_attr($image['width']); ?>" height="<?php echo esc_attr($image['height']); ?>" loading="lazy" decoding="async">
                        <?php if ($description): ?>
                        <span class="ellipses" aria-hidden="true">&hellip;</span>
                        <?php endif; ?>
                    </button>
                    <?php get_template_part('parts/image-caption', null, ['image_id' => $image['ID'], 'description' => $description]); ?>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="image-carousel-controls">
            <button type="button" class="image-carousel-prev" aria-label="Previous image">&larr; Previous</button>
            <button type="button" class="image-carousel-next" aria-label="Next image">Next &rarr;</button>
        </div>
    </div>
</div>
