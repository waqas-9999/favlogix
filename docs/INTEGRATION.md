# FavLogix — Integration Architecture

## 1. Architecture Overview

FavLogix follows a simple three-layer integration architecture:

- Frontend Components
  - React components in `app/` and `components/` consume data via hooks and services and render the UI.
- Internal Next.js API Routes
  - Lightweight server-side proxy routes under `app/api/` forward client requests to external dummy APIs. These provide a single internal surface (`/api/*`) for the frontend to call.
- External Dummy APIs
  - Third-party data providers used for demo/test data: JSONPlaceholder (`jsonplaceholder.typicode.com`) and DummyJSON (`dummyjson.com`). The proxy routes forward requests to these services.

This separation keeps the frontend decoupled from external endpoints and centralizes any request headers or workarounds in the server routes.

## 2. Environment Variables

- `NEXT_PUBLIC_APP_NAME` (client-side)
  - Purpose: UI branding (displayed in layout/header).
- `NEXT_PUBLIC_AI_AGENT_NAME` (client-side)
  - Purpose: Default agent name used by AI reply generator (`services/chatService.getAIResponse`).
- `JSONPLACEHOLDER_URL` (server-side)
  - Purpose: Base URL for JSONPlaceholder; used by `/api/posts` and `/api/users` proxy routes.
  - Default: `https://jsonplaceholder.typicode.com` when not set.
- `DUMMYJSON_URL` (server-side)
  - Purpose: Base URL for DummyJSON; used by `/api/products` proxy routes.
  - Default: `https://dummyjson.com` when not set.

Notes:
- `JSONPLACEHOLDER_URL` and `DUMMYJSON_URL` are consumed only by server-side route handlers and must not be exposed to browsers (no NEXT_PUBLIC_ prefix).
- `REQRES_URL` used earlier in the project was removed during cleanup and is no longer present in `.env.local`.

## 3. API Routes

All server routes live under `app/api/*`. Each route is a simple forwarder to an external endpoint.

- Route: `/api/posts`
  - Proxies to: `${JSONPLACEHOLDER_URL}/posts`
  - Query params: forwarded as-is (e.g., `?userId=1`, or `?limit=10` if used client-side).
  - Returns: JSON array (or paged response) from JSONPlaceholder `/posts`.
  - File: `app/api/posts/route.ts`

- Route: `/api/posts/:id`
  - Proxies to: `${JSONPLACEHOLDER_URL}/posts/:id`
  - Query params: none (id encoded into path)
  - Returns: single post JSON object from JSONPlaceholder
  - File: `app/api/posts/[id]/route.ts`

- Route: `/api/products`
  - Proxies to: DummyJSON product endpoints.
  - Behavior:
    - If query param `search` is present -> forwards to `${DUMMYJSON_URL}/products/search?q={search}`
    - If query param `category` is present -> forwards to `${DUMMYJSON_URL}/products/category/{category}`
    - Otherwise forwards to `${DUMMYJSON_URL}/products` and passes `limit`, `skip`, etc.
  - Returns: DummyJSON responses (object containing `products`, `total`, `skip`, `limit`).
  - File: `app/api/products/route.ts`

- Route: `/api/products/:id`
  - Proxies to: `${DUMMYJSON_URL}/products/:id`
  - Returns: single product JSON object from DummyJSON
  - File: `app/api/products/[id]/route.ts`

- Route: `/api/products/category/:category`
  - Proxies to: `${DUMMYJSON_URL}/products/category/:category`
  - Returns: category listing JSON from DummyJSON
  - File: `app/api/products/category/[category]/route.ts`

- Route: `/api/users`
  - Proxies to: `${JSONPLACEHOLDER_URL}/users`
  - Query params: forwarded as-is (e.g., `?id=1`) — typical usage: fetch list of users
  - Returns: JSON array of users from JSONPlaceholder
  - Special: This forwarder injects browser-like headers (User-Agent, Accept, Accept-Language, Referer) to avoid anti-bot blocking for some upstreams.
  - File: `app/api/users/route.ts`

- Route: `/api/users/:id`
  - Proxies to: `${JSONPLACEHOLDER_URL}/users/:id`
  - Returns: single user JSON object from JSONPlaceholder
  - File: `app/api/users/[id]/route.ts`

