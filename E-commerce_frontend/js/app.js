const API_BASE = window.location.origin;
const CART_KEY = 'km_cart';
const BUY_NOW_KEY = 'km_buy_now';
const USER_KEY = 'km_user';
const ORDERS_KEY = 'km_orders';
const ADMIN_TOKEN_KEY = 'km_admin_token';
const ADMIN_EMAIL_KEY = 'km_admin_email';
const LANGUAGE_KEY = 'km_language';
const REGISTRATION_PROMPT_KEY = 'km_registration_prompt_shown';

const KN_TRANSLATIONS = {
  Home: 'ಮುಖಪುಟ',
  Orders: 'ಆರ್ಡರ್‌ಗಳು',
  Login: 'ಲಾಗಿನ್',
  Admin: 'ನಿರ್ವಾಹಕ',
  Profile: 'ಪ್ರೊಫೈಲ್',
  Menu: 'ಮೆನು',
  'My profile': 'ನನ್ನ ಪ್ರೊಫೈಲ್',
  Contact: 'ಸಂಪರ್ಕಿಸಿ',
  FAQs: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು',
  'Contact us': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
  'For help with shopping or orders, call our store:': 'ಖರೀದಿ ಅಥವಾ ಆರ್ಡರ್‌ಗಳ ಸಹಾಯಕ್ಕಾಗಿ ನಮ್ಮ ಅಂಗಡಿಗೆ ಕರೆಮಾಡಿ:',
  '91+ 0000000000': '91+ 0000000000',
  'Frequently asked questions': 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
  'How do I place an order?': 'ನಾನು ಆರ್ಡರ್ ಹೇಗೆ ಮಾಡುವುದು?',
  'Add items to your cart, then continue to checkout and submit your delivery details.': 'ವಸ್ತುಗಳನ್ನು ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ, ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿದು ವಿತರಣಾ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ.',
  'What payment methods are available?': 'ಯಾವ ಪಾವತಿ ವಿಧಾನಗಳು ಲಭ್ಯವಿವೆ?',
  'Choose Cash on Delivery or UPI at checkout.': 'ಚೆಕ್‌ಔಟ್‌ನಲ್ಲಿ ವಿತರಣೆ ವೇಳೆ ನಗದು ಅಥವಾ UPI ಆಯ್ಕೆಮಾಡಿ.',
  'Can I cancel an order?': 'ನಾನು ಆರ್ಡರ್ ರದ್ದುಮಾಡಬಹುದೇ?',
  'You can cancel a confirmed order from Orders within two minutes after placing it.': 'ಆರ್ಡರ್ ಮಾಡಿದ ಎರಡು ನಿಮಿಷಗಳೊಳಗೆ ಆರ್ಡರ್‌ಗಳ ಪುಟದಿಂದ ದೃಢೀಕರಿಸಿದ ಆರ್ಡರ್ ರದ್ದುಮಾಡಬಹುದು.',
  'How much is delivery?': 'ವಿತರಣಾ ಶುಲ್ಕ ಎಷ್ಟು?',
  'Delivery is free for orders above ₹99; otherwise the fee is ₹25.': '₹99 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಆರ್ಡರ್‌ಗಳಿಗೆ ಉಚಿತ ವಿತರಣೆ; ಇಲ್ಲದಿದ್ದರೆ ಶುಲ್ಕ ₹25.',
  'Fresh groceries at your doorstep': 'ತಾಜಾ ದಿನಸಿ ನಿಮ್ಮ ಮನೆಬಾಗಿಲಿಗೆ',
  'Everything your kitchen needs, delivered fast.': 'ನಿಮ್ಮ ಅಡುಗೆಮನೆಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ, ವೇಗವಾಗಿ ಮನೆಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ.',
  'Shop staples, dairy, fruits, snacks and household essentials with same-day delivery in your city.': 'ದಿನಸಿ, ಹಾಲಿನ ಉತ್ಪನ್ನಗಳು, ಹಣ್ಣುಗಳು, ತಿಂಡಿಗಳು ಮತ್ತು ಗೃಹೋಪಯೋಗಿ ವಸ್ತುಗಳನ್ನು ಅದೇ ದಿನದ ವಿತರಣೆಯೊಂದಿಗೆ ಖರೀದಿಸಿ.',
  'Go to cart': 'ಕಾರ್ಟ್‌ಗೆ ಹೋಗಿ',
  'View orders': 'ಆರ್ಡರ್‌ಗಳನ್ನು ನೋಡಿ',
  'Why shop with us?': 'ನಮ್ಮಲ್ಲಿ ಏಕೆ ಖರೀದಿಸಬೇಕು?',
  'Fresh Picks': 'ತಾಜಾ ಆಯ್ಕೆಗಳು',
  Cart: 'ಕಾರ್ಟ್',
  Delivery: 'ವಿತರಣೆ',
  Offers: 'ಆಫರ್‌ಗಳು',
  Saved: 'ಉಳಿತಾಯ',
  '30 min': '30 ನಿಮಿಷ',
  'Up to 30%': '30% ವರೆಗೆ',
  'Search products': 'ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ',
  'Search vegetables, dairy, atta...': 'ತರಕಾರಿಗಳು, ಹಾಲಿನ ಉತ್ಪನ್ನಗಳು, ಹಿಟ್ಟು ಹುಡುಕಿ...',
  'Add to cart': 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
  'Buy now': 'ಈಗಲೇ ಖರೀದಿಸಿ',
  'Your cart': 'ನಿಮ್ಮ ಕಾರ್ಟ್',
  'Continue shopping': 'ಖರೀದಿ ಮುಂದುವರಿಸಿ',
  'Proceed to checkout': 'ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ',
  'Your cart is empty.': 'ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ.',
  Subtotal: 'ಉಪಮೊತ್ತ',
  Total: 'ಒಟ್ಟು',
  'Delivery fee': 'ವಿತರಣಾ ಶುಲ್ಕ',
  'Free delivery on orders above ₹99; otherwise ₹25.': '₹99 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಆರ್ಡರ್‌ಗಳಿಗೆ ಉಚಿತ ವಿತರಣೆ; ಇಲ್ಲದಿದ್ದರೆ ₹25.',
  Checkout: 'ಚೆಕ್‌ಔಟ್',
  'Delivery address': 'ವಿತರಣಾ ವಿಳಾಸ',
  'Use my current location': 'ನನ್ನ ಪ್ರಸ್ತುತ ಸ್ಥಳ ಬಳಸಿ',
  'Payment method': 'ಪಾವತಿ ವಿಧಾನ',
  'Place order': 'ಆರ್ಡರ್ ಮಾಡಿ',
  'Cash on delivery': 'ವಿತರಣೆ ವೇಳೆ ನಗದು',
  'Order placed successfully': 'ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ಮಾಡಲಾಗಿದೆ',
  'Order history': 'ಆರ್ಡರ್ ಇತಿಹಾಸ',
  'No orders yet.': 'ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ.',
  'Order details': 'ಆರ್ಡರ್ ವಿವರಗಳು',
  Cancel: 'ರದ್ದುಮಾಡಿ',
  'Cancel order': 'ಆರ್ಡರ್ ರದ್ದುಮಾಡಿ',
  'My profile': 'ನನ್ನ ಪ್ರೊಫೈಲ್',
  Name: 'ಹೆಸರು',
  Email: 'ಇಮೇಲ್',
  Phone: 'ಫೋನ್',
  Address: 'ವಿಳಾಸ',
  Logout: 'ಲಾಗ್‌ಔಟ್',
  'Login successful': 'ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ',
  'Registration successful': 'ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ',
  'Create account': 'ಖಾತೆ ರಚಿಸಿ',
  'Customer benefits': 'ಗ್ರಾಹಕರ ಪ್ರಯೋಜನಗಳು',
  'Full name': 'ಪೂರ್ಣ ಹೆಸರು',
  Password: 'ಪಾಸ್‌ವರ್ಡ್',
  Register: 'ನೋಂದಣಿ ಮಾಡಿ',
  'Need an account? Register': 'ಖಾತೆ ಬೇಕೇ? ನೋಂದಣಿ ಮಾಡಿ',
  'Already have an account?': 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
  'Already a member? Login': 'ಈಗಾಗಲೇ ಸದಸ್ಯರೇ? ಲಾಗಿನ್ ಮಾಡಿ',
  'Sign in to continue shopping.': 'ಖರೀದಿ ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ.',
  'Track all orders in one place': 'ಎಲ್ಲಾ ಆರ್ಡರ್‌ಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಗಮನಿಸಿ',
  'Save delivery addresses': 'ವಿತರಣಾ ವಿಳಾಸಗಳನ್ನು ಉಳಿಸಿ',
  'Early access to offers and discounts': 'ಆಫರ್‌ಗಳು ಮತ್ತು ರಿಯಾಯಿತಿಗಳಿಗೆ ಮುಂಚಿತ ಪ್ರವೇಶ',
  'Fast checkout for repeated shopping': 'ಮರುಖರೀದಿಗೆ ವೇಗದ ಚೆಕ್‌ಔಟ್',
  'Preferred language': 'ಆದ್ಯತೆಯ ಭಾಷೆ',
  English: 'ಇಂಗ್ಲಿಷ್',
  'Continue with Google': 'Google ಮೂಲಕ ಮುಂದುವರಿಯಿರಿ',
  'Sign in with Google': 'Google ಮೂಲಕ ಸೈನ್ ಇನ್ ಮಾಡಿ',
  'Google sign-in is not configured yet. Set GOOGLE_CLIENT_ID on the server.': 'Google ಸೈನ್-ಇನ್ ಇನ್ನೂ ಹೊಂದಿಸಲಾಗಿಲ್ಲ. ಸರ್ವರ್‌ನಲ್ಲಿ GOOGLE_CLIENT_ID ಹೊಂದಿಸಿ.',
  'Create your account': 'ನಿಮ್ಮ ಖಾತೆ ರಚಿಸಿ',
  'Register for a Kamagere Mart account': 'ಕಾಮಗೆರೆ ಮಾರ್ಟ್ ಖಾತೆಗೆ ನೋಂದಣಿ ಮಾಡಿ',
  'Close': 'ಮುಚ್ಚಿ',
  'Fresh essentials delivered': 'ತಾಜಾ ಅಗತ್ಯ ವಸ್ತುಗಳು ಮನೆಗೆ',
  'All': 'ಎಲ್ಲಾ',
  'Vegetables': 'ತರಕಾರಿಗಳು',
  'Fruits': 'ಹಣ್ಣುಗಳು',
  'Dairy': 'ಹಾಲಿನ ಉತ್ಪನ್ನಗಳು',
  'Atta & Rice': 'ಹಿಟ್ಟು ಮತ್ತು ಅಕ್ಕಿ',
  Staples: 'ದೈನಂದಿನ ಅಗತ್ಯ ವಸ್ತುಗಳು',
  'Cooking Oil': 'ಅಡುಗೆ ಎಣ್ಣೆ',
  'Groceries': 'ದಿನಸಿ',
  'Snacks': 'ತಿಂಡಿಗಳು',
  'Household': 'ಮನೆಯ ಬಳಕೆಯ ವಸ್ತುಗಳು',
  'Loading...': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
  'Something went wrong. Please try again.': 'ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  'Buy Now': 'ಈಗಲೇ ಖರೀದಿಸಿ',
  'Add to Cart': 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
  'No products match your search. Try a different keyword or category.': 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಹೊಂದಿಕೆಯಾಗಿಲ್ಲ. ಬೇರೆ ಪದ ಅಥವಾ ವರ್ಗವನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
  'Your cart is empty': 'ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ',
  'Browse groceries and add items to start your order.': 'ದಿನಸಿ ವಸ್ತುಗಳನ್ನು ನೋಡಿ ಮತ್ತು ಆರ್ಡರ್ ಆರಂಭಿಸಲು ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ.',
  'Shopping cart': 'ಖರೀದಿ ಕಾರ್ಟ್',
  Remove: 'ತೆಗೆದುಹಾಕಿ',
  'No items to checkout': 'ಚೆಕ್‌ಔಟ್ ಮಾಡಲು ಯಾವುದೇ ವಸ್ತುಗಳಿಲ್ಲ',
  'Add products': 'ಉತ್ಪನ್ನಗಳನ್ನು ಸೇರಿಸಿ',
  'Delivery details': 'ವಿತರಣೆಯ ವಿವರಗಳು',
  'Allow location access to show your delivery point on Google Maps.': 'Google Maps‌ನಲ್ಲಿ ನಿಮ್ಮ ವಿತರಣಾ ಸ್ಥಳವನ್ನು ತೋರಿಸಲು ಸ್ಥಳ ಅನುಮತಿ ನೀಡಿ.',
  'Open in Google Maps': 'Google Maps‌ನಲ್ಲಿ ತೆರೆಯಿರಿ',
  'Order source': 'ಆರ್ಡರ್ ಮೂಲ',
  'Order summary': 'ಆರ್ಡರ್ ಸಾರಾಂಶ',
  'Cash on Delivery': 'ವಿತರಣೆ ವೇಳೆ ನಗದು',
  'No orders yet': 'ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ',
  'Place your first order and it will appear here.': 'ನಿಮ್ಮ ಮೊದಲ ಆರ್ಡರ್ ಮಾಡಿ; ಅದು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.',
  'Start shopping': 'ಖರೀದಿ ಪ್ರಾರಂಭಿಸಿ',
  'Could not load admin dashboard': 'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ',
  'No orders have been placed yet.': 'ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳನ್ನು ಮಾಡಿಲ್ಲ.',
  'Sign in': 'ಸೈನ್ ಇನ್',
  'Back to store': 'ಅಂಗಡಿಗೆ ಹಿಂತಿರುಗಿ',
  'Store management': 'ಅಂಗಡಿ ನಿರ್ವಹಣೆ',
  'Admin dashboard': 'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  'Sign out': 'ಸೈನ್ ಔಟ್',
  'Total orders': 'ಒಟ್ಟು ಆರ್ಡರ್‌ಗಳು',
  'Order value': 'ಆರ್ಡರ್ ಮೌಲ್ಯ',
  Products: 'ಉತ್ಪನ್ನಗಳು',
  'Add a product': 'ಉತ್ಪನ್ನ ಸೇರಿಸಿ',
  'New products are saved to the store database and appear in the storefront catalog.': 'ಹೊಸ ಉತ್ಪನ್ನಗಳನ್ನು ಅಂಗಡಿ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಉಳಿಸಿ, ಅಂಗಡಿ ಪಟ್ಟಿಯಲ್ಲಿ ತೋರಿಸಲಾಗುತ್ತದೆ.',
  'Product name': 'ಉತ್ಪನ್ನದ ಹೆಸರು',
  Category: 'ವರ್ಗ',
  'Pack size / unit': 'ಪ್ಯಾಕ್ ಗಾತ್ರ / ಘಟಕ',
  'Selling price (₹)': 'ಮಾರಾಟದ ಬೆಲೆ (₹)',
  'MRP (₹)': 'ಗರಿಷ್ಠ ಚಿಲ್ಲರೆ ಬೆಲೆ (₹)',
  Description: 'ವಿವರಣೆ',
  'Image URL (optional, HTTPS)': 'ಚಿತ್ರದ URL (ಐಚ್ಛಿಕ, HTTPS)',
  'Take or choose a product photo': 'ಉತ್ಪನ್ನದ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಆಯ್ಕೆಮಾಡಿ',
  'On supported phones this opens the rear camera. Photos are resized before saving.': 'ಬೆಂಬಲಿತ ಫೋನ್‌ಗಳಲ್ಲಿ ಹಿಂಬದಿ ಕ್ಯಾಮೆರಾ ತೆರೆಯುತ್ತದೆ. ಉಳಿಸುವ ಮೊದಲು ಫೋಟೋ ಗಾತ್ರವನ್ನು ಬದಲಾಯಿಸಲಾಗುತ್ತದೆ.',
  'Add product': 'ಉತ್ಪನ್ನ ಸೇರಿಸಿ',
  'Cancel editing': 'ತಿದ್ದುಪಡಿ ರದ್ದುಮಾಡಿ',
  'Store products': 'ಅಂಗಡಿಯ ಉತ್ಪನ್ನಗಳು',
  Edit: 'ತಿದ್ದುಪಡಿ',
  'Recent orders': 'ಇತ್ತೀಚಿನ ಆರ್ಡರ್‌ಗಳು',
  Order: 'ಆರ್ಡರ್',
  Date: 'ದಿನಾಂಕ',
  Items: 'ವಸ್ತುಗಳು',
  Payment: 'ಪಾವತಿ',
  Status: 'ಸ್ಥಿತಿ',
  'Not provided': 'ನೀಡಿಲ್ಲ',
  'You are not logged in': 'ನೀವು ಲಾಗಿನ್ ಆಗಿಲ್ಲ',
  'Sign in to access your account and order history.': 'ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಆರ್ಡರ್ ಇತಿಹಾಸ ನೋಡಲು ಸೈನ್ ಇನ್ ಮಾಡಿ.',
  'Order cancelled successfully': 'ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ರದ್ದಾಗಿದೆ',
  'Cancellation window expired': 'ರದ್ದತಿ ಅವಧಿ ಮುಗಿದಿದೆ',
  'Current location selected. Add your house, street, or landmark details above if needed.': 'ಪ್ರಸ್ತುತ ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ. ಬೇಕಾದರೆ ಮನೆ, ರಸ್ತೆ ಅಥವಾ ಗುರುತಿನ ಸ್ಥಳದ ವಿವರ ಸೇರಿಸಿ.',
  'House/flat, street, landmark, city...': 'ಮನೆ/ಫ್ಲಾಟ್, ರಸ್ತೆ, ಗುರುತಿನ ಸ್ಥಳ, ನಗರ...',
  'Unable to update cart.': 'ಕಾರ್ಟ್ ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
  'Unable to load your orders.': 'ನಿಮ್ಮ ಆರ್ಡರ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
  'Your admin session expired. Please sign in again.': 'ನಿರ್ವಾಹಕ ಸೆಷನ್ ಮುಗಿದಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಸೈನ್ ಇನ್ ಮಾಡಿ.',
  'Could not load orders.': 'ಆರ್ಡರ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
  'Could not load products.': 'ಉತ್ಪನ್ನಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
  'Unable to cancel order.': 'ಆರ್ಡರ್ ರದ್ದುಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
  'Cancellation details are not available for this order': 'ಈ ಆರ್ಡರ್‌ಗೆ ರದ್ದತಿ ವಿವರಗಳು ಲಭ್ಯವಿಲ್ಲ',
  'Unable to connect to the backend API.': 'ಬ್ಯಾಕೆಂಡ್ APIಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
  'Password must be at least 8 characters and contain uppercase, lowercase, number, and special symbol.': 'ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 8 ಅಕ್ಷರಗಳಿರಬೇಕು ಮತ್ತು ದೊಡ್ಡ ಅಕ್ಷರ, ಸಣ್ಣ ಅಕ್ಷರ, ಸಂಖ್ಯೆ ಹಾಗೂ ವಿಶೇಷ ಚಿಹ್ನೆ ಇರಬೇಕು.',
  'Admin login successful': 'ನಿರ್ವಾಹಕ ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ',
  'Invalid email or password.': 'ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ.',
  'Email and password are required.': 'ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಅಗತ್ಯವಿದೆ.',
  'Please fill all required fields': 'ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ತುಂಬಿ',
  'Please enter a valid email address.': 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ.',
  'Please enter a valid 10-digit Indian mobile number.': 'ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಭಾರತೀಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',
  'User already exists': 'ಈ ಬಳಕೆದಾರರು ಈಗಾಗಲೇ ಇದ್ದಾರೆ',
  'Login failed': 'ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ',
  'Registration failed': 'ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ',
  'Google sign-in could not be loaded.': 'Google ಸೈನ್-ಇನ್ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
  'Google sign-in failed.': 'Google ಸೈನ್-ಇನ್ ವಿಫಲವಾಗಿದೆ.',
  'Please try again.': 'ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  'Product photo preview': 'ಉತ್ಪನ್ನದ ಫೋಟೋ ಪೂರ್ವವೀಕ್ಷಣೆ',
  'Email is already registered.': 'ಈ ಇಮೇಲ್ ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲಾಗಿದೆ.',
  'Phone number is already registered.': 'ಈ ಫೋನ್ ಸಂಖ್ಯೆ ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲಾಗಿದೆ.',
  'Item': 'ವಸ್ತು',
  'Confirmed': 'ದೃಢೀಕರಿಸಲಾಗಿದೆ',
  'Cancelled': 'ರದ್ದಾಗಿದೆ',
  UPI: 'ಯುಪಿಐ',
  COD: 'ವಿತರಣೆ ವೇಳೆ ನಗದು',
  or: 'ಅಥವಾ'
};
const EN_TRANSLATIONS = Object.fromEntries(
  Object.entries(KN_TRANSLATIONS).map(([english, kannada]) => [kannada, english])
);

