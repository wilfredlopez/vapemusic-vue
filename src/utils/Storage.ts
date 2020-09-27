interface Options {
  key: string;
  value: string;
}
export default class MyStorage {
  _keys: string[];
  constructor() {
    this._keys = [];
  }

  // JSON "set" example
  async setObject(item: Options) {
    this._keys.push(item.key);

    localStorage.setItem(item.key, item.value);
  }

  // eslint-disable-next-line
  async getObject<T extends any>(item: { key: string }): Promise<T | null> {
    const ret = localStorage.getItem(item.key);
    const value: T | null = ret ? JSON.parse(ret) : null;
    return value;
  }

  async setItem(item: Options) {
    this._keys.push(item.key);
    localStorage.setItem(item.key, item.value);
  }

  //eslint-disable-next-line
  async getItem<T = any>(key: string) {
    const value = localStorage.getItem(key);
    if (value === null) {
      return null;
    }
    return JSON.parse(value) as T | null;
  }

  async removeItem(key: string) {
    localStorage.removeItem(key);
  }

  get keys() {
    return this._keys;
  }

  async clear() {
    for (const key of this._keys) {
      this.removeItem(key);
    }
  }
}

export const Storage = new MyStorage();
