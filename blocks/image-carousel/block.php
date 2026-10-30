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
<?php get_template_part('parts/image-carousel', null, ['id' => $id, 'classes' => $classes, 'images' => $images]); ?>
