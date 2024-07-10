<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    <div class="container container-fluid">
        <?php get_template_part('parts/map'); ?>
        <?php the_content(); ?>
    </div>
<?php endwhile; ?>


<div class="panel panel-project fixed top-0 left-0 h-full w-full overflow-auto hidden">
    <button class="close absolute top-0 right-0 p-4 text-white bg-black">&times;</button>
    <div class="container py-12 project-payload">
        <!--- payload --->
    </div>
</div>

<?php get_footer(); ?>