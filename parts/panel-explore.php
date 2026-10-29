<div class="panel panel-explore hidden" data-depth="1">
    <button class="close absolute" aria-label="Close explore">&times;</button>
    <div class="container panel-tools-layout">
        <?php get_template_part('parts/panel-tools-header'); ?>
        <p class="explore-description">Filter the model archive by structural system and year.</p>
        <form action="#" class="explore-form">
            <div class="explore-scroll">
            <div class="explore-columns">
                <section class="explore-categories">
                    <div class="explore-heading"><h3>Category</h3><span class="category-selection-count"></span></div>
                    <div class="checkboxes">
                        <?php
                        $terms = get_terms(array(
                            'taxonomy' => 'project-category',
                            'hide_empty' => true, // Only get terms that have posts associated with them
                        ));

                        if (!empty($terms) && !is_wp_error($terms)) {
                            foreach ($terms as $term) {
                                echo '<div class="checkbox">';
                                echo '<input type="checkbox" value="' . esc_attr($term->term_id) . '" id="project-category-' . esc_attr($term->term_id) . '" name="category-' . esc_attr($term->term_id) . '">';
                                echo '<label for="project-category-' . esc_attr($term->term_id) . '">' . esc_html($term->name) . '</label>';
                                echo '</div>';
                            }
                        }
                        ?>
                    </div>
                </section>
                <section class="explore-years">
                    <div class="explore-heading"><h3>Model Year</h3><span class="year-selection-count"></span></div>
                    <div class="checkboxes">
                        <?php
                        $terms = get_terms(array(
                            'taxonomy' => 'project-year',
                            'hide_empty' => true, // Only get terms that have posts associated with them
                        ));

                        if (!empty($terms) && !is_wp_error($terms)) {
                            foreach ($terms as $term) {
                                echo '<div class="checkbox">';
                                echo '<input type="checkbox" value="' . esc_attr($term->term_id) . '" id="project-year-' . esc_attr($term->term_id) . '" name="year-' . esc_attr($term->term_id) . '">';
                                echo '<label for="project-year-' . esc_attr($term->term_id) . '">' . esc_html($term->name) . '</label>';
                                echo '</div>';
                            }
                        }
                        ?>
                    </div>
                    <div class="explore-legend"><span>Available</span><span>Selected</span></div>
                </section>
            </div>
            </div>
            <footer class="explore-footer">
                <p class="small total-projects hidden">
                    Total projects: <span class="total-projects-counter">0</span>
                </p>
                <p class="explore-actions">
                    <input type="submit" value="Apply" class="btn btn-primary">
                    <a href="#" class="ml-5 clear-filters">Clear Filters</a>
                </p>
                <p class="explore-selection-summary" aria-live="polite"></p>
            </footer>
        </form>
    </div>
</div>
