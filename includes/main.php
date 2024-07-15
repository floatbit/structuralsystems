<?php
/**
 * Add theme support
 */
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
    add_theme_support('editor-styles');
    add_editor_style('dist/editor.css');

    register_nav_menus([
        'main_navigation' => __('Main Navigation'),
    ]);

    // Add ACF options page
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'Global Options',
            'menu_slug' => 'global-options',
        ]);
    }
});

/**
 * Enqueue script and styles
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('app', assets_url('/dist/app.css'), [], null);
    wp_enqueue_script('app', assets_url('/dist/app.js'), ['jquery'], null, true);

    // Register script for blocks
    // If needed, separate the script per block
    wp_register_script('blocks/text', assets_url('/dist/blocks/text.js'), ['jquery'], null, true);
});

/**
 * Get term IDs for a given post and taxonomy.
 *
 * @param string $taxonomy The taxonomy name/slug.
 * @param int $post_id The post ID.
 * @return string A comma-separated string of term IDs.
 */
function structural_systems_get_term_ids($taxonomy, $post_id) {
    $terms = get_the_terms($post_id, $taxonomy);
    
    if (is_wp_error($terms) || empty($terms)) {
        return '';
    }
    
    $term_ids = wp_list_pluck($terms, 'term_id');
    
    return implode(',', $term_ids);
}

add_action('wp_ajax_search_action', 'handle_search_action');
add_action('wp_ajax_nopriv_search_action', 'handle_search_action');

function handle_search_action() {
  // Your search logic here
  // Example:
  $keyword = sanitize_text_field($_POST['keyword']);
  $args = array(
    's' => $keyword,
    'post_type' => 'project', // or any other post type
  );
  $query = new WP_Query($args);

  if ($query->have_posts()) {
    echo '<ol>';
    while ($query->have_posts()) {
      $query->the_post();
      echo '<li><a href="' . get_the_permalink() . '" data-post-id="' . get_the_ID() . '">' . get_the_title() . '</a></li>'; // Customize the output as needed
    }
    echo '</ol>';
  } else {
    echo '<p>No results found.</p>';
  }

  wp_die();
}