Notes on request/response behavior:
- Each route uses a small `forward()` helper that fetches the target URL server-side, captures the response body and `content-type`, and returns a Next.js `Response` with the upstream status.
- The `/api/users` handlers add a small set of headers to mimic browser requests (this was required to avoid anti-bot/403 responses from some providers during development).

## 4. Services

All internal client-side service wrappers live in `src/services/` and call the internal Next.js API routes (`/api/*`). They return typed Promises.

- `services/userService.ts`
  - Resource: Users
  - Internal API: `/api/users` and `/api/users/:id`
  - Exported functions:
    - `getUsers(search?: string): Promise<User[]>`
      - Calls: `apiClient.get<User[]>('/api/users', params)`
      - Returns: array of `User` from the internal `/api/users` proxy
    - `getUserById(id: number): Promise<User>`
      - Calls: `apiClient.get<User>(`/api/users/${id}`)`
      - Returns: single `User`

- `services/postService.ts`
  - Resource: Posts (used as conversation last-message source)
  - Internal API: `/api/posts` and `/api/posts/:id`
  - Exported functions:
    - `getPosts(userId?: number, limit?: number): Promise<Post[]>`
      - Calls: `apiClient.get<Post[]>('/api/posts', params)`
      - Returns: array of `Post` objects (from JSONPlaceholder)

- `services/productService.ts`
  - Resource: Products
  - Internal API: `/api/products` and `/api/products/:id`
  - Exported functions:
    - `getProducts(limit?: number, skip?: number, category?: string): Promise<ProductsResponse>`
      - Calls: `apiClient.get<ProductsResponse>('/api/products', params)`
      - Returns: `ProductsResponse` { products, total, skip, limit }
    - `searchProducts(query: string): Promise<ProductsResponse>`
      - Calls: `apiClient.get<ProductsResponse>('/api/products', { search: query })`
    - `getProductById(id: number): Promise<Product>`
      - Calls: `apiClient.get<Product>(`/api/products/${id}`)`

- `services/chatService.ts`
  - Resource: In-memory chat data and AI reply simulation
  - Internal data sources: `data/mockConversations.ts` and `data/mockMessages.ts` (in-memory)
  - Exported functions:
    - `getConversations(): Promise<Conversation[]>`
      - Returns the in-memory `Conversation[]` copy (from `mockConversations` unless mapping elsewhere has replaced it)
    - `getMessagesByConversation(conversationId: string): Promise<Message[]>`
      - Returns messages for a thread (from `mockMessages`) or generates a single opener message if none exist, stores it in-memory, and returns it
    - `sendMessage(conversationId: string, content: string): Promise<Message>`
      - Appends a customer message to the in-memory messages map and returns the appended `Message`
    - `getAIResponse(userMessage: string, agentName?: string): Promise<AIMessage>`
      - Simulates typing and replies. Behavior:
        - If product-related keywords are present, attempts to fetch product data via `productService.searchProducts()` or `productService.getProducts()` to include product title and price in the reply.
        - Handles keywords for login / billing / cancel with deterministic help messages.
        - Otherwise returns a default assistant greeting.
      - Returns: `AIMessage` object (also constructed locally)

Notes:
- All `services/*` call the internal `/api/*` endpoints via `utils/apiClient` (which centralizes `fetch` and param handling) except `chatService` which uses local in-memory data.

## 5. Hooks

Hooks wrap service calls and provide state for components.

- `hooks/useConversations.ts`
  - What component uses it:
    - `app/inbox/page.tsx` (Inbox page) — this file calls `useConversations("all")` and passes the resulting `conversations` into `Sidebar`.
    - `components/inbox/Conversations.tsx` — uses `useConversations(state.activeFilter)` to render the conversation list.
    - `components/inbox/Details.tsx` — uses `useConversations("all")` to find the active conversation by id.
  - Data returned: `{ conversations: Conversation[], loading: boolean, error: string | null }`
  - Implementation notes:
    - It calls `userService.getUsers()` and `postService.getPosts()` and maps users -> `Conversation` objects (generates channel/team/status/assignee/label/unreadCount randomly) and sets `lastMessage` using the user's latest post.
    - Artificial delay: 2000ms (`await delay(2000)`) was added before resolving to make the UI skeleton visible for demonstration. Purpose: improve UX by showing loading state.

