const router = require('express').Router();
const driverController = require('./../controller/driver');


router.post('/add', async (req, res) => {
	res.send(await driverController.add(req.body));
});

router.get('/', async (req, res) => {
	res.send(await driverController.fetch(req.query.name));
});
router.get('/driverById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await driverController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await driverController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await driverController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;