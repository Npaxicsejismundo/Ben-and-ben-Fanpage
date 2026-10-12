/**
 * Official Spotify player. Rendered only after a fan presses play (the parent
 * mounts it on demand), so no third-party script loads with the page.
 */
export function SpotifyEmbed({ trackId, title }: { trackId: string; title: string }) {
  return (
    <iframe
      title={`${title} by Ben&Ben on Spotify`}
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
      width="100%"
      height="152"
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="block w-full rounded-xl border-0"
    />
  )
}
