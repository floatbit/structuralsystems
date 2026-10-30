<?php

/**
 * Laravel Mix Assets helper
 */
function assets_url($path)
{
    $theme_dir = get_template_directory();

    if (file_exists($theme_dir . '/hot')) {
        // $url = file_get_contents($theme_dir . '/hot');

        return "//localhost:8080{$path}";
    }

    $manifestPath = $theme_dir . '/mix-manifest.json';
    $manifest = json_decode(file_get_contents($manifestPath), true);
    
    if (isset($manifest[$path])) {
        return get_template_directory_uri() . $manifest[$path];
    } else {
        return get_template_directory_uri() . $path;
    }
}

/** Collect a project's Images galleries in document order, including nested blocks. */
function structural_systems_get_project_images($post_id)
{
    $image_ids = [];
    $collect = function ($blocks) use (&$collect, &$image_ids) {
        foreach ($blocks as $parsed_block) {
            if (($parsed_block['blockName'] ?? '') === 'acf/images') {
                foreach ((array) ($parsed_block['attrs']['data']['images'] ?? []) as $image) {
                    $image_id = is_array($image) ? ($image['ID'] ?? $image['id'] ?? 0) : $image;
                    $image_id = absint($image_id);
                    if ($image_id) {
                        $image_ids[] = $image_id;
                    }
                }
            }
            $collect($parsed_block['innerBlocks'] ?? []);
        }
    };
    $collect(parse_blocks(get_post_field('post_content', $post_id) ?: ''));

    $images = [];
    foreach (array_unique($image_ids) as $image_id) {
        $source = wp_get_attachment_image_src($image_id, 'full');
        if (!$source) {
            continue;
        }
        $images[] = [
            'ID' => $image_id,
            'url' => $source[0],
            'width' => $source[1],
            'height' => $source[2],
            'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true),
            'title' => get_the_title($image_id),
        ];
    }
    return $images;
}
