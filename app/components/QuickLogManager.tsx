// app/components/QuickLogManager.tsx

"use client";

import React, { useState } from "react";
import { Plus, Minus, Trash2, Zap, Calendar, MapPin, ShoppingCart, X } from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: Date;
  location?: string | null;
  type: string;
}

interface FinishedGood {
  id: string;
  name: string;
  retailPrice: number;
  quantityOnHand: number;
}

interface Props {
  events: Event[];
  finishedGoods: FinishedGood[];
  createEventAction: (formData: FormData) => Promise<void>;
  checkoutAction: (formData: FormData) => Promise<void>;
}

const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-[#faf8f5] dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent";

const cardClass = "bg-[#e0d6c9] dark:bg-black border border-gray-300 dark:border-slate-700 rounded-xl p-6";

export function QuickLogManager({
  events,
  finishedGoods,
  createEventAction,
  checkoutAction,
}: Props) {
  const [selectedEventId, setSelectedEventId] = useState("");
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [cart, setCart] = useState<
    Array<{ finishedGoodId: string; quantity: number; unitPrice: number }>
  >([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const runningTotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const handleAddToCart = (product: FinishedGood) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.finishedGoodId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.finishedGoodId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          finishedGoodId: product.id,
          quantity: 1,
          unitPrice: product.retailPrice,
        },
      ];
    });
  };

  const updateQuantity = (finishedGoodId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.finishedGoodId === finishedGoodId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (finishedGoodId: string) => {
    setCart((prev) => prev.filter((item) => item.finishedGoodId !== finishedGoodId));
  };

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createEventAction(formData);
    setShowNewEvent(false);
    (e.target as HTMLFormElement).reset();
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setIsCheckingOut(true);
    const formData = new FormData();
    formData.append("eventId", selectedEventId);
    formData.append("items", JSON.stringify(cart));

    await checkoutAction(formData);
    setCart([]);
    setIsCheckingOut(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Product Grid */}
      <div className="lg:col-span-2 space-y-4">
        <div className={cardClass}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {finishedGoods.map((product) => (
              <button
                key={product.id}
                onClick={() => handleAddToCart(product)}
                className="p-4 bg-[#ede6dc] dark:bg-gray-900 border border-gray-300 dark:border-slate-700 rounded-xl text-center hover:bg-[#8a7a65] dark:hover:bg-slate-700 hover:text-white dark:hover:text-gray-100 transition-colors group"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-white dark:group-hover:text-gray-100">
                  {product.name}
                </p>
                <p className="text-lg font-bold text-teal-600 dark:text-teal-400 mt-1 group-hover:text-white dark:group-hover:text-gray-100">
                  ${product.retailPrice.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-white dark:group-hover:text-gray-100">
                  Stock: {product.quantityOnHand}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Cart */}
      <div className="space-y-4">
        <div className={cardClass}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Event
          </h2>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className={inputClass}
          >
            <option value="">No event (walk-in sale)</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name} - {new Date(event.date).toLocaleDateString()}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowNewEvent(true)}
            className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            New Event
          </button>

          {showNewEvent && (
            <form onSubmit={handleCreateEvent} className="mt-4 space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Event name"
                required
                className={inputClass}
              />
              <input
                type="date"
                name="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className={inputClass}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className={inputClass}
              />
              <select name="type" className={inputClass}>
                <option value="popup">Popup</option>
                <option value="farmers_market">Farmers Market</option>
                <option value="craft_fair">Craft Fair</option>
                <option value="other">Other</option>
              </select>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                >
                  Save Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewEvent(false)}
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className={cardClass}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Cart ({cart.length} items)
          </h2>

          {cart.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tap products to add them to your cart.
            </p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => {
                const product = finishedGoods.find(
                  (fg) => fg.id === item.finishedGoodId
                );
                return (
                  <div
                    key={item.finishedGoodId}
                    className="flex items-center justify-between bg-[#ede6dc] dark:bg-gray-900 rounded-lg p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {product?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.finishedGoodId, -1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.finishedGoodId, 1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.finishedGoodId)}
                        className="ml-1 p-1 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Total
                  </span>
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                    ${runningTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cart.length === 0}
                className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}