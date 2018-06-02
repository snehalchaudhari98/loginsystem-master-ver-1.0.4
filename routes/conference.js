var express = require('express');
var router = express.Router();


// Workshop module
let Conference= require('../models/conference');
let User = require('../models/user');



var d=new Date();

var dd= d.getDate();
var mm=d.getMonth();
var yy=d.getFullYear();

router.get('/conferenceform',function (req,res) {
    res.render('conferenceform',{
        title: 'Conference Conducted '
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

router.post('/conferenceform',function(req,res) {

    req.checkBody('organizer','Please enter name of conference Conducted  !!').notEmpty();
    req.checkBody('subject','Please enter subject of conference Conducted  !!').notEmpty();
    req.checkBody('date','Please enter starting date of the conference Conducted  !!').notEmpty();
    req.checkBody('count','Please enter number of student for conference Conducted  !!').notEmpty();


    let errors =req.validationErrors();

    if(errors)
    {
        res.render('conferenceform',{
            errors:errors
        });
    }else
    {
        let conference = new Conference();
        conference.organizer=req.body.organizer;
        conference.conducted=req.user._id;
        conference.date=req.body.date;
        conference.subject=req.body.subject;
        conference.po=req.body.po;
        conference.pso=req.body.pso;
        conference.count=req.body.count;

        conference.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','conference Conducted details submitted');
                res.redirect('/allconference');
            }
        });
    }


});


router.get('/:id',function (req,res) {
    Conference.findById(req.params.id,function (err,conference) {
        User.findById(conference.conducted,function (err,user) {
            res.render('conference', {
                conference:conference,
                attendee:user.name
            });

        });
    });
});


module.exports = router;