import URL from "../data/URL.define";
import { Playlist } from "../types/music.types";

/**
 * Get playlist from server
 * @returns JSON with tracks
 */
export async function getPlaylist(): Promise<Playlist> {
  const response = await fetch(URL.playlist);
  const json: Promise<Playlist> = response.json();
  return json;
}

/**
 * Download music from the server
 * @param link Link to download from
 * @returns Promise with audio file
 */
export async function downloadTrack(link: string): Promise<HTMLAudioElement> {
  
  // Time before track reject download
  const TIMEOUT = 10000;

  return new Promise((res, rej) => {

    // Downloading track
    const audioFile = new Audio(link);

    // Timeout tracking
    const timeoutTimer = setTimeout(() => {
      const error = new Error('Timeout, track loading time is greater than 5s');
      removeEventListeners();
      rej(error);
    }, TIMEOUT);

    // Callback when music is downloaded
    const onResolve = () => {
      clearTimeout(timeoutTimer);
      removeEventListeners();
      return res(audioFile);
    };

    // Callback when there is an error
    const onReject = (e: ErrorEvent) => {
      clearTimeout(timeoutTimer);
      removeEventListeners();
      return rej(e);
    };

    // Function that remove event listeners
    const removeEventListeners = () => {
      audioFile.removeEventListener('canplaythrough', onResolve);
      audioFile.removeEventListener('error', onReject);
    };

    // If track is loaded - return resolve
    audioFile.addEventListener('canplaythrough', onResolve);
    
    // If error - reject promise
    audioFile.addEventListener('error', onReject);
  });
}