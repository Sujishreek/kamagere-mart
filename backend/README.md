# Backend database

The backend uses the local `app.db` SQLite file by default. To use Cloud SQL
for MySQL, set `INSTANCE_CONNECTION_NAME`, `DB_USER`, `DB_PASSWORD`, and
`DB_NAME`. On Cloud Run, attach the Cloud SQL instance to the service and store
`DB_PASSWORD` in Secret Manager rather than in a checked-in environment file.
Admin login issues an eight-hour JWT, and the orders API requires that admin
token. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_JWT_SECRET`; keep
the password and signing secret in Secret Manager when deployed.
Google sign-in requires a Google OAuth web client ID in `GOOGLE_CLIENT_ID`.
Configure the app's local and deployed hostnames as authorized JavaScript
origins in Google Cloud Console. Google ID tokens are verified by the backend;
Google-only accounts are created without a phone number; checkout asks for a
contact number when it is needed.
Authenticated admins can add products from the Admin dashboard. Products are
stored in the `products` table and served by `/api/products`.
Admins can also select a product to edit and update its details. The product
photo input can open a mobile device's rear camera or select an image; images
are resized in the browser before being saved in the product record.
Orders above ₹99 have free delivery; all other orders have a ₹25 delivery fee.
The order API calculates item prices and delivery fees from the database rather
than trusting totals submitted by the browser.

For a one-time migration of a local SQLite database, start the Cloud SQL Auth
Proxy on port 3307 and run `node migrate-sqlite-to-cloudsql.js` with
`DB_PASSWORD` set. The migration stops if either Cloud SQL table is nonempty,
so it will not silently merge or overwrite existing records.

Orders can be cancelled using their per-order token for two minutes after
placement. The backend stores only the token hash and rejects cancellation
after the deadline or after an order has already changed status.