let googleSignInSetupPromise = null;
let googleClientId = '';
let googleInitialized = false;

const state = {
  products: [],
  selectedCategory: 'All',
  searchTerm: '',
  cart: loadCart(),
  user: loadUser(),
  orders: loadOrders(),
  route: null,
  checkoutMode: 'cart',
  ordersRefreshTimer: null
};

window.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const localeObserver = new MutationObserver(() => applyPreferredLanguage());
  localeObserver.observe(app, { childList: true, subtree: true, characterData: true });
  renderShell();
  attachEvents();
  setRoute(getInitialRoute());
  loadProducts();
  applyPreferredLanguage();
  scheduleRegistrationPopup();
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
        <div class="topbar-actions">
          <div class="account-menu" id="account-menu"></div>
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
  updateAccountMenu();
  updateCartBadge();
}

function updateAccountMenu() {
  const menu = document.getElementById('account-menu');
  if (!menu) return;

  const isSignedIn = Boolean(state.user || sessionStorage.getItem(ADMIN_TOKEN_KEY));
  const links = isSignedIn
    ? [
        ...(state.user ? [['My profile', 'profile']] : []),
        ['Home', 'home'],
        ['Orders', 'orders'],
        ['Contact', 'contact'],
        ['FAQs', 'faqs']
      ]
    : [['Sign in', 'auth']];

  menu.innerHTML = `
    <button class="account-menu-toggle" type="button" data-action="toggle-account-menu" aria-expanded="false" aria-controls="account-menu-list">
      <span class="account-menu-icon" aria-hidden="true">☰</span>
      <span>Menu</span>
    </button>
    <nav class="account-menu-list" id="account-menu-list" aria-label="Account menu" hidden>
      ${links.map(([label, route]) => `
        <a class="account-menu-link" href="#${route}" data-route="${route}">${label}</a>
      `).join('')}
    </nav>
  `;
}

