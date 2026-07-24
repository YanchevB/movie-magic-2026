import { Router } from "express";
import artistService from "../services/artistService";
import { isAuth } from "../middlewares/authMiddleware";
import { createArtistSchema } from "../schemas/artistSchema";
import { getErrorMessage } from "../utils/errorUtils";

const artistController = Router();

artistController.get('/create', isAuth, (req, res) => {
    res.render('artists/create', { pageTitle: 'Create Artist' });
});

artistController.post('/create', isAuth, async (req, res) => {
    const artistData = req.body;

    try {
        const artistData = createArtistSchema.parse(req.body);

        await artistService.create(artistData);
        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);

        res.status(400).render('artists/create', { artist: req.body, error, pageTitle: 'Create Artist' });
    }
})

export default artistController;