- `hooks/useChat.ts`
  - What component uses it:
    - `components/inbox/Chat.tsx` — the chat window uses `useChat(conversationId)` to load messages and to send messages.
  - Data returned: `{ messages: Message[], sendMessage: (content: string) => Promise<void>, isAITyping: boolean, loading: boolean, error: string | null }`
  - Implementation notes:
    - Calls `services/chatService.getMessagesByConversation(conversationId)` to fetch messages (in-memory).
    - Artificial delay: 1500ms (`await delay(1500)`) was added before resolving messages so chat skeletons render during load.

- `hooks/useProducts.ts`
  - What component uses it: (none found in UI codebase)
    - The hook itself calls `productService.getProducts()` or `productService.searchProducts()` and returns `{ products, total, loading, error }`.
  - Data returned: `{ products: Product[], total: number, loading: boolean, error: string | null }`
  - Artificial delays: none added here.
  - Notes: `productService` is used by `services/chatService.getAIResponse` at runtime; the hook appears unused by any UI component in the current codebase.

- `hooks/useUsers.ts`
  - What component uses it: none found in the current UI.
  - Data returned: `{ users: User[], loading: boolean, error: string | null }`
  - Artificial delay: 1500ms (`await delay(1500)`) was added to the hook to allow a details skeleton to show when the hook is used. Currently the UI does not call this hook; instead `Details.tsx` calls `userService.getUserById()` directly.

Notes on artificial delays:
- Delays were intentionally added to make loading states visible and are implemented using `const delay = (ms) => new Promise(res => setTimeout(res, ms))` before setting data in hooks.

## 6. Data Origin Table

| Data | Source | Real or Mock | Where It Appears in UI |
|---|---|---|---|
| Contact names | JSONPlaceholder `/users` (via `userService.getUsers`) OR fallbacks from `mockConversations` for in-memory threads | Real (from JSONPlaceholder) for dynamic flows; Mock for `chatService` threads | `components/inbox/Conversations.tsx`, `components/inbox/Details.tsx` header, chat message `senderName` in `Chat` |
| Contact emails | JSONPlaceholder `/users` | Real (JSONPlaceholder) | `components/inbox/Details.tsx` (Contact Data) — email shown when available via `userService.getUserById()` |
| Avatars in conversation list | Client-side generated DiceBear initials (based on `conversation.contactName`) OR stored avatar URLs in `data/mockConversations` for in-memory mock threads | Generated client-side (not provided by external APIs) / Mock avatars exist in `data/mockConversations` | `components/inbox/Conversations.tsx` avatar image (DiceBear) and `components/inbox/Details.tsx` when showing user avatar data |
| Last messages (conversation preview) | JSONPlaceholder `/posts` (via `postService.getPosts`) — mapped to `Conversation.lastMessage` in `useConversations` | Real (sourced from JSONPlaceholder posts) | `components/inbox/Conversations.tsx` last message preview |
| Chat messages (thread content) | `data/mockMessages.ts` in-memory or generated opener from `services/chatService.getMessagesByConversation()` | Mock / in-memory | `components/inbox/Chat.tsx` message list |
| AI replies | Generated locally in `services/chatService.getAIResponse` (may call `productService` to include real product data) | Hybrid: logic is local (mock AI) but product details injected from DummyJSON when relevant | `components/inbox/Chat.tsx` — AI message bubbles |
| Product info (title, price, thumbnail) | DummyJSON via `app/api/products` -> `services/productService` | Real (DummyJSON) | Injected into AI replies (`services/chatService.getAIResponse`) and available to any UI component that consumes `useProducts`/`productService` |
| Timestamps on conversations | Generated in `hooks/useConversations.ts` (randomized offsets) or from mock message timestamps in `data/mockMessages.ts` | Mock/generated | `components/inbox/Conversations.tsx` (relative time) and `Chat` (message times) |
| Channels (whatsapp/instagram/email/direct) | Generated randomly in `useConversations.ts` when mapping users -> conversations | Mock/generated | `components/inbox/Conversations.tsx`, `components/inbox/Details.tsx` (Contact Labels) |
| Teams (sales/customer_support/null) | Generated randomly in `useConversations.ts` | Mock/generated | `components/inbox/Details.tsx`, `Sidebar` counts and filters |
| Status (open/closed/unassigned) | Generated randomly in `useConversations.ts` | Mock/generated | `components/inbox/Conversations.tsx`, `Sidebar` filters/badges |
| Labels (e.g., VIP) | Generated randomly in `useConversations.ts` or present in `mockConversations` | Mock | `components/inbox/Details.tsx` (Contact Labels) |
| Unread counts | Generated randomly in `useConversations.ts` or present in `mockConversations` | Mock | `components/inbox/Conversations.tsx` (badge) and `Sidebar` counters |

