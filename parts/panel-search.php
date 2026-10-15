<div class="panel panel-search hidden" data-depth="1">
    <button class="close absolute">&times;</button>
    <div class="container">
        <h2>Search</h2>
        <div class="flex gap-16">
            <div class="basis-1/3">
                <form action="#">
                    <label for="keyword">Enter keyword</label>
                    <p>
                        <input type="text" name="keyword" value="" id="keyword">
                    </p>
                    <p>
                        <input type="submit" value="Search" class="btn btn-primary">
                    </p>
                </form>
            </div>
            <div class="basis-2/3">
                <div class="search-results" aria-live="polite"></div>
                <template class="search-loading-template">
                    <div class="search-loading" role="status">
                        <img src="<?php echo esc_url(assets_url('/dist/images/loading.gif')); ?>" alt="Searching…" width="48" height="48">
                    </div>
                </template>
            </div>
        </div>
    </div>
</div>
