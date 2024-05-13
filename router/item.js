const router = require('express').Router();
const itemController = require('../controller/item');


router.post('/add', async (req, res) => {
	res.send(await itemController.add(req.body));
});

router.get('/', async (req, res) => {
	res.send(await itemController.fetch(req.query.name));
});
router.get('/itemById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await itemController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await itemController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await itemController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;