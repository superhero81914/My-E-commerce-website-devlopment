import { useState, useMemo } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────
type Category = 'All' | 'Men' | 'Women' | 'Kids'
type Product = {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  category: Category
  subCategory: string
  image: string
  rating: number
  reviews: number
  isNew?: boolean
}

// ── Product Data ───────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  { id: 1, name: 'Floral Wrap Dress', brand: 'Zara', price: 1299, originalPrice: 2499, category: 'Women', subCategory: 'Dresses', image: '/images/images/women/dresses/floral-wrap-dress.jpg', rating: 4.5, reviews: 312, isNew: true },
  { id: 2, name: 'Slim Fit Chinos', brand: 'H&M', price: 899, originalPrice: 1799, category: 'Men', subCategory: 'Trousers', image: '/images/images/women/jumpsuits/floral-jumpsuit.jpg', rating: 4.2, reviews: 189 },
  { id: 3, name: 'Cartoon Print Tee', brand: 'UCB Kids', price: 449, originalPrice: 799, category: 'Kids', subCategory: 'T-Shirts', image: '/images/images/women/outerwear/blazer-jacket.jpg', rating: 4.6, reviews: 95 },
  { id: 4, name: 'Oversized Hoodie', brand: 'Roadster', price: 1099, originalPrice: 1999, category: 'Women', subCategory: 'Sweatshirts', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTrWePr5I0XXn3DjklUGmxhIQh0B9Ru-xpxATSp4-8ntt89lr9f26y1OeqLSLzG6m53dgobKYs0rLr1gYxs7iwunHd_PNH3q0gPhbBHm7tNdXCkBYxULWFz_Q', rating: 4.7, reviews: 428, isNew: true },
  { id: 5, name: 'casual Shirt', brand: 'Livis', price: 299, originalPrice: 399, category: 'Men', subCategory: 'T-Shirts', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJsYeMrMt1HI0p0epZriAY3-Fatu7YJ4nEdls4Jm512g&s=10', rating: 4.3, reviews: 256 },
  { id: 6, name: 'Denim Dungaree', brand: 'H&M Kids', price: 699, originalPrice: 1299, category: 'Kids', subCategory: 'Dungarees', image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=520&fit=crop&auto=format', rating: 4.4, reviews: 143 },
  { id: 7, name: 'Formal Shirt', brand: 'Louis Philippe', price: 1499, originalPrice: 2999, category: 'Women', subCategory: 'Skirts', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9OmAwduFH_fea1KxzYAhvFduISlZxPpP3Mp2Fz2dmLg&s=10', rating: 4.8, reviews: 367 },
  { id: 8, name: 'Linen Shirt', brand: 'Louis Philippe', price: 1299, originalPrice: 2499, category: 'Men', subCategory: 'Shirts', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAKeTAKvUoMWXbYnmB1ihE0_xlEMi-OQTejaWuRjn06Q&s=10', rating: 4.5, reviews: 201 },
  { id: 9, name: 'Floral Jumpsuit', brand: 'AND', price: 1799, originalPrice: 3499, category: 'Women', subCategory: 'Jumpsuits', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=520&fit=crop&auto=format', rating: 4.6, reviews: 178, isNew: true },
  { id: 10, name: 'Jogger Pants', brand: 'Puma', price: 1199, originalPrice: 2199, category: 'Men', subCategory: 'Activewear', image: 'https://nobero.com/cdn/shop/files/BSH_OS_Key_Highlight_Slide_1_e11c4e5b-7f53-45ba-9819-5f2343be0b8c.jpg?v=1762238131&width=360', rating: 4.4, reviews: 334 },
  { id: 11, name: 'Sportswear pant', brand: 'Nike', price: 1999, originalPrice: 1499, category: 'all', subCategory: 'Frocks', image: 'data:image/webp;base64,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', rating: 4.7, reviews: 212 },
  { id: 12, name: 'Blazer Jacket', brand: 'Marks & Spencer', price: 2499, originalPrice: 4999, category: 'Women', subCategory: 'Jackets', image: '', rating: 4.9, reviews: 89 },
  { id: 13, name: 'Baggy pant', brand: 'ZARA', price: 699, originalPrice: 999, category: 'Men', subCategory: 'Pant', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA0o4h5h8XbI2yH_XTpa45ACmJAyPgSk5H52hDzQl3Pw&s=10', rating: 5.0, reviews: 999 },
  { id: 14, name: 'Ethnic cap', brand: 'Fabindia', price: 999, originalPrice: 1499, category: 'Men', subCategory: 'cap', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8W2TOArZFQS5mjJ20vpBw2kBcW-1ZSjzWlw679URBPw&s=10', rating: 4.9, reviews: 89 },
  { id: 15, name: 'Dell Pro', brand: 'Intel', price: 99999, originalPrice: 999999, category: 'Men', subCategory: 'computer', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTq7yht4TvQtVQrRJ4UHN_t7qQmcZUD44qEzqTbxPaBEV-4SroJ25XciJ-pyzQw3SSeAdScQJ8mrNNLCC-qHT6qCnm7jkbPz-N6-gXc4-oky5P1P9_CYZE1a6PhIFNZTftVGW0TAIhxtJ4&usqp=CAc', rating: 4.9, reviews: 89 },

]

const SUBCATEGORIES: Record<Category, string[]> = {
  All: ['Trending', 'New Arrivals', 'Sale'],
  Women: ['Dresses', 'Tops', 'Skirts', 'Jeans', 'Jackets', 'Sweatshirts', 'Jumpsuits'],
  Men: ['T-Shirts', 'Shirts', 'Trousers', 'Jeans', 'Activewear', 'Jackets'],
  Kids: ['T-Shirts', 'Frocks', 'Dungarees', 'Shorts', 'Jackets'],
}

// ── Icons ──────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)
const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#e91e8c' : 'none'} stroke={filled ? '#e91e8c' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? '#fbbf24' : 'none'} stroke="#fbbf24" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
)
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const OrderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
)

// ── Discount helper ────────────────────────────────────────────────────────
function discount(price: number, original: number) {
  return Math.round((1 - price / original) * 100)
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled={i <= Math.round(rating)} />)}
    </span>
  )
}

// ── Product Card ───────────────────────────────────────────────────────────
function ProductCard({
  product, wishlisted, onWishlist, onAddToCart
}: {
  product: Product
  wishlisted: boolean
  onWishlist: () => void
  onAddToCart: () => void
}) {
  const disc = discount(product.price, product.originalPrice)
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-100 flex flex-col">
      <div className="relative overflow-hidden bg-pink-50" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-[#e91e8c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            New
          </span>
        )}
        <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {disc}% OFF
        </span>
        <button
          onClick={onWishlist}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[11px] text-[#e91e8c] font-bold uppercase tracking-wider">{product.brand}</p>
        <p className="text-sm font-600 text-gray-800 line-clamp-1 mt-0.5">{product.name}</p>
        <div className="flex items-center gap-1 mt-1">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-800 text-gray-900 text-base">₹{product.price.toLocaleString()}</span>
          <span className="text-gray-400 line-through text-xs">₹{product.originalPrice.toLocaleString()}</span>
        </div>
        <button
          onClick={onAddToCart}
          className="mt-3 w-full py-2 rounded-xl bg-[#e91e8c] text-white text-sm font-700 hover:bg-[#c2185b] active:scale-95 transition-all duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

// ── Login Modal ────────────────────────────────────────────────────────────
function LoginModal({ onClose, onLogin }: { onClose: () => void; onLogin: (name: string) => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.includes('@')) { setError('Please enter a valid email.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (mode === 'signup' && !name.trim()) { setError('Please enter your name.'); return }
    onLogin(mode === 'signup' ? name : email.split('@')[0])
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(30,0,20,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-[slideUp_0.3s_ease]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#e91e8c] transition-colors">
          <CloseIcon />
        </button>
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl font-900 text-[#e91e8c]">TRENDÉ</h2>
          <p className="text-gray-500 text-sm mt-1">{mode === 'login' ? 'Welcome back!' : 'Join the fashion tribe'}</p>
        </div>
        <div className="flex bg-pink-50 rounded-xl p-1 mb-6">
          {(['login', 'signup'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-700 transition-all ${mode === m ? 'bg-[#e91e8c] text-white shadow' : 'text-gray-500'}`}>
              {m === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name"
              className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e91e8c] focus:ring-2 focus:ring-pink-100 transition" />
          )}
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
            className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e91e8c] focus:ring-2 focus:ring-pink-100 transition" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
            className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e91e8c] focus:ring-2 focus:ring-pink-100 transition" />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="w-full py-3 bg-[#e91e8c] text-white rounded-xl font-700 hover:bg-[#c2185b] transition-all active:scale-95">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          By continuing, you agree to our <span className="text-[#e91e8c] cursor-pointer">Terms</span> &amp; <span className="text-[#e91e8c] cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}

// ── Cart Drawer ────────────────────────────────────────────────────────────
function CartDrawer({ items, onClose, onRemove }: {
  items: { product: Product; qty: number }[]
  onClose: () => void
  onRemove: (id: number) => void
}) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="flex-1" onClick={onClose} style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }} />
      <div className="w-full max-w-sm bg-white flex flex-col shadow-2xl animate-[slideInRight_0.3s_ease]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-pink-100">
          <h2 className="font-800 text-lg text-gray-800">Shopping Bag <span className="text-[#e91e8c]">({items.length})</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#e91e8c] transition-colors"><CloseIcon /></button>
        </div>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
              <CartIcon />
            </div>
            <p className="font-700 text-gray-700">Your bag is empty</p>
            <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3 bg-pink-50 rounded-xl p-3">
                  <img src={product.image} alt={product.name} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#e91e8c] font-700 uppercase">{product.brand}</p>
                    <p className="text-sm font-600 text-gray-800 line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {qty}</p>
                    <p className="font-700 text-gray-900 text-sm mt-1">₹{(product.price * qty).toLocaleString()}</p>
                  </div>
                  <button onClick={() => onRemove(product.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-pink-100">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600 font-600">Total</span>
                <span className="font-800 text-lg text-gray-900">₹{total.toLocaleString()}</span>
              </div>
              <button className="w-full py-3.5 bg-[#e91e8c] text-white rounded-xl font-700 hover:bg-[#c2185b] transition-all active:scale-95">
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Wishlist Drawer ────────────────────────────────────────────────────────
function WishlistDrawer({ products, wishlist, onClose, onToggleWishlist, onAddToCart }: {
  products: Product[]
  wishlist: Set<number>
  onClose: () => void
  onToggleWishlist: (id: number) => void
  onAddToCart: (p: Product) => void
}) {
  const wishlisted = products.filter(p => wishlist.has(p.id))
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="flex-1" onClick={onClose} style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }} />
      <div className="w-full max-w-sm bg-white flex flex-col shadow-2xl animate-[slideInRight_0.3s_ease]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-pink-100">
          <h2 className="font-800 text-lg text-gray-800">Wishlist <span className="text-[#e91e8c]">({wishlisted.length})</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#e91e8c] transition-colors"><CloseIcon /></button>
        </div>
        {wishlisted.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
              <HeartIcon />
            </div>
            <p className="font-700 text-gray-700">Nothing here yet</p>
            <p className="text-sm text-gray-400 mt-1">Save items you love</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlisted.map(product => (
              <div key={product.id} className="flex gap-3 bg-pink-50 rounded-xl p-3">
                <img src={product.image} alt={product.name} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#e91e8c] font-700 uppercase">{product.brand}</p>
                  <p className="text-sm font-600 text-gray-800 line-clamp-1">{product.name}</p>
                  <p className="font-700 text-gray-900 text-sm mt-1">₹{product.price.toLocaleString()}</p>
                  <button onClick={() => onAddToCart(product)}
                    className="mt-2 text-xs px-3 py-1.5 bg-[#e91e8c] text-white rounded-lg font-600 hover:bg-[#c2185b] transition-all">
                    Move to Cart
                  </button>
                </div>
                <button onClick={() => onToggleWishlist(product.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Orders Modal ───────────────────────────────────────────────────────────
function OrdersModal({ onClose }: { onClose: () => void }) {
  const mockOrders = [
    { id: '#TRD2890', item: 'Floral Wrap Dress', brand: 'Zara', date: 'Sep 20, 2026', status: 'Delivered', price: 1299 },
    { id: '#TRD2756', item: 'Oversized Hoodie', brand: 'Roadster', date: 'Sep 14, 2026', status: 'In Transit', price: 1099 },
    { id: '#TRD2644', item: 'Slim Fit Chinos', brand: 'H&M', date: 'Sep 5, 2026', status: 'Delivered', price: 899 },
  ]
  const statusColor: Record<string, string> = { Delivered: 'text-green-600 bg-green-50', 'In Transit': 'text-blue-600 bg-blue-50' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(30,0,20,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#e91e8c] transition-colors"><CloseIcon /></button>
        <h2 className="font-800 text-xl text-gray-800 mb-5">My Orders</h2>
        <div className="space-y-3">
          {mockOrders.map(o => (
            <div key={o.id} className="flex items-center gap-4 p-4 bg-pink-50 rounded-2xl">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-600">{o.id}</span>
                  <span className={`text-[10px] font-700 px-2 py-0.5 rounded-full ${statusColor[o.status]}`}>{o.status}</span>
                </div>
                <p className="text-sm font-700 text-gray-800 mt-0.5 line-clamp-1">{o.item}</p>
                <p className="text-[11px] text-[#e91e8c] font-600">{o.brand}</p>
                <p className="text-xs text-gray-400 mt-0.5">{o.date}</p>
              </div>
              <div className="text-right">
                <p className="font-800 text-gray-900">₹{o.price.toLocaleString()}</p>
                <button className="text-xs text-[#e91e8c] font-600 mt-1 hover:underline">Track</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Hero Banner ────────────────────────────────────────────────────────────
function HeroBanner({ onCategorySelect }: { onCategorySelect: (c: Category) => void }) {
  const slides = [
    { label: 'Women', headline: 'Dress to\nExpress', sub: 'New arrivals — up to 60% off', bg: 'from-[#fce4f3] to-[#f8bbd9]', img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=700&fit=crop&auto=format', cat: 'Women' as Category },
    { label: 'Men', headline: 'Define\nYour Style', sub: 'Premium menswear, curated', bg: 'from-[#e3f2fd] to-[#bbdefb]', img: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=600&h=700&fit=crop&auto=format', cat: 'Men' as Category },
    { label: 'Kids', headline: 'Tiny Trends\nBig Fun', sub: 'Bright colours for bright minds', bg: 'from-[#fff9c4] to-[#fff176]', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=700&fit=crop&auto=format', cat: 'Kids' as Category },
  ]
  const [active, setActive] = useState(0)
  const s = slides[active]

  return (
    <div className={`bg-gradient-to-br ${s.bg} rounded-3xl overflow-hidden relative`} style={{ minHeight: '340px' }}>
      <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-10 md:py-12">
        <div className="flex-1 z-10">
          <span className="inline-block bg-[#e91e8c] text-white text-[11px] font-700 uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {s.label} Collection
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-900 text-gray-900 leading-tight" style={{ whiteSpace: 'pre-line' }}>
            {s.headline}
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base">{s.sub}</p>
          <button
            onClick={() => onCategorySelect(s.cat)}
            className="mt-6 px-7 py-3 bg-[#e91e8c] text-white rounded-full font-700 text-sm hover:bg-[#c2185b] transition-all active:scale-95 shadow-lg shadow-pink-300"
          >
            Shop Now →
          </button>
        </div>
        <div className="w-48 md:w-56 flex-shrink-0">
          <img src={s.img} alt={s.label} className="w-full h-64 md:h-72 object-cover rounded-2xl shadow-xl" />
        </div>
      </div>
      {/* Slide dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-[#e91e8c] w-6' : 'bg-pink-300'}`} />
        ))}
      </div>
    </div>
  )
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlist, setWishlist] = useState<Set<number>>(new Set([1, 4]))
  const [cart, setCart] = useState<Map<number, number>>(new Map())
  const [showLogin, setShowLogin] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showOrders, setShowOrders] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubCat, setActiveSubCat] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'discount'>('default')

  const cartCount = Array.from(cart.values()).reduce((a, b) => a + b, 0)
  const cartItems = Array.from(cart.entries()).map(([id, qty]) => ({
    product: PRODUCTS.find(p => p.id === id)!,
    qty
  }))

  function toggleWishlist(id: number) {
    setWishlist(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function addToCart(product: Product) {
    setCart(prev => {
      const next = new Map(prev)
      next.set(product.id, (next.get(product.id) || 0) + 1)
      return next
    })
  }

  function removeFromCart(id: number) {
    setCart(prev => { const next = new Map(prev); next.delete(id); return next })
  }

  function handleLogin(name: string) {
    setUser(name)
    setShowLogin(false)
  }

  const filtered = useMemo(() => {
    let list = PRODUCTS
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory)
    if (activeSubCat) list = list.filter(p => p.subCategory === activeSubCat)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q)
      )
    }
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    else if (sortBy === 'discount') list = [...list].sort((a, b) => discount(b.price, b.originalPrice) - discount(a.price, a.originalPrice))
    return list
  }, [activeCategory, activeSubCat, searchQuery, sortBy])

  const subCats = SUBCATEGORIES[activeCategory]

  return (
    <div className="min-h-screen" style={{ background: '#fff9fc' }}>
      {/* ── Topbar ── */}
      <div className="bg-[#e91e8c] text-white text-center text-xs py-2 font-600 tracking-wide">
        🎉 FREE DELIVERY on orders above ₹499 · Use code <strong>TRENDÉ20</strong> for extra 20% off
      </div>

      {/* ── Navbar ── */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <a href="#" className="font-display text-2xl font-900 text-[#e91e8c] tracking-tight flex-shrink-0" style={{ fontFamily: 'Fraunces, serif' }}>
            TRENDÉ
          </a>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-2 hidden sm:block">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setActiveCategory('All'); setActiveSubCat(null) }}
                placeholder="Search for clothes, brands..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-sm focus:outline-none focus:border-[#e91e8c] focus:ring-2 focus:ring-pink-100 transition"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          {/* Nav actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* User */}
            <button
              onClick={() => user ? setShowOrders(true) : setShowLogin(true)}
              className="flex flex-col items-center px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors"
              aria-label="Login / Profile"
            >
              <UserIcon />
              <span className="text-[10px] font-600 hidden sm:block mt-0.5">{user ? user.split(' ')[0] : 'Login'}</span>
            </button>

            {/* Orders */}
            <button
              onClick={() => user ? setShowOrders(true) : setShowLogin(true)}
              className="flex flex-col items-center px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors hidden sm:flex"
              aria-label="My Orders"
            >
              <OrderIcon />
              <span className="text-[10px] font-600 mt-0.5">Orders</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setShowWishlist(true)}
              className="relative flex flex-col items-center px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors"
              aria-label="Wishlist"
            >
              <HeartIcon />
              {wishlist.size > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[#e91e8c] text-white text-[9px] rounded-full flex items-center justify-center font-700 px-1">
                  {wishlist.size}
                </span>
              )}
              <span className="text-[10px] font-600 hidden sm:block mt-0.5">Wishlist</span>
            </button>

            {/* Cart */}
            <button
              onClick={() => setShowCart(true)}
              className="relative flex flex-col items-center px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors"
              aria-label="Cart"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[#e91e8c] text-white text-[9px] rounded-full flex items-center justify-center font-700 px-1">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px] font-600 hidden sm:block mt-0.5">Cart</span>
            </button>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileMenuOpen(v => !v)} className="sm:hidden px-2 py-1 text-gray-600 hover:text-[#e91e8c] transition-colors ml-1">
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setActiveCategory('All'); setActiveSubCat(null) }}
              placeholder="Search for clothes, brands..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-sm focus:outline-none focus:border-[#e91e8c] transition"
            />
          </div>
        </div>

        {/* Category nav */}
        <nav className="border-t border-pink-50 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-1.5">
            {(['All', 'Men', 'Women', 'Kids'] as Category[]).map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveSubCat(null); setSearchQuery('') }}
                className={`px-5 py-2 rounded-xl text-sm font-700 whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-[#e91e8c] text-white' : 'text-gray-600 hover:bg-pink-50'}`}
              >
                {cat === 'All' ? '✦ All' : cat}
              </button>
            ))}
            <div className="w-px h-5 bg-pink-200 mx-2" />
            <button onClick={() => { setSortBy('discount'); setActiveCategory('All') }} className="px-4 py-2 rounded-xl text-sm font-700 text-[#e91e8c] hover:bg-pink-50 whitespace-nowrap transition-all">
              Sale 🔥
            </button>
            <button onClick={() => { setActiveCategory('All'); setActiveSubCat(null); setSortBy('default') }} className="px-4 py-2 rounded-xl text-sm font-700 text-gray-600 hover:bg-pink-50 whitespace-nowrap transition-all">
              New Arrivals
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-pink-100 bg-white px-4 py-3 space-y-2">
            <button onClick={() => { setShowOrders(true); setMobileMenuOpen(false) }} className="w-full text-left px-3 py-2 rounded-xl text-sm font-600 text-gray-700 hover:bg-pink-50">My Orders</button>
            <button onClick={() => { setUser(null); setMobileMenuOpen(false) }} className="w-full text-left px-3 py-2 rounded-xl text-sm font-600 text-gray-700 hover:bg-pink-50">{user ? `Logout (${user})` : 'Login'}</button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero */}
        {!searchQuery && <HeroBanner onCategorySelect={cat => { setActiveCategory(cat); setActiveSubCat(null) }} />}

        {/* Subcategory pills */}
        {!searchQuery && (
          <div className="overflow-x-auto">
            <div className="flex gap-2 pb-1">
              <button
                onClick={() => setActiveSubCat(null)}
                className={`px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap border transition-all ${!activeSubCat ? 'bg-[#e91e8c] text-white border-[#e91e8c]' : 'bg-white text-gray-600 border-pink-200 hover:border-[#e91e8c]'}`}
              >
                All
              </button>
              {subCats.map(sc => (
                <button
                  key={sc}
                  onClick={() => setActiveSubCat(sc === activeSubCat ? null : sc)}
                  className={`px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap border transition-all ${activeSubCat === sc ? 'bg-[#e91e8c] text-white border-[#e91e8c]' : 'bg-white text-gray-600 border-pink-200 hover:border-[#e91e8c]'}`}
                >
                  {sc}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-800 text-lg text-gray-800">
            {searchQuery
              ? `Results for "${searchQuery}" (${filtered.length})`
              : `${activeCategory === 'All' ? 'All Products' : activeCategory}${activeSubCat ? ` · ${activeSubCat}` : ''} (${filtered.length})`
            }
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-600">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-pink-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-[#e91e8c] font-600 text-gray-700"
            >
              <option value="default">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-700 text-xl text-gray-700">No results found</p>
            <p className="text-gray-400 mt-2">Try different keywords or browse categories</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveSubCat(null) }}
              className="mt-6 px-6 py-3 bg-[#e91e8c] text-white rounded-full font-700 hover:bg-[#c2185b] transition-all">
              Browse All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                wishlisted={wishlist.has(product.id)}
                onWishlist={() => toggleWishlist(product.id)}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display text-xl font-900 text-[#e91e8c] mb-3" style={{ fontFamily: 'Fraunces, serif' }}>TRENDÉ</h3>
              <p className="text-sm text-gray-500">Fashion for the bold. Style for every story.</p>
            </div>
            {[
              { title: 'Shop', links: ['Men', 'Women', 'Kids', 'Sale', 'New Arrivals'] },
              { title: 'Help', links: ['My Orders', 'Returns', 'Size Guide', 'Contact Us'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-700 text-gray-800 mb-3 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => <li key={l}><a href="#" className="text-sm text-gray-500 hover:text-[#e91e8c] transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-pink-100 mt-8 pt-6 text-center text-xs text-gray-400">
            © 2026 TRENDÉ. All rights reserved. Made with ♡ for fashion lovers.
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      {showCart && <CartDrawer items={cartItems} onClose={() => setShowCart(false)} onRemove={removeFromCart} />}
      {showWishlist && (
        <WishlistDrawer
          products={PRODUCTS}
          wishlist={wishlist}
          onClose={() => setShowWishlist(false)}
          onToggleWishlist={toggleWishlist}
          onAddToCart={p => { addToCart(p); setShowWishlist(false) }}
        />
      )}
      {showOrders && <OrdersModal onClose={() => setShowOrders(false)} />}
    </div>
  )
}
