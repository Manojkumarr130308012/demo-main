const router = require('express').Router();
const lorryController = require('./../controller/lorry');


router.post('/add', async (req, res) => {
	res.send(await lorryController.add(req.body));
});

router.get('/', async (req, res) => {
	res.send(await lorryController.fetch(req.query.name));
});
router.get('/lorryById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await lorryController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await lorryController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await lorryController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;