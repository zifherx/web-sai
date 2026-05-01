type YOUTUBE_VIDEO_FRAME_PROPS = {
  title: string
  videoSource: string
}

export function YoutubeVideoFrame({
  title,
  videoSource,
}: YOUTUBE_VIDEO_FRAME_PROPS) {
  return (
    <iframe
      className="aspect-video w-auto object-none md:h-180 md:w-full"
      src={videoSource}
      title={title}
    />
  )
}
