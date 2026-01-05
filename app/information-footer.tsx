"use client"

export function InformationFooter() {
  const title = "Baby Shower for Lola Lynn"
  const address = "1289 Teal Hollow Dr, Yuba City, CA"
  const description = "Join us as we celebrate the upcoming arrival of baby Lola Lynn!"
  const start = "20260307T190000Z" // 11 AM PST
  const end = "20260307T220000Z" // 2 PM PST
  const encodedAddress = encodeURIComponent(address)

  const googleMapsUrl = `https://www.google.com/maps?q=${encodedAddress}`
  const appleMapsUrl = `https://maps.apple.com/?q=${encodedAddress}`

  const googleCalendarUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${start}/${end}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(address)}`

  return (
    <footer className="[font-family:var(--font-raleway)] w-full py-8 grid grid-cols-2 min-h-36 bg-pink-100 mt-20">
      <div className="text-center flex flex-col items-center">
        <div className="text-lg font-semibold mb-1">Directions</div>
        <a
          href={appleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline mb-1"
        >
          Get direction for apple maps
        </a>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline"
        >
          Get directions for google maps
        </a>
      </div>
      <div className="text-center flex flex-col items-center">
        <div className="text-lg font-semibold mb-1">Calendar</div>
        <a
          href="calendar/baby-shower-lola-lynn.ics"
          className="text-sm underline mb-1"
        >
          Add to apple calendar
        </a>
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline"
        >
          Add to google calendar
        </a>
      </div>
    </footer>
  )
}