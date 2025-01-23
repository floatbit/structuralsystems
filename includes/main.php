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
            'page_title' => 'Big Boxes',
            'menu_slug' => 'big-boxes',
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

    // font awesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css', [], null);
});

add_filter('body_class', function($classes) {
  if (isset($_GET['debug'])) {
    $classes[] = 'debug';
  }
  return $classes;
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
      echo '<li data-post-id="' . get_the_ID() . '"><a href="' . get_the_permalink() . '" data-post-id="' . get_the_ID() . '">' . get_the_title() . '</a></li>'; // Customize the output as needed
    }
    echo '</ol>';
  } else {
    echo '<p>No results found.</p>';
  }

  wp_die();
}

function structural_systems_get_project_term_filters($post_id) {
    $attributes = array();
    $filters = array(
        'data-project-categories' => 'project-category',
        'data-project-years' => 'project-year',
        'data-project-materials' => 'project-material',
    );

    $output = '';

    foreach ($filters as $data_attribute => $taxonomy) {
        $term_ids = structural_systems_get_term_ids($taxonomy, $post_id);
        $output .= $data_attribute . '="' . $term_ids . '" ';
        $attributes[$data_attribute] = $term_ids;
    }

    return $attributes;
}

function structural_systems_get_project_box_info($box_id = 1, $return_array = false) {
  $attributes = array();
  $attributes['data-box-id'] = $box_id;

  if ($box_id) {
    $post_id = null; // Initialize the variable to hold the post ID
    $args = array(
        'posts_per_page' => 1,
        'post_type' => 'project',
        'meta_key' => 'box_number',
        'meta_value' => $box_id,
    );
    $posts = get_posts($args);

    if ($posts) {
        $post_id = $posts[0]->ID; // Get the ID of the first post found
    }
  }

  if ($box_id == 'A' || $box_id == 'C' || $box_id == 'D' || $box_id == 'E') {
    $post_id = null;
    $big_boxes_settings = get_field('big_boxes_settings', 'option');
    foreach ($big_boxes_settings as $big_box_setting) {
      if ($big_box_setting['box_number'] == $box_id) {
        $big_box_projects = $big_box_setting['projects'];
        if (is_array($big_box_projects)) {
          shuffle($big_box_projects);
          $post_id = $big_box_projects[0]->ID;
        }
      }
    }
  }

  $output = '';
  $image_url = '';
  
  if ($post_id) {
    $post = get_post($post_id);
    if ($post->post_type == 'project') {
      $attributes['class'] = get_field('box_style', $post_id);
      $attributes['data-post-id'] = $post_id;
      $attributes['data-permalink'] = get_the_permalink($post_id);
      $attributes['data-content-type'] = 'project';
      $term_attributes = structural_systems_get_project_term_filters($post_id);
      $attributes = array_merge($attributes, $term_attributes);
      $image_url = get_the_post_thumbnail_url($post_id, 'full');
    }
  }

  foreach ($attributes as $attribute => $value) {
    $output .= $attribute . '="' . $value . '" ';
  }

  if ($return_array) {
    return array(
      'output' => $output,
      'image_url' => $image_url,
    );
  }

  return $output;
}

function structural_systems_get_big_box_image($box_id = 'A') {
  $image_url = null;
  if ($box_id) {
    $box_id = strtoupper($box_id);
    $post_id = null; // Initialize the variable to hold the post ID
    $args = array(
        'posts_per_page' => 1,
        'post_type' => 'project',
        'meta_key' => 'box_number',
        'meta_value' => $box_id,
    );
    $posts = get_posts($args);

    if ($posts) {
        $post_id = $posts[0]->ID; // Get the ID of the first post found
    }
    $image_url = get_the_post_thumbnail_url($post_id, 'full');
  }
  return $image_url;
}

function pd($data) {
  echo '<pre>';
  print_r($data);
  echo '</pre>';
  die;
}

function pr($data) {
  echo '<pre>';
  print_r($data);
  echo '</pre>';
}