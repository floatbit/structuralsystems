<?php
/**
 * Block template file: block.php
 *
 * Video Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'video-' . $block['id'];
if ( ! empty($block['anchor'] ) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$classes = 'acf-block block-video';
if ( ! empty( $block['className'] ) ) {
    $classes .= ' ' . $block['className'];
}
if ( ! empty( $block['align'] ) ) {
    $classes .= ' align' . $block['align'];
}
?>

<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $classes ); ?>">
    <div class="container">
        <?php $mp4 = get_field('mp4'); ?>
        <?php $mp4_url = $mp4['url']; ?>
        <div class="video-container mb-4">
            <video controls class="aspect-video">
                <source src="<?php echo $mp4_url; ?>" type="video/mp4">
            </video>
        </div>
        <div class="caption">
            <?php the_field('caption'); ?>
        </div>
    </div>
</div>