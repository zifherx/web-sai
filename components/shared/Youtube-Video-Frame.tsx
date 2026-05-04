import { YOUTUBE_VIDEO_FRAME_PROPS } from "@/types"

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
