/**
 *
 * @param length 随机数的常数
 * @returns 随机字符串
 */
export const createNonceStr = (length: number) => {
  const chars =
    '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  let nums = '';
  for (let i = 0; i < length; i++) {
    // 这里是几位就要在这里不改变
    const id = parseInt((Math.random() * chars.length).toString());
    nums += chars[id];
  }
  return nums;
};

/**
 * @returns 获取当前时间戳，单位秒
 */
export const getTimeStamp = () => {
  return Math.floor(Date.now() / 1000);
};
