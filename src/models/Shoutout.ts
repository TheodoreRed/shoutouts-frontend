export default interface Shoutout {
  _id?: string;
  to: string;
  from: string;
  text: string;
  photoUrl?: string; // Profile image of sender
  shoutoutImg?: string; // File upload
}
