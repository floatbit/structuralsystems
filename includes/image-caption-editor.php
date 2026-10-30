<?php
add_action('wp_enqueue_scripts', function () {
    if (is_user_logged_in()) {
        wp_enqueue_editor();
    }
});

add_action('wp_ajax_structural_save_image_caption', function () {
    check_ajax_referer('structural_image_caption', 'nonce');
    $image_id = absint($_POST['image_id'] ?? 0);
    if (get_post_type($image_id) !== 'attachment' || !current_user_can('edit_post', $image_id)) {
        wp_send_json_error(['message' => 'You do not have permission to edit this image.'], 403);
    }
    $caption = wp_kses_post(wp_unslash($_POST['caption'] ?? ''));
    update_field('field_669fb2da5c8cf', $caption, $image_id);
    wp_send_json_success(['html' => wp_kses_post(get_field('image_description', $image_id) ?: '')]);
});

add_action('wp_footer', function () {
    if (!is_user_logged_in()) {
        return;
    }
    ?>
    <dialog class="caption-editor-dialog" aria-labelledby="caption-editor-title" data-url="<?php echo esc_url(admin_url('admin-ajax.php')); ?>" data-nonce="<?php echo esc_attr(wp_create_nonce('structural_image_caption')); ?>">
        <form class="caption-editor-form">
            <h2 id="caption-editor-title">Edit Caption</h2>
            <?php wp_editor('', 'image-caption-editor', ['textarea_name' => 'caption', 'media_buttons' => false, 'textarea_rows' => 10, 'quicktags' => false, 'tinymce' => ['toolbar1' => 'formatselect,bold,italic,bullist,numlist,link,unlink,undo,redo', 'toolbar2' => '']]); ?>
            <p class="caption-editor-status" role="status" aria-live="polite"></p>
            <div class="caption-editor-actions">
                <button type="button" data-cancel-caption>Cancel</button>
                <button type="submit" class="btn">Save Caption</button>
            </div>
        </form>
    </dialog>
    <?php
}, 5);
