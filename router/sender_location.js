const router = require('express').Router();
const SenderLocationController = require('../controller/sender_location');
const multer = require('multer');
const exceljs = require('exceljs');

const upload = multer();
const excelupload = multer({ dest: 'uploads/' });

router.post('/add', async (req, res) => {
    res.send(await SenderLocationController.add(req.body));
});

router.get('/', async (req, res) => {
    res.send(await SenderLocationController.fetch(req.query.name));
});
router.get('/senderLocationbyId', async (req, res) => {
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

router.put('/addExcel',excelupload.single('file'),async (req, res) => {
	console.log(req.file.path);
	const response = await SenderLocationController.addSenderLocationExcel(req.file.path);
	res.send(response);
})

module.exports = router;