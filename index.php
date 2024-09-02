<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    
    <?php get_template_part('parts/map'); ?>

    <div class="block md:hidden">
      <?php get_template_part('parts/mobile-projects'); ?>
    </div>

    <div class="payload-content hidden">
      <?php if (is_singular('project')):?>
        <h5>Inspired By</h5>
      <?php endif;?>
        <h1><?php the_title();?></h1>
        <?php the_content(); ?>
        <ul class="hidden">
          <li>
            <a href="<?php print get_the_permalink(12);?>" data-permalink="<?php print get_the_permalink(12);?>">View 12</a>
          </li>
          <li>
            <a href="<?php print get_the_permalink(31);?>" data-permalink="<?php print get_the_permalink(31);?>">View 31</a>
          </li>
        </ul>
    </div>

<?php endwhile; ?>

<?php get_template_part('parts/panel-page'); ?>

<?php get_template_part('parts/panel-explore'); ?>

<?php get_template_part('parts/panel-search'); ?>

<?php get_template_part('parts/panel-image'); ?>

<?php get_template_part('parts/panel-mobile-menu'); ?>

<?php get_footer(); ?>