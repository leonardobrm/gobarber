import expess from 'express';
import routes from './routes';

const app = expess();

app.use(expess.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀🚀 Server Started 🚀🚀');
});
