window.searchDocs = async function (query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch('/api/content.json');
    const guides = await res.json();

    const lowerQuery = query.toLowerCase();

    const results = guides.filter((item) => {
      const hit =
        item.title?.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.contents.html?.toLowerCase().includes(lowerQuery);

      if (hit) {
        console.log('MATCH:', item.title, '->', lowerQuery);
      }

      return hit;
    });

    return results;
  } catch (err) {
    console.error('Search error:', err);
    return [];
  }
};
