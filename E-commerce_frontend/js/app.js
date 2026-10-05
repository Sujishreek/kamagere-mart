const API_BASE = window.location.origin;
const CART_KEY = 'km_cart';
const BUY_NOW_KEY = 'km_buy_now';
const USER_KEY = 'km_user';
const ORDERS_KEY = 'km_orders';
const ADMIN_TOKEN_KEY = 'km_admin_token';
const ADMIN_EMAIL_KEY = 'km_admin_email';

const state = {
  products: [],
  selectedCategory: 'All',
  searchTerm: '',
  cart: loadCart(),
  user: loadUser(),
  orders: loadOrders(),
  route: null,
  checkoutMode: 'cart'
};

window.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  const app = document.getElementById('app');
  if (!app) return;

  renderShell();
  attachEvents();
  setRoute(getInitialRoute());
  loadProducts();
}

function getInitialRoute() {
  if (window.__KM_ROUTE) return window.__KM_ROUTE;
  if (window.location.hash) return window.location.hash.replace('#', '');
  if (window.location.pathname.includes('/pages/')) {
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    if (page && page !== 'index') return page;
  }
  return 'home';
}

function renderShell() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand" data-route="home">
          <div class="brand-mark">K</div>
          <span>Kamagere Mart</span>
        </div>
        <div class="nav-pills">
          <button class="nav-btn" data-route="home">Home</button>
          <button class="nav-btn" data-route="orders">Orders</button>
          <button class="nav-btn" data-route="auth">Login</button>
          <button class="nav-btn" data-route="admin">Admin</button>
          <button class="nav-btn" data-route="profile">Profile</button>
        </div>
        <div class="topbar-actions">
          <button class="header-cart" data-route="cart" aria-label="cart">
            🛒
            <span class="cart-badge" id="cart-badge">0</span>
          </button>
        </div>
      </div>
    </header>
    <main id="page-content" class="page-shell"></main>
    <div id="toast" class="toast"></div>
  `;
  updateCartBadge();
}

function attachEvents() {
  const app = document.getElementById('app');

  app.addEventListener('click', (event) => {
    const routeButton = event.target.closest('[data-route]');
    if (routeButton) {
      const route = routeButton.getAttribute('data-route');
      if (route) {
        if (route === 'cart') state.checkoutMode = 'cart';
        setRoute(route);
      }
      return;
    }

    const addButton = event.target.closest('[data-action="add-cart"]');
    if (addButton) {
      const productId = Number(addButton.getAttribute('data-product-id'));
      addToCart(productId);
      return;
    }

    const buyButton = event.target.closest('[data-action="buy-now"]');
    if (buyButton) {
      const productId = Number(buyButton.getAttribute('data-product-id'));
      buyNow(productId);
      return;
    }

    const incButton = event.target.closest('[data-action="inc-qty"]');
    if (incButton) {
      const productId = Number(incButton.getAttribute('data-product-id'));
      adjustCartQuantity(productId, 1);
      return;
    }

    const decButton = event.target.closest('[data-action="dec-qty"]');
    if (decButton) {
      const productId = Number(decButton.getAttribute('data-product-id'));
      adjustCartQuantity(productId, -1);
      return;
    }

    const removeButton = event.target.closest('[data-action="remove-cart"]');
    if (removeButton) {
      const productId = Number(removeButton.getAttribute('data-product-id'));
      removeCartItem(productId);
      return;
    }

    const categoryButton = event.target.closest('[data-category]');
    if (categoryButton) {
      state.selectedCategory = categoryButton.getAttribute('data-category');
      renderHome();
      return;
    }

    const actionButton = event.target.closest('[data-action]');
    if (actionButton) {
      const action = actionButton.getAttribute('data-action');
      if (action === 'checkout') {
        state.checkoutMode = 'cart';
        setRoute('checkout');
      }
      if (action === 'use-current-location') {
        useCurrentLocation();
      }
      if (action === 'logout') {
        logout();
      }
      if (action === 'load-login') {
        setRoute('auth');
      }
      if (action === 'load-register') {
        setRoute('auth', { panel: 'register' });
      }
      if (action === 'load-admin-login') {
        setRoute('admin');
      }
      if (action === 'admin-logout') {
        logoutAdmin();
      }
      if (action === 'admin-retry') {
        renderAdminDashboard();
      }
      if (action === 'edit-product') {
        editProduct(Number(actionButton.getAttribute('data-product-id')));
      }
      if (action === 'cancel-product-edit') {
        resetProductForm();
      }
    }
  });

  app.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    if (form.dataset.formType === 'login') {
      event.preventDefault();
      await handleLogin(form);
      return;
    }

    if (form.dataset.formType === 'admin-login') {
      event.preventDefault();
      await handleAdminLogin(form);
      return;
    }

    if (form.dataset.formType === 'add-product') {
      event.preventDefault();
      await handleAddProduct(form);
      return;
    }

    if (form.dataset.formType === 'register') {
      event.preventDefault();
      await handleRegister(form);
      return;
    }

    if (form.dataset.formType === 'checkout') {
      event.preventDefault();
      await handleCheckout(form);
      return;
    }

    if (form.dataset.formType === 'search') {
      event.preventDefault();
      state.searchTerm = form.querySelector('input')?.value?.trim() || '';
      renderHome();
    }
  });

  app.addEventListener('change', (event) => {
    const input = event.target;
    if (input instanceof HTMLInputElement && input.id === 'product-image-file') {
      handleProductImageSelection(input);
    }
  });

  app.addEventListener('input', (event) => {
    const input = event.target;
    if (input instanceof HTMLInputElement && input.id === 'product-image') {
      const form = input.closest('[data-form-type="add-product"]');
      if (form) form.dataset.imageData = '';
      updateProductImagePreview(input.value.trim());
    }
  });

  window.addEventListener('hashchange', () => {
    const route = (window.location.hash || '').replace('#', '') || 'home';
    setRoute(route);
  });
}

function setRoute(route, options = {}) {
  state.route = route;
  const target = route || 'home';
  window.location.hash = target === 'home' ? '' : target;

  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  switch (target) {
    case 'home':
      renderHome();
      break;
    case 'cart':
      renderCart();
      break;
    case 'checkout':
      renderCheckout();
      break;
    case 'orders':
      renderOrders();
      break;
    case 'auth':
      renderAuth(options.panel || 'login');
      break;
    case 'profile':
      renderProfile();
      break;
    case 'admin':
      if (sessionStorage.getItem(ADMIN_TOKEN_KEY)) {
        renderAdminDashboard();
      } else {
        renderAdminLogin();
      }
      break;
    default:
      renderHome();
  }
}

function renderHome() {
  const products = getVisibleProducts();
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  pageContent.innerHTML = `
    <section class="hero">
      <div>
        <p class="pill" style="margin-bottom:12px;">Fresh groceries at your doorstep</p>
        <h1>Everything your kitchen needs, delivered fast.</h1>
        <p>Shop staples, dairy, fruits, snacks and household essentials with same-day delivery in your city.</p>
        <div class="hero-actions">
          <button class="primary-btn" data-route="cart">Go to cart</button>
          <button class="secondary-btn" data-route="orders">View orders</button>
        </div>
      </div>
      <div class="hero-card">
        <h3>Why shop with us?</h3>
        <div class="hero-stat-grid">
          <div class="stat-box">
            <span>Fresh Picks</span>
            <strong>1200+</strong>
          </div>
          <div class="stat-box">
            <span>Delivery</span>
            <strong>30 min</strong>
          </div>
          <div class="stat-box">
            <span>Offers</span>
            <strong>Up to 30%</strong>
          </div>
          <div class="stat-box">
            <span>Saved</span>
            <strong>₹1.2k</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="filters">
      ${window.KM_DATA.categories.map((category) => `
        <button class="chip ${state.selectedCategory === category ? 'active' : ''}" data-category="${category}">
          ${category}
        </button>
      `).join('')}

      <form class="search-box" data-form-type="search">
        <input type="search" aria-label="Search products" placeholder="Search vegetables, dairy, atta..." value="${escapeHtml(state.searchTerm)}" />
      </form>
    </section>

    ${products.length ? `
      <section class="catalog-grid">
        ${products.map((product) => `
          <article class="product-card">
            <div class="product-image">
              <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />
              <span class="discount-badge">${Number(product.discount) || 0}% OFF</span>
            </div>
            <div class="product-body">
              <div class="product-category">${escapeHtml(product.category)}</div>
              <h3 class="product-title">${escapeHtml(product.name)}</h3>
              <div class="product-meta">
                <div>
                  <div class="product-price">₹${Number(product.price).toLocaleString('en-IN')}</div>
                  <div class="old-price">₹${Number(product.oldPrice).toLocaleString('en-IN')}</div>
                </div>
                <div class="item-unit">${escapeHtml(product.unit)}</div>
              </div>
              <div class="product-description">${escapeHtml(product.description)}</div>
              <div class="product-actions">
                <button class="add-cart-btn" data-action="add-cart" data-product-id="${product.id}">Add to Cart</button>
                <button class="buy-now-btn" data-action="buy-now" data-product-id="${product.id}">Buy Now</button>
              </div>
            </div>
          </article>
        `).join('')}
      </section>
    ` : `
      <div class="empty-state">No products match your search. Try a different keyword or category.</div>
    `}
  `;
}

function renderCart() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  const cartItems = getCartItems();
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal > 99 ? 0 : 25;
  const total = subtotal + delivery;

  if (!cartItems.length) {
    pageContent.innerHTML = `
      <div class="empty-state">
        <h2>Your cart is empty</h2>
        <p>Browse groceries and add items to start your order.</p>
        <button class="primary-btn" data-route="home">Continue shopping</button>
      </div>
    `;
    return;
  }

  pageContent.innerHTML = `
    <div class="cart-layout">
      <div class="card">
        <h3>Shopping cart</h3>
        ${cartItems.map((item) => `
          <div class="cart-item">
            <div class="cart-thumb"><img src="${item.product.image}" alt="${escapeHtml(item.product.name)}" /></div>
            <div>
              <h4>${item.product.name}</h4>
              <div class="item-unit">${item.product.unit}</div>
              <div class="qty-controls">
                <button data-action="dec-qty" data-product-id="${item.product.id}">−</button>
                <span>${item.quantity}</span>
                <button data-action="inc-qty" data-product-id="${item.product.id}">+</button>
              </div>
            </div>
            <div>
              <div class="item-price">₹${item.product.price * item.quantity}</div>
              <div style="text-align:right; margin-top:8px;">
                <button class="outline-btn" data-action="remove-cart" data-product-id="${item.product.id}">Remove</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <aside class="summary-box">
        <h3>Order summary</h3>
        <div class="summary-line"><span>Subtotal</span><strong>₹${subtotal}</strong></div>
        <div class="summary-line"><span>Delivery</span><strong>₹${delivery}</strong></div>
        <div class="summary-line total"><span>Total</span><strong>₹${total}</strong></div>
        <p class="delivery-policy">Free delivery on orders above ₹99; otherwise ₹25.</p>
        <button class="primary-btn" style="width:100%; margin-top:12px;" data-action="checkout">Proceed to checkout</button>
      </aside>
    </div>
  `;
}

function renderCheckout() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  const items = state.checkoutMode === 'buy-now' ? getBuyNowItems() : getCartItems();

  if (!items.length) {
    pageContent.innerHTML = `
      <div class="empty-state">
        <h2>No items to checkout</h2>
        <button class="primary-btn" data-route="home">Add products</button>
      </div>
    `;
    return;
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal > 99 ? 0 : 25;
  const total = subtotal + delivery;
  const user = state.user || {};

  pageContent.innerHTML = `
    <div class="checkout-layout">
      <div class="card">
        <h3>Delivery details</h3>
        <form class="form-grid" data-form-type="checkout">
          <div class="form-row">
            <div>
              <label for="name">Full name</label>
              <input id="name" name="name" value="${escapeHtml(user.name || '')}" required />
            </div>
            <div>
              <label for="phone">Phone</label>
              <input id="phone" name="phone" value="${escapeHtml(user.phone || '')}" required />
            </div>
          </div>

          <div>
            <label for="address">Address</label>
            <textarea id="address" name="address" placeholder="House/flat, street, landmark, city..." required>${escapeHtml(user.address || '')}</textarea>
          </div>

          <div class="location-picker">
            <button class="secondary-btn" type="button" data-action="use-current-location">Use my current location</button>
            <p class="location-status" id="location-status" aria-live="polite">Allow location access to show your delivery point on Google Maps.</p>
            <div class="location-map" id="location-map" hidden>
              <iframe title="Selected delivery location on Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              <a id="location-map-link" href="#" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
            </div>
          </div>

          <div class="form-row">
            <div>
              <label for="payment">Payment method</label>
              <select id="payment" name="payment">
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
            <div>
              <label for="source">Order source</label>
              <select id="source" name="source">
                <option value="Cart" ${state.checkoutMode === 'cart' ? 'selected' : ''}>Cart</option>
                <option value="Buy Now" ${state.checkoutMode === 'buy-now' ? 'selected' : ''}>Buy Now</option>
              </select>
            </div>
          </div>

          <button class="primary-btn" type="submit" style="width: fit-content;">Place order</button>
        </form>
      </div>

      <aside class="summary-box">
        <h3>Order summary</h3>
        ${items.map((item) => `
          <div class="summary-line">
            <span>${item.product.name} × ${item.quantity}</span>
            <strong>₹${item.product.price * item.quantity}</strong>
          </div>
        `).join('')}
        <div class="summary-line"><span>Subtotal</span><strong>₹${subtotal}</strong></div>
        <div class="summary-line"><span>Delivery</span><strong>₹${delivery}</strong></div>
        <div class="summary-line total"><span>Total</span><strong>₹${total}</strong></div>
        <p class="delivery-policy">Free delivery on orders above ₹99; otherwise ₹25.</p>
      </aside>
    </div>
  `;
}

function renderAuth(panel = 'login') {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  const isLogin = panel === 'login';

  pageContent.innerHTML = `
    <div class="auth-grid">
      <div class="auth-panel">
        <h3>${isLogin ? 'Login' : 'Create account'}</h3>
        <form data-form-type="${isLogin ? 'login' : 'register'}">
          ${!isLogin ? `
            <div>
              <label for="name">Full name</label>
              <input id="name" name="name" required />
            </div>
          ` : ''}

          <div style="margin-top: 12px;">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>

          ${!isLogin ? `
            <div style="margin-top: 12px;">
              <label for="phone">Phone</label>
              <input id="phone" name="phone" type="tel" required />
            </div>
          ` : ''}

          <div style="margin-top: 12px;">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>

          <button type="submit" class="primary-btn" style="margin-top:16px; width:100%;">
            ${isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>

      <div class="auth-panel">
        <h3>${isLogin ? 'Customer benefits' : 'Already have an account?'}</h3>
        ${isLogin ? `
          <ul>
            <li>Track all orders in one place</li>
            <li>Save delivery addresses</li>
            <li>Early access to offers and discounts</li>
            <li>Fast checkout for repeated shopping</li>
          </ul>
        ` : '<p>Sign in to continue shopping.</p>'}
        <button class="secondary-btn" data-action="${isLogin ? 'load-register' : 'load-login'}" style="margin-top: 12px; width:100%;">
          ${isLogin ? 'Need an account? Register' : 'Already a member? Login'}
        </button>
        ${isLogin ? '<button class="outline-btn" data-action="load-admin-login" style="margin-top: 12px; width:100%;">Admin sign in</button>' : ''}
      </div>
    </div>
  `;
}

function renderAdminLogin(errorMessage = '') {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  pageContent.innerHTML = `
    <div class="admin-login card">
      <h2>Admin sign in</h2>
      <p>Sign in with your administrator account to manage store orders.</p>
      ${errorMessage ? `<p class="admin-error" role="alert">${escapeHtml(errorMessage)}</p>` : ''}
      <form data-form-type="admin-login" class="form-grid">
        <div>
          <label for="admin-email">Admin email</label>
          <input id="admin-email" name="email" type="email" autocomplete="username" required />
        </div>
        <div>
          <label for="admin-password">Password</label>
          <input id="admin-password" name="password" type="password" autocomplete="current-password" required />
        </div>
        <button type="submit" class="primary-btn">Sign in</button>
        <button type="button" class="outline-btn" data-route="home">Back to store</button>
      </form>
    </div>
  `;
}

async function renderAdminDashboard() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  pageContent.innerHTML = '<div class="card"><p>Loading admin dashboard…</p></div>';
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) {
    renderAdminLogin();
    return;
  }

  try {
    const headers = { Authorization: `Bearer ${token}` };
    const [ordersResponse, productsResponse] = await Promise.all([
      fetch(`${API_BASE}/api/orders`, { headers }),
      fetch(`${API_BASE}/api/products`)
    ]);
    const result = await ordersResponse.json();
    const productResult = await productsResponse.json();

    if (ordersResponse.status === 401 || ordersResponse.status === 403) {
      logoutAdmin(false);
      renderAdminLogin('Your admin session expired. Please sign in again.');
      return;
    }
    if (!ordersResponse.ok) {
      throw new Error(result.message || 'Could not load orders.');
    }
    if (!Array.isArray(result)) {
      throw new Error('The server returned an invalid orders response.');
    }
    if (!productsResponse.ok || !Array.isArray(productResult)) {
      throw new Error(productResult.message || 'Could not load products.');
    }
    state.products = productResult;

    const totalSales = result.reduce((sum, order) => sum + Number(order.total || 0), 0);
    pageContent.innerHTML = `
      <section class="admin-dashboard">
        <div class="admin-heading">
          <div>
            <p class="eyebrow">Store management</p>
            <h1>Admin dashboard</h1>
            <p>Signed in as ${escapeHtml(sessionStorage.getItem(ADMIN_EMAIL_KEY) || 'Administrator')}</p>
          </div>
          <button class="outline-btn" data-action="admin-logout">Sign out</button>
        </div>
        <div class="admin-stats">
          <div class="stat-box"><span>Total orders</span><strong>${result.length}</strong></div>
          <div class="stat-box"><span>Order value</span><strong>₹${totalSales.toLocaleString('en-IN')}</strong></div>
          <div class="stat-box"><span>Products</span><strong>${productResult.length}</strong></div>
        </div>
        <section class="card admin-products">
          <h2 id="product-form-heading">Add a product</h2>
          <p>New products are saved to the store database and appear in the storefront catalog.</p>
          <form data-form-type="add-product" class="form-grid admin-product-form">
            <div class="form-row">
              <div>
                <label for="product-name">Product name</label>
                <input id="product-name" name="name" maxlength="255" required />
              </div>
              <div>
                <label for="product-category">Category</label>
                <select id="product-category" name="category" required>
                  ${window.KM_DATA.categories.filter((category) => category !== 'All').map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="form-row">
              <div>
                <label for="product-unit">Pack size / unit</label>
                <input id="product-unit" name="unit" maxlength="100" placeholder="e.g. 1 kg" required />
              </div>
              <div>
                <label for="product-price">Selling price (₹)</label>
                <input id="product-price" name="price" type="number" min="0.01" step="0.01" required />
              </div>
              <div>
                <label for="product-old-price">MRP (₹)</label>
                <input id="product-old-price" name="oldPrice" type="number" min="0.01" step="0.01" required />
              </div>
            </div>
            <div>
              <label for="product-description">Description</label>
              <textarea id="product-description" name="description" maxlength="2000" required></textarea>
            </div>
            <div>
              <label for="product-image">Image URL (optional, HTTPS)</label>
              <input id="product-image" name="image" type="url" placeholder="https://..." />
            </div>
            <div>
              <label for="product-image-file">Take or choose a product photo</label>
              <input id="product-image-file" name="image-file" type="file" accept="image/*" capture="environment" />
              <p class="admin-form-hint">On supported phones this opens the rear camera. Photos are resized before saving.</p>
              <img id="product-image-preview" class="admin-image-preview" alt="Product photo preview" hidden />
            </div>
            <button type="submit" class="primary-btn">Add product</button>
            <button type="button" class="outline-btn" data-action="cancel-product-edit" hidden>Cancel editing</button>
            <p class="admin-form-message" role="status" aria-live="polite"></p>
          </form>
        </section>
        <section class="card admin-products">
          <h2>Store products</h2>
          <div class="admin-product-list">
            ${productResult.map((product) => `
              <div class="admin-product-row">
                <img class="admin-product-thumb" src="${escapeHtml(product.image)}" alt="" />
                <span>${escapeHtml(product.name)}</span>
                <span>${escapeHtml(product.category)} · ${escapeHtml(product.unit)}</span>
                <strong>₹${Number(product.price).toLocaleString('en-IN')}</strong>
                <button type="button" class="outline-btn" data-action="edit-product" data-product-id="${Number(product.id)}">Edit</button>
              </div>
            `).join('')}
          </div>
        </section>
        <section class="card admin-orders">
          <h2>Recent orders</h2>
          ${result.length ? `
            <div class="admin-table-wrap">
              <table class="admin-table">
                <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Address</th><th>Payment</th><th>Status</th><th>Total</th></tr></thead>
                <tbody>
                  ${result.map((order) => `
                    <tr>
                      <td>${escapeHtml(order.id || '')}</td>
                      <td>${escapeHtml(order.date || '')}</td>
                      <td>${(order.items || []).map((item) => `${escapeHtml(item.name || 'Item')} × ${Number(item.quantity || 0)}`).join('<br>')}</td>
                      <td>${escapeHtml(order.address || '')}</td>
                      <td>${escapeHtml(order.payment || '')}</td>
                      <td><span class="pill">${escapeHtml(order.status || 'Confirmed')}</span></td>
                      <td>₹${Number(order.total || 0).toLocaleString('en-IN')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : '<p>No orders have been placed yet.</p>'}
        </section>
      </section>
    `;
  } catch (error) {
    console.error('Unable to load admin dashboard', error);
    pageContent.innerHTML = `
      <div class="empty-state">
        <h2>Could not load admin dashboard</h2>
        <p>${escapeHtml(error.message || 'Please try again.')}</p>
        <button class="primary-btn" data-action="admin-retry">Retry</button>
      </div>
    `;
  }
}

function renderOrders() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  const orders = state.orders.length ? state.orders : [];

  if (!orders.length) {
    pageContent.innerHTML = `
      <div class="empty-state">
        <h2>No orders yet</h2>
        <p>Place your first order and it will appear here.</p>
        <button class="primary-btn" data-route="home">Start shopping</button>
      </div>
    `;
    return;
  }

  pageContent.innerHTML = `
    <div class="orders-list">
      ${orders.map((order) => `
        <div class="order-card">
          <div class="order-header">
            <strong>Order ${order.id || 'KM-000'}</strong>
            <span class="pill">${order.status || 'Confirmed'}</span>
          </div>
          <div class="order-meta">
            ${order.date || 'Today'} · ${order.payment || 'COD'} · ₹${order.total || 0}
          </div>
          <div style="margin-top:12px;">
            ${order.items ? order.items.map((item) => `
              <div class="summary-line"><span>${item.name || item.product?.name} × ${item.quantity || 1}</span><strong>₹${(item.price || item.product?.price || 0) * (item.quantity || 1)}</strong></div>
            `).join('') : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProfile() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  const user = state.user;

  if (!user) {
    pageContent.innerHTML = `
      <div class="empty-state">
        <h2>You are not logged in</h2>
        <p>Sign in to access your account and order history.</p>
        <button class="primary-btn" data-route="auth">Login</button>
      </div>
    `;
    return;
  }

  pageContent.innerHTML = `
    <div class="profile-box">
      <div class="card">
        <h3>My profile</h3>
        <div class="summary-line"><span>Name</span><strong>${escapeHtml(user.name || '')}</strong></div>
        <div class="summary-line"><span>Email</span><strong>${escapeHtml(user.email || '')}</strong></div>
        <div class="summary-line"><span>Phone</span><strong>${escapeHtml(user.phone || '')}</strong></div>
        <div class="summary-line"><span>Address</span><strong>${escapeHtml(user.address || 'Not provided')}</strong></div>
        <button class="primary-btn" data-action="logout" style="margin-top: 12px;">Logout</button>
      </div>
    </div>
  `;
}

async function loadProducts() {
  try {
    const response = await fetch(`${API_BASE}/api/products`);
    const data = await response.json();
    if (Array.isArray(data) && data.length) {
      state.products = data;
    }
    if (state.route === 'home') renderHome();
  } catch (error) {
    console.error('Unable to load products', error);
    showToast('Unable to connect to the backend API.');
  }
}

async function handleLogin(form) {
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    state.user = result.user;
    saveUser(result.user);
    showToast('Login successful');
    setTimeout(() => setRoute('profile'), 500);
  } catch (error) {
    showToast(error.message || 'Login failed');
  }
}

