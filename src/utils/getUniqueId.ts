/* eslint-disable no-bitwise */
export default function generateUniqueId(customString: string = ''): string {
  let uid: string = '';
  if (window.location.protocol === 'https:') {
    return (uid = crypto.randomUUID());
  }
  uid = 'xxxxxxxyxxxxxxxy';
  if (customString) uid = customString + uid;
  return (
    uid.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }) + Date.now().toString(36)
  );
}
