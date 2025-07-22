import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Music } from '../../music/entities/music.entity';

export interface SearchResult {
  music: Music[];
  artists: Artist[];
  albums: Album[];
}
