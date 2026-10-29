<?php
$project_id = $args['project_id'];
$thumbnail = wp_get_attachment_image_src(get_post_thumbnail_id($project_id), 'large');
$image_ratio = $thumbnail && $thumbnail[2] > 0 ? $thumbnail[1] / $thumbnail[2] : 1;
?>
<span class="search-project-thumbnail"><span class="search-project-image" style="--project-image-ratio:<?php echo esc_attr($image_ratio); ?>">
    <?php echo get_the_post_thumbnail($project_id, 'large', ['alt' => '', 'sizes' => $args['sizes'], 'loading' => 'lazy']); ?>
    <span class="search-project-number"><?php echo esc_html(get_field('box_number', $project_id)); ?></span>
</span></span>
