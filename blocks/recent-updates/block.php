<?php
/**
 * Block template file: block.php
 *
 * Recent Updates Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'recent-updates-' . $block['id'];
if ( ! empty($block['anchor'] ) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$classes = 'acf-block block-recent-updates';
if ( ! empty( $block['className'] ) ) {
    $classes .= ' ' . $block['className'];
}
if ( ! empty( $block['align'] ) ) {
    $classes .= ' align' . $block['align'];
}
?>

<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $classes ); ?>">
    <div class="container mt-10">
        <h2>Added Sept 1, 2024</h2>
        <div class="grid grid-cols-2 gap-4 mb-10">
            <div data-post-id="12" data-permalink="<?php print get_the_permalink(12);?>" data-content-type="project" <?php print structural_systems_get_project_term_filters(12);?>>
                <div class="mb-2">
                    <img src="/wp-content/uploads/2024/07/1-IMAGE01-COVERIMAGE.jpg" alt="">
                </div>
                <h3>
                    People’s Pavilion
                </h3>
            </div>
            <div data-post-id="31" data-permalink="<?php print get_the_permalink(31);?>" data-content-type="project" <?php print structural_systems_get_project_term_filters(31);?>>
                <div class="mb-2">
                    <img src="/wp-content/uploads/2024/07/1-IMAGE01-COVERPICTURE.jpg" alt="">
                </div>
                <h3>Assen Stations</h3>
            </div>
        </div>

        <h2>August 2024 Updates</h2>
        <div class="grid grid-cols-2 gap-4 mb-10">
            <div data-post-id="12" data-permalink="<?php print get_the_permalink(12);?>" data-content-type="project" <?php print structural_systems_get_project_term_filters(12);?>>
                <div class="mb-2">
                    <img src="/wp-content/uploads/2024/07/1006x1234xff88cc.png" alt="">
                </div>
                <h3>
                    Moses Mabhida Stadium
                </h3>
            </div>
        </div>
    </div>
</div>