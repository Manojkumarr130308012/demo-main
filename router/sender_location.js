const router = require('express').Router();
const SenderLocationController = require('../controller/sender_location');


router.post('/add', async (req, res) => {
    res.send(await SenderLocationController.add(req.body));
});

router.get('/', async (req, res) => {
    res.send(await SenderLocationController.fetch(req.query.name));
});
router.get('/receiverLocationbyId', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await SenderLocationController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await SenderLocationController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await SenderLocationController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;