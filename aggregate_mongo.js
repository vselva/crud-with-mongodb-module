use shop;

db.users.insertMany([
    {
        _id: ObjectId("67c3395ead7e2ec403b79447"), 
        name: "Selvakumar", 
        email: "vselva1@gmail.com" 
    },
    { 
        _id: ObjectId("67c3395ead7e2ec403b79448"), 
        name: "Arockia Diana", 
        email: "diana@gmail.com" 
    }
]);

db.products.insertMany([
    { 
        _id: ObjectId("67c339f8ad7e2ec403b7944a"), 
        name: "Laptop", 
        price: 1200 
    },
    { 
        _id: ObjectId("67c339d5ad7e2ec403b79449"), 
        name: "Phone", 
        price: 800 
    },
    { 
        _id: ObjectId("67c33a01ad7e2ec403b7944b"), 
        name: "Headphones", 
        price: 150 
    }
]);

db.orders.insertMany([
    {
        amount: 2000,
        customer_id: ObjectId("67c3395ead7e2ec403b79447"), 
        products_ids: [
            ObjectId("67c339f8ad7e2ec403b7944a"), 
            ObjectId("67c339d5ad7e2ec403b79449")
        ]
    },
    {
        amount: 950,
        customer_id: ObjectId("67c3395ead7e2ec403b79448"), 
        products_ids: [
            ObjectId("67c33a01ad7e2ec403b7944b"),
            ObjectId("67c339d5ad7e2ec403b79449")
        ]
    }
]);

print("Data inserted successfully!");

const result = db.orders.aggregate([
    { 
        $lookup: { 
            from: 'products', 
            localField: 'products_ids', 
            foreignField: '_id', 
            as: 'Products'
        }
    }, 
    {
        $lookup: {
            from: 'users', 
            localField: 'customer_id', 
            foreignField: '_id', 
            as: 'Customer'
        }
    }
]);

print("Aggregation result:");
result.forEach(printjson);
