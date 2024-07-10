<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    <div class="container container-fluid">
        <?php get_template_part('parts/map'); ?>
    </div>
    <div class="payload-content">
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

<div class="panel panel-page fixed top-0 left-0 h-full w-full overflow-auto hidden">
    <button class="close absolute top-0 right-0 p-4 text-white bg-black">&times;</button>
    <div class="container py-12 payload">
        <!--- payload --->
    </div>
</div>

<div class="panel panel-image fixed top-0 left-0 h-full w-full overflow-auto">
    <button class="close absolute top-0 right-0 p-4 text-white bg-black">&times;</button>
    <div class="container container-fluid pt-12 pb-6 h-full payload">
        <div class="flex flex-col h-full">
            <div class="grow image bg-no-repeat bg-center bg-contain" style="background-image: url(https://via.placeholder.com/800x600);">
            </div>
            <div class="shrink mt-6 caption text-center">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque optio eligendi doloremque. Quam in blanditiis deleniti modi quae tenetur, a porro, corrupti at asperiores commodi autem cupiditate quis illum! Enim!</p>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>