function closeAccountMenu() {
  const menu = document.getElementById('account-menu');
  const toggle = menu?.querySelector('.account-menu-toggle');
  const list = menu?.querySelector('.account-menu-list');
  if (toggle && list) {
    toggle.setAttribute('aria-expanded', 'false');
    list.hidden = true;
  }
}

function attachEvents() {
  const app = document.getElementById('app');

  app.addEventListener('click', (event) => {
    if (event.target.classList?.contains('registration-modal-backdrop')) {
      closeRegistrationPopup();
      return;
    }

    const accountMenuToggle = event.target.closest('[data-action="toggle-account-menu"]');
    if (accountMenuToggle) {
      const list = document.getElementById('account-menu-list');
      const isOpen = accountMenuToggle.getAttribute('aria-expanded') === 'true';
      accountMenuToggle.setAttribute('aria-expanded', String(!isOpen));
      if (list) list.hidden = isOpen;
      return;
    }

    const routeButton = event.target.closest('[data-route]');
    if (routeButton) {
      if (routeButton instanceof HTMLAnchorElement) event.preventDefault();
      const route = routeButton.getAttribute('data-route');
      if (route) {
        closeAccountMenu();
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
        closeRegistrationPopup();
        setRoute('auth');
      }
      if (action === 'load-register') {
        setRoute('auth', { panel: 'register' });
      }
      if (action === 'close-registration-popup') {
        closeRegistrationPopup();
      }
      if (action === 'google-not-configured') {
        showToast(KN_TRANSLATIONS['Google sign-in is not configured yet. Set GOOGLE_CLIENT_ID on the server.']);
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
      if (action === 'cancel-order') {
        cancelOrder(actionButton.getAttribute('data-order-id'));
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
    if (input instanceof HTMLSelectElement && input.classList.contains('preferred-language')) {
      localStorage.setItem(LANGUAGE_KEY, input.value);
      applyPreferredLanguage();
      app.querySelectorAll('.google-signin-slot').forEach((slot) => {
        slot.replaceChildren();
        delete slot.dataset.rendered;
      });
      setupGoogleSignIn();
    }
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
    if (route !== state.route) setRoute(route);
  });

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('#account-menu')) {
      closeAccountMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAccountMenu();
  });
}

function setRoute(route, options = {}) {
  const target = route || 'home';
  if (target === 'admin' && !sessionStorage.getItem(ADMIN_TOKEN_KEY)) {
    setRoute('auth');
    return;
  }
  state.route = target;
  if (target !== 'orders' && state.ordersRefreshTimer) {
    clearInterval(state.ordersRefreshTimer);
    state.ordersRefreshTimer = null;
  }
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
    case 'contact':
      renderContact();
      break;
    case 'faqs':
      renderFaqs();
      break;
    case 'admin':
      renderAdminDashboard();
      break;
    default:
      renderHome();
  }
  applyPreferredLanguage();
}

