const redis = require('redis')
const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

module.exports = {
  setText: async (password, text) => {
  await client.set(`${password}`, `${text}`);
  const cachedText = await client.get(`${password}`)
  console.log('successfully updated cached text to: ', cachedText)
  return cachedText;
  },

  getText: async (password) => {
    const cachedText = await client.get(`${password}`)
    console.log('retrieved cached text: ', cachedText)
    return cachedText;
  }
};