var express = require('express');
var router = express.Router();


// Workshop module
let Guestlecture= require('../models/guest');
let User = require('../models/user');

var d=new Date();

var dd= d.getDate();
var mm=d.getMonth();
var yy=d.getFullYear();


router.get('/aa/:id',function (req,res) {
    Guestlecture.findById(req.params.id,function (err,guest) {
        User.findById(guest.attendee,function (err,user) {
            res.render('guest', {
                guest:guest,
                aaa:user.name
            });
        });

    });
});


router.get('/cc/:id',function (req,res) {
    Guestlecture.findById(req.params.id,function (err,guest) {
        User.findById(guest.conducted,function (err,user) {
            res.render('guest', {
                guest:guest,
                aaa:user.name
            });
        });

    });
});


router.get('/guestform',function (req,res) {

    res.render('guestform', {
        title: 'Guest Lectures '
    });

});
/*

router.get('/guestform',function (req,res) {
    res.render('guestform',{
        dd:dd,
        mm:mm,
        yy:yy
    });
});
*/
router.post('/guestconform',function(req,res) {

    req.checkBody('organizer','Please enter name of Guest Lectures !!').notEmpty();
    req.checkBody('subject','Please enter some discription about Guest Lectures !!').notEmpty();
    req.checkBody('place','Please enter venue of the Guest Lectures !!').notEmpty();
    req.checkBody('date','Please enter starting date of the Guest Lectures !!').notEmpty();
    req.checkBody('count','Please enter Category of the Guest Lectures !!').notEmpty();
    req.checkBody('r4','Please enter Category of the Guest Lectures !!').notEmpty();
    req.checkBody('s3','Please enter class of the Guest Lectures !!').notEmpty();
    req.checkBody('day','Please enter duration of Guest Lectures !!').notEmpty();
    req.checkBody('day','Please enter valid number !!').isNumeric();


    let errors =req.validationErrors();

    if(errors)
    {
        res.render('guestform',{
            errors:errors
        });
    }else
    {
        let guest = new Guestlecture();
        guest.organizer=req.body.organizer;
        guest.conducted=req.user._id;
        guest.subject=req.body.subject;
        guest.count=req.body.count;
        guest.place=req.body.place;
        guest.date=req.body.date;
        guest.day=req.body.day;
        guest.category=req.body.r4;
        guest.class=req.body.s3;
        guest.po=req.body.po;
        guest.pso=req.body.pso;

        guest.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','guest lecture details submitted');
                console.log('Guest conducted submitted !!');
                res.redirect('/allguestcon');
            }
        });
    }


});


// for attended one

router.post('/guestattform',function(req,res) {

    req.checkBody('organizer','Please enter name of Guest Lectures !!').notEmpty();
    req.checkBody('subject','Please enter some discription about Guest Lectures !!').notEmpty();
    req.checkBody('place','Please enter venue of the Guest Lectures !!').notEmpty();
    req.checkBody('date','Please enter starting date of the Guest Lectures !!').notEmpty();
    req.checkBody('r4','Please enter Category of the Guest Lectures !!').notEmpty();
    req.checkBody('day','Please enter duration of Guest Lectures !!').notEmpty();
    req.checkBody('day','Please enter valid number !!').isNumeric();


    let errors =req.validationErrors();

    if(errors)
    {
        res.render('guestform',{
            errors:errors
        });
    }else
    {
        let guest = new Guestlecture();
        guest.organizer=req.body.organizer;
        guest.attendee=req.user._id;
        guest.subject=req.body.subject;
        guest.place=req.body.place;
        guest.date=req.body.date;
        guest.day=req.body.day;
        guest.category=req.body.r4;
        guest.po=req.body.po;
        guest.pso=req.body.pso;

        guest.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','guest lecture details submitted');
                console.log('Guest attended submitted !!');
                res.redirect('/allguestatt');
            }
        });
    }


});

/*
router.get('/:id',function (req,res) {
    Guestlecture.findById(req.params.id,function (err,guest) {
        User.findById(guest.conducted,function (err,user) {
            res.render('guest', {
                guest:guest,
                attendee:user.name
            });

        });
    });
});*/



module.exports = router ;