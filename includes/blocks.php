<?php

/**
 * Register blocks
 */
add_action('init', function () {
    $dir = get_template_directory();

    register_block_type($dir . '/blocks/text');
    register_block_type($dir . '/blocks/images');
    register_block_type($dir . '/blocks/video');
    register_block_type($dir . '/blocks/project-details');
    register_block_type($dir . '/blocks/recent-updates');
    register_block_type($dir . '/blocks/exhibitions');
}, 5);

/**
 * Set allowed blocks
 */
add_filter('allowed_block_types_all', function($allowed_blocks, $editor_context) {
    switch ($editor_context->post->post_type) {
        case 'page':
        case 'project':
            $allowed_blocks = [
                'acf/text',
                'acf/images',
                'acf/video',
                'acf/project-details',
                'acf/recent-updates',
                'acf/exhibitions',
            ];
            break;
    }

    return $allowed_blocks;
}, 10, 2);
