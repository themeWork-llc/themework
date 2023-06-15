import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

// CORS enablement required from front end as well
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
};

export const socket = io(URL, options);