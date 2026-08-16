const artistsData = [
  {
    nick: 'art3mis',
    name: 'ART3MIS',
    image: 'artists/ART3MIS portfolio design/uploads/20251020_222528-605336dc.jpg',
    fieldLabel: 'Ilustrace',
    iconKey: 'brush',
    accent: '#e6362e',
    description: 'Anime a videoherní ilustrace — tužka, fix i digitální kresba.',
    longDescription: 'Kreslíř od dětství. Anime a videoherní světy jsou hlavní inspirace; tužka, fix a čím dál víc i digitální kresba.',
    location: 'CZ',
    joinDate: '10.08.2026',
    portfolioUrl: 'artists/ART3MIS portfolio design/Art3mis Portfolio.dc.html'
  },
  {
    nick: 'anelly',
    name: 'Anelly',
    image: 'artists/Anelly portfolio design/uploads/IMG_5636.jpeg',
    fieldLabel: 'Zpěvačka · Pop',
    iconKey: 'mic',
    accent: '#8f9678',
    description: 'Zpěvačka a autorka písní z Prahy.',
    longDescription: 'Zpěvačka a autorka písní z Prahy. Píše o víře, pochybnostech a o tom, co se běžně neříká nahlas.',
    location: 'Praha, CZ',
    joinDate: '05.08.2026',
    portfolioUrl: 'artists/Anelly portfolio design/Anelly Portfolio.dc.html'
  }
];

function getArtistByNick(nick) {
  return artistsData.find(a => a.nick === nick);
}

function getLatestArtists(count) {
  return artistsData.slice().sort((a, b) => {
    const dateA = new Date(a.joinDate.split('.').reverse().join('-'));
    const dateB = new Date(b.joinDate.split('.').reverse().join('-'));
    return dateB - dateA;
  }).slice(0, count);
}