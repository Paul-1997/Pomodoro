export default function generateUniqueId(customString:string = ''): string {
  let string = 'xxxxxxxyxxxxxxxy';
  if(customString) string = customString + string;
  return string.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  }) + Date.now().toString(36);
}