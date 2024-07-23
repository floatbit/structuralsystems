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
            <div>
                <h6>Model Builders</h6>
                <ul>
                    <li>Builder Name 1</li>
                    <li>Builder Name 2</li>
                </ul>
            </div>
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
            <div>
                <h6>Materials Used</h6>
                <ul>
                    <li>Wood</li>
                    <li>Metal</li>
                </ul>
            </div>
            <div>
                <h6>Year of Construction</h6>
                <p>2024</p>
            </div>
            <div>
                <h6>Inspired By</h6>
                <p>Statue of Liberty</p>
            </div>
            <div>
                <h6>Architects</h6>
                <ul>
                    <li>Firm Name 1</li>
                    <li>Architect/Firm Name 2</li>
                </ul>
            </div>
            <div>
                <h6>Year Built</h6>
                <p>2022</p>
            </div>
            <div>
                <h6>Building Program Type</h6>
                <p>Museum</p>
            </div>
            <div>
                <h6>More Information</h6>
                <ul>
                    <li><a href="https://example.com/building-info-1">Link 1</a></li>
                    <li><a href="https://example.com/building-info-2">Link info 2</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>