var express = require('express');
var router = express.Router();


// Workshop module
let Seminar= require('../models/seminar');
let User = require('../models/user');
var d=new Date();

var dd= d.getDate();
var mm=d.getMonth();
var yy=d.getFullYear();

/*

router.get('/seminarform',function (req,res) {
    res.render('seminarform',{
        dd:dd,
        mm:mm,
        yy:yy
    });
});*/

router.get('/seminarform',function (req,res) {
    res.render('seminarform',{
        title:'Seminar form'
    });
});

router.post('/seminarformatt',function(req,res) {

    req.checkBody('organizer','Please enter name of Seminar !!').notEmpty();
    req.checkBody('subject','Please enter some discription about Seminar !!').notEmpty();
    req.checkBody('place','Please enter venue of the Seminar !!').notEmpty();
    req.checkBody('date','Please enter starting date of the Seminar !!').notEmpty();
    req.checkBody('r1','Please enter Category of the Seminar !!').notEmpty();
    req.checkBody('day','Please enter duration of Seminar !!').notEmpty();
    req.checkBody('day','Please enter valid number !!').isNumeric();

    let errors =req.validationErrors();

    if(errors)
    {
        res.render('seminarform',{
            errors:errors
        });
    }else
    {
        let seminar = new Seminar();
        seminar.organizer=req.body.organizer;
        seminar.attendee=req.user._id;
        seminar.subject=req.body.subject;
        seminar.place=req.body.place;
        seminar.date=req.body.date;
        seminar.day=req.body.day;
        seminar.category=req.body.r1;
        seminar.po=req.body.po;
        seminar.pso=req.body.pso;

        seminar.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','Seminar details submitted');
                res.redirect('/allseminaratt');
            }
        });
    }


});

router.get('/aa/:id',function (req,res) {
    Seminar.findById(req.params.id,function (err,seminar) {
        User.findById(seminar.attendee,function (err,user) {
            res.render('seminar', {
                seminar:seminar,
                attendee:user.name
            });

        });
    });
});

router.post('/seminarformcon',function(req,res) {

    req.checkBody('organizer','Please enter name of Seminar !!').notEmpty();
    req.checkBody('subject','Please enter some discription about Seminar !!').notEmpty();
    req.checkBody('place','Please enter venue of the Seminar !!').notEmpty();
    req.checkBody('date','Please enter starting date of the Seminar !!').notEmpty();
    req.checkBody('r1','Please enter Category of the Seminar !!').notEmpty();
    req.checkBody('day','Please enter duration of Seminar !!').notEmpty();
    req.checkBody('day','Please enter valid number !!').isNumeric();

    let errors =req.validationErrors();

    if(errors)
    {
        res.render('seminarform',{
            errors:errors
        });
    }else
    {
        let seminar = new Seminar();
        seminar.organizer=req.body.organizer;
        seminar.conducted=req.user._id;
        seminar.subject=req.body.subject;
        seminar.place=req.body.place;
        seminar.date=req.body.date;
        seminar.day=req.body.day;
        seminar.category=req.body.r1;
        seminar.po=req.body.po;
        seminar.pso=req.body.pso;

        seminar.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','Seminar details submitted');
                res.redirect('/allseminarcon');
            }
        });
    }


});

router.get('/cc/:id',function (req,res) {
    Seminar.findById(req.params.id,function (err,seminar) {
        User.findById(seminar.conducted,function (err,user) {
            res.render('seminar', {
                seminar:seminar,
                attendee:user.name
            });

        });
    });
});


module.exports = router;