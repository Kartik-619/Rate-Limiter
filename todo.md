# Rate-Limiter Improvement Roadmap

## Critical Issues (Fix First)
- [ ] Add `.gitignore` and remove `node_modules` from git
- [ ] Fix README file structure mismatches (actual vs documented files)
- [ ] Remove unused `ioredis` dependency
- [ ] Fix `package.json` metadata (main, description, scripts)

## Architecture & Code Quality
- [ ] Implement atomic Redis operations with Lua script
- [ ] Consolidate duplicate algorithm implementations
- [ ] Add environment configuration (dotenv)
- [ ] Fix race condition in rate limiter
- [ ] Add proper error handling for Redis failures
- [ ] Implement graceful shutdown (SIGINT/SIGTERM)
- [ ] Add `trust proxy` setting for production deployments

## Documentation & Presentation
- [ ] Add Mermaid architecture diagram to README
- [ ] Include concrete curl/PowerShell demo commands
- [ ] Add "What I learned / Trade-offs" section
- [ ] Add TypeDoc/JSDoc comments to core algorithms
- [ ] Align README structure section with actual files

## Developer Experience
- [ ] Add real npm scripts (dev, build, start, test, lint)
- [ ] Configure ESLint + Prettier
- [ ] Add `.editorconfig`
- [ ] Rename `leak&bucket.ts` to remove special characters
- [ ] Add TypeScript interfaces for configuration

## Testing & CI/CD
- [ ] Add unit tests for leaky bucket algorithm
- [ ] Add integration tests with Redis mock
- [ ] Create GitHub Actions CI pipeline
- [ ] Add test coverage reporting

## Deployment & Demo
- [ ] Create `docker-compose.yml` (Redis + app)
- [ ] Add health/metrics endpoint
- [ ] Add standard rate-limit response headers
- [ ] Support API key authentication (not just IP)

## Optional Enhancements
- [ ] Add second algorithm (Token Bucket/Sliding Window)
- [ ] Create WebSocket dashboard for real-time monitoring
- [ ] Add performance benchmarks
- [ ] Implement configurable key strategies

---

## Quick Wins (High Impact, Low Effort)
1. Add `.gitignore` and clean up git
2. Fix `package.json` and add proper scripts
3. Add environment variables configuration
4. Fix file naming (`leak&bucket.ts` → `leakyBucket.ts`)
5. Add basic tests for the algorithm

## Showstopper Upgrades (Portfolio Piece)
1. Atomic Lua script implementation
2. Docker-compose for one-command demo
3. Passing test suite with coverage
4. Clean README with architecture diagram
5. GitHub Actions CI pipeline

---

*Created: 2026-09-16*
*Last Updated: 2026-09-16*
