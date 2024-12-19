import { BehaviorSubject } from 'rxjs';

// Initialize a BehaviorSubject with default value
const userSubject = new BehaviorSubject(null);

// Exported API for emitting and subscribing to events
export const eventService = {
  user$: userSubject.asObservable(), // Observable for subscribers
  setUser: (user) => userSubject.next(user), // Method to emit values
};
