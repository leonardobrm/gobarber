import expess from 'express';

const server = expess();

server.get('/', (req, res) => res.json({ message: 'hello word' }));

server.listen(3333, () => {
  console.log('🚀🚀 Server Started 🚀🚀');
});