async function handleAdminLogin(form) {
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Admin login failed');
    }
    if (!result.token || result.admin?.role !== 'admin') {
      throw new Error('The server returned an invalid admin session.');
    }

    sessionStorage.setItem(ADMIN_TOKEN_KEY, result.token);
    sessionStorage.setItem(ADMIN_EMAIL_KEY, result.admin.email);
    showToast('Admin login successful');
    setRoute('admin');
  } catch (error) {
    renderAdminLogin(error.message || 'Admin login failed');
  }
}

async function handleAddProduct(form) {
  const productId = Number(form.dataset.productId);
  const isEditing = Number.isSafeInteger(productId) && productId > 0;
  const payload = Object.fromEntries(new FormData(form).entries());
  delete payload['image-file'];
  payload.image = form.dataset.imageData || payload.image || '';
  const submitButton = form.querySelector('button[type="submit"]');
  const message = form.querySelector('.admin-form-message');
  submitButton.disabled = true;
  message.textContent = 'Saving product…';
  message.classList.remove('is-error');

  try {
    const response = await fetch(`${API_BASE}/api/products${isEditing ? `/${productId}` : ''}`, {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem(ADMIN_TOKEN_KEY)}`
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (response.status === 401 || response.status === 403) {
      logoutAdmin(false);
      renderAdminLogin('Your admin session expired. Please sign in again.');
      return;
    }
    if (!response.ok) {
      throw new Error(result.message || 'Unable to add product.');
    }

    showToast(isEditing ? 'Product updated' : 'Product added to the store');
    await renderAdminDashboard();
  } catch (error) {
    message.textContent = error.message || 'Unable to add product.';
    message.classList.add('is-error');
  } finally {
    if (submitButton.isConnected) submitButton.disabled = false;
  }
}

function editProduct(productId) {
  const product = state.products.find((item) => Number(item.id) === productId);
  const form = document.querySelector('[data-form-type="add-product"]');
  if (!product || !form) return;

  form.dataset.productId = String(product.id);
  form.dataset.imageData = product.image?.startsWith('data:image/jpeg;base64,') ? product.image : '';
  form.elements.namedItem('name').value = product.name;
  form.elements.namedItem('category').value = product.category;
  form.elements.namedItem('unit').value = product.unit;
  form.elements.namedItem('price').value = product.price;
  form.elements.namedItem('oldPrice').value = product.oldPrice;
  form.elements.namedItem('description').value = product.description;
  form.elements.namedItem('image').value = product.image?.startsWith('https://') ? product.image : '';
  form.elements.namedItem('image-file').value = '';

  const preview = document.getElementById('product-image-preview');
  const previewSource = form.dataset.imageData || form.elements.namedItem('image').value;
  if (previewSource) {
    preview.src = previewSource;
    preview.hidden = false;
  } else {
    preview.hidden = true;
    preview.removeAttribute('src');
  }
  document.getElementById('product-form-heading').textContent = `Update ${product.name}`;
  form.querySelector('button[type="submit"]').textContent = 'Save changes';
  form.querySelector('[data-action="cancel-product-edit"]').hidden = false;
  form.querySelector('.admin-form-message').textContent = '';
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetProductForm() {
  const form = document.querySelector('[data-form-type="add-product"]');
  if (!form) return;
  form.reset();
  delete form.dataset.productId;
  form.dataset.imageData = '';
  document.getElementById('product-form-heading').textContent = 'Add a product';
  form.querySelector('button[type="submit"]').textContent = 'Add product';
  form.querySelector('[data-action="cancel-product-edit"]').hidden = true;
  form.querySelector('.admin-form-message').textContent = '';
  updateProductImagePreview('');
}

function updateProductImagePreview(source) {
  const preview = document.getElementById('product-image-preview');
  if (!preview) return;
  if (!source) {
    preview.hidden = true;
    preview.removeAttribute('src');
    return;
  }
  preview.src = source;
  preview.hidden = false;
}

function handleProductImageSelection(input) {
  const form = input.closest('[data-form-type="add-product"]');
  const file = input.files?.[0];
  if (!form || !file) return;

  if (!file.type.startsWith('image/')) {
    input.value = '';
    showProductImageError(form, 'Choose a valid image file.');
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    URL.revokeObjectURL(objectUrl);
    try {
      const maxDataUrlLength = 50000;
      let dataUrl = '';
      for (let dimension = 640; dimension >= 160; dimension = Math.floor(dimension * 0.8)) {
        const scale = Math.min(1, dimension / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        for (let quality = 0.75; quality >= 0.35; quality -= 0.1) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          if (dataUrl.length <= maxDataUrlLength) break;
        }
        if (dataUrl.length <= maxDataUrlLength) break;
      }
      if (dataUrl.length > maxDataUrlLength) {
        throw new Error('This photo is too large to save. Choose a smaller photo and try again.');
      }
      form.dataset.imageData = dataUrl;
      form.elements.namedItem('image').value = '';
      updateProductImagePreview(dataUrl);
      form.querySelector('.admin-form-message').textContent = 'Photo ready to save.';
      form.querySelector('.admin-form-message').classList.remove('is-error');
    } catch (error) {
      input.value = '';
      showProductImageError(form, error.message || 'Unable to prepare this photo.');
    }
  };
  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    input.value = '';
    showProductImageError(form, 'Unable to open this image. Try another photo.');
  };
  image.src = objectUrl;
}

function showProductImageError(form, message) {
  const status = form.querySelector('.admin-form-message');
  status.textContent = message;
  status.classList.add('is-error');
}

async function handleRegister(form) {
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }

    showToast('Registration successful');
    renderAuth('login');
  } catch (error) {
    showToast(error.message || 'Registration failed');
  }
}

async function handleCheckout(form) {
  const payload = Object.fromEntries(new FormData(form).entries());
  const items = state.checkoutMode === 'buy-now' ? getBuyNowItems() : getCartItems();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal > 99 ? 0 : 25;
  const total = subtotal + delivery;

  if (!items.length) {
    showToast('No items in cart');
    return;
  }

  const orderPayload = {
    userId: state.user?.id || null,
    items: items.map(({ product, quantity }) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      quantity
    })),
    subtotal,
    delivery,
    total,
    address: payload.address,
    payment: payload.payment || 'COD',
    source: state.checkoutMode === 'buy-now' ? 'Buy Now' : 'Cart'
  };

  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Order failed');
    }

    if (state.checkoutMode === 'cart') {
      localStorage.removeItem(CART_KEY);
      state.cart = [];
      updateCartBadge();
    } else {
      localStorage.removeItem(BUY_NOW_KEY);
      state.checkoutMode = 'cart';
    }

    const order = result.order || {
      id: `KM-${Date.now().toString().slice(-7)}`,
      status: 'Confirmed',
      items: orderPayload.items,
      total,
      date: new Date().toLocaleString('en-IN'),
      payment: orderPayload.payment
    };

    const existingOrders = loadOrders();
    existingOrders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(existingOrders));
    state.orders = existingOrders;

    showToast('Order placed successfully');
    setTimeout(() => setRoute('orders'), 600);
  } catch (error) {
    showToast(error.message || 'Order placement failed');
  }
}

function useCurrentLocation() {
  const addressField = document.getElementById('address');
  const status = document.getElementById('location-status');
  const map = document.getElementById('location-map');
  const mapFrame = map?.querySelector('iframe');
  const mapLink = document.getElementById('location-map-link');

  if (!addressField || !status || !map || !mapFrame || !mapLink) return;

  if (!navigator.geolocation) {
    status.textContent = 'Current location is not supported by this browser. Enter your address manually.';
    showToast('Current location is not supported by this browser');
    return;
  }

  status.textContent = 'Getting your current location…';
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const coordinates = `${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`;
      const mapsUrl = `https://www.google.com/maps?q=${coordinates}`;
      const addressLines = addressField.value
        .split('\n')
        .filter((line) => !line.startsWith('Current location:'));
      addressField.value = [...addressLines, `Current location: ${mapsUrl}`].filter(Boolean).join('\n');
      mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(coordinates)}&z=16&output=embed`;
      mapLink.href = mapsUrl;
      map.hidden = false;
      status.textContent = 'Current location selected. Add your house, street, or landmark details above if needed.';
    },
    (error) => {
      const messages = {
        1: 'Location permission was denied. Allow location access or enter your address manually.',
        2: 'Your current location could not be determined. Try again or enter your address manually.',
        3: 'Location request timed out. Try again or enter your address manually.'
      };
      status.textContent = messages[error.code] || 'Unable to get your current location. Enter your address manually.';
      showToast('Unable to get your current location');
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
  );
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const current = state.cart.find((item) => item.id === productId);
  if (current) {
    current.quantity += 1;
  } else {
    state.cart.push({ id: productId, quantity: 1 });
  }

  saveCart();
  updateCartBadge();
  showToast(`${product.name} added to cart`);
}

function adjustCartQuantity(productId, change) {
  const current = state.cart.find((item) => item.id === productId);
  if (!current) return;

  current.quantity += change;
  if (current.quantity <= 0) {
    state.cart = state.cart.filter((item) => item.id !== productId);
  }

  saveCart();
  updateCartBadge();
  renderCart();
}

function removeCartItem(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartBadge();
  renderCart();
}

function buyNow(productId) {
  const product = getProductById(productId);
  if (!product) return;

  localStorage.setItem(BUY_NOW_KEY, JSON.stringify([{ id: productId, quantity: 1 }]));
  state.checkoutMode = 'buy-now';
  showToast(`Buy now selected for ${product.name}`);
  setRoute('checkout');
}

function getVisibleProducts() {
  const search = state.searchTerm.trim().toLowerCase();
  return state.products.filter((product) => {
    const matchesCategory = state.selectedCategory === 'All' || product.category === state.selectedCategory;
    const matchesSearch = !search || product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });
}

function getCartItems() {
  return state.cart
    .map((item) => ({ ...item, product: getProductById(item.id) }))
    .filter((item) => item.product);
}

function getBuyNowItems() {
  const stored = JSON.parse(localStorage.getItem(BUY_NOW_KEY) || '[]');
  return stored
    .map((item) => ({ ...item, product: getProductById(item.id) }))
    .filter((item) => item.product);
}

function getProductById(productId) {
  return state.products.find((product) => product.id === productId);
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function logout() {
  localStorage.removeItem(USER_KEY);
  state.user = null;
  renderProfile();
  showToast('Logged out');
}

function logoutAdmin(showMessage = true) {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  sessionStorage.removeItem(ADMIN_EMAIL_KEY);
  if (state.route === 'admin') {
    renderAdminLogin();
  }
  if (showMessage) showToast('Admin signed out');
}

function updateCartBadge() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = count;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
