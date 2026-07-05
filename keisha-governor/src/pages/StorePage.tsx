import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const categories = [
  { id: "all", label: "All" },
  { id: "apparel", label: "Apparel" },
  { id: "accessories", label: "Accessories" },
  { id: "drinkware", label: "Drinkware" },
  { id: "signs", label: "Signs & Posters" },
  { id: "stickers", label: "Stickers & Decals" },
  { id: "bags", label: "Bags" },
  { id: "other", label: "More" },
];

function ProductCard({ product, onAddToCart }: { product: any; onAddToCart: (size?: string, color?: string) => void }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(selectedSize || undefined, selectedColor || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Generate a gradient based on product category for placeholder
  const gradients: Record<string, string> = {
    apparel: "from-[#1C3C73] to-[#2a5298]",
    accessories: "from-[#BF0F06] to-[#e63946]",
    drinkware: "from-[#1C3C73] to-[#BF0F06]",
    signs: "from-green-800 to-green-600",
    stickers: "from-amber-700 to-amber-500",
    bags: "from-purple-800 to-purple-600",
    other: "from-[#1C3C73] to-[#4a6fa5]",
  };

  const iconMap: Record<string, string> = {
    apparel: "👕", accessories: "🧢", drinkware: "☕",
    signs: "📋", stickers: "🏷️", bags: "👜", other: "📦",
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.12] transition-colors group">
      {/* Product image placeholder */}
      <div className={`relative aspect-square bg-gradient-to-br ${gradients[product.category] || gradients.other} flex items-center justify-center`}>
        <span className="text-5xl opacity-60">{iconMap[product.category] || "📦"}</span>
        {product.featured && (
          <span className="absolute top-2 right-2 bg-[#BF0F06] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Featured</span>
        )}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5">
          <span className="text-green-400 text-[10px] font-medium">{product.campaignDonationPercent}% to campaign</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm leading-tight mb-1">{product.name}</h3>
        <p className="text-white/30 text-xs line-clamp-2 mb-2">{product.description}</p>

        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-bold text-lg">${product.price.toFixed(2)}</span>
          <span className="text-green-400/60 text-[10px]">${(product.price * product.campaignDonationPercent / 100).toFixed(2)} to Keisha</span>
        </div>

        {/* Size selector */}
        {product.sizes && product.sizes.length > 1 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-2 py-0.5 text-[10px] rounded border transition-colors ${
                    selectedSize === s
                      ? "border-[#1C3C73] bg-[#1C3C73]/20 text-white"
                      : "border-white/10 text-white/30 hover:text-white/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color selector */}
        {product.colors && product.colors.length > 1 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1">
              {product.colors.map((c: string) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-2 py-0.5 text-[10px] rounded border transition-colors ${
                    selectedColor === c
                      ? "border-[#1C3C73] bg-[#1C3C73]/20 text-white"
                      : "border-white/10 text-white/30 hover:text-white/50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={added}
          className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
            added
              ? "bg-green-600 text-white"
              : "bg-[#BF0F06] hover:bg-[#BF0F06]/80 text-white"
          }`}
        >
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function CartSidebar({ sessionId, onClose }: { sessionId: string; onClose: () => void }) {
  const cart = useQuery(api.store.getCart, { sessionId });
  const updateQty = useMutation(api.store.updateCartQuantity);
  const removeItem = useMutation(api.store.removeFromCart);
  const clearCart = useMutation(api.store.clearCart);

  const subtotal = cart?.reduce((s, i) => s + i.lineTotal, 0) ?? 0;
  const shipping = subtotal >= 75 ? 0 : 7.99;
  const total = subtotal + shipping;
  const campaignTotal = cart?.reduce((s, i) => s + (i.lineTotal * (i.product.campaignDonationPercent / 100)), 0) ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#0d1321] border-l border-white/10 h-full overflow-y-auto z-10">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Your Cart</h2>
            <button onClick={onClose} className="text-white/30 hover:text-white/60">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {(!cart || cart.length === 0) ? (
            <div className="text-center py-16 text-white/30">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item._id} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-white text-sm font-medium">{item.product.name}</div>
                        <div className="text-white/30 text-xs">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && " / "}
                          {item.color && `Color: ${item.color}`}
                        </div>
                      </div>
                      <button onClick={() => removeItem({ cartItemId: item._id })} className="text-white/20 hover:text-red-400 text-xs">Remove</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty({ cartItemId: item._id, quantity: item.quantity - 1 })} className="w-6 h-6 rounded bg-white/5 text-white/40 hover:text-white text-sm flex items-center justify-center">-</button>
                        <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty({ cartItemId: item._id, quantity: item.quantity + 1 })} className="w-6 h-6 rounded bg-white/5 text-white/40 hover:text-white text-sm flex items-center justify-center">+</button>
                      </div>
                      <span className="text-white font-semibold text-sm">${item.lineTotal.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-white/[0.06] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Shipping</span>
                  <span className="text-white">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <div className="text-[10px] text-green-400/60">Free shipping on orders $75+</div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-white/[0.06]">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 text-center">
                  <span className="text-green-400 text-xs font-medium">${campaignTotal.toFixed(2)} goes directly to Keisha's campaign</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-[#BF0F06] hover:bg-[#BF0F06]/80 text-white font-bold py-3 rounded-lg transition-colors">
                Checkout - ${total.toFixed(2)}
              </button>

              <button onClick={() => clearCart({ sessionId })} className="w-full mt-2 text-white/20 hover:text-white/40 text-xs text-center py-2">
                Clear Cart
              </button>
            </>
          )}

          <div className="mt-8 text-center">
            <div className="text-white/10 text-[10px]">Powered by BlueVote</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const products = useQuery(api.store.getAllProducts);
  const addToCart = useMutation(api.store.addToCart);
  const user = useQuery(api.auth.currentUser);
  const sessionId = user?.email || "guest";
  const cart = useQuery(api.store.getCart, { sessionId });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const cartCount = cart?.reduce((s, i) => s + i.quantity, 0) ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Campaign Store</h1>
          <p className="text-white/40 text-sm mt-1">Official Keisha for Governor merchandise. Every purchase supports the campaign.</p>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="relative bg-white/[0.06] hover:bg-white/10 border border-white/[0.06] rounded-xl p-3 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#BF0F06] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
          )}
        </button>
      </div>

      {/* Campaign donation banner */}
      <div className="bg-gradient-to-r from-[#1C3C73]/20 to-[#BF0F06]/20 border border-[#1C3C73]/20 rounded-xl p-4 text-center">
        <p className="text-white font-semibold text-sm">Every purchase directly supports Keisha's campaign for Governor</p>
        <p className="text-white/40 text-xs mt-1">25-60% of each sale goes to the Keisha Lance Bottoms campaign fund</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? "bg-[#BF0F06] text-white"
                : "bg-white/[0.05] text-white/40 hover:text-white/60"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product count */}
      <div className="text-white/20 text-xs">{filteredProducts.length} items</div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {!products && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-white/5" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-white/5 rounded w-3/4" />
              <div className="h-2 bg-white/5 rounded w-1/2" />
              <div className="h-8 bg-white/5 rounded" />
            </div>
          </div>
        ))}
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={(size, color) =>
              addToCart({
                sessionId,
                productId: product._id,
                quantity: 1,
                size,
                color,
              })
            }
          />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-white/[0.06]">
        <p className="text-white/20 text-xs">Free shipping on orders over $75</p>
        <p className="text-white/10 text-[10px] mt-1">Powered by BlueVote</p>
      </div>

      {/* Cart sidebar */}
      {cartOpen && <CartSidebar sessionId={sessionId} onClose={() => setCartOpen(false)} />}
    </div>
  );
}
