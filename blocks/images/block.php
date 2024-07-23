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
        <div class="md:flex gap-2 md:gap-8">
            <?php $images = get_field('images');?>
            <?php foreach($images as $image):?>
                <?php $image_description = get_field('image_description', $image['ID']);?>
            <div class="image" style="flex: <?php print $image['width'] / $image['height'];?>;" data-image-enlarge>
                <p class="relative">
                    <img src="<?php print $image['url'];?>" alt="">
                    <?php if ($image_description):?>
                        <span class="ellipses">&hellip;</span>
                    <?php endif;?>
                </p>
                <?php if ($image_description):?>
                    <div class="caption hidden">
                        <?php print $image_description; ?>
                    </div>
                <?php endif;?>
            </div>
            <?php endforeach;?>
        </div>
    </div>
</div>