const router = require('express').Router();
const locationController = require('./../controller/location');


router.post('/add', async (req, res) => {
	res.send(await locationController.add(req.body));
});

router.get('/', async (req, res) => {
	res.send(await locationController.fetch(req.query.name));
});
router.get('/LocationById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await locationController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await locationController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await locationController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;