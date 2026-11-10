# CryptoHive

A React web app that collects cryptocurrency news from several external APIs into one feed, with search, category filters and user accounts.

> Team project, B.Sc. Software Engineering (Braude College), 4 students.
> **My part:** I designed the app's architecture and built the entire back end (Firebase and the news-API data layer). I also built the search functions and helped with the UI design.

![CryptoHive home page](docs/screenshot-home.png)
<!-- Add a screenshot of the home page at docs/screenshot-home.png -->

## Features
- **One news feed** built from several external crypto news APIs
- **Search** with a dedicated results page
- **Category filters** by cryptocurrency, with coin logos
- **User accounts**: sign-up, login and a profile page protected by a private route (Firebase Authentication)
- Live scrolling banner, dark mode, and a responsive layout for desktop and mobile

## Tech stack
| Area | Tools |
|---|---|
| Front end | React 18, React Router, JavaScript, CSS |
| Data | Axios (REST API calls), Firebase |
| Build | Vite |

## Project structure
```
src/
  components/   UI pieces: Header, Sidebar, NewsList, SearchBar, Login, SignUp, ...
  pages/        HomePage, SearchResultsPage, ProfilePage, PrivateRoute
  firebase.js   Firebase setup
  styles/       Per-component CSS
```

## Run it locally
```bash
git clone https://github.com/MaxLazar96/CryptoHive.git
cd CryptoHive
npm install
npm run dev
```
Then open the local address Vite prints (usually http://localhost:5173).
