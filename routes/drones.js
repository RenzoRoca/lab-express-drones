const express = require('express');

// require the Drone model here

const DronesSchema = require('../models/Drone.model')

const router = express.Router();


router.get('/drones', async(req, res, next) => {
    // Iteration #2: List the drones
    const drones = await DronesSchema.find();
    res.render('../views/drones/list', {
        dronesList: drones
    })

});

router.get('/drones/create', (req, res, next) => {
    // Iteration #3: Add a new drone
    res.render('../views/drones/create-form')
});

router.post('/drones/create', async(req, res, next) => {
    // Iteration #3: Add a new drone
    const post = new DronesSchema({
        name: req.body.name,
        propellers: req.body.propellers,
        maxSpeed: req.body.maxSpeed
    })
    await post.save().then(() => {
            res.redirect('/drones')
        })
        .catch(err => {
            res.redirect('/drones/create')
        })
});

router.get('/drones/:id/edit', async(req, res, next) => {
    // Iteration #4: Update the drone
    const droneToEdit = await DronesSchema.findOne({ _id: req.params.id })

    res.render('../views/drones/update-form', {
        drone: droneToEdit
    })

});

router.post('/drones/:id/edit', async(req, res, next) => {
    // Iteration #4: Update the drone
    await DronesSchema.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        propellers: req.body.propellers,
        maxSpeed: req.body.maxSpeed
    }, function(err, drone) {
        if (err) {
            console.log(err)
        } else {
            console.log("Updated drone : ", drone)
            res.redirect('/drones')
        }
    })

});

router.post('/drones/:id/delete', (req, res, next) => {
    // Iteration #5: Delete the drone
    DronesSchema.findByIdAndDelete(req.params.id, function(err, drone) {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete drone : ", drone)
            res.redirect('/drones')
        }
    })

});

module.exports = router;