require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");
const mysql = require("mysql2/promise");
const PRODUCTS = require("./product");

const app = express();
const frontendCandidates = [
    path.join(__dirname, "..", "E-commerce_frontend"),
    path.join(__dirname, "E-commerce_frontend"),
    __dirname
];
const frontendDir = frontendCandidates.find((dir) => fs.existsSync(path.join(dir, "index.html"))) || path.join(__dirname, "E-commerce_frontend");
const DB_PATH = path.join(__dirname, "app.db");
const useCloudSql = Boolean(process.env.INSTANCE_CONNECTION_NAME || process.env.DB_HOST);
const db = useCloudSql
    ? mysql.createPool({
        socketPath: process.env.INSTANCE_CONNECTION_NAME
            ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
            : undefined,
        host: process.env.DB_HOST || undefined,
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || "kamagere_app",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "kamagere_mart",
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0
    })
    : new DatabaseSync(DB_PATH);

app.use(cors());
app.use(express.json({ limit: "128kb" }));
app.use(express.static(frontendDir));

// ===============================
// Validation helpers
// ===============================

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

function validEmail(email) {
    return EMAIL_REGEX.test(String(email || "").trim());
}

function validPassword(password) {
    return PASSWORD_REGEX.test(String(password || ""));
}

function validPhone(phone) {
    return PHONE_REGEX.test(String(phone || "").trim());
}



// ===============================
// Database helpers
// ===============================

async function runDb(query, params = []) {
    if (useCloudSql) {
        const [result] = await db.execute(query, params);
        return {
            lastID: result.insertId ?? null,
            changes: result.affectedRows ?? 0
        };
    }

    const result = db.prepare(query).run(...params);
    return {
        lastID: result.lastInsertRowid ?? null,
        changes: result.changes ?? 0
    };
}

async function getDb(query, params = []) {
    if (useCloudSql) {
        const [rows] = await db.execute(query, params);
        return rows[0] || null;
    }

    return db.prepare(query).get(...params) || null;
}

async function allDb(query, params = []) {
    if (useCloudSql) {
        const [rows] = await db.execute(query, params);
        return rows;
    }

    return db.prepare(query).all(...params) || [];
}

function normalizeUserRow(row) {
    if (!row) return null;

    return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        password: row.password,
        address: row.address || ""
    };
}

function normalizeOrderRow(row) {
    if (!row) return null;

    return {
        id: row.id,
        userId: row.userId,
        date: row.date,
        items: Array.isArray(row.items) ? row.items : JSON.parse(row.items || "[]"),
        subtotal: Number(row.subtotal || 0),
        delivery: Number(row.delivery || 0),
        total: Number(row.total || 0),
        address: row.address,
        payment: row.payment || "COD",
        status: row.status || "Confirmed",
        source: row.source || "Cart"
    };
}

function normalizeProductRow(row) {
    return {
        id: Number(row.id),
        name: row.name,
        category: row.category,
        unit: row.unit,
        price: Number(row.price),
        oldPrice: Number(row.oldPrice),
        discount: Number(row.discount),
        image: row.image,
        description: row.description
    };
}

