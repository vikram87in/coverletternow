const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');


app.get(/\/[^.]*/, (req, res) => {
    res.render('index', { title: 'Node: Cover Letter Now' });
})

app.listen(PORT, () => console.log(`Express server started at http://localhost:${PORT}`));      