function renderContact() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;
  pageContent.innerHTML = `
    <section class="card contact-card">
      <h1>Contact us</h1>
      <p>For help with shopping or orders, call our store:</p>
      <a class="primary-btn contact-phone" href="tel:+9100000000">91+ 0000000000</a>
    </section>
  `;
}

function renderFaqs() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;
  pageContent.innerHTML = `
    <section class="card faq-card">
      <h1>Frequently asked questions</h1>
      <details>
        <summary>How do I place an order?</summary>
        <p>Add items to your cart, then continue to checkout and submit your delivery details.</p>
      </details>
      <details>
        <summary>What payment methods are available?</summary>
        <p>Choose Cash on Delivery or UPI at checkout.</p>
      </details>
      <details>
        <summary>Can I cancel an order?</summary>
        <p>You can cancel a confirmed order from Orders within two minutes after placing it.</p>
      </details>
      <details>
        <summary>How much is delivery?</summary>
        <p>Delivery is free for orders above ₹99; otherwise the fee is ₹25.</p>
      </details>
    </section>
  `;
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
                ${renderProductCartControl(product)}
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

function renderProductCartControl(product) {
  const cartItem = state.cart.find((item) => Number(item.id) === Number(product.id));
  if (!cartItem || cartItem.quantity <= 0) {
    return `<button class="add-cart-btn" data-action="add-cart" data-product-id="${product.id}">Add to Cart</button>`;
  }

  const safeName = escapeHtml(product.name);
  return `
    <div class="product-quantity" aria-label="${safeName} quantity in cart">
      <button type="button" data-action="dec-qty" data-product-id="${product.id}" aria-label="Remove one ${safeName}">−</button>
      <span aria-live="polite">${cartItem.quantity}</span>
      <button type="button" data-action="inc-qty" data-product-id="${product.id}" aria-label="Add one ${safeName}">+</button>
    </div>
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

  pageContent.innerHTML = authMarkup(panel);
  applyPreferredLanguage();
  setupGoogleSignIn();
}

function authMarkup(panel = 'login', idPrefix = '') {
  const isLogin = panel === 'login';
  const fieldId = (id) => `${idPrefix}${id}`;
  return `
    ${!isLogin ? `
      <div class="auth-language">
        <label for="${fieldId('preferred-language')}">Preferred language</label>
        <select id="${fieldId('preferred-language')}" class="preferred-language" aria-label="Preferred language">
          <option value="en">English</option>
          <option value="kn">ಕನ್ನಡ</option>
        </select>
      </div>
    ` : ''}
    <div class="auth-grid">
      <div class="auth-panel">
        <h3>${isLogin ? 'Login' : 'Create account'}</h3>
        <form data-form-type="${isLogin ? 'login' : 'register'}">
          ${!isLogin ? `
            <div>
              <label for="${fieldId('name')}">Full name</label>
              <input id="${fieldId('name')}" name="name" required />
            </div>
          ` : ''}

          <div style="margin-top: 12px;">
            <label for="${fieldId('email')}">Email</label>
            <input id="${fieldId('email')}" name="email" type="email" required />
          </div>

          ${!isLogin ? `
            <div style="margin-top: 12px;">
              <label for="${fieldId('phone')}">Phone</label>
              <input id="${fieldId('phone')}" name="phone" type="tel" required />
            </div>
          ` : ''}

          <div style="margin-top: 12px;">
            <label for="${fieldId('password')}">Password</label>
            <input id="${fieldId('password')}" name="password" type="password" required />
          </div>

          <button type="submit" class="primary-btn" style="margin-top:16px; width:100%;">
            ${isLogin ? 'Login' : 'Register'}
          </button>
          <div class="auth-divider"><span>or</span></div>
          <div class="google-signin-slot" aria-label="Sign in with Google"></div>
          <button type="button" class="google-signin-fallback" data-action="google-not-configured" hidden>
            <span class="google-mark" aria-hidden="true">G</span>
            <span>Continue with Google</span>
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
      </div>
    </div>
  `;
}

function scheduleRegistrationPopup() {
  window.setTimeout(() => {
    if (
      state.user ||
      sessionStorage.getItem(ADMIN_TOKEN_KEY) ||
      sessionStorage.getItem(REGISTRATION_PROMPT_KEY)
    ) return;
    sessionStorage.setItem(REGISTRATION_PROMPT_KEY, '1');
    showRegistrationPopup();
  }, 10000);
}

function showRegistrationPopup() {
  if (document.getElementById('registration-modal') || state.user) return;
  const modal = document.createElement('div');
  modal.id = 'registration-modal';
  modal.className = 'registration-modal-backdrop';
  modal.innerHTML = `
    <section class="registration-modal" role="dialog" aria-modal="true" aria-labelledby="registration-modal-title">
      <button class="modal-close" type="button" data-action="close-registration-popup" aria-label="Close">×</button>
      <h2 id="registration-modal-title">Create your account</h2>
      <p>Register for a Kamagere Mart account</p>
      ${authMarkup('register', 'popup-')}
    </section>
  `;
  document.getElementById('app')?.appendChild(modal);
  applyPreferredLanguage();
  setupGoogleSignIn();
  modal.querySelector('input[name="name"]')?.focus();
}

function closeRegistrationPopup() {
  document.getElementById('registration-modal')?.remove();
}

function translateAppText(text, language) {
  if (language === 'en') {
    if (EN_TRANSLATIONS[text]) return EN_TRANSLATIONS[text];
    const order = text.match(/^ಆರ್ಡರ್ (.+)$/);
    if (order) return `Order ${order[1]}`;
    const discount = text.match(/^(\d+)% ರಿಯಾಯಿತಿ$/);
    if (discount) return `${discount[1]}% OFF`;
    const cancellation = text.match(/^ರದ್ದುಮಾಡಲು ಲಭ್ಯವಿರುವ ಸಮಯ (.+)$/);
    if (cancellation) return `Cancel available for ${cancellation[1]}`;
    const addItem = text.match(/^(.+) ಸೇರಿಸಿ$/);
    if (addItem) return `Add one ${addItem[1]}`;
    const removeItem = text.match(/^(.+) ತೆಗೆದುಹಾಕಿ$/);
    if (removeItem) return `Remove one ${removeItem[1]}`;
    return undefined;
  }
  if (KN_TRANSLATIONS[text]) return KN_TRANSLATIONS[text];

  const discount = text.match(/^(\d+)% OFF$/);
  if (discount) return `${discount[1]}% ರಿಯಾಯಿತಿ`;
  const order = text.match(/^Order (.+)$/);
  if (order) return `ಆರ್ಡರ್ ${order[1]}`;
  const cancellation = text.match(/^Cancel available for (.+)$/);
  if (cancellation) return `ರದ್ದುಮಾಡಲು ಲಭ್ಯವಿರುವ ಸಮಯ ${cancellation[1]}`;
  const addItem = text.match(/^Add one (.+)$/);
  if (addItem) return `${addItem[1]} ಸೇರಿಸಿ`;
  const removeItem = text.match(/^Remove one (.+)$/);
  if (removeItem) return `${removeItem[1]} ತೆಗೆದುಹಾಕಿ`;
  return undefined;
}

function applyPreferredLanguage() {
  const language = localStorage.getItem(LANGUAGE_KEY) === 'kn' ? 'kn' : 'en';
  document.documentElement.lang = language;
  document.title = language === 'kn'
    ? 'ಕಾಮಗೆರೆ ಮಾರ್ಟ್ — ತಾಜಾ ಅಗತ್ಯ ವಸ್ತುಗಳು ಮನೆಗೆ'
    : 'Kamagere Mart — Fresh essentials delivered';
  const app = document.getElementById('app');
  if (app) {
    const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const original = node.nodeValue.trim();
      if (!original) continue;
      const translated = translateAppText(original, language);
      if (translated) {
        const leading = node.nodeValue.match(/^\s*/)?.[0] || '';
        const trailing = node.nodeValue.match(/\s*$/)?.[0] || '';
        node.nodeValue = `${leading}${translated}${trailing}`;
      }
    }
    for (const element of app.querySelectorAll('[placeholder], [aria-label], [title], [alt]')) {
      for (const attribute of ['placeholder', 'aria-label', 'title', 'alt']) {
        const value = element.getAttribute(attribute);
        if (!value) continue;
        const translated = translateAppText(value, language);
        if (translated) element.setAttribute(attribute, translated);
      }
    }
    for (const selector of app.querySelectorAll('.preferred-language')) selector.value = language;
  }
}

async function setupGoogleSignIn() {
  const slots = [...document.querySelectorAll('.google-signin-slot')];
  if (!slots.length) return;
  const fallbacks = [...document.querySelectorAll('.google-signin-fallback')];

  if (!googleSignInSetupPromise) {
    googleSignInSetupPromise = (async () => {
      const response = await fetch(`${API_BASE}/api/auth/google/config`);
      const config = await response.json();
      googleClientId = config.clientId || '';
      if (!googleClientId) return;

      if (!window.google?.accounts?.id) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://accounts.google.com/gsi/client';
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = () => reject(new Error('Google sign-in could not be loaded.'));
          document.head.appendChild(script);
        });
      }
      if (!googleInitialized) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredential
        });
        googleInitialized = true;
      }
    })().catch((error) => {
      console.error('Unable to initialize Google sign-in:', error);
      googleSignInSetupPromise = null;
      throw error;
    });
  }

  try {
    await googleSignInSetupPromise;
    if (!googleClientId) {
      fallbacks.forEach((button) => { button.hidden = false; });
      return;
    }
    slots.forEach((slot) => {
      if (!slot.isConnected || slot.dataset.rendered === 'true') return;
      window.google.accounts.id.renderButton(slot, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        locale: localStorage.getItem(LANGUAGE_KEY) === 'kn' ? 'kn' : 'en',
        width: Math.min(340, slot.parentElement?.clientWidth || 340)
      });
      slot.dataset.rendered = 'true';
    });
  } catch {
    fallbacks.forEach((button) => { button.hidden = false; });
    showToast('Google sign-in could not be loaded.');
  }
}

async function handleGoogleCredential(response) {
  try {
    const resultResponse = await fetch(`${API_BASE}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential })
    });
    const result = await resultResponse.json();
    if (!resultResponse.ok) throw new Error(result.message || 'Google sign-in failed.');
    state.user = result.user;
    saveUser(result.user);
    closeRegistrationPopup();
    showToast('Login successful');
    setRoute('profile');
  } catch (error) {
    showToast(error.message || 'Google sign-in failed.');
  }
}

