window.searchDocs = async function (query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch('/api/content.json');
    const data = await res.json();

    const lowerQuery = query.toLowerCase();

    const guides = data.context.guides || [];

    const results = guides.filter((item) => {
      return (
        item.title?.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.contents.html?.toLowerCase().includes(lowerQuery)
      );
    });

    return results;
  } catch (err) {
    console.error('Search error:', err);
    return [];
  }
};
