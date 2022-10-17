// Music track for play
export interface MusicTrack {
  title: string
  author: string
  genre: string
  link: string
  originalLink: string
}

// Playlist with tracks
export type Playlist =  MusicTrack[];

// Item of stack for downloaded tracks
export interface TrackStackItem {
  id: number,
  track: HTMLAudioElement
}

// Stack of downloaded tracks
export type TrackStack = TrackStackItem[];