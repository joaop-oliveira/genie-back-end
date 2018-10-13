module.exports = {
  getWorkspace(module) {
    if (process.platform === 'win32') {
      return `C:/Code/web-erp/front-end/${module}`;
    }
    return '~/Code/web-erp/front-end';
  },
};
