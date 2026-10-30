export default class CaptionEditor {
  constructor() {
    this.dialog = document.querySelector('.caption-editor-dialog');
    if (!this.dialog) return;
    this.form = this.dialog.querySelector('form');
    this.status = this.dialog.querySelector('.caption-editor-status');
    this.submit = this.form.querySelector('[type="submit"]');
    document.addEventListener('click', event => {
      const link = event.target.closest('[data-edit-caption]');
      if (!link) return;
      event.preventDefault();
      this.imageId = link.dataset.editCaption;
      this.opener = link;
      const caption = link.closest('.caption').querySelector('.image-caption-content');
      const html = caption?.innerHTML || '';
      const editor = window.tinymce?.get('image-caption-editor');
      if (editor) editor.setContent(html);
      document.getElementById('image-caption-editor').value = html;
      this.status.textContent = '';
      this.dialog.showModal();
      editor?.focus();
    });
    this.dialog.querySelector('[data-cancel-caption]').addEventListener('click', () => this.dialog.close());
    this.dialog.addEventListener('cancel', event => {
      if (this.saving) event.preventDefault();
    });
    // Escape belongs to this editor, not the image modal beneath it.
    this.dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') event.stopPropagation();
    });
    this.dialog.addEventListener('close', () => this.opener?.focus());
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.save();
    });
  }

  async save() {
    if (this.saving) return;
    this.saving = true;
    this.submit.disabled = true;
    this.dialog.querySelector('[data-cancel-caption]').disabled = true;
    this.status.textContent = 'Saving…';
    const caption = window.tinymce?.get('image-caption-editor')?.getContent() ?? document.getElementById('image-caption-editor').value;
    try {
      const response = await fetch(this.dialog.dataset.url, {
        method: 'POST',
        body: new URLSearchParams({ action: 'structural_save_image_caption', nonce: this.dialog.dataset.nonce, image_id: this.imageId, caption }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.data?.message || 'Unable to save. Please try again.');
      const html = result.data.html;
      document.querySelectorAll(`[data-caption-image-id="${this.imageId}"]`).forEach(source => {
        source.querySelector('.image-caption-content').innerHTML = html;
        const image = source.closest('[data-image-enlarge]');
        if (!image) return;
        let indicator = image.querySelector('.ellipses');
        if (!html.trim()) indicator?.remove();
        else if (!indicator) {
          indicator = document.createElement('span');
          indicator.className = 'ellipses';
          indicator.setAttribute('aria-hidden', 'true');
          indicator.textContent = '…';
          (image.querySelector('.image-carousel-zoom') || image.querySelector('p')).append(indicator);
        }
      });
      this.dialog.close();
    } catch (error) {
      this.status.textContent = error.message || 'Unable to save. Please try again.';
    } finally {
      this.saving = false;
      this.submit.disabled = false;
      this.dialog.querySelector('[data-cancel-caption]').disabled = false;
    }
  }
}
