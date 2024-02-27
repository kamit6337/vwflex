class Fetch {
  constructor(url, { accessToken = "", willCache = true, revalidation } = {}) {
    this.envUrl = url;
    this.accessToken = accessToken;
    this.isCached = willCache;
    this.globalRevalidation = revalidation;
  }

  async request(url, options) {
    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        const data = await res.json();
        const error = new Error(data.message);
        error.status = res.status;
        throw error;
      }

      return res.json();
    } catch (error) {
      throw error;
    }
  }

  getHeaders() {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.accessToken}`, // Include your access token here
        "Content-Type": "application/json", // Include other headers as needed
      },
    };

    return headers;
  }

  async get(path, { params, revalidate, tags, cache = true } = {}) {
    const url = new URL(`${this.envUrl}${path}`);

    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }

    const options = {
      next: {},
      method: "GET",
      credentials: "include",

      ...this.getHeaders(),
    };

    if (this.globalRevalidation) {
      options.next.revalidate = this.globalRevalidation;
    }

    if (revalidate) {
      options.next.revalidate = revalidate;
    }

    if (tags) {
      options.next.tags = [...tags];
    }

    if (!this.isCached) {
      delete options.next;
      options.cache = "no-cache";
    } else {
      if (!cache) {
        delete options.next;
        options.cache = "no-cache";
      }
    }

    return this.request(url, options);
  }

  async post(path, body) {
    const url = new URL(`${this.envUrl}${path}`);

    const options = {
      method: "POST",
      body: JSON.stringify(body),
      ...this.getHeaders(),
    };

    return this.request(url, options);
  }

  async patch(path, body) {
    const url = new URL(`${this.envUrl}${path}`);

    const options = {
      method: "PATCH",
      body: JSON.stringify(body),
      ...this.getHeaders(),
    };

    return this.request(url, options);
  }

  async delete(path, params) {
    const url = new URL(`${this.envUrl}${path}`);

    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }

    const options = {
      method: "DELETE",
      ...this.getHeaders(),
    };

    return this.request(url, options);
  }
}

export default Fetch;
