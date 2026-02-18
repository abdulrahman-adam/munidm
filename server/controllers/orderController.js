import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
// import stripe from "stripe";
import Stripe from "stripe";
import { Op } from "sequelize";
import Address from "../models/Address.js";

// --- 1. Get Orders by User Id ---
// --- 1. Get Orders by User Id (Fixed) ---


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    // Get ONLY paid orders for this user
    // const rawOrders = await Order.findAll({
    //   where: {
    //     userId,
    //     isPaid: true
    //   },
    //   order: [['createdAt', 'DESC']]
    // });

    const rawOrders = await Order.findAll({
      where: {
        userId,
        [Op.or]: [{ isPaid: true }, { paymentType: "COD" }],
      },
      order: [["createdAt", "DESC"]],
    });

    const orders = await Promise.all(
      rawOrders.map(async (order) => {
        const orderData = order.get({ plain: true });

        // Parse items if stored as string
        if (typeof orderData.items === "string") {
          orderData.items = JSON.parse(orderData.items);
        }

        // Attach product details
        const itemsWithImages = await Promise.all(
          orderData.items.map(async (item) => {
            const productDetails = await Product.findByPk(item.product);

            return {
              ...item,
              product: productDetails
                ? productDetails.get({ plain: true })
                : null,
            };
          }),
        );

        orderData.items = itemsWithImages;

        return orderData;
      }),
    );

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get User Orders Error:", error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// --- 2. Get ALL Orders (For Admin/Seller) ---

export const getAllOrders = async (req, res) => {
  try {
  

    const rawOrders = await Order.findAll({
      where: {
        [Op.or]: [{ isPaid: true }, { paymentType: "COD" }],
      },
      order: [["createdAt", "DESC"]],
    });

    const orders = await Promise.all(
      rawOrders.map(async (order) => {
        const orderData = order.get({ plain: true });

        // Get address
        const addressInfo = await Address.findOne({
          where: { userId: orderData.userId },
        });

        // Get user info
        const userInfo = await User.findByPk(orderData.userId, {
          attributes: ["name", "email"],
        });

        // Parse items
        if (typeof orderData.items === "string") {
          orderData.items = JSON.parse(orderData.items);
        }

        // Attach product info
        const itemsWithDetails = await Promise.all(
          orderData.items.map(async (item) => {
            const productInfo = await Product.findByPk(item.product);

            return {
              ...item,
              product: productInfo ? productInfo.get({ plain: true }) : null,
            };
          }),
        );

        // Combine everything
        return {
          ...orderData,
          address: addressInfo ? addressInfo.get({ plain: true }) : null,

          user: userInfo,

          items: itemsWithDetails,
        };
      }),
    );

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// export const getAllOrders = async (req, res) => {
//     try {
//         const rawOrders = await Order.findAll({
//             where: {
//                 [Op.or]: [
//                     { paymentType: "COD" },
//                     { isPaid: true }
//                 ]
//             },
//             order: [['createdAt', 'DESC']]
//         });

//         // 1. Transform the database rows into useful JSON for React
//         const orders = await Promise.all(rawOrders.map(async (order) => {
//             const orderData = order.get({ plain: true });

//             // FIX: Parse "items" from String to Array
//             if (typeof orderData.items === 'string') {
//                 orderData.items = JSON.parse(orderData.items);
//             }

//             // FIX: Parse "address" from String to Object
//             if (typeof orderData.address === 'string') {
//                 orderData.address = JSON.parse(orderData.address);
//             }

//             // 2. Attach full product details (name, category, price)
//             // Without this, item.product.name will be undefined!
//             const itemsWithDetails = await Promise.all(orderData.items.map(async (item) => {
//                 const productInfo = await Product.findByPk(item.product);
//                 return {
//                     ...item,
//                     product: productInfo ? productInfo.get({ plain: true }) : { name: "Product Removed" }
//                 };
//             }));

//             orderData.items = itemsWithDetails;
//             return orderData;
//         }));

//         res.json({ success: true, orders });
//     } catch (error) {
//         console.error("Backend Error:", error.message);
//         return res.json({ success: false, message: error.message });
//     }
// }

// --- 3. Delete an order by ID ---
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.destroy({ where: { id } });
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- 4. Place Order COD ---
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.product);
      if (product) {
        amount += product.offerPrice * item.quantity;
      }
    }

    // Add Tax Charge (2%)
    amount += Math.floor(amount * 0.2);

    const orderData = {
      userId,
      items, // Make sure your model uses DataTypes.JSON
      amount,
      address, // Make sure your model uses DataTypes.JSON
      paymentType: "COD",
      isPaid: false,
      status: "Order Placed",
      date: Date.now(),
    };

    await Order.create(orderData);

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};


// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { userId, items, address } = req.body;
//     const { origin } = req.headers;

//     if (!address || !items || items.length === 0) {
//       return res.json({ success: false, message: "Invalid data" });
//     }

