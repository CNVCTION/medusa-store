/* ════════════════════════════════════
   DREAMDEAD — Product Data & Store
   Dark Mode · Vercel Design System
   ════════════════════════════════════ */

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const products = [
  {
    id: 'obsidian-trench',
    name: 'Obsidian Trench',
    category: 'Outerwear',
    collection: 'Noir',
    price: 248,
    material: 'Japanese coated cotton',
    fit: 'Oversized',
    colors: ['Black', 'Ink', 'Shadow'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Signature',
    description: 'A floor-length trench with a liquid black finish. Structured shoulders dissolve into a weightless, pooling drape.',
    swatch: 'linear-gradient(160deg, #2a2a2e 0%, #3d3d42 30%, #2c2c30 60%, #36363a 100%)',
  },
  {
    id: 'void-knit',
    name: 'Void Knit',
    category: 'Knitwear',
    collection: 'Essentials',
    price: 168,
    material: 'Fine-gauge merino wool',
    fit: 'Tailored',
    colors: ['Charcoal', 'Ash', 'Onyx'],
    sizes: ['XS', 'S', 'M', 'L'],
    badge: 'Editor pick',
    description: 'A weightless merino knit with a sculptural collar. Wears like a second skin, reads like architecture.',
    swatch: 'linear-gradient(145deg, #2c2e32 0%, #3e4046 40%, #282a2e 100%)',
  },
  {
    id: 'silence-blazer',
    name: 'Silence Blazer',
    category: 'Tailored',
    collection: 'Studio',
    price: 320,
    material: 'Textured wool-mohair',
    fit: 'Relaxed tailored',
    colors: ['Noir', 'Graphite'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Limited run',
    description: 'Sharp shoulders, absent lapel. A blazer that strips tailoring to its skeleton and rebuilds it in shadow.',
    swatch: 'linear-gradient(150deg, #2a2c30 0%, #3c3e44 50%, #26282c 100%)',
  },
  {
    id: 'ash-overcoat',
    name: 'Ash Overcoat',
    category: 'Outerwear',
    collection: 'Noir',
    price: 420,
    material: 'Brushed wool-cashmere',
    fit: 'Classic',
    colors: ['Charcoal', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Heritage',
    description: 'A sweeping overcoat in washed wool-cashmere. The finish is deliberately worn — as if it has already lived.',
    swatch: 'linear-gradient(155deg, #2e2e34 0%, #42424a 35%, #2a2a30 100%)',
  },
  {
    id: 'phantom-hoodie',
    name: 'Phantom Hoodie',
    category: 'Essentials',
    collection: 'Core',
    price: 140,
    material: 'Loopback organic cotton',
    fit: 'Relaxed',
    colors: ['Black', 'Shadow', 'Clay'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Comfort first',
    description: 'A heavyweight hoodie with an exaggerated hood and blind seams. The silhouette is deliberate; the feeling is invisible.',
    swatch: 'linear-gradient(145deg, #2c2c30 0%, #3e3e44 50%, #26262a 100%)',
  },
  {
    id: 'noir-cargo',
    name: 'Noir Cargo',
    category: 'Tailored',
    collection: 'Statement',
    price: 198,
    material: 'Cotton-nylon ripstop',
    fit: 'Straight leg',
    colors: ['Ink', 'Shadow'],
    sizes: ['28', '30', '32', '34', '36'],
    badge: 'Utility revised',
    description: 'Cargo trousers recut in a slim-straight profile. The pockets are integrated, not appliquéd — function disappears into form.',
    swatch: 'linear-gradient(140deg, #2a2c30 0%, #3c3e44 55%, #26282c 100%)',
  },
  {
    id: 'eclipse-dress',
    name: 'Eclipse Dress',
    category: 'Statement',
    collection: 'Runway',
    price: 290,
    material: 'Sandwashed silk charmeuse',
    fit: 'Draped',
    colors: ['Noir', 'Oxblood'],
    sizes: ['XS', 'S', 'M', 'L'],
    badge: 'Runway inspired',
    description: 'A bias-cut silk dress that absorbs light. The drape is engineered to shift with every movement.',
    swatch: 'linear-gradient(160deg, #282a2e 0%, #3a3c42 40%, #222428 100%)',
  },
  {
    id: 'shadow-scarf',
    name: 'Shadow Scarf',
    category: 'Accessories',
    collection: 'Winter edit',
    price: 88,
    material: 'Brushed alpaca-wool',
    fit: 'One size',
    colors: ['Charcoal', 'Noir', 'Ash'],
    sizes: ['One size'],
    badge: 'Giftable',
    description: 'An oversized wrap with a soft loft and a polished drape. The kind of piece that finishes a silhouette.',
    swatch: 'linear-gradient(145deg, #2e3034 0%, #404248 50%, #2a2c30 100%)',
  },
];

/* ===== STATE ===== */
const state = {
  filter: 'All',
  search: '',
  cart: loadCart(),
  quickViewId: products[0].id,
};

/* ===== DOM REFS ===== */
const productGrid = document.getElementById('product-grid');
const chipRow = document.getElementById('chip-row');
const productCount = document.getElementById('product-count');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const quickviewDrawer = document.getElementById('quickview-drawer');
const backdrop = document.getElementById('backdrop');
const cartItems = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const quickviewContent = document.getElementById('quickview-content');

/* ===== EVENT LISTENERS ===== */
document.getElementById('search-input').addEventListener('input', (e) => {
  state.search = e.target.value.trim().toLowerCase();
  renderProducts();
});

document.getElementById('cart-button').addEventListener('click', () => openDrawer('cart'));
document.querySelectorAll('[data-close-drawer]').forEach((btn) =>
  btn.addEventListener('click', closeDrawers)
);
backdrop.addEventListener('click', closeDrawers);

productGrid.addEventListener('click', handleProductClick);
cartItems.addEventListener('click', handleCartClick);
quickviewContent.addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-add-to-cart]');
  if (addBtn) addToCart(addBtn.dataset.addToCart);
});

/* ===== INITIAL RENDER ===== */
render();

/* ===== RENDER ===== */
function render() {
  renderProducts();
  cartCount.textContent = String(getCartQuantity());
  renderCart();
  renderQuickView();
}

function renderProducts() {
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  chipRow.innerHTML = categories
    .map(
      (cat) =>
        `<button class="chip${state.filter === cat ? ' is-active' : ''}" data-filter="${cat}">${cat}</button>`
    )
    .join('');

  chipRow.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.filter = btn.dataset.filter;
      renderProducts();
      document.getElementById('collection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const filtered = products.filter((p) => {
    const matchesFilter = state.filter === 'All' || p.category === state.filter;
    const matchesSearch =
      !state.search ||
      [p.name, p.category, p.collection, p.description, p.material]
        .join(' ')
        .toLowerCase()
        .includes(state.search);
    return matchesFilter && matchesSearch;
  });

  productCount.textContent = `${filtered.length} items`;

  productGrid.innerHTML = filtered.map(renderProductCard).join('');
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-media" style="--swatch:${product.swatch}"></div>
      <div class="product-meta">
        <div>
          <p class="text-caption-mono">${product.collection}</p>
          <p class="product-name">${product.name}</p>
        </div>
        <span class="product-price">${currency.format(product.price)}</span>
      </div>
      <p class="product-desc">${product.description}</p>
      <div class="product-tags">
        <span class="tag">${product.category}</span>
        <span class="tag">${product.fit}</span>
        <span class="tag">${product.badge}</span>
      </div>
      <div class="product-actions">
        <button class="btn-ghost" data-open-drawer="quickview" data-product="${product.id}">Quick view</button>
        <button class="btn-primary-sm" data-add-to-cart="${product.id}">Add to bag</button>
      </div>
    </article>
  `;
}

/* ===== PRODUCT CLICKS ===== */
function handleProductClick(e) {
  const addBtn = e.target.closest('[data-add-to-cart]');
  const openBtn = e.target.closest('[data-open-drawer]');

  if (addBtn) {
    addToCart(addBtn.dataset.addToCart);
    return;
  }
  if (openBtn) {
    state.quickViewId = openBtn.dataset.product;
    openDrawer(openBtn.dataset.openDrawer);
  }
}

/* ===== QUICK VIEW ===== */
function renderQuickView() {
  const product = products.find((p) => p.id === state.quickViewId) ?? products[0];

  quickviewContent.innerHTML = `
    <div class="product-media" style="--swatch:${product.swatch};min-height:18rem"></div>
    <div class="quickview-meta">
      <p class="text-caption-mono">${product.collection}</p>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <div class="quickview-details">
        <span class="tag">${product.material}</span>
        <span class="tag">${product.fit}</span>
      </div>
      <div class="quickview-price-row">
        <span class="quickview-price">${currency.format(product.price)}</span>
        <span class="text-caption text-muted">${product.badge}</span>
      </div>
      <div class="size-row">
        ${product.sizes.map((s) => `<button class="size-chip" type="button">${s}</button>`).join('')}
      </div>
      <button class="btn-primary btn-full" data-add-to-cart="${product.id}">Add to bag &mdash; ${currency.format(product.price)}</button>
    </div>
  `;
}

/* ===== CART ===== */
function renderCart() {
  const entries = Object.values(state.cart);

  if (!entries.length) {
    cartItems.innerHTML = '<p class="cart-empty">Your bag is empty. Add a few pieces from the collection.</p>';
    cartSubtotal.textContent = currency.format(0);
    return;
  }

  cartItems.innerHTML = entries
    .map(
      (item) => `
        <article class="cart-item">
          <div class="cart-thumb" style="--swatch:${item.product.swatch}"></div>
          <div class="cart-info">
            <div>
              <p class="product-name">${item.product.name}</p>
              <p class="text-caption">${item.product.category} &middot; ${item.size}</p>
            </div>
            <div class="cart-row">
              <div class="quantity-ctl">
                <button data-cart-action="dec" data-id="${item.id}">&minus;</button>
                <span>${item.quantity}</span>
                <button data-cart-action="inc" data-id="${item.id}">+</button>
              </div>
              <span class="cart-price">${currency.format(item.product.price * item.quantity)}</span>
            </div>
            <button class="cart-remove" data-cart-action="remove" data-id="${item.id}">Remove</button>
          </div>
        </article>
      `
    )
    .join('');

  cartSubtotal.textContent = currency.format(getSubtotal());
}

function handleCartClick(e) {
  const action = e.target.dataset.cartAction;
  if (!action) return;

  const id = e.target.dataset.id;
  if (action === 'inc') adjustQuantity(id, 1);
  if (action === 'dec') adjustQuantity(id, -1);
  if (action === 'remove') removeFromCart(id);
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  const size = product.sizes.includes('M') ? 'M' : product.sizes[0];
  const cartId = `${product.id}::${size}`;
  state.cart[cartId] ??= { id: cartId, product, quantity: 0, size };
  state.cart[cartId].quantity += 1;
  saveCart();
  render();
  openDrawer('cart');
}

function adjustQuantity(cartId, delta) {
  const item = state.cart[cartId];
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) delete state.cart[cartId];
  saveCart();
  render();
}

function removeFromCart(cartId) {
  delete state.cart[cartId];
  saveCart();
  render();
}

function getSubtotal() {
  return Object.values(state.cart).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

function getCartQuantity() {
  return Object.values(state.cart).reduce((sum, item) => sum + item.quantity, 0);
}

/* ===== DRAWERS ===== */
function openDrawer(type) {
  backdrop.classList.add('is-visible');
  backdrop.removeAttribute('aria-hidden');
  if (type === 'cart') {
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    quickviewDrawer.classList.remove('is-open');
    quickviewDrawer.setAttribute('aria-hidden', 'true');
  } else {
    quickviewDrawer.classList.add('is-open');
    quickviewDrawer.setAttribute('aria-hidden', 'false');
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }
}

function closeDrawers() {
  backdrop.classList.remove('is-visible');
  backdrop.setAttribute('aria-hidden', 'true');
  [cartDrawer, quickviewDrawer].forEach((d) => {
    d.classList.remove('is-open');
    d.setAttribute('aria-hidden', 'true');
  });
}

/* ===== PERSISTENCE ===== */
function saveCart() {
  localStorage.setItem('dreamdead-cart', JSON.stringify(state.cart));
}

function loadCart() {
  const saved = localStorage.getItem('dreamdead-cart');
  if (!saved) return {};
  try {
    const parsed = JSON.parse(saved);
    return Object.fromEntries(
      Object.entries(parsed).filter(([, item]) =>
        products.some((p) => p.id === item.product?.id)
      )
    );
  } catch {
    return {};
  }
}
