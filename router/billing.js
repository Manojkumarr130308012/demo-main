const router = require('express').Router();
const billingController = require('../controller/billing');


router.post('/add', async (req, res) => {
	res.send(await billingController.add(req.body));
});

router.get('/', async (req, res) => {
	res.send(await billingController.fetch());
});
router.get('/billById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await billingController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await billingController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await billingController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;