<?php
$mobile_projects = get_posts([
    'post_type' => 'project',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'orderby' => ['date' => 'DESC', 'ID' => 'DESC'],
]);
?>
<div class="pt-5 mobile-projects" data-view="grid">
    <div class="container">
        <div class="mobile-project-toolbar">
            <form class="mobile-project-search" role="search" data-search-url="<?php echo esc_url(admin_url('admin-ajax.php')); ?>">
                <button type="button" class="mobile-search-toggle" aria-expanded="false" aria-controls="mobile-project-keyword">Search</button>
                <input type="search" id="mobile-project-keyword" name="keyword" autocomplete="off" aria-label="Search projects" hidden>
            </form>
            <div class="mobile-project-views" role="group" aria-label="Project view">
                <button type="button" data-project-view="grid" aria-pressed="true">Grid</button>
                <button type="button" data-project-view="list" aria-pressed="false">List</button>
            </div>
        </div>
        <p class="mobile-project-status" role="status" aria-live="polite"></p>
        <div class="mobile-project-loading" role="status" aria-label="Searching" hidden>
            <img class="loading-dark" src="<?php echo esc_url(assets_url('/dist/images/loading.gif')); ?>" alt="" width="48" height="48">
            <img class="loading-light" src="<?php echo esc_url(assets_url('/dist/images/loading-light.gif')); ?>" alt="" width="48" height="48">
        </div>
        <div class="mobile-project-grid">
            <?php foreach ($mobile_projects as $mobile_project):
                $project_id = $mobile_project->ID;
                $permalink = get_permalink($project_id);
                $filters = structural_systems_get_project_term_filters($project_id);
            ?>
            <a class="mobile-project-card" aria-label="<?php echo esc_attr(get_the_title($project_id)); ?>" href="<?php echo esc_url($permalink); ?>" data-post-id="<?php echo esc_attr($project_id); ?>" data-permalink="<?php echo esc_url($permalink); ?>" data-content-type="project"
                <?php foreach ($filters as $attribute => $value): ?>
                    <?php echo esc_attr($attribute); ?>="<?php echo esc_attr($value); ?>"
                <?php endforeach; ?>
            >
                <span class="mobile-project-thumbnail">
                    <?php get_template_part('parts/project-thumbnail', null, ['project_id' => $project_id, 'sizes' => '(max-width: 767px) 100vw, 1px']); ?>
                </span>
                <span class="mobile-project-text">
                    <?php $eyebrow = get_field('eyebrow', $project_id); ?>
                    <?php if ($eyebrow): ?><span class="project-eyebrow"><?php echo esc_html($eyebrow); ?></span><?php endif; ?>
                    <span><em>Inspired By</em> <?php echo esc_html(get_the_title($project_id)); ?></span>
                </span>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</div>
