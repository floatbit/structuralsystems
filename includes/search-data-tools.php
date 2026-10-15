<?php

add_action('admin_menu', function () {
    add_management_page('Rebuild Search Data', 'Rebuild Search Data', 'manage_options', 'rebuild-search-data', 'structural_systems_search_data_tools_page');
});

function structural_systems_search_data_tools_page() {
    if (!current_user_can('manage_options')) {
        return;
    }
    ?>
    <div class="wrap">
        <h1>Rebuild Search Data</h1>
        <p>Rebuild Automated Search Data for every project, processing 20 projects at a time.</p>
        <button type="button" class="button button-primary" id="rebuild-search-data">Rebuild Search Data</button>
        <p id="rebuild-search-status" role="status" aria-live="polite"></p>
        <progress id="rebuild-search-progress" value="0" max="1" hidden style="width: 400px; max-width: 100%;"></progress>
    </div>
    <script>
    (() => {
        const button = document.getElementById('rebuild-search-data');
        const status = document.getElementById('rebuild-search-status');
        const progress = document.getElementById('rebuild-search-progress');
        const nonce = <?php echo wp_json_encode(wp_create_nonce('structural_systems_rebuild_search_data')); ?>;
        button.addEventListener('click', async () => {
            button.disabled = true;
            let projectIds;
            let processed = 0;
            progress.hidden = true;
            status.textContent = 'Preparing projects…';
            try {
                do {
                    const data = new URLSearchParams({
                        action: 'structural_systems_rebuild_search_data',
                        nonce,
                    });
                    if (projectIds) {
                        data.set('project_ids', JSON.stringify(projectIds.slice(processed, processed + 20)));
                    }
                    const response = await fetch(ajaxurl, { method: 'POST', body: data });
                    const result = await response.json();
                    if (!response.ok || !result.success) {
                        throw new Error(result.data?.message || 'Request failed.');
                    }
                    if (!projectIds) {
                        projectIds = result.data.project_ids;
                        progress.max = Math.max(projectIds.length, 1);
                        progress.value = 0;
                        progress.hidden = false;
                    } else {
                        processed += result.data.processed;
                        progress.value = processed;
                    }
                    status.textContent = `Rebuilt ${processed} of ${projectIds.length} projects…`;
                } while (processed < projectIds.length);
                progress.value = progress.max;
                status.textContent = `Complete. Rebuilt search data for ${processed} projects.`;
            } catch (error) {
                status.textContent = `Stopped after ${processed} projects. ${error.message} You can restart the rebuild safely.`;
            } finally {
                button.disabled = false;
            }
        });
    })();
    </script>
    <?php
}

add_action('wp_ajax_structural_systems_rebuild_search_data', function () {
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'You do not have permission to rebuild search data.'), 403);
    }
    check_ajax_referer('structural_systems_rebuild_search_data', 'nonce');

    if (!function_exists('update_field')) {
        wp_send_json_error(array('message' => 'Advanced Custom Fields must be active.'), 503);
    }

    if (!isset($_POST['project_ids'])) {
        $query = new WP_Query(array(
            'post_type' => 'project',
            'post_status' => array('publish', 'future', 'draft', 'pending', 'private'),
            'posts_per_page' => -1,
            'fields' => 'ids',
            'orderby' => 'ID',
            'order' => 'ASC',
            'no_found_rows' => true,
            'update_post_meta_cache' => false,
            'update_post_term_cache' => false,
        ));
        wp_send_json_success(array('project_ids' => $query->posts));
    }

    $project_ids = is_string($_POST['project_ids']) ? json_decode(wp_unslash($_POST['project_ids']), true) : null;
    if (!is_array($project_ids) || !$project_ids || count($project_ids) > 20) {
        wp_send_json_error(array('message' => 'Provide between 1 and 20 project IDs.'), 400);
    }

    foreach ($project_ids as $project_id) {
        if (!is_numeric($project_id) || (int) $project_id < 1 || get_post_type((int) $project_id) !== 'project') {
            wp_send_json_error(array('message' => 'A project in this batch no longer exists. Restart the rebuild.'), 400);
        }
    }

    foreach ($project_ids as $project_id) {
        update_project_terms_field((int) $project_id);
    }

    wp_send_json_success(array('processed' => count($project_ids)));
});
