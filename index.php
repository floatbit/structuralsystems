<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    
    <?php get_template_part('parts/map'); ?>

    <div class="payload-content hidden">
        <h1><?php the_title();?></h1>
        <?php the_content(); ?>
        <ul>
          <li>
            <a href="<?php print get_the_permalink(12);?>" data-permalink="<?php print get_the_permalink(12);?>">View 12</a>
          </li>
          <li>
            <a href="<?php print get_the_permalink(31);?>" data-permalink="<?php print get_the_permalink(31);?>">View 31</a>
          </li>
        </ul>
    </div>

<?php endwhile; ?>

<div class="panel panel-page hidden">
    <button class="close absolute">&times;</button>
    <div class="container py-12 payload">
        <!--- payload --->
    </div>
</div>

<div class="panel panel-image hidden">
    <button class="close absolute">&times;</button>
    <div class="container container-fluid pt-12 pb-6 h-full payload">
        <div class="flex flex-col h-full">
            <div class="grow image bg-no-repeat bg-center bg-contain">
            </div>
            <div class="shrink mt-6 caption text-center">
                <!--caption-->
            </div>
        </div>
    </div>
</div>

<div class="panel panel-explore hidden">
    <button class="close absolute">&times;</button>
    <div class="container">
        <h2>Explore</h2>
        <form action="#">
            <div class="flex gap-4 cols-2">
                <div class="shrink mr-[60px]">
                    <h3>Category</h3>
                    <div class="checkboxes">
                        <?php
                        $project_categories = get_terms(array(
                            'taxonomy' => 'project-category',
                            'hide_empty' => true, // Only get terms that have posts associated with them
                        ));

                        if (!empty($project_categories) && !is_wp_error($project_categories)) {
                            foreach ($project_categories as $category) {
                                echo '<div class="checkbox">';
                                echo '<input type="checkbox" value="' . esc_attr($category->term_id) . '" id="project-category-' . esc_attr($category->term_id) . '" name="category-' . esc_attr($category->term_id) . '">';
                                echo '<label for="project-category-' . esc_attr($category->term_id) . '">' . esc_html($category->name) . '</label>';
                                echo '</div>';
                            }
                        }
                        ?>
                    </div>
                </div>
                <div class="shrink">
                    <h3>Year</h3>
                    <div class="checkboxes">
                        <?php
                        $project_years = get_terms(array(
                            'taxonomy' => 'project-year',
                            'hide_empty' => true, // Only get terms that have posts associated with them
                        ));

                        if (!empty($project_years) && !is_wp_error($project_years)) {
                            foreach ($project_years as $year) {
                                echo '<div class="checkbox">';
                                echo '<input type="checkbox" value="' . esc_attr($year->term_id) . '" id="project-year-' . esc_attr($year->term_id) . '" name="year-' . esc_attr($year->term_id) . '">';
                                echo '<label for="project-year-' . esc_attr($year->term_id) . '">' . esc_html($year->name) . '</label>';
                                echo '</div>';
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
            <div class="">
                <p class="small total-projects hidden">
                    Total projects: <span class="total-projects-counter">0</span>
                </p>
                <p>
                    <input type="submit" value="Filter" class="btn btn-primary">
                </p>
            </div>
        </form>
    </div>
</div>

<?php get_footer(); ?>