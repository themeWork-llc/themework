const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('insert', () => {
  let connection;
  let db;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();

    connection = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
    await mongoServer.stop();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const rooms = db.collection('rooms');
    
    const mockRoom = {password: '12345678', text: 'hello world'};
    await rooms.insertOne(mockRoom);

    const insertedRoom = await rooms.findOne({password: '12345678'});
    expect(insertedRoom).toEqual(mockRoom);
  });
});
