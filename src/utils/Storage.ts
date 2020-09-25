interface Options {
  key: string;
  value: string;
}
export default class MyStorage {
  _keys: string[];
  currentId = 0;
  constructor() {
    this._keys = [];
  }

  // JSON "set" example
  async setObject(item: Options) {
    this._keys.push(item.key);
    Promise.resolve(() => {
      localStorage.setItem(
        item.key,
        JSON.stringify({
          id: this.currentId,
          value: item.value
        })
      );
      this.currentId++;
    });
  }

  // eslint-disable-next-line
  async getObject<T extends any>(item: { key: string }): Promise<T | null> {
    const ret = localStorage.getItem(item.key);
    const value: T | null = ret ? JSON.parse(ret) : null;
    return value;
  }

  async setItem(item: Options) {
    this._keys.push(item.key);
    Promise.resolve(localStorage.setItem(item.key, JSON.stringify(item.value)));
  }

  async getItem(key: string) {
    const value = await localStorage.getItem(key);
    // console.log("Got item: ", value);
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  }

  async removeItem(key: string) {
    await localStorage.removeItem(key);
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
