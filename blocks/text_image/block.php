<?php
$id = !empty($block['anchor']) ? $block['anchor'] : 'text-image-' . $block['id'];
$classes = 'acf-block block-text-image';
if (!empty($block['className'])) {
    $classes .= ' ' . $block['className'];
}
if (!empty($block['align'])) {
    $classes .= ' align' . $block['align'];
}
$title = get_field('title');
$subtitle = get_field('subtitle');
$image = get_field('image');
$description = get_field('description');
$link = get_field('link');
$link_url = is_array($link) ? esc_url($link['url'] ?? '') : '';
?>
<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($classes); ?>">
    <div class="container">
        <div class="text-image-content">
            <?php if ($title): ?>
                <h3><?php echo esc_html($title); ?></h3>
            <?php endif; ?>
            <?php if ($subtitle): ?>
                <h4><?php echo esc_html($subtitle); ?></h4>
            <?php endif; ?>
            <?php if ($image): ?>
            <p>
                <?php echo wp_get_attachment_image($image['ID'], 'large', false, ['alt' => $image['alt'] ?? '']); ?>
            </p>
            <?php endif; ?>
            <?php if ($description): ?>
            <div class="description">
                <?php echo wp_kses_post($description); ?>
            </div>
            <?php endif; ?>
            <?php if ($link_url): ?>
            <p><a href="<?php echo $link_url; ?>" target="<?php echo esc_attr($link['target'] ?: '_self'); ?>" rel="noopener noreferrer"><?php echo esc_html($link['title'] ?: $link_url); ?></a></p>
            <?php endif; ?>
        </div>
    </div>
</div>
