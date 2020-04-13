const express = require('express');
const parser = require('body-parser');

const apiRouter = express.Router();
apiRouter.use(parser.json());

apiRouter.route('/').

all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    next();
})

.get((req,res)=>{
    res.end('api working');
})

apiRouter.route('/:depId').

all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    next();
})

.get((req,res)=>{
    res.end(`getting dependencies for ${req.params.depId}`);
})

module.exports = apiRouter;