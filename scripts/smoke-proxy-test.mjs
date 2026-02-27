const BASE = process.env.BASE_URL || 'http://localhost:3000';
const endpoints = [
  '/api/posts',
  '/api/posts/1',
  '/api/users',
  '/api/users/2',
  '/api/products',
  '/api/products/1',
  '/api/products?search=phone',
  '/api/products/category/smartphones',
];

function short(obj) {
  try {
    return JSON.stringify(obj, null, 2).slice(0, 800);
  } catch {
    return String(obj).slice(0, 400);
  }
}

(async function run() {
  for (const path of endpoints) {
    const url = BASE + path;
    try {
      const res = await fetch(url);
      const status = res.status;
      let first = null;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data)) first = data[0];
        else if (data && typeof data === 'object') {
          if (Array.isArray(data.data)) first = data.data[0];
          else if (Array.isArray(data.products)) first = data.products[0];
          else if (Array.isArray(data.posts)) first = data.posts[0];
          else first = Object.values(data)[0] ?? data;
        } else first = data;
      } else {
        const txt = await res.text();
        first = txt.slice(0, 200);
      }
      console.log(`${url} -> ${status}\nFirst: ${short(first)}\n`);
    } catch (err) {
      console.log(`${url} -> ERROR: ${err.message}\n`);
    }
  }
})();
