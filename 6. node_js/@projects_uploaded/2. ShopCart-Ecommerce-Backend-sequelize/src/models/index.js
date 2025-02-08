const Category = require('./category');
const Product = require('./product');
const Cart = require('./cart');
const User = require('./user');
const CartProducts = require('./cart_products');
const Order = require('./order');
const OrderProducts = require('./order_products');

// Model associations
Product.belongsTo(Category, { foreignKey: 'categoryId' }); // Product belongs to one Category
Category.hasMany(Product, { foreignKey: 'categoryId' }); // Category has many Products

User.hasOne(Cart, { foreignKey: 'userId' }); // User has one Cart
Cart.belongsTo(User, { foreignKey: 'userId' }); // Cart belongs to one User

Cart.belongsToMany(Product, { through: CartProducts }); // Cart has many Products through CartProducts
Product.belongsToMany(Cart, { through: CartProducts }); // Product has many Carts through CartProducts

Order.belongsTo(User, { foreignKey: 'userId' }); // Order belongs to one User
User.hasMany(Order, { foreignKey: 'userId' }); // User has many Orders

Order.belongsToMany(Product, { through: OrderProducts }); // Order has many Products through OrderProducts
Product.belongsToMany(Order, { through: OrderProducts }); // Product has many Orders through OrderProducts

// Syncing models in the correct order
async function syncDbInOrder() {
    try {
        await User.sync(); // User table first as other models depend on it
        await Category.sync(); // Category next as Product depends on it
        await Product.sync(); // Product after Category
        await Cart.sync(); // Cart after User
        await CartProducts.sync(); // Junction table (cart_products)
        await Order.sync(); // Order after User
        await OrderProducts.sync(); // Junction table (order_products)
        console.log('All models synced successfully');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

module.exports = {
    syncDbInOrder,
    Category,
    Product,
    Cart,
    User,
    CartProducts,
    Order,
    OrderProducts
};
