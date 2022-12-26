const firebase = require("../../config/firebase");
const auth = require('../../middleware');

let express = require("express"),
router = express.Router();
const db = firebase.firestore();

const productsDb = db.collection('products'); 

// @route    POST api/products/create
// @desc     Add product
// @access   Public
router.post('/create', auth.decodeToken, async (req, res) => {
    try {
        const products = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            imageURL: req.body.imageURL,
            uid: req.body.userId
        };
        const response = await db.collection('products').add(products);
        let resData = {};
        resData[response.id] = products;
        res.send(resData);
    } catch(error) {
        res.send(error);
    }
});

// @route    GET api/products/read
// @desc     Get all products
// @access   Public
router.get('/read', auth.decodeToken, async (req, res) => {
    let obj = {};
    try {
        const response = await productsDb.get();
        response.forEach(doc => {
            if(doc.data().uid === req.user) {
                obj[doc.id] = doc.data();
            }
        });
        res.send(obj);
    } catch(error) {
        res.send(error);
    }
});

// @route    GET api/products/read/:id
// @desc     Get product by ID
// @access   Public
router.get('/read/:id', auth.decodeToken, async (req, res) => {
    try {
      const productRef = productsDb.doc(req.params.id);
      const response = await productRef.get();
      res.send(response.data());
    } catch(error) {
      res.send(error);
    }
});

// @route    PUT api/products/update/:id
// @desc     Update product by ID
// @access   Public
router.put('/update/:id', auth.decodeToken, async(req, res) => {
    try {
        const productRef = await productsDb.doc(req.params.id)
        .update(req.body);
        res.send(productRef);
    } catch(error) {
        res.send(error);
    }
});

// @route    DELETE api/products/delete/:id
// @desc     Delete product
// @access   Private
router.delete('/delete/:id', auth.decodeToken, async (req, res) => {
    try {
      const response = await db.collection("products").doc(req.params.id).delete();
      res.send(req.params.id);
    } catch(error) {
      res.send(error);
    }
})

module.exports = router;