var express = require('express');
var router = express.Router();


// Workshop module
let Exam= require('../models/exam');
let User = require('../models/user');



var d=new Date();

var dd= d.getDate();
var mm=d.getMonth();
var yy=d.getFullYear();

router.get('/examform',function (req,res) {
    res.render('examform',{
        title: 'Certified Exam Conducted '
    });
});

/*
router.get('/industryvisitform',function (req,res) {
    res.render('industryvisitform',{
        dd:dd,
        mm:mm,
        yy:yy
    });
});
*/

router.post('/examform',function(req,res) {

    req.checkBody('organizer','Please enter name of Exam Conducted  !!').notEmpty();
    req.checkBody('subject','Please enter subject of Exam Conducted  !!').notEmpty();
    req.checkBody('date','Please enter starting date of the Exam Conducted  !!').notEmpty();
    req.checkBody('count','Please enter number of student for Exam Conducted  !!').notEmpty();
    req.checkBody('s4','Please enter Class for Exam Conducted  !!').notEmpty();


    let errors =req.validationErrors();

    if(errors)
    {
        res.render('examform',{
            errors:errors
        });
    }else
    {
        let exam = new Exam();
        exam.organizer=req.body.organizer;
        exam.conducted=req.user._id;
        exam.date=req.body.date;
        exam.subject=req.body.subject;
        exam.class=req.body.s4;
        exam.po=req.body.po;
        exam.pso=req.body.pso;
        exam.count=req.body.count;

        exam.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','Exam Conducted details submitted');
                res.redirect('/allexam');
            }
        });
    }


});


router.get('/:id',function (req,res) {
    Exam.findById(req.params.id,function (err,exam) {
        User.findById(exam.conducted,function (err,user) {
            res.render('exam', {
                exam:exam,
                attendee:user.name
            });

        });
    });
});


module.exports = router;