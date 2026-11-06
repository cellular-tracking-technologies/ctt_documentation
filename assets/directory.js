(() => {
  'use strict';
  const search = document.getElementById('guide-search');
  const clearSearch = document.getElementById('clear-search');
  const task = document.getElementById('task-filter');
  const categories = [...document.querySelectorAll('[data-filter-category]')];
  const cards = [...document.querySelectorAll('.guide-card')];
  const heading = document.getElementById('results-title');
  const count = document.getElementById('result-count');
  const empty = document.getElementById('empty-state');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const index = cards.map(card => ({
    card,
    text: normalize([...card.querySelectorAll('h3, .card-kind, .badge, .guide-description, .applies, .topics')]
      .map(part => part.textContent).join(' ') + ' ' + (card.dataset.keywords || ''))
  }));
  let category = 'all';

  const syncURL = () => {
    const url = new URL(window.location.href);
    for (const [key, value] of [['q', search.value.trim()], ['category', category === 'all' ? '' : category], ['task', task.value]]) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    // Filtering also works when someone opens a downloaded copy of this page.
    try { window.history.replaceState(null, '', url); } catch (_) { /* No URL update for restricted file origins. */ }
  };

  const render = () => {
    const words = normalize(search.value).split(' ').filter(Boolean);
    let visible = 0;
    for (const {card, text} of index) {
      const match = (category === 'all' || card.dataset.category === category)
        && (!task.value || card.dataset.tasks.split(' ').includes(task.value))
        && words.every(word => text.includes(word));
      card.hidden = !match;
      if (match) visible++;
    }
    for (const button of categories) button.setAttribute('aria-pressed', String(button.dataset.filterCategory === category));
    const current = categories.find(button => button.dataset.filterCategory === category);
    heading.textContent = current.dataset.title;
    count.textContent = `${visible} ${visible === 1 ? 'guide' : 'guides'}${search.value.trim() || task.value ? ' found' : ''}`;
    empty.hidden = visible !== 0;
    clearSearch.hidden = !search.value;
    syncURL();
  };

  const restore = () => {
    const params = new URLSearchParams(window.location.search);
    search.value = params.get('q') || '';
    category = categories.some(button => button.dataset.filterCategory === params.get('category')) ? params.get('category') : 'all';
    task.value = [...task.options].some(option => option.value === params.get('task')) ? params.get('task') : '';
    render();
  };

  search.addEventListener('input', render);
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape') { search.value = ''; render(); }
  });
  document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('library').scrollIntoView({behavior:'instant', block:'start'});
    heading.focus({preventScroll:true});
  });
  clearSearch.addEventListener('click', () => {search.value = ''; render(); search.focus();});
  task.addEventListener('change', render);
  for (const button of categories) button.addEventListener('click', () => {category = button.dataset.filterCategory; render();});
  for (const button of document.querySelectorAll('[data-example]')) button.addEventListener('click', () => {
    search.value = button.dataset.example; category = 'all'; task.value = ''; render(); search.focus();
  });
  document.getElementById('reset-filters').addEventListener('click', () => {
    search.value = ''; category = 'all'; task.value = ''; render(); search.focus();
  });
  window.addEventListener('popstate', restore);
  restore();
  document.documentElement.classList.add('js');
})();
