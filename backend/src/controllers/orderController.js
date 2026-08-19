// In-memory order store for fast real-time cross-port sync
let orders = [];

export const getOrders = (req, res) => {
  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
};

export const createOrder = (req, res) => {
  const { id, user, sneaker, price, date, status } = req.body;

  const newOrder = {
    id: id || `SOLE-${Math.floor(100000 + Math.random() * 900000)}`,
    user: user || 'Customer',
    sneaker: sneaker || 'Sneaker Order',
    price: Number(price) || 0,
    date: date || 'Just now',
    status: status || 'Processing'
  };

  orders.unshift(newOrder);

  res.status(201).json({
    success: true,
    data: newOrder
  });
};

export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  orders = orders.map(o => o.id === id ? { ...o, status } : o);

  res.json({
    success: true,
    data: orders
  });
};

export const deleteOrder = (req, res) => {
  const { id } = req.params;
  orders = orders.filter(o => o.id !== id);

  res.json({
    success: true,
    data: orders
  });
};

export const clearOrders = (req, res) => {
  orders = [];
  res.json({
    success: true,
    message: 'All orders cleared'
  });
};
