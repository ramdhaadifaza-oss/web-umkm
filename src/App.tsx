/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductModal } from './components/ProductModal';
import { RotatingWheelsSection } from './components/RotatingWheelsSection';
import { SukoharjoMapSection } from './components/SukoharjoMapSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import {
  UMKM_PRODUCTS,
  type FoodCategory,
  type FoodThemeId,
  type UmkmProduct,
} from './data/sukoharjoUmkm';

export default function App() {
  const [activeTheme, setActiveTheme] = useState<FoodThemeId>('all');
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('Semua');
  const [activeKecamatan, setActiveKecamatan] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMapProduct, setSelectedMapProduct] = useState<UmkmProduct>(
    UMKM_PRODUCTS[0]
  );
  const [modalProduct, setModalProduct] = useState<UmkmProduct | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSelectThemeFromWheel = (themeId: FoodThemeId) => {
    setActiveTheme(themeId);
    if (themeId !== 'all') {
      const matching = UMKM_PRODUCTS.find((p) => p.themeId === themeId);
      if (matching) {
        setSelectedMapProduct(matching);
      }
    }
  };

  const handleFocusOnMap = (product: UmkmProduct) => {
    setSelectedMapProduct(product);
    const el = document.getElementById('peta-umkm');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddToCart = (product: UmkmProduct, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <HeroSection
          featuredProducts={UMKM_PRODUCTS.slice(0, 4)}
          onSelectProduct={(product) => setModalProduct(product)}
          onFocusOnMap={handleFocusOnMap}
        />

        <RotatingWheelsSection
          activeTheme={activeTheme}
          onSelectTheme={handleSelectThemeFromWheel}
          onSelectProduct={(product) => setModalProduct(product)}
        />

        <CatalogSection
          products={UMKM_PRODUCTS}
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
          activeTheme={activeTheme}
          onClearTheme={() => setActiveTheme('all')}
          activeKecamatan={activeKecamatan}
          onChangeKecamatan={setActiveKecamatan}
          searchQuery={searchQuery}
          onChangeSearch={setSearchQuery}
          onSelectProduct={(product) => setModalProduct(product)}
          onFocusOnMap={handleFocusOnMap}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        <SukoharjoMapSection
          products={UMKM_PRODUCTS}
          selectedProduct={selectedMapProduct}
          onSelectProduct={setSelectedMapProduct}
          onOpenDetail={(product) => setModalProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        <TestimonialsSection onSelectProduct={(product) => setModalProduct(product)} />
      </main>

      <Footer />

      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={handleAddToCart}
        onFocusOnMap={handleFocusOnMap}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
