// student-api.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let students = [{
    "stdID":"1",
    "stdName":"Mark",
    "stdgrade": "A",
    "course":"CS",
    "address":"Chennai",
    "phno":"987654431",
},
{"stdID":"2",
"stdName":"Jessy",
"stdgrade": "A",
"course":"CS",
"address":"Chennai",
"phno":"987654431",
},
{
    "stdID":"3",
    "stdName":"Ria",
    "stdgrade": "A",
    "course":"CS",
    "address":"Chennai",
    "phno":"987654431",
}
        
];
app.use(cors());

app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());
app.post('/student' ,(req,res)=> {
    const student = req.body;

    console.log(student);
    students.push(student);
    res.send('student is added to the database');
});
app.get('/student', (req, res) =>{
    res.json(students);
});
app.get('/student/:stdID',(req,res)=> {
    const stdID = req.params.stdID;
    for(let student of students ) {
        if(student.stdID == stdID) {
            res.json(student);
            return;
        }
    }
    res.status(404).send('student not found');
});
app.delete('/student/:stdID', (req,res)=> {
    const stdID = req.params.stdID;
    students = students.filter(i => {
        if(i.stdID !== stdID) {
            return true;
        }
        return false;
    });
    res.send('student is deleted');
})
app.post('/student/:stdID',(req, res)=> {
    const stdID = req.params.stdID;
    const newStudent = req.body;

    for(let i=0;i< students.length;i++) {
        let student = students[i]

        if(student.stdID === stdID) {
            students[i]= newStudent;
        }
    }
});
app.put('/student/:stdID',(req, res)=> {
    const stdID= req.params.stdID;
    const newStudent = req.body;

    for(let i=0;i< students.length;i++) {
        let student = students[i]

        if(student.stdID === stdID) {
            students[i]= newStudent;
        }
    }
    res.send('student is edited');
});
app.listen(port,() =>
console.log(`Hello world listening on port ${port}!`)
);