function productArt(label) {
    const safeLabel = String(label)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" rx="42" fill="#16a34a"/><circle cx="150" cy="120" r="80" fill="#ffffff" fill-opacity=".2"/><circle cx="650" cy="420" r="140" fill="#ffffff" fill-opacity=".12"/><text x="400" y="300" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" font-weight="700" fill="#fff">${safeLabel}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function validateProductInput(body) {
    const { name, category, unit, price, oldPrice, description, image } = body;
    const normalizedName = String(name || "").trim();
    const normalizedCategory = String(category || "").trim();
    const normalizedUnit = String(unit || "").trim();
    const normalizedDescription = String(description || "").trim();
    const numericPrice = Number(price);
    const numericOldPrice = oldPrice === "" || oldPrice == null
        ? numericPrice
        : Number(oldPrice);
    const normalizedImage = String(image || "").trim();

    if (!normalizedName || !normalizedCategory || !normalizedUnit || !normalizedDescription) {
        return { error: "Name, category, unit, price, and description are required." };
    }
    if (normalizedName.length > 255 || normalizedCategory.length > 100 || normalizedUnit.length > 100 || normalizedDescription.length > 2000) {
        return { error: "One or more product fields exceed the allowed length." };
    }
    if (!Number.isFinite(numericPrice) || numericPrice <= 0 || numericPrice > 10000000) {
        return { error: "Enter a valid product price greater than zero." };
    }
    if (!Number.isFinite(numericOldPrice) || numericOldPrice < numericPrice || numericOldPrice > 10000000) {
        return { error: "MRP must be equal to or greater than the selling price." };
    }
    if (normalizedImage.startsWith("data:")) {
        if (
            normalizedImage.length > 60000 ||
            !/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(normalizedImage)
        ) {
            return { error: "Captured product photos must be JPEG images smaller than 60 KB." };
        }
    } else if (normalizedImage) {
        let parsedImage;
        try {
            parsedImage = new URL(normalizedImage);
        } catch {
            return { error: "Product image must be a valid HTTPS image URL." };
        }
        if (parsedImage.protocol !== "https:") {
            return { error: "Product image must use HTTPS." };
        }
    }

    const discount = Math.round((1 - numericPrice / numericOldPrice) * 100);
    return {
        product: {
            name: normalizedName,
            category: normalizedCategory,
            unit: normalizedUnit,
            price: numericPrice,
            oldPrice: numericOldPrice,
            discount,
            image: normalizedImage,
            description: normalizedDescription
        }
    };
}

async function initializeDatabase() {
    if (useCloudSql) {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(254) NOT NULL UNIQUE,
                phone VARCHAR(20) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                address TEXT NOT NULL
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id VARCHAR(32) NOT NULL PRIMARY KEY,
                userId BIGINT UNSIGNED NULL,
                date VARCHAR(64) NOT NULL,
                items LONGTEXT NOT NULL,
                subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
                delivery DECIMAL(12, 2) NOT NULL DEFAULT 0,
                total DECIMAL(12, 2) NOT NULL DEFAULT 0,
                address TEXT NOT NULL,
                payment VARCHAR(64) NOT NULL DEFAULT 'COD',
                status VARCHAR(64) NOT NULL DEFAULT 'Confirmed',
                source VARCHAR(64) NOT NULL DEFAULT 'Cart',
                createdAt BIGINT NULL,
                cancelTokenHash CHAR(64) NULL,
                INDEX orders_user_id (userId)
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
        `);
        const [orderColumns] = await db.query("SHOW COLUMNS FROM orders");
        const orderColumnNames = new Set(orderColumns.map((column) => column.Field));
        if (!orderColumnNames.has("createdAt")) {
            await db.query("ALTER TABLE orders ADD COLUMN createdAt BIGINT NULL");
        }
        if (!orderColumnNames.has("cancelTokenHash")) {
            await db.query("ALTER TABLE orders ADD COLUMN cancelTokenHash CHAR(64) NULL");
        }
        await db.query(`
            CREATE TABLE IF NOT EXISTS products (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                unit VARCHAR(100) NOT NULL,
                price DECIMAL(12, 2) NOT NULL,
                oldPrice DECIMAL(12, 2) NOT NULL,
                discount INT NOT NULL DEFAULT 0,
                image TEXT NOT NULL,
                description TEXT NOT NULL
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
        `);
        for (const product of PRODUCTS) {
            await db.execute(
                `INSERT IGNORE INTO products
                    (id, name, category, unit, price, oldPrice, discount, image, description)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    product.id,
                    product.name,
                    product.category,
                    product.unit,
                    product.price,
                    product.oldPrice,
                    product.discount,
                    product.image,
                    product.description
                ]
            );
        }
        return;
    }

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            address TEXT DEFAULT ''
        );

        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            userId INTEGER,
            date TEXT NOT NULL,
            items TEXT NOT NULL,
            subtotal REAL NOT NULL DEFAULT 0,
            delivery REAL NOT NULL DEFAULT 0,
            total REAL NOT NULL DEFAULT 0,
            address TEXT NOT NULL,
            payment TEXT NOT NULL DEFAULT 'COD',
            status TEXT NOT NULL DEFAULT 'Confirmed',
            source TEXT NOT NULL DEFAULT 'Cart',
            createdAt INTEGER,
            cancelTokenHash TEXT
        );

        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            unit TEXT NOT NULL,
            price REAL NOT NULL,
            oldPrice REAL NOT NULL,
            discount INTEGER NOT NULL DEFAULT 0,
            image TEXT NOT NULL,
            description TEXT NOT NULL
        );
    `);

    const sqliteOrderColumns = new Set(
        db.prepare("PRAGMA table_info(orders)").all().map((column) => column.name)
    );
    if (!sqliteOrderColumns.has("createdAt")) {
        db.exec("ALTER TABLE orders ADD COLUMN createdAt INTEGER");
    }
    if (!sqliteOrderColumns.has("cancelTokenHash")) {
        db.exec("ALTER TABLE orders ADD COLUMN cancelTokenHash TEXT");
    }

    for (const product of PRODUCTS) {
        db.prepare(`
            INSERT OR IGNORE INTO products
                (id, name, category, unit, price, oldPrice, discount, image, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            product.id,
            product.name,
            product.category,
            product.unit,
            product.price,
            product.oldPrice,
            product.discount,
            product.image,
            product.description
        );
    }
}


