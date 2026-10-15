<?php
$mobile_projects = get_posts([
    'post_type' => 'project',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'orderby' => ['date' => 'DESC', 'ID' => 'DESC'],
]);
?>
<div class="pt-5 mobile-projects">
    <div class="container">
        <div class="grid grid-cols-2 gap-4">
            <?php foreach ($mobile_projects as $mobile_project):
                $project_id = $mobile_project->ID;
                $permalink = get_permalink($project_id);
                $filters = structural_systems_get_project_term_filters($project_id);
            ?>
            <a class="block no-underline" href="<?php echo esc_url($permalink); ?>" data-post-id="<?php echo esc_attr($project_id); ?>" data-permalink="<?php echo esc_url($permalink); ?>" data-content-type="project"
                <?php foreach ($filters as $attribute => $value): ?>
                    <?php echo esc_attr($attribute); ?>="<?php echo esc_attr($value); ?>"
                <?php endforeach; ?>
            >
                <?php if (has_post_thumbnail($project_id)): ?>
                <div class="mb-2">
                    <?php echo get_the_post_thumbnail($project_id, 'medium_large', ['loading' => 'lazy', 'sizes' => '50vw', 'style' => 'width:100%;height:auto;']); ?>
                </div>
                <?php endif; ?>
                <h3><?php echo esc_html(get_the_title($project_id)); ?></h3>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</div>