//     let stripeLineItems = [];
//     let totalAmountForDB = 0;

//     // Taux de taxe (0.20 pour 20%)
//     const TAX_RATE = 0.2;

//     for (const item of items) {
//       const product = await Product.findByPk(item.product);
//       if (product) {
//         // Prix unitaire avec taxe incluse
//         const priceWithTax = product.offerPrice * (1 + TAX_RATE);

//         // Montant pour Stripe (DOIT être un entier en centimes)
//         // On utilise Math.round pour éviter les erreurs de virgule flottante
//         const unitAmountInCents = Math.round(priceWithTax * 100);

//         stripeLineItems.push({
//           price_data: {
//             currency: "eur",
//             product_data: {
//               name: product.name,
//               // Optionnel: ajouter l'image pour que l'utilisateur la voie sur Stripe
//               images: Array.isArray(product.image)
//                 ? [product.image[0]]
//                 : [product.image],
//             },
//             unit_amount: unitAmountInCents,
//           },
//           quantity: item.quantity,
//         });

//         totalAmountForDB += priceWithTax * item.quantity;
//       }
//     }

//     // Créer la commande en base de données
//     const order = await Order.create({
//       userId,
//       items,
//       amount: totalAmountForDB, // Montant total calculé proprement
//       address,
//       paymentType: "Online",
//       isPaid: false,
//       status: "Order Placed",
//       date: Date.now(),
//     });

//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//     const session = await stripeInstance.checkout.sessions.create({
//       line_items: stripeLineItems, // Utilise les items calculés ci-dessus
//       mode: "payment",
//       success_url: `${origin}/loader?next=my-orders`,
//       cancel_url: `${origin}/cart`,
//       metadata: {
//         orderId: order.id.toString(),
//         userId: userId.toString(),
//       },
//     });

//     return res.json({ success: true, url: session.url });
//   } catch (error) {
//     console.error("Stripe Error:", error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let stripeLineItems = [];
    let totalAmountForDB = 0;
    const TAX_RATE = 0.2;

    for (const item of items) {
      const product = await Product.findByPk(item.product);
      if (product) {
        const priceWithTax = product.offerPrice * (1 + TAX_RATE);
        const unitAmountInCents = Math.round(priceWithTax * 100);

        stripeLineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              images: Array.isArray(product.image) ? [product.image[0]] : [product.image],
            },
            unit_amount: unitAmountInCents,
          },
          quantity: item.quantity,
        });

        totalAmountForDB += priceWithTax * item.quantity;
      }
    }

    const order = await Order.create({
      userId,
      items,
      amount: totalAmountForDB,
      address,
      paymentType: "Online",
      isPaid: false, // Will be updated by Webhook
      status: "Order Placed",
      date: new Date(), // Changed from Date.now() for better SQL compatibility
    });

    // --- FIXED LINE BELOW: capitalized Stripe ---
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY); 

    const session = await stripeInstance.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order.id.toString(),
        userId: userId.toString(),
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// export const stripeWebhooks = async (request, response) => {
// console.log("Stripe Webhook Triggered!"); // ADD THIS
//   const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY); // Must match import
//   const sig = request.headers["stripe-signature"];
//   let event;

//   try {
//     // MUST be raw body
//     event = stripeInstance.webhooks.constructEvent(
//       request.body, // <-- must be Buffer
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET,
//     );
//   } catch (error) {
//     console.error("Webhook Error:", error.message);
//     return response.status(400).send(`Webhook Error: ${error.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;
//     const { orderId, userId } = session.metadata;

//     await Order.update({ isPaid: true }, { where: { id: orderId } });
//     await User.update({ cartItems: {} }, { where: { id: userId } });
//   }

//   response.json({ received: true });
// };








export const stripeWebhooks = async (request, response) => {
  console.log("🚀 Stripe Webhook Received!"); 
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body, 
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("❌ Webhook Signature Error:", error.message);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { orderId, userId } = session.metadata;

    console.log(`💳 Payment Successful for Order: ${orderId}, User: ${userId}`);

    try {
      // 1. Convert to Number to match Database ID type
      const numericOrderId = Number(orderId);

      // 2. Perform the update
      const [updatedRows] = await Order.update(
        { isPaid: true, status: "Order Placed" }, 
        { where: { id: numericOrderId } }
      );

      if (updatedRows === 0) {
        console.log("⚠️ Order found in Stripe but NOT in MySQL. Check ID match.");
      } else {
        console.log("✅ MySQL Order updated to Paid.");
      }

      // 3. Clear User Cart
      await User.update(
        { cartItems: "{}" }, // Clear cart as empty JSON string/object
        { where: { id: userId } }
      );

    } catch (dbError) {
      console.error("❌ Database Update Error:", dbError.message);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({ received: true });
};

// --- 7. Update Status (Admin) ---
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.update({ status }, { where: { id: orderId } });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
