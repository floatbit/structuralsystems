<?php
/**
 * Block template file: block.php
 *
 * Exhibitions Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'exhibitions-' . $block['id'];
if ( ! empty($block['anchor'] ) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$classes = 'acf-block block-exhibitions';
if ( ! empty( $block['className'] ) ) {
    $classes .= ' ' . $block['className'];
}
if ( ! empty( $block['align'] ) ) {
    $classes .= ' align' . $block['align'];
}
?>

<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $classes ); ?>">
	<div class="container">
		<h2>Upcoming & Ongoing Exhibitions</h2>
        <?php for($i = 0; $i < 4; $i++):?>
            <div class="exhibition">
                <h3>Green Exhibition</h3>
                <h4>August 22 - September 22, 2024</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, natus? Excepturi inventore saepe enim in culpa obcaecati exercitationem libero aut eos, doloremque officia necessitatibus dignissimos nulla laboriosam molestias quasi dolore ullam dolores eligendi repellat harum corporis accusantium dolorem quia! Quasi.</p>
                <p>
                    <img src="/wp-content/uploads/2024/07/1-IMAGE01-COVERIMAGE.jpg" alt="">
                </p>
            </div>
            <?php endfor;?>
		<hr class="my-10">
		<h2>Past Exhibitions</h2>
        <?php for($i = 0; $i < 4; $i++):?>
		<div class="exhibition">
			<h3>Lorem Exhibition</h3>
			<h4>August 22 - September 22, 2023</h4>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, natus? Excepturi inventore saepe enim in culpa obcaecati exercitationem libero aut eos, doloremque officia necessitatibus dignissimos nulla laboriosam molestias quasi dolore ullam dolores eligendi repellat harum corporis accusantium dolorem quia! Quasi.</p>
			<p>
				<img src="/wp-content/uploads/2024/07/1-IMAGE01-COVERIMAGE.jpg" alt="">
			</p>
		</div>
        <?php endfor;?>
	</div>
</div>