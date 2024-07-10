<?php
/**
 * Block template file: block.php
 *
 * Images Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'images-' . $block['id'];
if ( ! empty($block['anchor'] ) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$classes = 'acf-block block-images';
if ( ! empty( $block['className'] ) ) {
    $classes .= ' ' . $block['className'];
}
if ( ! empty( $block['align'] ) ) {
    $classes .= ' align' . $block['align'];
}
?>

<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $classes ); ?>">
    <div class="container">
        <div class="flex gap-2 md:gap-8">
            <?php $images = get_field('images');?>
            <?php foreach($images as $image):?>
            <div class="image" style="flex: <?php print $image['width'] / $image['height'];?>;">
                <p>
                    <img src="<?php print $image['url'];?>" alt="">
                </p>
                <?php if ($image['caption']):?>
                    <p class="caption">
                        <?php print $image['caption'];?>
                    </p>
                <?php endif;?>
            </div>
            <?php endforeach;?>
        </div>
    </div>
</div>