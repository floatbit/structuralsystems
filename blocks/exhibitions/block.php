<?php
/**
 * Block template file: block.php
 *
 * Exhibitions Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'exhibitions-' . $block['id'];
if ( ! empty($block['anchor'] ) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$classes = 'acf-block block-exhibitions';
if ( ! empty( $block['className'] ) ) {
    $classes .= ' ' . $block['className'];
}
if ( ! empty( $block['align'] ) ) {
    $classes .= ' align' . $block['align'];
}
$title = get_field('title');
$exhibitions = get_field('exhibitions') ?: [];
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($classes); ?>">
    <div class="container">
        <?php if ($title): ?>
            <h2><?php echo esc_html($title); ?></h2>
        <?php endif; ?>
        <?php foreach ($exhibitions as $exhibition):
            $exhibition_id = $exhibition->ID;
            $date = get_field('date', $exhibition_id);
            $external_link = get_field('external_link', $exhibition_id);
            $link_url = is_array($external_link) ? esc_url($external_link['url'] ?? '') : '';
            $link_target = !empty($external_link['target']) ? $external_link['target'] : '_self';
            $link_title = !empty($external_link['title']) ? $external_link['title'] : $link_url;
            $link_attributes = 'href="' . $link_url . '" target="' . esc_attr($link_target) . '"';
            if ($link_target === '_blank') {
                $link_attributes .= ' rel="noopener noreferrer"';
            }
        ?>
        <div class="exhibition">
            <h3>
                    <?php echo esc_html(get_the_title($exhibition_id)); ?>
            </h3>
            <?php if (has_post_thumbnail($exhibition_id)): ?>
            <p>
                    <?php echo get_the_post_thumbnail($exhibition_id, 'large'); ?>
            </p>
            <?php endif; ?>
            <?php if ($date): ?>
                <h4><?php echo esc_html($date); ?></h4>
            <?php endif; ?>
            <div class="exhibition-text">
                <?php echo apply_filters('the_content', get_the_content(null, false, $exhibition)); ?>
            </div>
            <?php if ($link_url): ?>
                <p><a <?php echo $link_attributes; ?>><?php echo esc_html($link_title); ?></a></p>
            <?php endif; ?>
        </div>
        <?php endforeach; ?>
    </div>
</div>
