<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    <?php if (is_front_page()): ?>
    <style>html.home-intro-pending #map { opacity: 0; }</style>
    <script>
        if (window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches) {
            document.documentElement.classList.add('home-intro-pending');
            window.setTimeout(function () { document.documentElement.classList.remove('home-intro-pending'); }, 6000);
        }
    </script>
    <?php endif; ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class('antialiased'); ?> data-post-id="<?php the_ID(); ?>" data-home-url="<?php echo esc_url(home_url('/')); ?>">

    <?php get_template_part('parts/section-header'); ?>

    <main>
