<h2>🚦 Real-Time Rate Limiter Service (Leaky Bucket Algorithm)</h2>

A Redis-backed real-time rate limiting service built using TypeScript, Express, and the Leaky Bucket algorithm.
This project focuses on infrastructure-level backend engineering, not CRUD APIs.
<br>
<h4>📌 Problem Statement</h4>

APIs need protection against:

Abuse (too many requests)

Traffic spikes

Accidental overload

DDoS-like behavior at the application level

Without rate limiting:

Servers can crash

Databases can get overwhelmed

Fair usage cannot be enforced

Rate limiting solves this by controlling how frequently a client can make requests.
<br>
<h4>🧠 Why Leaky Bucket?</h4>

The Leaky Bucket algorithm is designed to:

Smooth out burst traffic

Enforce a steady request flow

Allow controlled bursts while preventing overload

It is commonly used in:

API gateways

Network traffic shaping

Payment systems

Auth services
<br>
⚙️ How Leaky Bucket Works (Conceptually)

Think of a bucket:

Requests add “water” to the bucket

Water leaks out at a fixed rate

If the bucket overflows → request is rejected

Key Properties:

Capacity → max burst allowed

Leak rate → how fast requests are processed

Stateful → bucket level persists per client
<br>
<h4>🏗️ Architecture Overview</h4>
Client
  ↓
Express API
  ↓
Rate Limiter Middleware
  ↓
Redis (shared state)

Why Redis?

Extremely fast (in-memory)

Shared across instances (horizontal scaling)

TTL support for auto-cleanup

Common industry choice for rate limiters
<br>
<h4>🧩 Tech Stack</h4>

Node.js

TypeScript

Express

Redis

Docker (for Redis)

ts-node-dev (development)
<br>
<h4>📁 Project Structure</h4>
src/<br>
├── server.ts <br>             # Express app entry point
├── redis/<br>
│   └── redis.ts<br>           # Redis client setup
├── limiter/<br>
│   └── leaky.ts <br>          # Leaky Bucket algorithm logic
├── middleware/<br>
│   └── rateLimiter.ts<br>     # Express middleware
<br>
🔑 Core Logic (Leaky Bucket + Redis)
<br><br>
Each client (IP-based for now) has a Redis hash:

rate_limit:<ip>
  ├── bucket_level
  └── last_checked_time

Flow:

Fetch bucket state from Redis

Calculate leaked tokens based on elapsed time

Check capacity

Allow or reject request

Update Redis state

Set TTL to avoid stale keys

🧪 Example Limiter Logic
const CAPACITY = 10;
const LEAK_RATE = 1; // tokens per second


Allows short bursts

Enforces steady throughput

Prevents abuse
<br>
<h4>🚀 Getting Started</h4>
1️⃣ Install dependencies
npm install

2️⃣ Run Redis using Docker
docker run -d --name redis-rate -p 6379:6379 redis


Verify:

redis-cli ping
# PONG

3️⃣ Start the server
npx ts-node-dev src/server.ts


Expected output:

Redis connected
Server running on port 3008

🧪 Testing the Rate Limiter
Single request
curl http://localhost:3008/api/data

Burst test (PowerShell)
1..20 | ForEach-Object { curl http://localhost:3008/api/data }

Expected behavior:

Initial requests → ✅ allowed

Excess requests → ❌ 429 Too Many Requests
<br>
<h4>🧠 Key Learnings</h4>

How real rate limiting works beyond libraries

Redis as shared infrastructure state

Traffic smoothing vs request blocking

Docker networking and port publishing

Debugging real infra issues (IPv4 vs IPv6, container isolation)

Middleware-based enforcement
<br>
🛠️ Limitations (Intentional)</h4>

Not atomic under extreme concurrency

No Lua scripts (yet)

IP-based identification only

Single algorithm implementation

These are deliberate trade-offs to understand fundamentals first.
<br>
<h4>🔮 Future Improvements</h4>

Atomic updates using Redis Lua scripts

Token Bucket & Sliding Window algorithms

API-key based limiting

Rate limit headers (X-RateLimit-*)

Metrics dashboard (WebSockets)

Convert into a standalone infra service
<br>
<h4>🎯 Why This Project Matters</h4>

This is not a CRUD app.
It demonstrates:

System design thinking

Infra-level backend understanding

Real-world engineering tradeoffs

This is the kind of system used inside:

API gateways

Auth platforms

Payment systems

SaaS backends
<br>
<h4>🧑‍💻 Author</h4>

Kartik Sharma
Backend-focused developer exploring real-world infrastructure systems.
