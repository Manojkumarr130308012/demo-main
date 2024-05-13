const router = require('express').Router();
const ReceiverLocationController = require('../controller/receiver_location');


router.post('/add', async (req, res) => {
    res.send(await ReceiverLocationController.add(req.body));
});

router.get('/', async (req, res) => {
    res.send(await ReceiverLocationController.fetch(req.query.name));
});
router.get('/receiverLocationbyId', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await ReceiverLocationController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await ReceiverLocationController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await ReceiverLocationController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;