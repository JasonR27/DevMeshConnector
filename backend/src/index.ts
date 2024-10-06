import app from './app';

const port = process.env.PORT || 8080; 
// app.listen(`10.84.146.61:${port}`, () => {
app.listen(port, () => {
  /* eslint-disable no-console */
  // console.log(`Listening: http://localhost:${port}`);
  console.log(`Listening: localhost:${port}`);
  /* eslint-enable no-console */
});