// ===============================
// Home API
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendDir, "index.html"));
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Kamagere Mart Backend"
    });
});


// ===============================
// Products API
// ===============================

app.get("/api/products", async (req, res) => {
    try {
        const rows = await allDb("SELECT * FROM products ORDER BY id");
        res.json(rows.map(normalizeProductRow));
    } catch (error) {
        console.error("Get Products Error:", error);
        res.status(500).json({
            message: "Unable to load products."
        });
    }
});

app.post("/api/products", requireAdmin, async (req, res) => {
    try {
        const validation = validateProductInput(req.body);
        if (validation.error) {
            return res.status(400).json({ message: validation.error });
        }
        const product = {
            ...validation.product,
            image: validation.product.image || productArt(validation.product.name)
        };
        const insert = await runDb(
            `INSERT INTO products
                (name, category, unit, price, oldPrice, discount, image, description)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                product.name,
                product.category,
                product.unit,
                product.price,
                product.oldPrice,
                product.discount,
                product.image,
                product.description
            ]
        );
        const created = await getDb("SELECT * FROM products WHERE id = ?", [insert.lastID]);
        res.status(201).json({
            message: "Product added successfully.",
            product: normalizeProductRow(created)
        });
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(500).json({
            message: "Unable to add product."
        });
    }
});

app.put("/api/products/:id", requireAdmin, async (req, res) => {
    try {
        const productId = Number(req.params.id);
        if (!Number.isSafeInteger(productId) || productId <= 0) {
            return res.status(400).json({ message: "Invalid product ID." });
        }

        const existing = await getDb("SELECT id, image FROM products WHERE id = ?", [productId]);
        if (!existing) {
            return res.status(404).json({ message: "Product not found." });
        }

        const validation = validateProductInput(req.body);
        if (validation.error) {
            return res.status(400).json({ message: validation.error });
        }
        const product = {
            ...validation.product,
            image: validation.product.image || existing.image || productArt(validation.product.name)
        };

        await runDb(
            `UPDATE products
             SET name = ?, category = ?, unit = ?, price = ?, oldPrice = ?, discount = ?, image = ?, description = ?
             WHERE id = ?`,
            [
                product.name,
                product.category,
                product.unit,
                product.price,
                product.oldPrice,
                product.discount,
                product.image,
                product.description,
                productId
            ]
        );
        const updated = await getDb("SELECT * FROM products WHERE id = ?", [productId]);
        res.json({
            message: "Product updated successfully.",
            product: normalizeProductRow(updated)
        });
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({
            message: "Unable to update product."
        });
    }
});


// ===============================
// Register API
// ===============================

app.post("/api/register", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            address
        } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        if (!validEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        if (!validPhone(phone)) {
            return res.status(400).json({
                message: "Please enter a valid 10-digit Indian mobile number."
            });
        }

        if (!validPassword(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters and contain uppercase, lowercase, number, and special symbol."
            });
        }

        const existingUser = await getDb(
            "SELECT * FROM users WHERE LOWER(email) = LOWER(?) OR phone = ?",
            [email, phone]
        );

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertResult = await runDb(
            "INSERT INTO users (name, email, phone, password, address) VALUES (?, ?, ?, ?, ?)",
            [name, email.trim(), phone.trim(), hashedPassword, address || ""]
        );

        const user = normalizeUserRow(
            await getDb("SELECT * FROM users WHERE id = ?", [insertResult.lastID])
        );

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });

    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ===============================
// Customer Login API
// ===============================

app.post("/api/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        if (!validEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        if (!validPassword(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters and contain uppercase, lowercase, number, and special symbol."
            });
        }

        const userRow = await getDb(
            "SELECT * FROM users WHERE LOWER(email) = LOWER(?)",
            [email]
        );

        if (!userRow) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const user = normalizeUserRow(userRow);
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ===============================
// Admin Login API
// ===============================

function requireAdmin(req, res, next) {
    const signingSecret = process.env.ADMIN_JWT_SECRET;
    if (!signingSecret) {
        return res.status(503).json({
            message: "Admin authentication is not configured."
        });
    }

    const authorization = req.get("authorization") || "";
    const token = authorization.startsWith("Bearer ")
        ? authorization.slice(7)
        : "";
    if (!token) {
        return res.status(401).json({
            message: "Admin sign-in is required."
        });
    }

    try {
        const session = jwt.verify(token, signingSecret);
        if (typeof session !== "object" || session.role !== "admin") {
            return res.status(403).json({
                message: "Admin access is required."
            });
        }
        req.admin = session;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Admin session is invalid or expired."
            });
        }
        console.error("Admin token verification error:", error);
        return res.status(500).json({
            message: "Unable to verify admin session."
        });
    }
}

app.post("/api/admin/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Admin email and password are required."
            });
        }

        if (!validEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid admin email address."
            });
        }

        if (!validPassword(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters and contain uppercase, lowercase, number, and special symbol."
            });
        }

        const adminEmail = String(
            process.env.ADMIN_EMAIL || ""
        ).trim().toLowerCase();

        const adminPassword =
            process.env.ADMIN_PASSWORD || "";
        const signingSecret = process.env.ADMIN_JWT_SECRET || "";

        if (!adminEmail || !adminPassword || !signingSecret) {
            return res.status(503).json({
                message: "Admin login is not configured."
            });
        }

        const emailMatches =
            email.toLowerCase() === adminEmail;

        const passwordMatches =
            password === adminPassword;

        if (!emailMatches || !passwordMatches) {
            return res.status(401).json({
                message: "Invalid admin email or password."
            });
        }

        const token = jwt.sign(
            { email: adminEmail, role: "admin" },
            signingSecret,
            { expiresIn: "8h" }
        );

        res.json({
            message: "Admin login successful",
            token,
            admin: {
                email: adminEmail,
                role: "admin"
            }
        });

    } catch (error) {
        console.error("Admin Login Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// ===============================
// Orders API
// ===============================

app.post("/api/orders", async (req, res) => {
    try {
        const {
            userId,
            items,
            address,
            payment,
            source
        } = req.body;

        if (!Array.isArray(items) || !items.length) {
            return res.status(400).json({
                message: "No items in order"
            });
        }

        if (typeof address !== "string" || !address.trim()) {
            return res.status(400).json({
                message: "Delivery address is required"
            });
        }

        const pricedItems = [];
        for (const item of items) {
            const productId = Number(item?.id);
            const quantity = Number(item?.quantity);
            if (!Number.isSafeInteger(productId) || productId <= 0 || !Number.isSafeInteger(quantity) || quantity <= 0) {
                return res.status(400).json({
                    message: "Order contains an invalid product or quantity"
                });
            }

            const product = await getDb(
                "SELECT id, name, unit, price FROM products WHERE id = ?",
                [productId]
            );
            if (!product) {
                return res.status(400).json({
                    message: "Order contains a product that is no longer available"
                });
            }

            pricedItems.push({
                id: Number(product.id),
                name: product.name,
                price: Number(product.price),
                unit: product.unit,
                quantity
            });
        }

        const orderSubtotal = Math.round(
            (pricedItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + Number.EPSILON) * 100
        ) / 100;
        const orderDelivery = orderSubtotal > 99 ? 0 : 25;
        const createdAt = Date.now();
        const cancelToken = crypto.randomBytes(32).toString("hex");
        const cancelTokenHash = crypto.createHash("sha256").update(cancelToken).digest("hex");
        const order = {
            id: "KM" + Date.now().toString().slice(-7),
            userId: userId || null,
            date: new Date().toLocaleString("en-IN"),
            createdAt,
            cancelToken,
            items: pricedItems,
            subtotal: orderSubtotal,
            delivery: orderDelivery,
            total: orderSubtotal + orderDelivery,
            address: address.trim(),
            payment: payment || "COD",
            status: "Confirmed",
            source: source === "Buy Now" ? "Buy Now" : "Cart"
        };

        await runDb(
            `INSERT INTO orders (id, userId, date, items, subtotal, delivery, total, address, payment, status, source, createdAt, cancelTokenHash)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                order.id,
                order.userId,
                order.date,
                JSON.stringify(order.items),
                order.subtotal,
                order.delivery,
                order.total,
                order.address,
                order.payment,
                order.status,
                order.source,
                order.createdAt,
                cancelTokenHash
            ]
        );

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error("Order Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

app.patch("/api/orders/:id/cancel", async (req, res) => {
    try {
        const orderId = String(req.params.id || "");
        const cancelToken = String(req.body.cancelToken || "");
        if (!orderId || !/^[a-f0-9]{64}$/i.test(cancelToken)) {
            return res.status(400).json({ message: "A valid order cancellation token is required." });
        }

        const row = await getDb(
            "SELECT status, createdAt, cancelTokenHash FROM orders WHERE id = ?",
            [orderId]
        );
        if (!row) {
            return res.status(404).json({ message: "Order not found." });
        }
        if (!row.cancelTokenHash || !/^[a-f0-9]{64}$/i.test(String(row.cancelTokenHash))) {
            return res.status(403).json({ message: "This order cannot be cancelled from this browser." });
        }

        const suppliedHash = crypto.createHash("sha256").update(cancelToken).digest();
        const storedHash = Buffer.from(String(row.cancelTokenHash), "hex");
        if (!crypto.timingSafeEqual(suppliedHash, storedHash)) {
            return res.status(403).json({ message: "This order cannot be cancelled from this browser." });
        }
        if (row.status !== "Confirmed") {
            return res.status(409).json({ message: "This order has already been processed and cannot be cancelled." });
        }

        const createdAt = Number(row.createdAt);
        const ageMs = Date.now() - createdAt;
        if (!Number.isFinite(createdAt) || ageMs < 0 || ageMs >= 2 * 60 * 1000) {
            return res.status(410).json({ message: "The 2-minute cancellation window has expired." });
        }

        const result = await runDb(
            `UPDATE orders SET status = 'Cancelled'
             WHERE id = ? AND status = 'Confirmed' AND createdAt = ? AND cancelTokenHash = ?`,
            [orderId, createdAt, String(row.cancelTokenHash)]
        );
        if (result.changes !== 1) {
            return res.status(409).json({ message: "This order has already been processed and cannot be cancelled." });
        }

        res.json({ message: "Order cancelled successfully.", status: "Cancelled" });
    } catch (error) {
        console.error("Cancel Order Error:", error);
        res.status(500).json({ message: "Unable to cancel order." });
    }
});


// ===============================
// Get Orders API
// ===============================

app.get("/api/orders", requireAdmin, async (req, res) => {
    try {
        const rows = await allDb(
            "SELECT * FROM orders ORDER BY date DESC"
        );

        const orders = rows.map(normalizeOrderRow).filter(Boolean);
        res.json(orders);
    } catch (error) {
        console.error("Get Orders Error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
});


// ===============================
// Frontend fallback
// ===============================

app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDir, "index.html"));
});


// ===============================
// Start Server
// ===============================

const PORT = Number(process.env.PORT) || 5000;

initializeDatabase()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database initialization failed:", error);
        process.exitCode = 1;
    });