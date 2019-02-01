const app = require('./app.js');

const port = process.env.PORT || 3019;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})