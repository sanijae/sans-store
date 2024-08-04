<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    h1, h2, h3 {
      color: #333;
    }
    a {
      color: #0366d6;
    }
    a:hover {
      text-decoration: underline;
    }
    pre {
      background: #f6f8fa;
      padding: 10px;
      border-radius: 5px;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <h1>San Store</h1>
  <p>San Store is a full-featured e-commerce application built with a Vue.js frontend and a Node.js backend. The application includes user authentication, product management, and a shopping cart system.</p>

  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ul>

  <h2 id="features">Features</h2>
  <ul>
    <li>User Authentication</li>
    <li>Product Management</li>
    <li>Shopping Cart</li>
    <li>Checkout System</li>
  </ul>

  <h2 id="installation">Installation</h2>
  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js</li>
    <li>MongoDB</li>
    <li>Vue CLI</li>
  </ul>

  <h3>Backend Setup</h3>
  <pre>
    <code>
# Clone the repository
git clone https://github.com/yourusername/san-store.git

# Navigate to the backend directory
cd san-store/backend

# Install dependencies
npm install

# Create a .env file and add your MongoDB URI
touch .env
# Add the following line to .env file
MONGO_URI=mongodb://localhost:27017/sans-store

# Start the backend server
npm start
    </code>
  </pre>

  <h3>Frontend Setup</h3>
  <pre>
    <code>
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the frontend server
npm run serve
    </code>
  </pre>

  <h2 id="usage">Usage</h2>
  <p>Once the servers are running, you can access the application at <a href="http://localhost:8080">http://localhost:8080</a>. You can register a new user, browse products, add products to your cart, and proceed to checkout.</p>

  <h2 id="api-endpoints">API Endpoints</h2>
  <h3>User Authentication</h3>
  <ul>
    <li><code>POST /api/users/register</code> - Register a new user</li>
    <li><code>POST /api/users/login</code> - Login a user</li>
  </ul>

  <h3>Products</h3>
  <ul>
    <li><code>GET /api/products</code> - Get all products</li>
    <li><code>POST /api/products</code> - Add a new product</li>
    <li><code>PUT /api/products/:id</code> - Update a product</li>
    <li><code>DELETE /api/products/:id</code> - Delete a product</li>
  </ul>

  <h3>Cart</h3>
  <ul>
    <li><code>GET /api/cart/:userId</code> - Get cart items for a user</li>
    <li><code>POST /api/cart</code> - Add a product to the cart</li>
    <li><code>DELETE /api/cart/:itemId</code> - Remove an item from the cart</li>
  </ul>

  <h2 id="contributing">Contributing</h2>
  <p>Contributions are welcome! Please fork this repository and submit a pull request for any improvements or new features.</p>

  <h2 id="license">License</h2>
  <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>
  <h1>Created by sanijae</h1>
  <h2>muhammadsanijae@gmail.com</h2>
</body>
</html>
