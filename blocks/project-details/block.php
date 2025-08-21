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
        <div class="md:grid gap-2 md:gap-8 grid-cols-4 details">
            <?php $terms = get_the_terms($post_id, 'project-builder');?>
            <?php if ($terms):?>
            <div>
                <h6>Model Builders</h6>
                <ul>
                    <?php
                    if ($terms && ! is_wp_error($terms)) {
                        foreach ($terms as $term) {
                            echo '<li>' . esc_html($term->name) . '</li>';
                        }
                    }
                    ?>
                </ul>
            </div>
            <?php endif;?>
            <?php $terms = get_the_terms($post_id, 'project-category');?>
            <?php if ($terms):?>
            <div>
                <h6>Structural Types</h6>
                <ul>
                    <?php
                    if ($terms && ! is_wp_error($terms)) {
                        foreach ($terms as $term) {
                            echo '<li>' . esc_html($term->name) . '</li>';
                        }
                    }
                    ?>
                </ul>
            </div>
            <?php endif;?>
            <?php $terms = get_the_terms($post_id, 'project-material');?>
            <?php if ($terms):?>
            <div>
                <h6>Materials Used</h6>
                <ul>
                    <?php
                    if ($terms && ! is_wp_error($terms)) {
                        foreach ($terms as $term) {
                            echo '<li>' . esc_html($term->name) . '</li>';
                        }
                    }
                    ?>
                </ul>
            </div>
            <?php endif;?>
            <?php $terms = get_the_terms($post_id, 'project-construction');?>
            <?php if ($terms):?>
            <div>
                <h6>Year Model Built</h6>
                <ul>
                    <?php
                    if ($terms && ! is_wp_error($terms)) {
                        foreach ($terms as $term) {
                            echo '<li>' . esc_html($term->name) . '</li>';
                        }
                    }
                    ?>
                </ul>
            </div>
            <?php endif;?>
            <?php $terms = get_the_terms($post_id, 'project-inspired');?>   
            <?php if ($terms):?>
            <div>
                <h6>Inspired By</h6>
                <ul>
                    <?php
                    if ($terms && ! is_wp_error($terms)) {
                        foreach ($terms as $term) {
                            echo '<li>' . esc_html($term->name) . '</li>';
                        }
                    }
                    ?>
                </ul>
            </div>
            <?php endif;?>
            <?php $terms = get_the_terms($post_id, 'project-architect');?>
            <?php if ($terms):?>
            <div>
                <h6>Architects</h6>
                <ul>
                    <?php
                    if ($terms && ! is_wp_error($terms)) {
                        foreach ($terms as $term) {
                            echo '<li>' . esc_html($term->name) . '</li>';
                        }
                    }
                    ?>
                </ul>
            </div>
            <?php endif;?>
            <?php $terms = get_the_terms($post_id, 'project-year');?>
            <?php if ($terms):?>
            <div>
                <h6>Year Built</h6>
                <ul>
                    <?php
                    if ($terms && ! is_wp_error($terms)) {
                        foreach ($terms as $term) {
                            echo '<li>' . esc_html($term->name) . '</li>';
                        }
                    }
                    ?>
                </ul>
            </div>
            <?php endif;?>
            <?php $terms = get_the_terms($post_id, 'project-location');?>
            <?php if ($terms):?>
            <div>
                <h6>Location</h6>
                <ul>
                    <?php
                    if ($terms && ! is_wp_error($terms)) {
                        foreach ($terms as $term) {
                            echo '<li>' . esc_html($term->name) . '</li>';
                        }
                    }
                    ?>
                </ul>
            </div>
            <?php endif;?>
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
</div>