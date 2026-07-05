import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useMemo, useCallback } from "react";
import type { Id } from "../../convex/_generated/dataModel";

const CATEGORIES = [
  { key: "all", label: "All Items" },
  { key: "apparel", label: "Apparel" },
  { key: "accessories", label: "Accessories" },
  { key: "yard_signs", label: "Yard Signs" },
  { key: "stickers", label: "Stickers" },
  { key: "drinkware", label: "Drinkware" },
  { key: "digital", label: "Digital" },
];

function getSessionId() {
  let id = sessionStorage.getItem("bv_cart_session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("bv_cart_session", id);
  }
  return id;
}

export function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const sessionId = useMemo(() => getSessionId(), []);

  const products = useQuery(api.store.listProducts, activeCategory === "all" ? {} : { category: activeCategory });
  const cartItems = useQuery(api.store.getCartItems, { sessionId });
  const addToCart = useMutation(api.store.addToCart);
  const updateQty = useMutation(api.store.updateCartQuantity);
  const removeItem = useMutation(api.store.removeFromCart);

  const cartCount = cartItems?.reduce((s, i) => s + i.quantity, 0) ?? 0;
  const cartTotal = cartItems?.reduce((s, i) => s + (i.product?.price ?? 0) * i.quantity, 0) ?? 0;

  const handleAdd = useCallback(async (productId: Id<"products">) => {
    await addToCart({ sessionId, productId, quantity: 1 });
    setAddedProductId(productId);
    setTimeout(() => setAddedProductId(null), 1500);
  }, [addToCart, sessionId]);

  const sorted = useMemo(() => {
    if (!products) return [];
    return [...products].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.sortOrder - b.sortOrder;
    });
  }, [products]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Blue<span className="text-blue-400">Store</span>
          </h1>
          <p className="text-white/50 mt-1">Official BlueVote merchandise -- every purchase supports the cause</p>
        </div>
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="relative flex items-center gap-2 px-4 py-2.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-400/20 rounded-xl text-blue-400 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.key
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="bg-[#0f2440] border border-blue-400/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Your Cart ({cartCount} items)</h3>
            <button onClick={() => setCartOpen(false)} className="text-white/40 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          {(!cartItems || cartItems.length === 0) ? (
            <p className="text-white/40 text-sm">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 bg-white/5 rounded-xl p-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-2xl">
                    {item.product?.imageEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.product?.name}</p>
                    <p className="text-blue-400 text-xs">${item.product?.price?.toFixed(2)}{item.size ? ` / ${item.size}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty({ itemId: item._id, quantity: item.quantity - 1 })}
                      className="w-7 h-7 rounded bg-white/5 text-white/60 hover:text-white flex items-center justify-center text-sm"
                    >-</button>
                    <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty({ itemId: item._id, quantity: item.quantity + 1 })}
                      className="w-7 h-7 rounded bg-white/5 text-white/60 hover:text-white flex items-center justify-center text-sm"
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeItem({ itemId: item._id })}
                    className="text-red-400/60 hover:text-red-400 text-xs"
                  >Remove</button>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-white font-semibold">Total: ${cartTotal.toFixed(2)}</span>
                <button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Product grid */}
      {!products ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-white/5 rounded-2xl h-72 animate-pulse" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/40 text-lg">No products in this category yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((product) => (
            <div
              key={product._id}
              className={`group bg-[#0f2440] border rounded-2xl overflow-hidden transition-all hover:border-blue-400/30 ${
                product.featured ? "border-blue-400/20 ring-1 ring-blue-400/10" : "border-white/5"
              }`}
            >
              {product.featured && (
                <div className="bg-blue-500/20 text-blue-300 text-xs font-semibold text-center py-1.5 tracking-wider uppercase">
                  Featured
                </div>
              )}
              <div className="h-40 bg-gradient-to-br from-blue-500/5 to-blue-600/10 flex items-center justify-center text-6xl">
                {product.imageEmoji}
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-white font-semibold">{product.name}</h3>
                  <p className="text-white/40 text-sm mt-1 line-clamp-2">{product.description}</p>
                </div>
                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {product.sizes.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-white/5 rounded text-white/40 text-xs">{s}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-blue-400 font-bold text-lg">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAdd(product._id)}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      addedProductId === product._id
                        ? "bg-green-500/20 text-green-400 border border-green-400/20"
                        : product.inStock
                        ? "bg-blue-500/15 text-blue-400 border border-blue-400/20 hover:bg-blue-500/25"
                        : "bg-white/5 text-white/20 cursor-not-allowed"
                    }`}
                  >
                    {addedProductId === product._id ? "Added!" : product.inStock ? "Add to Cart" : "Sold Out"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-6 text-white/20 text-xs">
        Every purchase is a walking advertisement for democracy. Powered by BlueVote.
      </div>
    </div>
  );
}
