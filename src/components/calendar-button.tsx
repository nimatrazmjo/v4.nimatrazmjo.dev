"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    calendar: {
      schedulingButton: {
        load: (config: {
          url: string;
          color: string;
          label: string;
          target: HTMLElement;
        }) => void;
      };
    };
  }
}

export function CalendarButton() {
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add the CSS
    const link = document.createElement("link")
    link.href = "https://calendar.google.com/calendar/scheduling-button-script.css"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Load the script
    const script = document.createElement("script")
    script.src = "https://calendar.google.com/calendar/scheduling-button-script.js"
    script.async = true

    script.onload = () => {
      // Once the script is loaded, initialize the button
      if (window.calendar && window.calendar.schedulingButton && calendarRef.current) {
        window.calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3EMlsl4mH3NKHCy9AFYbpU814R5lEWOQaDNFNcK8wcxzExE7YbyNl7GytRnvFgIRDJQ_gmKBb7?gv=true",
          color: "#039BE5",
          label: "Set Meeting",
          target: calendarRef.current,
        })
      }
    }

    document.body.appendChild(script)

    // Cleanup function
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div ref={calendarRef} className="calendar-button-wrapper" />
  );
}
