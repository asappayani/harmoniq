import React from 'react';
import './SongList.css';

// SongList Component
const SongList = ({ data }) => {
  // Check if we have songs to display
  if (data.length === 0) {
    return <p>No songs found for your mood.</p>;
  }

  return (
    <div className="song-list">
        {data.map((song, index) => (
          <div key={index} className="song-item">
            <div className="song-info">
              <img src={song.item.data.albumOfTrack.coverArt.sources[2].url} alt={song.item.data.name} className="album-cover" />
              <div>
                <p className="song-name">{song.item.data.name}</p>
                <p className="artist-name">{song.item.data.artists.items[0].profile.name}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SongList;