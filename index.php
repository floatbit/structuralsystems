<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    
    <?php get_template_part('parts/map'); ?>

    <div class="block md:hidden">
      <?php get_template_part('parts/mobile-projects'); ?>
    </div>

    <div class="payload-content hidden">
      <?php if (is_singular('project')):?>
        <?php $cover_image = get_field('cover_image', get_the_ID());?>
        <?php if ($cover_image):?>
        <div class="project-cover-image fixed top-0 left-0 w-full h-full bg-black z-40">
            <img src="<?php print $cover_image['url'];?>" alt="<?php print $cover_image['alt'];?>" class="w-full h-full object-contain p-10">
          </div>
        <?php endif;?>
        <?php 
          $eyebrow = get_field('eyebrow', get_the_ID());
        ?>
        <h5 class="mb-3">Project <?php print get_field('box_number', get_the_ID());?></h5>
        <h1 class="mb-3 uppercase">
          <?php if ($eyebrow):?>
            <?php echo $eyebrow;?>
          <?php endif;?>
          <span class="add-favorite">
            <span class="starred">
              <i class="fa-solid fa-star"></i>
              <span class="tooltip text-sm">Remove from Favorites</span>
            </span>
            <span class="unstarred">
              <i class="fa-regular fa-star"></i>
              <span class="tooltip text-sm">Add to Favorites</span>
            </span>
          </span>
        </h1>
        <h5 class="mb-8">Inspired By <?php the_title();?></h5>
        <?php else:?>
        <h1>
          <?php the_title();?>
        </h1>
        <?php endif;?>
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

<?php get_template_part('parts/map-tooltip'); ?>

<?php get_footer(); ?>