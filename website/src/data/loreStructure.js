export const loreStructure = {
  concepts: [
    { title: 'Principles of Motion and Light', path: 'principles-of-motion-and-light' },
    { title: 'Society of the Line', path: 'society-of-the-line' },
    { title: 'Alchematrix', path: 'alchematrix' },
    { title: 'Cultural Calendar', path: 'cultural-calendar' },
  ],
  systems: [
    { title: 'Weapon Systems', path: 'weapon-systems' },
    { title: 'Engagement Protocols', path: 'engagement-protocols' },
  ],
  locations: [
    { title: 'Hall of Echoes', path: 'hall-of-echoes' },
  ],
}

export const getCategoryLabel = (category) => {
  const labels = {
    concepts: '🎯 Core Concepts',
    systems: '⚙️ Systems',
    locations: '🏛️ Locations',
  }
  return labels[category] || category
}
