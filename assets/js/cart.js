/**
 * ZYMA™ Craft Kombucha - Reactive Client-Side Cart Engine
 * Manages drawer UI, pack sizing, promos, tax, free shipping bar, and checkout simulation.
 */

class CartEngine {
  constructor() {
    this.storageKey = 'zyma_cart_v1';
    this.promoStorageKey = 'zyma_promo_v1';
    this.freeShippingThreshold = 50.00;
    this.taxRate = 0.08; // 8% estimated tax
    this.standardShipping = 6.99;
    
    this.state = {
      items: [], // { id, productId, name, packType, packLabel, unitPrice, quantity, image }
      promoCode: null,
      discountPercent: 0,
      isFreeShippingPromo: false
    };

    this.init();
  }

  init() {
    this.loadState();
    this.createDrawerDOM();
    this.createCheckoutModalDOM();
    this.bindEvents();
    this.render();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.state.items = JSON.parse(saved);
        // Automatically purge deleted products: Smoked Oak Chaga, Rosemary Pear & White Pine, Smoked Oak Chai Spice
        const deletedIds = ['smoked-oak-chaga', 'rosemary-pear-white-pine', 'smoked-oak-chai-spice'];
        const prevCount = this.state.items.length;
        this.state.items = this.state.items.filter(item => 
          !deletedIds.includes(item.productId) && 
          !deletedIds.some(dId => (item.id || '').startsWith(dId))
        );
        if (this.state.items.length !== prevCount) {
          this.saveState();
        }
      }
      const savedPromo = localStorage.getItem(this.promoStorageKey);
      if (savedPromo) {
        this.applyPromo(savedPromo, false);
      }
    } catch (e) {
      console.warn("Could not load cart state:", e);
      this.state.items = [];
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state.items));
      if (this.state.promoCode) {
        localStorage.setItem(this.promoStorageKey, this.state.promoCode);
      } else {
        localStorage.removeItem(this.promoStorageKey);
      }
    } catch (e) {
      console.warn("Could not save cart state:", e);
    }
  }

  createDrawerDOM() {
    if (document.getElementById('cartDrawerBackdrop')) return;

    // Create backdrop & drawer container
    const backdrop = document.createElement('div');
    backdrop.id = 'cartDrawerBackdrop';
    backdrop.className = 'cart-drawer-backdrop';
    document.body.appendChild(backdrop);

    const drawer = document.createElement('aside');
    drawer.id = 'cartDrawer';
    drawer.className = 'cart-drawer text-[#3A3028] dark:text-[#FFF8ED]';
    drawer.setAttribute('aria-label', 'Shopping Cart');
    drawer.innerHTML = `
      <!-- Cart Header -->
      <div class="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-[#FDFBF7]/95 dark:bg-[#17211C]/95 backdrop-blur-md">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#234E3D]/10 dark:bg-[#F4A261]/15 text-[#234E3D] dark:text-[#F4A261] flex items-center justify-center font-bold text-lg shadow-sm">
            <i class="fa-solid fa-bottle-droplet"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-heading font-bold text-lg leading-tight m-0 text-stone-900 dark:text-[#FFF8ED]">Ferment Basket</h3>
              <span id="cartHeaderBadge" class="hidden px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F4A261] text-[#3A3028]">
                0
              </span>
            </div>
            <span class="text-xs text-stone-500 dark:text-stone-400" id="cartItemCountText">0 items in cold reserve</span>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <button id="clearCartBtn" class="hidden text-[11px] font-semibold text-stone-400 hover:text-rose-500 transition px-2 py-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800" title="Empty Basket">
            Clear
          </button>
          <button id="closeCartBtn" aria-label="Close cart" class="w-9 h-9 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition">
            <i class="fa-solid fa-xmark text-base"></i>
          </button>
        </div>
      </div>

      <!-- Free Cold-Chain Shipping Goal Meter -->
      <div class="px-4 sm:px-5 py-3 bg-[#F9F5EC] dark:bg-[#131D17] border-b border-stone-200/80 dark:border-stone-800/80">
        <div class="flex justify-between items-center text-xs font-semibold mb-1.5" id="shippingGoalText">
          <span class="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
            <i class="fa-solid fa-truck-fast text-[#F4A261]"></i>
            <span>Cold-Chain Shipping</span>
          </span>
          <span class="text-warm-orange font-bold text-xs" id="shippingRemaining">$50.00 away</span>
        </div>
        <div class="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
          <div id="shippingProgressBar" class="h-2 rounded-full progress-bar-glow transition-all duration-500" style="width: 0%"></div>
        </div>
      </div>

      <!-- Cart Items Scroll List -->
      <div id="cartItemsList" class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
        <!-- Injected dynamically -->
      </div>

      <!-- Cart Footer / Totals & Actions -->
      <div id="cartFooter" class="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-[#FDFBF7]/95 dark:bg-[#17211C]/95 backdrop-blur-md space-y-3">
        <!-- Promo code input with instant chip helpers -->
        <div>
          <div class="flex gap-2">
            <div class="relative flex-1">
              <input type="text" id="promoCodeInput" placeholder="Promo code (e.g. ZYMA10)" 
                class="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none focus:border-[#F4A261] uppercase tracking-wider font-semibold text-stone-800 dark:text-stone-200">
              <i class="fa-solid fa-tag absolute left-2.5 top-2.5 text-stone-400 text-xs"></i>
            </div>
            <button id="applyPromoBtn" class="px-4 py-2 text-xs font-semibold rounded-xl bg-[#F4A261] hover:bg-[#E7924F] text-[#3A3028] transition shadow-sm flex items-center gap-1">
              <span>Apply</span>
            </button>
          </div>
          <!-- Quick Promo Chips -->
          <div class="flex items-center gap-1.5 mt-1.5">
            <span class="text-[10px] text-stone-400">Offer:</span>
            <button type="button" onclick="(window.brambleCart||window.zymaCart).applyPromo('ZYMA10')" class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#F4A261]/15 text-warm-orange hover:bg-[#F4A261]/25 transition">
              ZYMA10 (-10%)
            </button>
            <button type="button" onclick="(window.brambleCart||window.zymaCart).applyPromo('FREESHIP')" class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 transition">
              FREESHIP
            </button>
          </div>
          <div id="promoNotice" class="text-xs hidden font-medium mt-1"></div>
        </div>

        <!-- Price breakdown -->
        <div class="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 pt-2 border-t border-stone-200/60 dark:border-stone-800/60">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="font-semibold text-stone-800 dark:text-stone-100" id="cartSubtotalText">$0.00</span>
          </div>
          <div id="cartDiscountRow" class="flex justify-between text-emerald-700 dark:text-emerald-400 hidden">
            <span class="flex items-center gap-1">
              <i class="fa-solid fa-ticket text-xs"></i>
              <span>Probiotic Promo (<span id="cartDiscountLabel">0%</span>)</span>
            </span>
            <span class="font-semibold" id="cartDiscountText">-$0.00</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="flex items-center gap-1.5">
              <span>Cold-Chain Insulated Shipping</span>
              <i class="fa-solid fa-snowflake text-[10px] text-sky-500" title="Temperature insulated packaging"></i>
            </span>
            <span class="font-semibold text-stone-800 dark:text-stone-100" id="cartShippingText">$6.99</span>
          </div>
          <div class="flex justify-between">
            <span>Estimated Probiotic State Tax (8%)</span>
            <span class="font-semibold text-stone-800 dark:text-stone-100" id="cartTaxText">$0.00</span>
          </div>
          <div class="flex justify-between items-baseline text-base font-bold text-stone-900 dark:text-[#FFF8ED] pt-2 border-t border-stone-300 dark:border-stone-700">
            <div>
              <span class="block text-sm sm:text-base font-heading font-bold">Total Due</span>
              <span class="text-[10px] text-stone-400 font-normal">Taxes & cold packaging included</span>
            </div>
            <span class="text-[#F4A261] font-heading font-bold text-xl" id="cartTotalText">$0.00</span>
          </div>
        </div>

        <!-- Checkout Action Button -->
        <button id="proceedToCheckoutBtn" class="w-full btn-primary-forest py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg">
          <i class="fa-solid fa-lock text-xs text-[#F4A261]"></i>
          <span>Proceed to Cold-Chain Checkout</span>
          <i class="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
        </button>
        
        <!-- Trust badge row -->
        <div class="flex items-center justify-center gap-3 text-[10px] text-stone-500 dark:text-stone-400 pt-0.5">
          <span class="flex items-center gap-1"><i class="fa-solid fa-shield-halved text-emerald-600 dark:text-emerald-400"></i> 256-Bit SSL</span>
          <span>•</span>
          <span class="flex items-center gap-1"><i class="fa-solid fa-temperature-low text-sky-500"></i> 48h Chilled Arrival</span>
          <span>•</span>
          <span class="flex items-center gap-1"><i class="fa-solid fa-seedling text-emerald-600"></i> Living Culture</span>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  createCheckoutModalDOM() {
    if (document.getElementById('checkoutModal')) return;

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'checkoutModal';
    modal.tabIndex = -1;
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content overflow-hidden border-0 shadow-2xl">
          <div class="modal-header bg-[#234E3D] text-[#FFF8ED] p-5 border-0">
            <div>
              <span class="text-xs uppercase tracking-widest text-[#F4A261] font-bold">Bramble & Oak Express Cold-Chain</span>
              <h4 class="modal-title font-heading font-bold text-2xl text-[#FFF8ED]">Direct Bottling Checkout</h4>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
          <div class="modal-body p-6 sm:p-8" id="checkoutModalBody">
            <div id="checkoutFormStep">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- Shipping Info -->
                <div class="space-y-4">
                  <h5 class="font-heading font-bold text-sm text-stone-900 dark:text-[#FFF8ED] uppercase tracking-wider flex items-center gap-2">
                    <i class="fa-solid fa-truck-ramp-box text-[#F4A261]"></i> Cold-Pack Delivery Address
                  </h5>
                  <div>
                    <label for="chkName" class="block text-xs font-semibold mb-1 text-stone-600 dark:text-stone-300">Recipient Name <span class="text-rose-500">*</span></label>
                    <input type="text" id="chkName" required placeholder="e.g. Alex Rivers" class="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#F4A261] transition">
                    <span id="chkNameError" class="form-error-msg hidden">Recipient name must contain only letters (no digits allowed).</span>
                  </div>
                  <div>
                    <label for="chkPhone" class="block text-xs font-semibold mb-1 text-stone-600 dark:text-stone-300">Contact Phone Number <span class="text-rose-500">*</span></label>
                    <input type="tel" id="chkPhone" required placeholder="e.g. 5035550192" maxlength="15" class="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#F4A261] transition">
                    <span id="chkPhoneError" class="form-error-msg hidden">Contact number must contain only digits (no letters allowed, min 10 digits).</span>
                  </div>
                  <div>
                    <label for="chkEmail" class="block text-xs font-semibold mb-1 text-stone-600 dark:text-stone-300">Email Address (for Dispatch & Probiotic Log) <span class="text-rose-500">*</span></label>
                    <input type="email" id="chkEmail" required placeholder="e.g. alex.rivers@fermentmail.com" class="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#F4A261] transition">
                    <span id="chkEmailError" class="form-error-msg hidden">Please enter a valid email address (e.g. name@domain.com).</span>
                  </div>
                  <div>
                    <label for="chkAddress" class="block text-xs font-semibold mb-1 text-stone-600 dark:text-stone-300">Street Address <span class="text-rose-500">*</span></label>
                    <input type="text" id="chkAddress" required placeholder="e.g. 1024 Botanical Way, Suite 4B" class="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#F4A261] transition">
                    <span id="chkAddressError" class="form-error-msg hidden">Please enter a delivery street address (min 5 characters).</span>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label for="chkCity" class="block text-xs font-semibold mb-1 text-stone-600 dark:text-stone-300">City <span class="text-rose-500">*</span></label>
                      <input type="text" id="chkCity" required placeholder="e.g. Portland" class="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#F4A261] transition">
                      <span id="chkCityError" class="form-error-msg hidden">City must contain only letters (no digits allowed).</span>
                    </div>
                    <div>
                      <label for="chkZip" class="block text-xs font-semibold mb-1 text-stone-600 dark:text-stone-300">ZIP Code <span class="text-rose-500">*</span></label>
                      <input type="text" id="chkZip" required placeholder="e.g. 97209" maxlength="5" class="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#F4A261] transition">
                      <span id="chkZipError" class="form-error-msg hidden">ZIP code must contain only 5 digits (no letters allowed).</span>
                    </div>
                  </div>
                </div>

                <!-- Payment simulation -->
                <div class="space-y-4">
                  <h5 class="font-heading font-bold text-sm text-stone-900 dark:text-[#FFF8ED] uppercase tracking-wider flex items-center gap-2">
                    <i class="fa-solid fa-credit-card text-[#234E3D]"></i> Payment Details
                  </h5>
                  <div class="p-4 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-stone-700 dark:text-stone-300">Instant Probiotic Reserve</span>
                      <span class="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">256-Bit SSL</span>
                    </div>
                    <div>
                      <label class="block text-xs font-semibold mb-1 text-stone-600 dark:text-stone-400">Card Number</label>
                      <div class="relative">
                        <input type="text" value="•••• •••• •••• 4242" readonly class="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-stone-600 dark:text-stone-300">
                        <i class="fa-brands fa-cc-visa absolute right-3 top-2.5 text-blue-600 text-lg"></i>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-xs font-semibold mb-1 text-stone-600 dark:text-stone-400">Expiry</label>
                        <input type="text" value="11/28" readonly class="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-stone-600 dark:text-stone-300">
                      </div>
                      <div>
                        <label class="block text-xs font-semibold mb-1 text-stone-600 dark:text-stone-400">CVV</label>
                        <input type="text" value="•••" readonly class="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-stone-600 dark:text-stone-300">
                      </div>
                    </div>
                  </div>

                  <!-- Mini summary inside modal -->
                  <div class="p-3.5 rounded-xl border border-dashed border-[#F4A261] bg-[#F4A261]/10 text-xs space-y-1">
                    <div class="flex justify-between font-medium">
                      <span class="text-stone-700 dark:text-stone-300">Total Due Today:</span>
                      <span class="font-bold text-[#F4A261] text-sm" id="modalFinalTotal">$0.00</span>
                    </div>
                    <p class="text-[11px] text-stone-500 dark:text-stone-400 m-0">Includes temperature-insulated compostable wool liners and frozen non-toxic gel packs.</p>
                  </div>
                </div>
              </div>

              <div class="border-t border-stone-200 dark:border-stone-800 pt-5 flex items-center justify-between">
                <button type="button" class="btn-outline-forest px-5 py-2.5 text-xs font-semibold" data-bs-dismiss="modal">
                  Back to Taproom
                </button>
                <button type="button" id="confirmPaymentBtn" class="btn-primary-forest px-6 py-2.5 text-xs font-semibold">
                  <span>Authorize & Place Order</span>
                  <i class="fa-solid fa-lock text-xs"></i>
                </button>
              </div>
            </div>

            <!-- Loading Spinner State -->
            <div id="checkoutLoadingStep" class="hidden py-12 text-center space-y-4">
              <div class="inline-block animate-spin text-amber-600 dark:text-amber-400 text-5xl">
                <i class="fa-solid fa-circle-notch"></i>
              </div>
              <h5 class="font-heading font-bold text-xl text-slate-800 dark:text-white">Communicating with Bottling Facility...</h5>
              <p class="text-xs text-slate-500 max-w-sm mx-auto">Allocating cold cellar slots, verifying live CFU viability, and booking insulated dispatch.</p>
            </div>

            <!-- Success State -->
            <div id="checkoutSuccessStep" class="hidden py-6 text-center space-y-5">
              <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-xl shadow-emerald-500/20">
                <i class="fa-solid fa-check"></i>
              </div>
              <div>
                <span class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 mb-2" id="generatedOrderNumber">#BO-84920</span>
                <h4 class="font-heading font-bold text-2xl text-slate-900 dark:text-white">Batch Reserved & Cold-Chain Booked!</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-2">
                  Thank you, <strong id="successCustomerName">Alex</strong>! We have dispatched your brew order to the bottling cellar. You will receive real-time temperature telemetry once on the courier vehicle.
                </p>
                <p class="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1">
                  (Client-side demonstration order. No actual payment was processed.)
                </p>
              </div>

              <div class="max-w-md mx-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-left space-y-2">
                <div class="flex justify-between">
                  <span class="text-slate-500">Destination:</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200" id="successAddress">1024 Botanical Way, Suite 4B</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">Estimated Delivery:</span>
                  <span class="font-semibold text-emerald-600 dark:text-emerald-400">Within 48 Hours (Keep Chilled)</span>
                </div>
                <div class="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold">
                  <span>Paid Total:</span>
                  <span class="text-amber-600 dark:text-amber-400" id="successPaidTotal">$0.00</span>
                </div>
              </div>

              <div class="pt-3">
                <button type="button" class="px-6 py-3 rounded-xl btn-primary-forest font-semibold text-xs transition" data-bs-dismiss="modal">
                  Continue Exploring Bramble & Oak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  bindEvents() {
    // Cart drawer togglers
    const backdrop = document.getElementById('cartDrawerBackdrop');
    const closeBtn = document.getElementById('closeCartBtn');
    
    if (backdrop) backdrop.addEventListener('click', () => this.closeDrawer());
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDrawer());

    // Delegate cart trigger buttons in header or anywhere
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-cart-trigger]');
      if (trigger) {
        e.preventDefault();
        this.openDrawer();
      }
    });

    // Apply promo button
    const applyBtn = document.getElementById('applyPromoBtn');
    const promoInput = document.getElementById('promoCodeInput');
    if (applyBtn && promoInput) {
      applyBtn.addEventListener('click', () => {
        const code = promoInput.value.trim();
        this.applyPromo(code, true);
      });
      promoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.applyPromo(promoInput.value.trim(), true);
        }
      });
    }

    // Proceed to Checkout
    const checkoutBtn = document.getElementById('proceedToCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.state.items.length === 0) {
          this.showToast("Your cart is empty! Add a fresh brew first.", "warning");
          return;
        }
        this.closeDrawer();
        this.openCheckoutModal();
      });
    }

    // Confirm Payment
    const confirmBtn = document.getElementById('confirmPaymentBtn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        this.processCheckoutSimulation();
      });
    }

    // Clear Basket
    const clearBtn = document.getElementById('clearCartBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (this.state.items.length > 0) {
          if (confirm('Empty your entire ferment basket?')) {
            this.clearCart();
          }
        }
      });
    }
  }

  openDrawer() {
    const backdrop = document.getElementById('cartDrawerBackdrop');
    const drawer = document.getElementById('cartDrawer');
    if (backdrop && drawer) {
      backdrop.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const backdrop = document.getElementById('cartDrawerBackdrop');
    const drawer = document.getElementById('cartDrawer');
    if (backdrop && drawer) {
      backdrop.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  addItem(productId, packType = 'fourPack', quantity = 1) {
    let product = typeof getProductById === 'function' ? getProductById(productId) : null;
    if (!product && typeof BRAMBLE_PRODUCTS !== 'undefined') {
      const clean = (productId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      product = BRAMBLE_PRODUCTS.find(p => 
        p.id.toLowerCase().replace(/[^a-z0-9]/g, '') === clean || 
        p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === clean
      );
    }
    if (!product) {
      console.warn(`Product ${productId} not found.`);
      this.showToast(`Selected brew is temporarily resting in cellar.`, 'warning');
      return;
    }

    let packLabel = '4-Pack (12oz Cans)';
    let unitPrice = product.pricing.fourPack;

    if (packType === 'single') {
      packLabel = 'Single 12oz Bottle/Can';
      unitPrice = product.pricing.single;
    } else if (packType === 'twelvePack') {
      packLabel = '12-Pack Cold Cellar Case';
      unitPrice = product.pricing.twelvePack;
    }

    const itemKey = `${productId}-${packType}`;
    const existingIndex = this.state.items.findIndex(i => i.id === itemKey);

    if (existingIndex > -1) {
      this.state.items[existingIndex].quantity += quantity;
    } else {
      this.state.items.push({
        id: itemKey,
        productId: product.id,
        name: product.name,
        category: product.categoryName,
        packType: packType,
        packLabel: packLabel,
        unitPrice: unitPrice,
        quantity: quantity,
        image: product.bottleImage || product.image
      });
    }

    this.saveState();
    this.render();
    this.triggerBadgeBounce();
    this.showToast(`Added ${quantity}x ${product.name} (${packLabel}) to cart!`, 'success');
  }

  updateQuantity(index, delta) {
    if (!this.state.items[index]) return;
    this.state.items[index].quantity += delta;
    if (this.state.items[index].quantity <= 0) {
      this.state.items.splice(index, 1);
    }
    this.saveState();
    this.render();
  }

  removeItem(index) {
    if (!this.state.items[index]) return;
    const removedName = this.state.items[index].name;
    this.state.items.splice(index, 1);
    this.saveState();
    this.render();
    this.showToast(`Removed ${removedName} from cart.`, 'info');
  }

  clearCart() {
    if (this.state.items.length === 0) return;
    this.state.items = [];
    this.saveState();
    this.render();
    this.showToast('Your ferment basket has been cleared.', 'info');
  }

  applyPromo(code, notify = true) {
    if (!code) {
      this.state.promoCode = null;
      this.state.discountPercent = 0;
      this.state.isFreeShippingPromo = false;
      this.saveState();
      this.render();
      return;
    }

    const clean = code.toUpperCase().trim();
    const noticeEl = document.getElementById('promoNotice');

    if (clean === 'BRAMBLE10' || clean === 'ZYMA10') {
      this.state.promoCode = clean;
      this.state.discountPercent = 0.10;
      this.state.isFreeShippingPromo = false;
      if (notify) this.showToast(`Promo code ${clean} applied: 10% OFF entire order!`, 'success');
      if (noticeEl) {
        noticeEl.className = 'text-xs text-emerald-600 dark:text-emerald-400 block font-semibold';
        noticeEl.textContent = `✓ 10% Off Applied (${clean})`;
      }
    } else if (clean === 'FERMENT20') {
      this.state.promoCode = 'FERMENT20';
      this.state.discountPercent = 0.20;
      this.state.isFreeShippingPromo = false;
      if (notify) this.showToast('Special Fermentation Master promo applied: 20% OFF!', 'success');
      if (noticeEl) {
        noticeEl.className = 'text-xs text-emerald-600 dark:text-emerald-400 block font-semibold';
        noticeEl.textContent = '✓ 20% Off Applied (FERMENT20)';
      }
    } else if (clean === 'FREESHIP') {
      this.state.promoCode = 'FREESHIP';
      this.state.discountPercent = 0;
      this.state.isFreeShippingPromo = true;
      if (notify) this.showToast('Promo code FREESHIP applied: $0 Cold-Chain Shipping!', 'success');
      if (noticeEl) {
        noticeEl.className = 'text-xs text-emerald-600 dark:text-emerald-400 block font-semibold';
        noticeEl.textContent = '✓ Free Shipping Activated (FREESHIP)';
      }
    } else {
      if (notify) this.showToast('Invalid promo code. Try BRAMBLE10 or FERMENT20', 'warning');
      if (noticeEl) {
        noticeEl.className = 'text-xs text-rose-500 block font-semibold';
        noticeEl.textContent = '✗ Invalid promo code.';
      }
      return;
    }

    this.saveState();
    this.render();
  }

  // Calculations
  getSubtotal() {
    return this.state.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  getDiscount() {
    const subtotal = this.getSubtotal();
    return subtotal * this.state.discountPercent;
  }

  getShipping() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    if (this.state.isFreeShippingPromo || subtotal >= this.freeShippingThreshold) {
      return 0;
    }
    return this.standardShipping;
  }

  getTax() {
    const taxableAmount = Math.max(0, this.getSubtotal() - this.getDiscount());
    return taxableAmount * this.taxRate;
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - this.getDiscount()) + this.getShipping() + this.getTax();
  }

  getItemCount() {
    return this.state.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  render() {
    const itemsList = document.getElementById('cartItemsList');
    const itemCountText = document.getElementById('cartItemCountText');
    const subtotalText = document.getElementById('cartSubtotalText');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountText = document.getElementById('cartDiscountText');
    const discountLabel = document.getElementById('cartDiscountLabel');
    const shippingText = document.getElementById('cartShippingText');
    const taxText = document.getElementById('cartTaxText');
    const totalText = document.getElementById('cartTotalText');
    
    // Badges in navbar
    const badges = document.querySelectorAll('.cart-badge-count');
    const totalCount = this.getItemCount();
    badges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });

    if (itemCountText) {
      itemCountText.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'} in reserve`;
    }

    const subtotal = this.getSubtotal();
    const discount = this.getDiscount();
    const shipping = this.getShipping();
    const tax = this.getTax();
    const total = this.getTotal();

    // Free shipping bar
    const remaining = Math.max(0, this.freeShippingThreshold - subtotal);
    const progressPercent = Math.min(100, (subtotal / this.freeShippingThreshold) * 100);
    const progressBar = document.getElementById('shippingProgressBar');
    const remainingText = document.getElementById('shippingRemaining');
    
    if (progressBar && remainingText) {
      progressBar.style.width = `${progressPercent}%`;
      if (this.state.isFreeShippingPromo || remaining === 0) {
        remainingText.textContent = 'FREE Shipping Unlocked! 🎉';
        remainingText.className = 'text-emerald-600 dark:text-emerald-400 font-bold';
      } else {
        remainingText.textContent = `$${remaining.toFixed(2)} away`;
        remainingText.className = 'text-amber-700 dark:text-amber-400 font-semibold';
      }
    }

    // Totals
    if (subtotalText) subtotalText.textContent = `$${subtotal.toFixed(2)}`;
    
    if (discountRow && discountText && discountLabel) {
      if (discount > 0) {
        discountRow.classList.remove('hidden');
        discountLabel.textContent = `${Math.round(this.state.discountPercent * 100)}%`;
        discountText.textContent = `-$${discount.toFixed(2)}`;
      } else {
        discountRow.classList.add('hidden');
      }
    }

    if (shippingText) {
      shippingText.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
      if (shipping === 0) {
        shippingText.className = 'font-bold text-emerald-600 dark:text-emerald-400';
      } else {
        shippingText.className = 'font-semibold text-slate-800 dark:text-slate-200';
      }
    }

    if (taxText) taxText.textContent = `$${tax.toFixed(2)}`;
    if (totalText) totalText.textContent = `$${total.toFixed(2)}`;

    // Header Badge & Clear button
    const headerBadge = document.getElementById('cartHeaderBadge');
    const clearBtn = document.getElementById('clearCartBtn');
    if (headerBadge) {
      if (totalCount > 0) {
        headerBadge.textContent = totalCount;
        headerBadge.classList.remove('hidden');
      } else {
        headerBadge.classList.add('hidden');
      }
    }
    if (clearBtn) {
      if (totalCount > 0) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
    }

    // Render items list
    if (itemsList) {
      if (this.state.items.length === 0) {
        itemsList.innerHTML = `
          <div class="h-full flex flex-col items-center justify-center text-center py-8 px-4 space-y-4">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#F4A261]/20 to-[#234E3D]/15 text-warm-orange flex items-center justify-center text-3xl shadow-inner animate-float">
              <i class="fa-solid fa-bottle-droplet"></i>
            </div>
            <div>
              <h4 class="font-heading font-bold text-lg mb-1 text-stone-900 dark:text-[#FFF8ED]">Your Ferment Basket is Empty</h4>
              <p class="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto leading-relaxed">
                Raw, oak-aged living kombucha brewed with high-mountain botanicals. Add a cold-chain pack to reserve your batch.
              </p>
            </div>
            <a href="products.html" onclick="(window.brambleCart||window.zymaCart).closeDrawer()" class="btn-primary-forest px-5 py-2.5 rounded-xl text-xs font-semibold text-decoration-none shadow-md">
              <i class="fa-solid fa-store text-xs"></i>
              <span>Explore The Lineup</span>
            </a>

            <!-- Quick Add Bestsellers in Empty State -->
            <div class="w-full pt-5 mt-3 border-t border-stone-200/70 dark:border-stone-800/80 text-left">
              <span class="text-[10px] uppercase tracking-wider font-semibold text-stone-400 dark:text-stone-500 block mb-2.5">
                Popular Cellar Pours
              </span>
              <div class="space-y-2">
                <button type="button" onclick="(window.brambleCart||window.zymaCart).addItem('blood-orange-bergamot', 'fourPack', 1)" 
                  class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-warm-orange/60 bg-white/70 dark:bg-stone-900/60 flex items-center justify-between text-left transition group">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="w-2 h-2 rounded-full bg-warm-orange"></span>
                    <div class="truncate">
                      <p class="text-xs font-bold text-stone-800 dark:text-stone-200 m-0 truncate">Blood Orange Bergamot</p>
                      <span class="text-[10px] text-stone-400">4-Pack Cans • $16.50</span>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-warm-orange group-hover:translate-x-0.5 transition flex items-center gap-1">
                    <span>+ Add</span>
                  </span>
                </button>
                <button type="button" onclick="(window.brambleCart||window.zymaCart).addItem('wild-blackberry-bramble', 'fourPack', 1)" 
                  class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-purple-400/60 bg-white/70 dark:bg-stone-900/60 flex items-center justify-between text-left transition group">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="w-2 h-2 rounded-full bg-purple-500"></span>
                    <div class="truncate">
                      <p class="text-xs font-bold text-stone-800 dark:text-stone-200 m-0 truncate">Wild Blackberry Bramble</p>
                      <span class="text-[10px] text-stone-400">4-Pack Cans • $17.50</span>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-warm-orange group-hover:translate-x-0.5 transition flex items-center gap-1">
                    <span>+ Add</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        `;
      } else {
        itemsList.innerHTML = this.state.items.map((item, index) => `
          <div class="cart-item-card p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#1A2620] border border-stone-200/90 dark:border-stone-800 flex items-start gap-3 relative group">
            <!-- Product Thumbnail -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-b from-[#F4A261]/10 to-transparent dark:bg-stone-900/60 p-1.5 flex-shrink-0 flex items-center justify-center border border-stone-200/60 dark:border-stone-800">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain filter drop-shadow">
            </div>

            <!-- Item Details & Controls -->
            <div class="flex-1 min-w-0 flex flex-col justify-between self-stretch">
              <div>
                <div class="flex items-start justify-between gap-1">
                  <h4 class="font-heading font-bold text-xs sm:text-sm text-stone-900 dark:text-[#FFF8ED] leading-snug truncate m-0">
                    ${item.name}
                  </h4>
                  <button type="button" onclick="(window.brambleCart||window.zymaCart).removeItem(${index})" 
                    aria-label="Remove ${item.name}"
                    class="w-7 h-7 -mt-1 -mr-1 rounded-lg flex items-center justify-center text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition">
                    <i class="fa-regular fa-trash-can text-xs"></i>
                  </button>
                </div>
                
                <div class="flex flex-wrap items-center gap-1.5 mt-1">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#234E3D]/10 dark:bg-[#234E3D]/30 text-[#234E3D] dark:text-emerald-400">
                    ${item.packLabel}
                  </span>
                  <span class="text-[10px] text-stone-400">
                    $${item.unitPrice.toFixed(2)}/unit
                  </span>
                </div>
              </div>

              <!-- Price & Quantity Bar -->
              <div class="flex items-center justify-between mt-3 pt-2 border-t border-stone-100 dark:border-stone-800/80">
                <!-- Stepper -->
                <div class="inline-flex items-center border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden bg-stone-50 dark:bg-stone-900 shadow-inner">
                  <button type="button" onclick="(window.brambleCart||window.zymaCart).updateQuantity(${index}, -1)" 
                    aria-label="Decrease quantity"
                    class="cart-qty-btn text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800">
                    <i class="fa-solid fa-minus text-[10px]"></i>
                  </button>
                  <span class="w-8 text-center text-xs font-bold text-stone-800 dark:text-stone-100">
                    ${item.quantity}
                  </span>
                  <button type="button" onclick="(window.brambleCart||window.zymaCart).updateQuantity(${index}, 1)" 
                    aria-label="Increase quantity"
                    class="cart-qty-btn text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800">
                    <i class="fa-solid fa-plus text-[10px]"></i>
                  </button>
                </div>

                <!-- Line Total -->
                <div class="text-right">
                  <span class="font-heading font-bold text-sm sm:text-base text-stone-900 dark:text-[#FFF8ED]">
                    $${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  triggerBadgeBounce() {
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(b => {
      b.classList.remove('badge-bounce');
      // trigger reflow
      void b.offsetWidth;
      b.classList.add('badge-bounce');
    });
  }

  showToast(message, type = 'info') {
    let container = document.getElementById('zymaToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'zymaToastContainer';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold text-white transition-all duration-300 transform translate-y-3 opacity-0 ${
      type === 'success' ? 'bg-slate-900 border border-emerald-500/40 text-emerald-400' :
      type === 'warning' ? 'bg-slate-900 border border-amber-500/40 text-amber-400' :
      'bg-slate-900 border border-slate-700 text-slate-200'
    }`;
    
    let icon = type === 'success' ? '<i class="fa-solid fa-circle-check text-emerald-400"></i>' :
               type === 'warning' ? '<i class="fa-solid fa-triangle-exclamation text-amber-400"></i>' :
               '<i class="fa-solid fa-info-circle text-sky-400"></i>';

    toast.innerHTML = `
      ${icon}
      <span>${message}</span>
      <button class="ms-2 text-slate-400 hover:text-white" onclick="this.parentElement.remove()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('translate-y-3', 'opacity-0');
      setTimeout(() => toast.remove(), 350);
    }, 3500);
  }

  initCheckoutValidation() {
    const nameInput = document.getElementById('chkName');
    const phoneInput = document.getElementById('chkPhone');
    const cityInput = document.getElementById('chkCity');
    const zipInput = document.getElementById('chkZip');

    // Keystroke filtering
    [nameInput, cityInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => {
          inp.value = inp.value.replace(/[0-9]/g, '');
        });
      }
    });

    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/[^0-9+\-()\s]/g, '');
      });
    }

    if (zipInput) {
      zipInput.addEventListener('input', () => {
        zipInput.value = zipInput.value.replace(/[^0-9]/g, '');
      });
    }

    const fields = [
      { id: 'chkName', errId: 'chkNameError', validate: v => /^[A-Za-z\s.'-]{2,}$/.test(v) && !/\d/.test(v) },
      { id: 'chkPhone', errId: 'chkPhoneError', validate: v => v.replace(/\D/g, '').length >= 10 && !/[a-zA-Z]/.test(v) },
      { id: 'chkEmail', errId: 'chkEmailError', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) },
      { id: 'chkAddress', errId: 'chkAddressError', validate: v => v.length >= 5 },
      { id: 'chkCity', errId: 'chkCityError', validate: v => /^[A-Za-z\s.'-]{2,}$/.test(v) && !/\d/.test(v) },
      { id: 'chkZip', errId: 'chkZipError', validate: v => /^\d{5}$/.test(v) }
    ];

    fields.forEach(({ id, errId, validate }) => {
      const input = document.getElementById(id);
      const errEl = document.getElementById(errId);
      if (!input || input.dataset.validated) return;
      input.dataset.validated = 'true';

      input.addEventListener('input', () => {
        if (input.value.trim() === '') {
          input.classList.remove('form-input-valid', 'form-input-error');
          if (errEl) errEl.classList.add('hidden');
        } else if (validate(input.value.trim())) {
          input.classList.remove('form-input-error');
          input.classList.add('form-input-valid');
          if (errEl) errEl.classList.add('hidden');
        } else {
          input.classList.add('form-input-error');
          input.classList.remove('form-input-valid');
          if (errEl) errEl.classList.remove('hidden');
        }
      });

      input.addEventListener('blur', () => {
        if (!validate(input.value.trim())) {
          input.classList.remove('form-input-valid');
          input.classList.add('form-input-error');
          if (errEl) errEl.classList.remove('hidden');
        } else {
          input.classList.remove('form-input-error');
          input.classList.add('form-input-valid');
          if (errEl) errEl.classList.add('hidden');
        }
      });
    });
  }

  openCheckoutModal() {
    const modalEl = document.getElementById('checkoutModal');
    if (!modalEl || typeof bootstrap === 'undefined') return;

    // Reset views
    document.getElementById('checkoutFormStep').classList.remove('hidden');
    document.getElementById('checkoutLoadingStep').classList.add('hidden');
    document.getElementById('checkoutSuccessStep').classList.add('hidden');

    // Reset validation states
    ['chkName', 'chkPhone', 'chkEmail', 'chkAddress', 'chkCity', 'chkZip'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('form-input-error', 'form-input-valid');
    });
    ['chkNameError', 'chkPhoneError', 'chkEmailError', 'chkAddressError', 'chkCityError', 'chkZipError'].forEach(errId => {
      const err = document.getElementById(errId);
      if (err) err.classList.add('hidden');
    });

    this.initCheckoutValidation();

    const modalFinalTotal = document.getElementById('modalFinalTotal');
    if (modalFinalTotal) {
      modalFinalTotal.textContent = `$${this.getTotal().toFixed(2)}`;
    }

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  processCheckoutSimulation() {
    const nameInput = document.getElementById('chkName');
    const phoneInput = document.getElementById('chkPhone');
    const emailInput = document.getElementById('chkEmail');
    const addressInput = document.getElementById('chkAddress');
    const cityInput = document.getElementById('chkCity');
    const zipInput = document.getElementById('chkZip');

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const addressVal = addressInput ? addressInput.value.trim() : '';
    const cityVal = cityInput ? cityInput.value.trim() : '';
    const zipVal = zipInput ? zipInput.value.trim() : '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    let isValid = true;
    let firstInvalid = null;

    const checkField = (input, errId, validCondition) => {
      const errEl = document.getElementById(errId);
      if (!input) return;
      if (!validCondition) {
        isValid = false;
        input.classList.remove('form-input-valid');
        input.classList.add('form-input-error');
        if (errEl) errEl.classList.remove('hidden');
        if (!firstInvalid) firstInvalid = input;
      } else {
        input.classList.remove('form-input-error');
        input.classList.add('form-input-valid');
        if (errEl) errEl.classList.add('hidden');
      }
    };

    checkField(nameInput, 'chkNameError', /^[A-Za-z\s.'-]{2,}$/.test(nameVal) && !/\d/.test(nameVal));
    checkField(phoneInput, 'chkPhoneError', phoneVal.replace(/\D/g, '').length >= 10 && !/[a-zA-Z]/.test(phoneVal));
    checkField(emailInput, 'chkEmailError', emailRegex.test(emailVal));
    checkField(addressInput, 'chkAddressError', addressVal.length >= 5);
    checkField(cityInput, 'chkCityError', /^[A-Za-z\s.'-]{2,}$/.test(cityVal) && !/\d/.test(cityVal));
    checkField(zipInput, 'chkZipError', /^\d{5}$/.test(zipVal));

    if (!isValid) {
      this.showToast('Please correct highlighted delivery details to proceed.', 'warning');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const total = this.getTotal();

    // Show loading
    document.getElementById('checkoutFormStep').classList.add('hidden');
    document.getElementById('checkoutLoadingStep').classList.remove('hidden');

    setTimeout(() => {
      // Hide loading, show success
      document.getElementById('checkoutLoadingStep').classList.add('hidden');
      document.getElementById('checkoutSuccessStep').classList.remove('hidden');

      // Random order number
      const orderNum = `#ZYMA-${Math.floor(10000 + Math.random() * 90000)}`;
      document.getElementById('generatedOrderNumber').textContent = orderNum;
      document.getElementById('successCustomerName').textContent = nameVal;
      document.getElementById('successAddress').textContent = `${addressVal}, ${cityVal} ${zipVal}`;
      document.getElementById('successPaidTotal').textContent = `$${total.toFixed(2)}`;

      // Clear cart
      this.state.items = [];
      this.state.promoCode = null;
      this.saveState();
      this.render();
    }, 1600);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.brambleCart = new CartEngine();
  window.zymaCart = window.brambleCart; // Compatibility alias
});

// Global helper for interactive, animated Add to Cart buttons on product cards
window.handleCardAddToCart = function(btn, productId, packType = 'fourPack', quantity = 1) {
  const cart = window.brambleCart || window.zymaCart;
  if (!cart) {
    console.warn('CartEngine instance not ready.');
    return;
  }

  // 1. Add item to cart state and trigger drawer updates & toast
  cart.addItem(productId, packType, quantity);

  // 2. Responsive visual confirmation on the button itself
  if (btn) {
    const originalContent = btn.innerHTML;
    btn.disabled = true;
    btn.classList.add('btn-added-success');
    btn.innerHTML = '<i class="fa-solid fa-check text-xs"></i> <span>Added!</span>';

    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.classList.remove('btn-added-success');
      btn.disabled = false;
    }, 1100);
  }
};

