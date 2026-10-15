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
$title = get_field('title');
$projects = get_field('projects') ?: [];
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($classes); ?>">
    <div class="container mt-10">
        <?php if ($title): ?>
            <h3><?php echo esc_html($title); ?></h3>
        <?php endif; ?>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            <?php foreach ($projects as $project):
                $project_id = $project->ID;
                $permalink = get_permalink($project_id);
                $filters = structural_systems_get_project_term_filters($project_id);
            ?>
            <a href="<?php echo esc_url($permalink); ?>" class="recent-update-project" data-post-id="<?php echo esc_attr($project_id); ?>" data-permalink="<?php echo esc_url($permalink); ?>" data-content-type="project"
                <?php foreach ($filters as $attribute => $value): ?>
                    <?php echo esc_attr($attribute); ?>="<?php echo esc_attr($value); ?>"
                <?php endforeach; ?>
            >
                <span class="recent-update-thumbnail">
                    <?php echo get_the_post_thumbnail($project_id, 'full', ['alt' => '', 'sizes' => '(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw', 'loading' => 'eager', 'style' => 'width:100%;height:auto;']); ?>
                </span>
                <span class="recent-update-title">
                    <span>PROJECT <?php echo esc_html(get_field('box_number', $project_id)); ?></span>
                    <?php $eyebrow = get_field('eyebrow', $project_id); ?>
                    <?php if ($eyebrow): ?>
                        <span><?php echo esc_html(strtoupper($eyebrow)); ?></span>
                    <?php endif; ?>
                    <span>Inspired By <?php echo esc_html(get_the_title($project_id)); ?></span>
                </span>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</div>
