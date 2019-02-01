const app = require('./app.js');

const port = process.env.PORT || 3012;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})