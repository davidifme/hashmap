export function HashMap() {
    let buckets = new Array(16);
    let loadFactor = 0.75;
    let size = 0;
  
    function hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
      }
      return hashCode;
    }
  
    function set(key, value) {
      let index = hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
  
      if (!buckets[index]) {
        buckets[index] = [{ key, value }];
        size++;
      } else {
        for (let entry of buckets[index]) {
          if (entry.key === key) {
            entry.value = value;
            return;
          }
        }
        buckets[index].push({ key, value });
        size++;
      }
  
      if (size / buckets.length > loadFactor) {
        resize();
      }
    }
  
    function get(key) {
      let index = hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
  
      if (!buckets[index]) return null;
      for (let entry of buckets[index]) {
        if (entry.key === key) return entry.value;
      }
      return null;
    }
  
    function has(key) {
      let index = hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
  
      if (!buckets[index]) return false;
      for (let entry of buckets[index]) {
        if (entry.key === key) return true;
      }
      return false;
    }
  
    function remove(key) {
      let index = hash(key);
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
  
      if (!buckets[index]) return false;
      for (let i = 0; i < buckets[index].length; i++) {
        if (buckets[index][i].key === key) {
          buckets[index].splice(i, 1);
          size--;
          if (buckets[index].length === 0) buckets[index] = undefined;
          return true;
        }
      }
      return false;
    }
  
    function length() {
      return size;
    }
  
    function clear() {
      buckets = new Array(16);
      size = 0;
    }
  
    function keys() {
      let keys = [];
      for (let bucket of buckets) {
        if (bucket) {
          for (let entry of bucket) {
            keys.push(entry.key);
          }
        }
      }
      return keys;
    }
  
    function values() {
      let values = [];
      for (let bucket of buckets) {
        if (bucket) {
          for (let entry of bucket) {
            values.push(entry.value);
          }
        }
      }
      return values;
    }
  
    function entries() {
      let entries = [];
      for (let bucket of buckets) {
        if (bucket) {
          for (let entry of bucket) {
            entries.push([entry.key, entry.value]);
          }
        }
      }
      return entries;
    }
  
    function resize() {
      let oldBuckets = buckets;
      buckets = new Array(oldBuckets.length * 2);
      size = 0;
  
      for (let bucket of oldBuckets) {
        if (bucket) {
          for (let entry of bucket) {
            set(entry.key, entry.value);
          }
        }
      }
    }
  
    return {
      set,
      get,
      has,
      remove,
      length,
      clear,
      keys,
      values,
      entries
    };
}
  
function HashSet() {
    const hashMap = HashMap();

    function add(key) {
        hashMap.set(key, true);
    }

    return {
        add,
        has: hashMap.has,
        remove: hashMap.remove,
        length: hashMap.length,
        clear: hashMap.clear,
        keys: hashMap.keys
    };
}