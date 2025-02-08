class Cache {
  constructor() {
    this.store = new Map(); // Use a Map to store key-value pairs
  }

  set(key, value, ttl) {
    const expiresAt = Date.now() + ttl; // Calculate expiration time
    this.store.set(key, { value, expiresAt });

    // Automatically delete the key after the TTL
    setTimeout(() => this.store.delete(key), ttl);
  }

  get(key) {
    const entry = this.store.get(key);

    if (entry) {
      if (Date.now() < entry.expiresAt) {
        return entry.value; // Return the value if it's not expired
      } else {
        this.store.delete(key); // Remove the expired entry
      }
    }

    return null; // Return null if key not found or expired
  }
}

const cache = new Cache();
cache.set("user1", { name: "John" }, 1000); // Expires in 1 second

console.log(cache.get("user1")); // Output: { name: "John" }

setTimeout(() => console.log(cache.get("user1")), 1500); // Output: null (after 1.5 seconds)
