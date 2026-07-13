import { Router } from "express";

const artistController = Router();

artistController.get('/create', (req, res) => {
    res.render('artists/create', { pageTitle: 'Create Artist' });
});

artistController.post('/create', (req, res) => {
    const artistData = req.body;

    console.log(`Received artist data: ${artistData}`);

    res.redirect('/');
})

export default artistController;