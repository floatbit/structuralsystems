export async function fetchProjectSearch(keyword, signal) {
  const ajaxUrl = document.querySelector('.mobile-project-search')?.dataset.searchUrl || '/wp-admin/admin-ajax.php';
  const response = await fetch(ajaxUrl, {
    method: 'POST',
    signal,
    body: new URLSearchParams({ action: 'search_action', keyword }),
  });
  if (!response.ok) throw new Error('Search request failed');
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const postIds = Array.from(doc.querySelectorAll('li[data-post-id]'), item => item.dataset.postId);
  return { html, postIds };
}

export function publishProjectSearch(keyword, postIds) {
  const matches = postIds === null ? null : new Set(postIds);
  document.querySelectorAll('[data-content-type="project"][data-post-id]').forEach(project => {
    project.classList.toggle('explore-match', matches !== null && matches.has(project.dataset.postId));
  });
  document.dispatchEvent(new CustomEvent('project-search-results', { detail: { keyword, postIds } }));
}
