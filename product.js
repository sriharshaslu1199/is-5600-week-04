// products.js
const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

module.exports = {
  list
}


/**
 * List all products
 * @returns {Promise<Array>}
 */
async function list () {
  const data = await fs.readFile(productsFile)
  return JSON.parse(data)
}
// api.js

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts (req, res) {

    // Extract the limit and offset query parameters
    const { offset = 0, limit = 25 } = req.query
  
    try {
      // Pass the limit and offset to the Products service
      res.json(await Products.list({
        offset: Number(offset),
        limit: Number(limit)
      }))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
  // products.js

/**
 * List all products
 * @returns {Promise<Array>}
 */
async function list (options = {}) {
    const { offset = 0, limit = 25 } = options
    const data = await fs.readFile(productsFile)
  
    return JSON.parse(data).slice(offset, offset + limit) // Slice the products
  }
  // products.js

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get (id) {
    const products = JSON.parse(await fs.readFile(productsFile))
  
    // Loop through the products and return the product with the matching id
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i]
      }
    }
  
     // If no product is found, return null
    return null;
  }
  // app.js
// Require the middleware module
const middleware = require('middleware')

// Register our upcoming middleware
app.use(middleware.cors)
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)