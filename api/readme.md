# Orenda Backend

Typescript Express Backend to serve API for React Client.

## Installation

Install dependancy packages first

```bash
npm install
```

Create a `.env` inside the api folder file to setup the required environment variables, you can copy the value from below

```python
PORT=7000
# development | production | testing
NODE_ENV=development
JWT_SECRET=xae1a12

DB_USER=postgres
DB_PASSWORD=admin
DB_DATABASE=orenda
DB_HOST=127.0.0.1
```

Run the script below to execute in development
```
npm run dev
```

# Quick Endpoints Documentation

## `Customer`
Fetch all data with the required queries below

```rest
GET /api/customers?page=${enter_page}
```
Search data
```rest
GET /api/customers?name=${enter_name}
GET /api/customers?phone=${enter_phone}
```
Create data
```rest
POST /api/customer
Check request body in swagger docs at the bottom of this documentation
```
And more in swagger docs.

## `Product`
```rest
GET /api/Products
```
```rest
POST /api/product
```

## `Creating Order & Fetching Order Products`
```rest
POST /api/create-order

Request Body:
{
    "products": [
        {
            "productId": "enter_product_id",
            "discount": "1500",
        },
        {
            "productId": "enter_product_id",
            "discount": "",
        },
        {
            "productId": "enter_product_id",
            "discount": "",
        },
    ],
    "customer: "enter_customer_id"
}

Response:
{
    "message": "Order Successfully created",
    "orderId": 47muadhsimsjg8248 
}
```

### To fetch all the products of each order, `COPY` the previous generated `orderId` into the endpoint below

```rest
GET /api/order/${insert_order_id_here}

Response:
{
    Customer: {
        <!-- All customer detail -->
        ...
        totalPrice: 7500 <!-- Total after discount price inputted -->
        totalProducts: 3
        products: [
            {
                <!-- products details -->
                ...
                price: 3500
                discountedPrice: 1500
            }
        ]
    }
}
```

# Read the model schema from below endpoints
```
http://localhost:7000/docs
```