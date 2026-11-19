<?php
/**
 * Block template file: block.php
 *
 * Project Details Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'project-details-' . $block['id'];
if ( ! empty($block['anchor'] ) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$classes = 'acf-block block-project-details';
if ( ! empty( $block['className'] ) ) {
    $classes .= ' ' . $block['className'];
}
if ( ! empty( $block['align'] ) ) {
    $classes .= ' align' . $block['align'];
}
?>

<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $classes ); ?>">
    <div class="container">
        <div class="text hidden">
            <h2>Lorem Ipsum</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sit temporibus asperiores maiores soluta eligendi numquam totam, blanditiis amet cum possimus tempore sequi voluptates laboriosam, voluptate, beatae reiciendis nemo dolore!</p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:gap-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 details">
            <?php foreach ([
                'project-builder' => 'Model Builders',
                'project-category' => 'Structural Types',
                'project-year' => 'Model Year',
                'project-material' => 'Model Materials',
            ] as $taxonomy => $label):
                $terms = get_the_terms($post_id ?: get_the_ID(), $taxonomy);
                if (!$terms || is_wp_error($terms)) continue;
            ?>
            <div>
                <h6><?php echo esc_html($label); ?></h6>
                <ul>
                    <?php foreach ($terms as $term): ?>
                    <li><?php echo esc_html($term->name); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <?php endforeach; ?>
            <?php $more_information_links = get_field('more_information_links', $post_id);?>
            <?php if ($more_information_links):?>
            <div>
                <h6>More Information</h6>
                <ul>
                    <?php foreach ($more_information_links as $link):?>
                    <li><a href="<?php echo esc_url($link['link']['url']);?>" target="<?php echo esc_attr($link['link']['target']);?>"><?php echo esc_html($link['link']['title']);?></a></li>
                    <?php endforeach;?>
                </ul>
            </div>
            <?php endif;?>
        </div>
    </div>
    <?php $carousel_images = structural_systems_get_project_images($post_id ?: get_the_ID()); ?>
    <?php if ($carousel_images): ?>
    <div class="project-details-carousel mt-20 mb-24">
        <?php get_template_part('parts/image-carousel', null, [
            'id' => $id . '-carousel',
            'images' => $carousel_images,
        ]); ?>
    </div>
    <?php endif; ?>
</div>
