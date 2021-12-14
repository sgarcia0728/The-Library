const express = require('express');
//const app = express();
const router = express.Router();
const controller = require('../controllers/book');

router.get('/book', controller.getbooks);

//const handler = require('./handler')

//router.get('/test', async (req,res) => {
//    try{
//        const pageNumber  = req.query.pageNumber    == undefined ? '' : parseInt(req.query.pageNumber)
//        const pageSize    = req.query.pageSize      == undefined ? '' : parseInt(req.query.pageSize)
//        const from        = req.query.from          == undefined ? '' : parseInt(req.query.from)
//        const to          = req.query.to            == undefined ? '' : parseInt(req.query.to)
//        const region      = req.query.region        == undefined ? '' : req.query.region
//        const sort        = req.query.sort          == undefined ? '' : JSON.parse(req.query.sort)
//        const filters = {pageNumber,pageSize,from,to,region,sort}
//        const info = await handler.search(filters)
//        res.send(info)
//    }catch(e){
//        res.send(e)
//    }
//})

module.exports = router;
