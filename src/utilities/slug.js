export const slug = (str = '') =>
  str.replace(/[()]/g, '').replace(/[\s]/g, '-').toLowerCase();
