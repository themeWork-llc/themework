global.TextDecoder = require('util').TextDecoder;
global.TextEncoder = require('util').TextEncoder;
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

// testing mongoDB
describe('insert', () => {
  let connection;
  let db;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    connection = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
    await mongoServer.stop();
  });

  it('should insert a doc into collection', async () => {
    const rooms = db.collection('rooms');

    const mockRoom = { password: '12345678', text: 'hello world' };
    await rooms.insertOne(mockRoom);

    const insertedRoom = await rooms.findOne({ password: '12345678' });
    expect(insertedRoom).toEqual(mockRoom);
  });
});