## 7. Mock Data

Files containing mock data and why:

- `data/mockConversations.ts`
  - Contains an array of `Conversation` objects used by `services/chatService` as an in-memory conversation set.
  - Why mock: Provides predictable initial UI and enables offline/demo mode without relying on external APIs. It includes avatars, names, and labels used by the chat demo.

- `data/mockMessages.ts`
  - Contains per-conversation message arrays used by `services/chatService`.
  - Why mock: Chat threads are simulated for the demo (AI responses are generated locally) so real persisted messages are not required.

- Randomized fields in `useConversations.ts` (channel, team, status, assignee, label, unreadCount)
  - Why mock: JSONPlaceholder posts/users do not contain business-specific metadata (channel/team/status/labels). These are synthesized to make the UI realistic.

- Generated openers in `services/chatService.getMessagesByConversation`
  - When a conversation has no messages in-memory, `chatService` deterministically generates one opener message (derived from `conversationId`) so the chat UI is not empty.

Rationale for mocking:
- The external dummy APIs provide basic user/post/product data but not domain-specific fields required by the Inbox UI (assignees, teams, channels, labels, unread counters). Mocking fills that gap for UI development.

## 8. What Is Not Used

The following code and endpoints exist in the repository but are not actively rendered by the UI or are intentionally retained for development/debugging:

- `scripts/smoke-proxy-test.mjs`
  - Location: `scripts/smoke-proxy-test.mjs`
  - Purpose: Node script used during development to exercise local `/api/*` proxy routes.
  - Current status: Not used by the UI. It can be removed without affecting runtime UI. (If you want it removed, delete the file.)

- `hooks/useUsers.ts`
  - Location: `hooks/useUsers.ts`
  - Purpose: Hook to load users (wraps `userService.getUsers`).
  - Current status: No UI components invoke `useUsers` directly; `useConversations` calls `userService.getUsers()` instead. The hook is unused by the UI and may be removed if not required for future features.

- `hooks/useProducts.ts`
  - Location: `hooks/useProducts.ts`
  - Purpose: Hook to load products (wraps `productService`).
  - Current status: Not used by any UI component in the current codebase. `services/chatService` calls `productService` directly for AI replies, but the `useProducts` hook is unused and may be removed if not planned for product listing UI.

- Any `REQRES` integration
  - The repository previously contained references to ReqRes. During cleanup `REQRES_URL` was removed from `.env.local` and no code paths currently call ReqRes. There are no active `reqres` route handlers used by the UI.

- Unused type definitions
  - The primary type files (`types/conversation.ts`, `types/message.ts`, `types/user.ts`, `types/product.ts`) are referenced across the project. No further unused type files were found. If you add new types keep them coupled to consuming code.

- API route handlers
  - Active routes under `app/api/` are: `posts`, `products` (and `products/[id]`, `products/category/[category]`), and `users` (and `users/[id]`). All are used by services or by `chatService`.
  - If you add more route files under `app/api/` in the future, ensure a `services/*` wrapper is present or remove the route.

Reasons for keeping vs removing:
- Keep:
  - `services/*`, `app/api/*`, and hooks used by UI are required at runtime.
  - `chatService` and its mock data are intentionally kept because chat flows and AI reply logic are implemented locally (required for the demo and for offline development).
- Remove (safe to delete):
  - `scripts/smoke-proxy-test.mjs` (development utility)
  - `hooks/useUsers.ts` and `hooks/useProducts.ts` if you prefer not to have unused hooks lying around — they are safe to remove but are low-cost to keep for future use.

---

If you want, I can now:

- Remove the unused items listed above (e.g., delete `scripts/smoke-proxy-test.mjs`, remove unused hooks) and run `npx tsc --noEmit` to verify no breakage.
- Or open a PR with the deletions so you can review them.

Which cleanup action should I take next?