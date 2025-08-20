📅 Calendar App – Frontend Assignment
🚀 Overview

This project is part of the Frontend Labs Assignment.
It is a React-based Calendar application inspired by Google Calendar.
The calendar displays the current month by default, supports navigation between months, highlights today’s date, and displays events loaded from a static JSON file.

✨ Features

📆 Monthly Calendar View – Grid layout with current month & year.
⬅️➡️ Navigation – Move to previous/next months.
🔵 Today Highlight – Current date is visually marked.
📝 Static Events – Events are loaded from a JSON file with title, date, time, and duration.
🎨 Event Display – Events shown on their respective dates in the grid.
⚡ Conflict Handling – Supports multiple events per date; overlapping events are color-coded.
💻 Responsive Design – Built with Tailwind CSS for a clean and adaptive UI.

📂 Tech Stack

React.js
Tailwind CSS
Day.js (date handling)

📑 Example Event Data
[
  {
    "title": "Team Meeting",
    "date": "2025-08-20",
    "time": "10:00 AM",
    "duration": "1h"
  },
  {
    "title": "Project Review",
    "date": "2025-08-22",
    "time": "02:00 PM",
    "duration": "30m"
  }
]
