const express = require('express');
const { getStaticData } = require('./src/helper.js');
const app = express();
const PORT = process.env.PORT || 8080;


app.set('view engine', 'ejs');


app.get(/\/[^.]*/, async (req, res) => {
    const data = await getStaticData(req.hostname);
    // res.json({ "name": "vikram" });
    res.render('index', { title: 'Node: Cover Letter Now', isShowHowItWorks: true, data: data });
})

app.listen(PORT, () => console.log(`Express server started at http://localhost:${PORT}`));      