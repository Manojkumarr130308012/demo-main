const router = require('express').Router();
const billingHistoryController = require('../controller/billing_history');


router.post('/add', async (req, res) => {
	res.send(await billingHistoryController.add(req.body));
});

router.get('/', async (req, res) => {
	res.send(await billingHistoryController.fetch());
});
router.get('/billById', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await billingHistoryController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await billingHistoryController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await billingHistoryController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;