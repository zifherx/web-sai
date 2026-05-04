"use client"

import { REPSOL_VIDEO_PROPS } from "@/types"

export function RepsolVideo({ video }: REPSOL_VIDEO_PROPS) {
  const { headingAccent, headingNeutral, videoYoutube } = video

  return (
    <section className="w-full bg-gray-custom-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-2 md:px-8">
        {/* Heading */}
        <h2 className="mb-10 text-center font-headOffice-medium text-2xl md:text-5xl">
          <span className="text-gray-custom-900">{headingNeutral} </span>
          <span className="text-sky-custom-500">{headingAccent}</span>
        </h2>

        <div
          className="relative w-full rounded-2xl shadow-xl"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            width="100%"
            height="100%"
            src={videoYoutube.src}
            title={videoYoutube.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            className="absolute inset-0 aspect-video h-full w-full rounded-2xl border-0"
          />
        </div>
      </div>
    </section>
  )
}
