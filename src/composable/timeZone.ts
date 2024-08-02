export const getCurrZone = function ():string {
  // 获取当前时区偏移量，以分钟为单位
  const offset = new Date().getTimezoneOffset();

  // 将偏移量转换为小时和分钟
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;

  // 构建 UTC 偏移量字符串
  const utcOffset = `UTC${offset <= 0 ? '+' : '-'}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  // 获取时区标识符
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return `${utcOffset}_${timezone}`;

}();

export const formatZone = (zone: string):string => {
  const zoneSplit = zone.split('_');
  return `(${zoneSplit.shift()}) ${[...zoneSplit].join('')}`
}