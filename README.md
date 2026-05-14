# FUKUI Vaccine Dashboard (FUKUIワクチンダッシュボード)

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

> [!WARNING]
> As of April 19, 2023, this service has been discontinued for all municipalities except Sabae City.

This project is a dashboard that displays COVID-19 vaccine appointment availability from medical institutions across Fukui Prefecture, Japan. It aggregates open data and presents it in a simple, city-specific table format for residents.

## Demo

*   **End of Service Notice:** [https://code4fukui.github.io/vaccine_dashboard/select.html](https://code4fukui.github.io/vaccine_dashboard/select.html) (Previously the city selection screen)
*   **Dashboard (Sabae City):** [https://code4fukui.github.io/vaccine_dashboard/#%E9%AF%96%E6%B1%9F%E5%B8%82](https://code4fukui.github.io/vaccine_dashboard/#%E9%AF%96%E6%B1%9F%E5%B8%82)
*   **Data Entry for Medical Institutions:** [https://push.sabae.cc/#type=vaccine](https://push.sabae.cc/#type=vaccine)

## Key Features

*   **City-Specific Views:** Displays appointment availability filtered by municipality.
*   **Tabular Map Navigation:** A CSS-based table visually represents the municipalities of Fukui for easy selection.
*   **Real-time Data:** Fetches and processes the latest appointment data from the PUSH open data platform.
*   **Two-Week Filtering:** Automatically filters and displays only appointments available within the next two weeks from the current date.
*   **Direct Registration Links:** Creates clickable `tel:` or `http:` links for easy appointment booking.

## How It Works

The dashboard is a static web application that fetches and processes data client-side using JavaScript ES modules.

1.  `fetchData.js` retrieves data from multiple open data endpoints on `push.sabae.cc`.
2.  Data for most cities comes from a primary CSV file, while Fukui City data is sourced from separate JSON files.
3.  The script filters appointment dates to the upcoming two weeks, formats the data into a unified structure, and combines phone/URL information into a single registration link.
4.  The processed data is dynamically rendered into an HTML table on `index.html` based on the city selected (passed via URL hash).

## Data Sources

The dashboard aggregates data from the following open data endpoints:

*   **Primary Data (most cities):** `https://push.sabae.cc/817.csv`
*   **Fukui City - Basic Info:** `https://push.sabae.cc/876.json`
*   **Fukui City - Availability:** `https://push.sabae.cc/877.json`

The data includes fields such as: `医療機関名` (Medical Institution Name), `市町名` (Municipality Name), `住所` (Address), `空き状況` (Availability), and contact/booking information.

## Character Usage

The dashboard features "Happy Ryu" (はぴりゅう), the official mascot of Fukui Prefecture.

*   **Official Site:** [happy-ryu-fukui.com](https://happy-ryu-fukui.com/)
*   **Usage License:** Usage is permitted under the terms outlined in the [Happy Ryu Design Usage Guidelines](https://happy-ryu-fukui.com/download/).

## Developed By

[Code for Fukui](https://code4fukui.github.io/)