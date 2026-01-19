<h2>🚦 Real-Time Rate Limiter Service (Leaky Bucket Algorithm)</h2>

<ul>
  <li>Redis-backed real-time rate limiting service</li>
  <li>Built using TypeScript, Express, and Redis</li>
  <li>Implements the Leaky Bucket algorithm</li>
  <li>Focuses on infrastructure-level backend engineering</li>
  <li>Not a CRUD-based application</li>
</ul>

<br>

<h4>📌 Problem Statement</h4>
<ul>
  <li>APIs need protection against abuse (too many requests)</li>
  <li>APIs face sudden traffic spikes</li>
  <li>Accidental overload can crash systems</li>
  <li>DDoS-like behavior can occur at application level</li>
</ul>

<br>

<h4>Without rate limiting:</h4>
<ul>
  <li>Servers can crash</li>
  <li>Databases can get overwhelmed</li>
  <li>Fair usage cannot be enforced</li>
  <li>System stability becomes unpredictable</li>
  <li>Rate limiting solves this by controlling request frequency</li>
</ul>

<br>

<h4>🧠 Why Leaky Bucket?</h4>
<ul>
  <li>Smooths out burst traffic</li>
  <li>Enforces a steady request flow</li>
  <li>Allows controlled bursts</li>
  <li>Prevents backend overload</li>
  <li>Commonly used in API gateways</li>
  <li>Used in network traffic shaping</li>
  <li>Used in payment systems</li>
  <li>Used in authentication services</li>
</ul>

<br>

<h4>⚙️ How Leaky Bucket Works (Conceptually)</h4>
<ul>
  <li>Think of requests as water added to a bucket</li>
  <li>Each request increases the bucket level</li>
  <li>Water leaks out at a fixed rate</li>
  <li>If the bucket overflows, the request is rejected</li>
</ul>

<br>

<h4>Key Properties</h4>
<ul>
  <li>Capacity → maximum burst allowed</li>
  <li>Leak rate → speed at which requests are processed</li>
  <li>Stateful → bucket state persists per client</li>
</ul>

<br>

<h4>🏗️ Architecture Overview</h4>
<ul>
  <li>Client sends request</li>
  <li>Request hits Express API</li>
  <li>Rate Limiter Middleware executes</li>
  <li>Redis stores shared rate-limit state</li>
</ul>

<br>

<h4>Why Redis?</h4>
<ul>
  <li>Extremely fast (in-memory)</li>
  <li>Shared across multiple instances</li>
  <li>Enables horizontal scaling</li>
  <li>TTL support for auto-cleanup</li>
  <li>Common industry choice for rate limiting</li>
</ul>

<br>

<h4>🧩 Tech Stack</h4>
<ul>
  <li>Node.js</li>
  <li>TypeScript</li>
  <li>Express</li>
  <li>Redis</li>
  <li>Docker (for Redis)</li>
  <li>ts-node-dev (development)</li>
</ul>

<br>

<h4>📁 Project Structure</h4>
<ul>
  <li>src/server.ts → Express app entry point</li>
  <li>src/redis/redis.ts → Redis client setup</li>
  <li>src/limiter/leaky.ts → Leaky Bucket algorithm logic</li>
  <li>src/middleware/rateLimiter.ts → Express middleware</li>
</ul>

<br>

<h4>🔑 Core Logic (Leaky Bucket + Redis)</h4>
<ul>
  <li>Each client is identified using IP address</li>
  <li>Redis hash stores per-client state</li>
  <li>Key format: rate_limit:&lt;ip&gt;</li>
  <li>bucket_level tracks current load</li>
  <li>last_checked_time tracks leakage timing</li>
</ul>

<br>

<h4>Flow</h4>
<ul>
  <li>Fetch bucket state from Redis</li>
  <li>Calculate leaked tokens using elapsed time</li>
  <li>Check against bucket capacity</li>
  <li>Allow or reject the request</li>
  <li>Update Redis state</li>
  <li>Set TTL to prevent stale keys</li>
</ul>

<br>

<h4>🧪 Example Limiter Logic</h4>
<ul>
  <li>CAPACITY = 10</li>
  <li>LEAK_RATE = 1 token per second</li>
  <li>Allows short request bursts</li>
  <li>Enforces steady throughput</li>
  <li>Prevents abuse</li>
</ul>

<br>

<h4>🚀 Getting Started</h4>
<ul>
  <li>Install dependencies using npm install</li>
  <li>Run Redis using Docker</li>
  <li>Verify Redis using redis-cli ping</li>
  <li>Start server with ts-node-dev</li>
</ul>

<br>

<h4>Expected Output</h4>
<ul>
  <li>Redis connected</li>
  <li>Server running on port 3008</li>
</ul>

<br>

<h4>🧪 Testing the Rate Limiter</h4>
<ul>
  <li>Send a single request using curl</li>
  <li>Send burst requests using PowerShell loop</li>
  <li>Initial requests should be allowed</li>
  <li>Excess requests return 429 Too Many Requests</li>
</ul>

<br>

<h4>🧠 Key Learnings</h4>
<ul>
  <li>How real rate limiting works internally</li>
  <li>Using Redis as shared infrastructure state</li>
  <li>Difference between traffic smoothing and blocking</li>
  <li>Docker networking and port publishing</li>
  <li>Debugging infra issues (IPv4 vs IPv6)</li>
  <li>Middleware-based enforcement</li>
</ul>

<br>

<h4>🛠️ Limitations (Intentional)</h4>
<ul>
  <li>Not atomic under extreme concurrency</li>
  <li>No Redis Lua scripts yet</li>
  <li>IP-based identification only</li>
  <li>Single algorithm implementation</li>
  <li>Trade-offs made to understand fundamentals</li>
</ul>

<br>

<h4>🔮 Future Improvements</h4>
<ul>
  <li>Atomic updates using Redis Lua scripts</li>
  <li>Token Bucket and Sliding Window algorithms</li>
  <li>API-key based rate limiting</li>
  <li>X-RateLimit headers</li>
  <li>Metrics dashboard using WebSockets</li>
  <li>Convert into standalone infra service</li>
</ul>

<br>

<h4>🎯 Why This Project Matters</h4>
<ul>
  <li>Not a CRUD application</li>
  <li>Demonstrates system design thinking</li>
  <li>Shows infra-level backend understanding</li>
  <li>Highlights real-world engineering trade-offs</li>
  <li>Used in API gateways</li>
  <li>Used in auth platforms</li>
  <li>Used in payment systems</li>
  <li>Used in SaaS backends</li>
</ul>

<br>

<h4>🧑‍💻 Author</h4>
<ul>
  <li>Kartik Sharma</li>
  <li>Backend-focused developer</li>
  <li>Exploring real-world infrastructure systems</li>
</ul>
