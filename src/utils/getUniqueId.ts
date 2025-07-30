/* eslint-disable no-bitwise */
export default function generateUniqueId(customString: string = ''): string {
  // 優先使用 crypto.randomUUID()
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    const uuid = crypto.randomUUID();
    return customString ? `${customString}${uuid}` : uuid;
  }
  
  // 降級方案
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const uid = `${randomPart}${timestamp}`;
  
  return customString ? `${customString}${uid}` : uid;
}
