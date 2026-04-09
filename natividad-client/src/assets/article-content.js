import ts from "./images/typescript-logo.png";
import todago from "./images/TodaGo-Logo.png";
import rest from "./images/rest-api.jpg";
import mapbox from "./images/mapbox-logo.png";
import fcm from "./images/fcm.png";

const articles = [
  {
    name: "learning-typescript",
    title: "Learning TypeScript for Better Safety.",
    image: ts,
    content: [
      "Practice using TypeScript to identify bugs while coding not when you run it.",
    ],
  },
  {
    name: "pasabuy-feature",
    title: "TodaGo's Pasabuy Feature",
    image: todago,
    content: [
      "Tricycle drivers can receive bookings not only for passenger but also for foods, things that user wants.",
    ],
  },
  {
    name: "connecting-frontend-and-backend",
    title: "Connect Frontend & Backend for Testing.",
    image: rest,
    content: [
      "Connect the Flutter to our backend to test if there's an error or bugs.",
    ],
  },
  {
    name: "implement-map-api",
    title: "Use Map API for User Interface",
    image: mapbox,
    content: [
      "Using service that other ride hailing use so that user can track where is the driver.",
    ],
  },
  {
    name: "push-notification-service",
    title: "Real-Time Updates for Both User.",
    image: fcm,
    content: [
      "Use Push Notification Service for convenient and live updates for driver and passengers.",
    ],
  },
];

export default articles;
