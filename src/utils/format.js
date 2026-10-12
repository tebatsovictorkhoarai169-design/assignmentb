export const metres = (n) => `${n.toLocaleString('en-US')} m`;

export const slug = (category) =>
  ({
    Adventure: 'adventure',
    'Culture & History': 'culture',
    'Nature & Wildlife': 'nature',
    'Landmarks & Scenery': 'landmarks',
  })[category] || 'other';

// Images are stored as relative paths in the data file; BASE_URL keeps them valid on GitHub Pages.
export const imageUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
