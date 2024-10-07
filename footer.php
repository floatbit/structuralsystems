    </main>

    <?php wp_footer(); ?>
</body>

<?php

if (isset($_GET['c'])) {
    $projects = get_posts(array(
        'post_type' => 'project',
        'numberposts' => -1,
    ));
    
    
    $data = array();
    $projects_data = array();
    foreach ($projects as $project) {
        $data_blocks = array();
        $data_blocks['text'] = array();
        $data_blocks['images'] = array();
        $blocks = parse_blocks($project->post_content);
        foreach ($blocks as $block) {
            if ($block['blockName'] == 'acf/text') {
                $text = $block['attrs']['data']['text'];
                $text = str_replace(array("\r", "\n"), '', $text);
                $data_blocks['text'][] = $text;
            }
            if ($block['blockName'] == 'acf/images') {
                if ($block['attrs']['data']['images']) {
                    foreach ($block['attrs']['data']['images'] as $image_id) {
                        $image_url = wp_get_attachment_image_url($image_id, 'full');
                        $image_description = get_field('image_description', $image_id);
                        $data_blocks['images'][] = array(
                            'url' => $image_url,
                            'description' => $image_description,
                        );
                    }
                }
            }
        }
        
        $projects_data[] = array(
            'title' => $project->post_title,
            'category' => wp_list_pluck(get_the_terms($project->ID, 'project-category'), 'name'),
            'year' => wp_list_pluck(get_the_terms($project->ID, 'project-year'), 'name'),
            'material' => wp_list_pluck(get_the_terms($project->ID, 'project-material'), 'name'),
            'url' => get_the_permalink($project->ID),
            'content' => $data_blocks,
            'images' => $data_blocks['images'],
        );
    }

    $data['projects'] = $projects_data;

    print json_encode($data);
    die;
}
?>

</html>