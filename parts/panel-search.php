<div class="panel panel-search hidden" data-depth="1" role="region" aria-label="Search">
    <button class="close absolute" aria-label="Close search">&times;</button>
    <div class="container panel-tools-layout">
        <?php get_template_part('parts/panel-tools-header'); ?>
        <form action="#" role="search" class="panel-search-form">
            <label class="sr-only" for="keyword">Search by project, year, or name</label>
            <input type="search" name="keyword" value="" id="keyword" placeholder="Search by project, year, or name…">
            <input type="submit" value="Search" class="btn btn-primary">
        </form>
        <div class="search-results" aria-live="polite"></div>
        <template class="search-loading-template">
            <div class="search-loading" role="status">
                <img class="loading-dark" src="<?php echo esc_url(assets_url('/dist/images/loading.gif')); ?>" alt="Searching…" width="48" height="48">
                <img class="loading-light" src="<?php echo esc_url(assets_url('/dist/images/loading-light.gif')); ?>" alt="Searching…" width="48" height="48">
            </div>
        </template>
    </div>
</div>
