var express = require('express');
var router = express.Router();


// Workshop module
let Workshop= require('../models/workshop');
let User = require('../models/user');

router.get('/aa/:id',function (req,res) {
    Workshop.findById(req.params.id,function (err,workshop) {
        User.findById(workshop.attendee,function (err,user) {

            res.render('workshop', {
                workshop:workshop,
                attendee:user.name
            });

        });
    });
});

router.get('/cc/:id',function (req,res) {
    Workshop.findById(req.params.id,function (err,workshop) {
        User.findById(workshop.conducted,function (err,user) {
            res.render('workshop', {
                workshop:workshop,
                attendee:user.name
            });

        });
    });
});




var d=new Date();

var dd= d.getDate();
var mm=d.getMonth();
var yy=d.getFullYear();


router.get('/verticleb',function (req,res) {

    res.render('verticleb', {
        title: 'Workshops ',
    });

});

router.get('/workshopconform',function (req,res) {
    res.render('verticleb',{
            dd:dd,
            mm:mm,
            yy:yy
   });
});

router.post('/workshopconform',function(req,res) {

    req.checkBody('organizer','Please enter name of Workshop !!').notEmpty();
    req.checkBody('subject','Please enter some discription about SeWorkshopminar !!').notEmpty();
    req.checkBody('place','Please enter venue of the Workshop !!').notEmpty();
    req.checkBody('date','Please enter starting date of the Workshop !!').notEmpty();
    req.checkBody('count','Please enter Category of the Workshop !!').notEmpty();
    req.checkBody('r2','Please enter Category of the Workshop !!').notEmpty();
    req.checkBody('day','Please enter duration of Workshop !!').notEmpty();
    req.checkBody('day','Please enter valid number !!').isNumeric();


    let errors =req.validationErrors();

    if(errors)
    {
        res.render('verticleb',{
            errors:errors
         });
    }else
    {
        let workshop = new Workshop();
        workshop.organizer=req.body.organizer;
        workshop.conducted=req.user._id;
        workshop.subject=req.body.subject;
        workshop.count=req.body.count;
        workshop.place=req.body.place;
        workshop.date=req.body.date;
        workshop.day=req.body.day;
        workshop.category=req.body.r2;
        workshop.class=req.body.s1;
        workshop.po=req.body.po;
        workshop.pso=req.body.pso;

        workshop.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','Workshop details submitted');
                res.redirect('/allworkshopcon');
            }
        });
    }


});


// for attended one

router.post('/workshopattform',function(req,res) {

    req.checkBody('organizer','Please enter name of Workshop !!').notEmpty();
    req.checkBody('subject','Please enter some discription about Workshop !!').notEmpty();
    req.checkBody('place','Please enter venue of the Workshop !!').notEmpty();
    req.checkBody('date','Please enter starting date of the Workshop !!').notEmpty();
    req.checkBody('r2','Please enter Category of the Workshop !!').notEmpty();
    req.checkBody('day','Please enter duration of Workshop !!').notEmpty();
    req.checkBody('day','Please enter valid number !!').isNumeric();


    let errors =req.validationErrors();

    if(errors)
    {
        res.render('verticleb',{
            errors:errors
        });
    }else
    {
        let workshop = new Workshop();
        workshop.organizer=req.body.organizer;
        workshop.attendee=req.user._id;
        workshop.subject=req.body.subject;
        workshop.place=req.body.place;
        workshop.date=req.body.date;
        workshop.day=req.body.day;
        workshop.category=req.body.r2;
        workshop.po=req.body.po;
        workshop.pso=req.body.pso;

        workshop.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','Workshop details submitted');
                res.redirect('/allworkshopatt');
            }
        });
    }


});



module.exports = router ;