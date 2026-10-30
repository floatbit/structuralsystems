<?php
$image_url = $args['image_url'] ?? '';
$video_url = $args['video_url'] ?? '';
?>
<div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;overflow:hidden;pointer-events:none;">
    <?php if ($video_url): ?>
        <video autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline" preload="metadata" poster="<?php echo esc_url($image_url); ?>" style="display:block;width:100%;height:100%;object-fit:cover;">
            <source src="<?php echo esc_url($video_url); ?>" />
        </video>
    <?php else: ?>
        <div style="width:100%;height:100%;background-image:url('<?php echo esc_url($image_url); ?>');background-size:cover;background-position:center;"></div>
    <?php endif; ?>
</div>
