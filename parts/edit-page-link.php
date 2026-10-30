<?php
$content_id = get_the_ID();
if (!is_user_logged_in() || !current_user_can('edit_post', $content_id)) {
    return;
}
$edit_url = get_edit_post_link($content_id, 'raw');
if (!$edit_url) {
    return;
}
?>
<a class="content-edit-link" href="<?php echo esc_url($edit_url); ?>" target="_blank" rel="noopener noreferrer">Edit Page<span class="sr-only"> (opens in a new tab)</span></a>
