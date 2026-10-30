<?php
$image_id = (int) $args['image_id'];
$description = $args['description'] ?? '';
$edit_url = is_user_logged_in() && current_user_can('edit_post', $image_id)
    ? get_edit_post_link($image_id, 'raw') : '';
if (!$description && !$edit_url) {
    return;
}
?>
<div class="caption hidden" data-caption-image-id="<?php echo esc_attr($image_id); ?>">
    <div class="image-caption-content">
    <?php if ($description): ?>
        <?php echo wp_kses_post($description); ?>
    <?php endif; ?>
    </div>
    <?php if ($edit_url): ?>
        <a class="image-edit-link" data-edit-caption="<?php echo esc_attr($image_id); ?>" href="<?php echo esc_url($edit_url); ?>" aria-haspopup="dialog" target="_blank" rel="noopener noreferrer">Edit Caption</a>
    <?php endif; ?>
</div>
