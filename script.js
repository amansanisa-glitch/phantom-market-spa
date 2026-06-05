// API Configuration
const API_BASE_URL = 'https://dummyjson.com/products';

// State Management
let products = [];
let editingId = null;

// DOM Elements
const form = document.getElementById('product-form');
const nameInput = document.getElementById('product-name');
const priceInput = document.getElementById('product-price');
const brandInput = document.getElementById('product-brand');
const categoryInput = document.getElementById('product-category');
const productsContainer = document.getElementById('products-list');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const productCountSpan = document.getElementById('product-count');

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Format currency to IDR
function formatToIDR(amount) {
    return new Intl.NumberFormat('id-ID').format(amount);
}

// Update product count display
function updateProductCount() {
    const count = products.length;
    productCountSpan.textContent = `${count} ${count === 1 ? 'Produk' : 'Produk'}`;
}

// Get random pastel color for product icon
function getRandomPastelIcon() {
    const icons = ['🎁', '📱', '💻', '⌚', '📷', '🎧', '🖥️', '📺', '🔊', '🎮', '📚', '👜', '👟', '🧥', '💍'];
    return icons[Math.floor(Math.random() * icons.length)];
}

// Load products from API
async function loadProducts() {
    try {
        showLoadingState();
        const response = await fetch(`${API_BASE_URL}?limit=12&select=title,price,brand,category`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        products = data.products.map(p => ({
            ...p,
            icon: getRandomPastelIcon()
        }));
        renderProducts();
        showToast('Data produk berhasil dimuat!', 'success');
    } catch (error) {
        console.error('Load error:', error);
        showToast(`Gagal memuat data: ${error.message}`, 'error');
        productsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <p>Gagal memuat data produk</p>
                <small>${error.message}</small>
            </div>
        `;
    }
}

// Create product (POST)
async function createProduct(productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: productData.title,
                price: productData.price,
                brand: productData.brand || 'Unbranded',
                category: productData.category || 'General'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Gagal menambah produk`);
        }
        
        const newProduct = await response.json();
        
        // Add to local state with local ID
        const productWithMeta = {
            id: Date.now(),
            title: productData.title,
            price: productData.price,
            brand: productData.brand || 'Unbranded',
            category: productData.category || 'General',
            icon: getRandomPastelIcon()
        };
        
        products.unshift(productWithMeta);
        renderProducts();
        showToast(`✨ "${productData.title}" berhasil ditambahkan!`, 'success');
        resetForm();
        
    } catch (error) {
        console.error('Create error:', error);
        showToast(`Gagal menambah produk: ${error.message}`, 'error');
    }
}

// Update product (PUT)
async function updateProduct(id, productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: productData.title,
                price: productData.price,
                brand: productData.brand
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Gagal mengupdate produk`);
        }
        
        const updated = await response.json();
        
        // Update local state
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = {
                ...products[index],
                title: updated.title,
                price: updated.price,
                brand: productData.brand || products[index].brand,
                category: productData.category || products[index].category
            };
            renderProducts();
        }
        
        showToast(`✏️ Produk berhasil diupdate!`, 'success');
        resetForm();
        
    } catch (error) {
        console.error('Update error:', error);
        showToast(`Gagal mengupdate produk: ${error.message}`, 'error');
    }
}

// Delete product (DELETE)
async function deleteProduct(id, title) {
    if (!confirm(`Hapus produk "${title}"?`)) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Gagal menghapus produk`);
        }
        
        const result = await response.json();
        
        if (result.isDeleted) {
            products = products.filter(p => p.id !== id);
            renderProducts();
            showToast(`🗑️ "${title}" berhasil dihapus!`, 'success');
        } else {
            throw new Error('Server tidak mengkonfirmasi penghapusan');
        }
        
    } catch (error) {
        console.error('Delete error:', error);
        showToast(`Gagal menghapus produk: ${error.message}`, 'error');
    }
}

// Edit product (fill form)
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    editingId = id;
    nameInput.value = product.title || '';
    priceInput.value = product.price || '';
    brandInput.value = product.brand || '';
    categoryInput.value = product.category || '';
    
    formTitle.innerHTML = '<span class="card-icon">✏️</span> Edit Produk';
    submitBtn.innerHTML = '<span>💾</span> Update Produk';
    cancelBtn.style.display = 'flex';
    
    // Smooth scroll to form
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Reset form to add mode
function resetForm() {
    form.reset();
    editingId = null;
    formTitle.innerHTML = '<span class="card-icon">📝</span> Tambah Produk Baru';
    submitBtn.innerHTML = '<span>➕</span> Tambah Produk';
    cancelBtn.style.display = 'none';
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const brand = brandInput.value.trim();
    const category = categoryInput.value.trim();
    
    // Validation
    if (!name) {
        showToast('Nama produk wajib diisi!', 'error');
        nameInput.focus();
        return;
    }
    
    if (isNaN(price) || price <= 0) {
        showToast('Harga harus berupa angka positif!', 'error');
        priceInput.focus();
        return;
    }
    
    const productData = {
        title: name,
        price: price,
        brand: brand || 'Tanpa Brand',
        category: category || 'Umum'
    };
    
    if (editingId) {
        await updateProduct(editingId, productData);
    } else {
        await createProduct(productData);
    }
}

// Render products to UI
function renderProducts() {
    if (!products.length) {
        productsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📦</div>
                <p>Belum ada produk</p>
                <small>Silakan tambah produk baru menggunakan form di samping</small>
            </div>
        `;
        updateProductCount();
        return;
    }
    
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-icon">${product.icon || '🎁'}</div>
            <h3>${escapeHtml(product.title)}</h3>
            <div class="product-price">${formatToIDR(product.price)}</div>
            ${product.brand ? `<div class="product-brand">🏷️ ${escapeHtml(product.brand)}</div>` : ''}
            ${product.category ? `<div class="product-category">📁 ${escapeHtml(product.category)}</div>` : ''}
            <div class="product-id">🆔 ID: ${product.id}</div>
            <div class="product-actions">
                <button onclick="window.editProduct(${product.id})" class="btn-edit">
                    ✏️ Edit
                </button>
                <button onclick="window.deleteProduct(${product.id}, '${escapeHtml(product.title).replace(/'/g, "\\'")}')" class="btn-delete">
                    🗑️ Hapus
                </button>
            </div>
        </div>
    `).join('');
    
    updateProductCount();
}

// Helper: Escape HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Show loading skeleton
function showLoadingState() {
    productsContainer.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Memuat produk...</p>
        </div>
    `;
}

// Event listeners
form.addEventListener('submit', handleSubmit);
cancelBtn.addEventListener('click', resetForm);

// Make functions global for inline onclick handlers
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

// Initialize app
async function init() {
    await loadProducts();
}

// Start the app
init();