async function renderAdminDashboard() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  pageContent.innerHTML = '<div class="card"><p>Loading admin dashboard…</p></div>';
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) {
    setRoute('auth');
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
      showToast('Your admin session expired. Please sign in again.');
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
  if (state.ordersRefreshTimer) {
    clearInterval(state.ordersRefreshTimer);
    state.ordersRefreshTimer = null;
  }
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
            <strong>Order ${escapeHtml(order.id || 'KM-000')}</strong>
            <span class="pill">${escapeHtml(order.status || 'Confirmed')}</span>
          </div>
          <div class="order-meta">
            ${escapeHtml(order.date || 'Today')} · ${escapeHtml(order.payment || 'COD')} · ₹${Number(order.total || 0).toLocaleString('en-IN')}
          </div>
          <div style="margin-top:12px;">
            ${order.items ? order.items.map((item) => `
              <div class="summary-line"><span>${escapeHtml(item.name || item.product?.name || 'Item')} × ${Number(item.quantity || 1)}</span><strong>₹${(Number(item.price || item.product?.price || 0) * Number(item.quantity || 1)).toLocaleString('en-IN')}</strong></div>
            `).join('') : ''}
          </div>
          ${order.status === 'Confirmed' && order.cancelToken && Number.isFinite(Number(order.createdAt)) ? `
            <div class="order-cancel-actions">
              <button class="outline-btn" type="button" data-action="cancel-order" data-order-id="${escapeHtml(order.id)}">Cancel order</button>
              <span class="cancel-window" data-cancel-countdown="${escapeHtml(order.id)}"></span>
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;

  updateOrderCancellationCountdowns();
  state.ordersRefreshTimer = setInterval(updateOrderCancellationCountdowns, 1000);
}

function updateOrderCancellationCountdowns() {
  const ordersById = new Map(state.orders.map((order) => [String(order.id), order]));
  document.querySelectorAll('[data-action="cancel-order"]').forEach((button) => {
    const order = ordersById.get(button.getAttribute('data-order-id'));
    const remainingMs = order ? 2 * 60 * 1000 - (Date.now() - Number(order.createdAt)) : 0;
    const canCancel = Boolean(order?.cancelToken) && order.status === 'Confirmed' && remainingMs > 0;
    button.hidden = !canCancel;
    const countdown = document.querySelector(`[data-cancel-countdown="${CSS.escape(button.getAttribute('data-order-id'))}"]`);
    if (countdown) {
      const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
      countdown.textContent = canCancel
        ? `Cancel available for ${Math.floor(remainingSeconds / 60)}:${String(remainingSeconds % 60).padStart(2, '0')}`
        : 'Cancellation window expired';
    }
  });
}

async function cancelOrder(orderId) {
  const order = state.orders.find((item) => String(item.id) === String(orderId));
  if (!order?.cancelToken) {
    showToast('Cancellation details are not available for this order');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/api/orders/${encodeURIComponent(order.id)}/cancel`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cancelToken: order.cancelToken })
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status === 410) {
        order.cancelToken = '';
        localStorage.setItem(ORDERS_KEY, JSON.stringify(state.orders));
        renderOrders();
      }
      throw new Error(result.message || 'Unable to cancel order.');
    }

    order.status = result.status || 'Cancelled';
    order.cancelToken = '';
    localStorage.setItem(ORDERS_KEY, JSON.stringify(state.orders));
    showToast('Order cancelled successfully');
    renderOrders();
  } catch (error) {
    showToast(error.message || 'Unable to cancel order.');
  }
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
      if (response.status === 401) {
        const adminResponse = await fetch(`${API_BASE}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const adminResult = await adminResponse.json();
        if (adminResponse.ok && adminResult.token && adminResult.admin?.role === 'admin') {
          sessionStorage.setItem(ADMIN_TOKEN_KEY, adminResult.token);
          sessionStorage.setItem(ADMIN_EMAIL_KEY, adminResult.admin.email);
          localStorage.removeItem(USER_KEY);
          state.user = null;
          updateAccountMenu();
          closeRegistrationPopup();
          showToast('Admin login successful');
          setRoute('admin');
          return;
        }
      }
      throw new Error(result.message || 'Login failed');
    }

    state.user = result.user;
    saveUser(result.user);
    closeRegistrationPopup();
    updateAccountMenu();
    showToast('Login successful');
    setTimeout(() => setRoute('profile'), 500);
  } catch (error) {
    showToast(error.message || 'Login failed');
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
      showToast('Your admin session expired. Please sign in again.');
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
  const isPopup = Boolean(form.closest('#registration-modal'));

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
    if (isPopup) {
      closeRegistrationPopup();
      setRoute('auth');
    } else {
      renderAuth('login');
    }
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
  renderHome();
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
  if (state.route === 'home') {
    renderHome();
  } else {
    renderCart();
  }
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
  updateAccountMenu();
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
  updateAccountMenu();
  renderProfile();
  showToast('Logged out');
}

function logoutAdmin(showMessage = true) {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  sessionStorage.removeItem(ADMIN_EMAIL_KEY);
  updateAccountMenu();
  if (state.route === 'admin') {
    setRoute('auth');
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
