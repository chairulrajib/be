function createOTP(length) {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
  
  module.exports = {
    createOTP
  };