const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const JsonData =  require('./MOCK_DATA.json');
const fs = require('fs');


const resultsPerPage = 4;

app.get('/:id/:page', function(req, res){
    let obj = JsonData.filter(item => item.id === req.params.id);
    const username = obj[0].username;
    const id = obj[0].id;
    const items = obj[0].items;
    items.sort();
    const numOfResults = items.length;
    const page = req.params.page;

    const list = items.slice((page-1)*resultsPerPage,(page*resultsPerPage));
    res.render('index', {data: list, page, username, id});
});

app.get('/:id', function(req, res){
    let obj = JsonData.filter(item => item.id === req.params.id);
    const username = obj[0].username;
    const id = obj[0].id;
    const items = obj[0].items;
    items.sort();
    const numOfResults = items.length;
    const page = 1;

    const list = items.slice((page-1)*resultsPerPage,(page*resultsPerPage));
    res.render('index', {data: list, page, username, id});
});

app.get('/:id/:page/changeuname',function(req, res){
    let obj = JsonData.filter(item => item.id === req.params.id);
    const page = req.params.page;
    const username = obj[0].username;
    const id = obj[0].id;
    res.render("changeuname", {page, username, id});
})

app.post('/:id/:page/changed',function(req, res){
    var newData=[];
    JsonData.forEach(item =>{
        if(item.id ==req.body.id){
            item.username = req.body.uname;
        }
        newData.push(item);
    });
    fs.writeFileSync('MOCK_DATA.json', JSON.stringify(newData));
    let obj = JsonData.filter(item => item.id === req.params.id);
    const username = obj[0].username;
    const id = obj[0].id;
    const items = obj[0].items;
    items.sort();
    const numOfResults = items.length;
    const page = req.params.page;
    const list = items.slice((page-1)*resultsPerPage,(page*resultsPerPage));
    res.render('index', {data: list, page, username, id});
})

app.get('/',function(req, res){
    var data=[];
    JsonData.forEach(item =>{
        item.id = "hahahahahmf";
        data.push(item);
    });
    let stringdata = JSON.stringify(data);
    fs.writeFileSync('MOCK_DATA.json', JSON.stringify(data));
    console.log(data);
})

app.listen(3000, () => {
    console.log("Server is listining on Port 3000")
})