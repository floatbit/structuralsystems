    </main>

    <?php wp_footer(); ?>

    <?php if ($_GET['box']) : ?>
    <div id="allybox-embed">
        <h3>Strucutral Systems Search</h3>
        <div id="allybox-chat-container"></div>
    </div>
    <script src="https://dashboard.allybox.app/embed/thread.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            allybox({
                assistantEmbedId: '67088f05493f4',
                placeholderText: 'e.g. show me projects from 2022'
            });
        });
    </script>
    <?php endif; ?>
</body>

</html>