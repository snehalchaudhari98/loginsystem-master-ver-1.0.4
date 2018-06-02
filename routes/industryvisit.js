var express = require('express');
var router = express.Router();


// Workshop module
let Industryvisit= require('../models/industryvisit');
let User = require('../models/user');


var d=new Date();

var dd= d.getDate();
var mm=d.getMonth();
var yy=d.getFullYear();

router.get('/industryvisitform',function (req,res) {
    res.render('industryvisitform',{
        title: 'Industry Visit '
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

router.post('/industryvisitform',function(req,res) {

    req.checkBody('organizer','Please enter name of Industrial visit !!').notEmpty();
    req.checkBody('date','Please enter starting date of the Industrial visit !!').notEmpty();
    req.checkBody('count','Please enter number of student for Industrial visit !!').notEmpty();
    req.checkBody('r3','Please enter Type of the Industrial visit !!').notEmpty();
    req.checkBody('s2','Please enter Class for Industrial visit !!').notEmpty();


    let errors =req.validationErrors();

    if(errors)
    {
        res.render('industryvisitform',{
            errors:errors
        });
    }else
    {
        let industryvisit = new Industryvisit();
        industryvisit.organizer=req.body.organizer;
        industryvisit.attendee=req.user._id;
        industryvisit.date=req.body.date;
        industryvisit.category=req.body.r3;
        industryvisit.class=req.body.s2;
        industryvisit.po=req.body.po;
        industryvisit.pso=req.body.pso;
        industryvisit.count=req.body.count;

        industryvisit.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','Industry visit details submitted');
                res.redirect('/alliv');
            }
        });
    }


});


router.get('/:id',function (req,res) {
    Industryvisit.findById(req.params.id,function (err,industryvisit) {
        User.findById(industryvisit.attendee,function (err,user) {
            res.render('industryvisit', {
                industryvisit:industryvisit,
                attendee:user.name
            });

        });
    });
});


module.exports = router;