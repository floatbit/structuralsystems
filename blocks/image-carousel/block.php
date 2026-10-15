<?php
$id = !empty($block['anchor']) ? $block['anchor'] : 'image-carousel-' . $block['id'];
$classes = 'acf-block block-image-carousel';
if (!empty($block['className'])) {
    $classes .= ' ' . $block['className'];
}
if (!empty($block['align'])) {
    $classes .= ' align' . $block['align'];
}
$images = get_field('images') ?: [];
if (!$images) {
    if (!empty($is_preview)) {
        echo '<p>Select images to preview the Image Carousel.</p>';
    }
    return;
}
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
                    </button>
                    <?php if ($description): ?>
                    <div class="caption hidden"><?php echo wp_kses_post($description); ?></div>
                    <?php endif; ?>
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
