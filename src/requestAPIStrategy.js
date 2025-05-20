// Strategy Interface
class RequestStrategy {
  constructor(data) {
    this.data = data; // enum data : id || orders
  }
  setClient(instance) {
    if (!instance) {
      throw new Error("Invalid client instance");
    }
    this.client = instance;
  }
  isFunctionAvailable() {
    if (typeof this.client[this.function_name] !== "function") {
      throw new Error(`Method ${this.function_name} is not defined on client`);
    }
    return true;
  }
  execute() {
    throw new Error('Method "execute" must be implemented');
  }
}

// Batch Processing Strategy
class SequentialBatchStrategy extends RequestStrategy {
  async execute(function_name = "crawl") {
    this.function_name = function_name || this.function_name;
    this.isFunctionAvailable(); // Use isFunctionAvailable

    const stacks = [];
    this.data.forEach((item) => {
      stacks.push(this.client[this.function_name](item));
    });

    return await Promise.all(stacks).then((values) => {
      return values;
    });
  }
}

// Streaming Strategy
class SingleRequestStrategy extends RequestStrategy {
  async execute(function_name = "crawl") {
    this.function_name = function_name || this.function_name;
    this.isFunctionAvailable(); // Use isFunctionAvailable

    return await this.client[this.function_name](this.data);
  }
}

// New ChunkedBatchStrategy Strategy
class ChunkedBatchStrategy extends RequestStrategy {
  async execute(function_name = "crawl") {
    this.function_name = function_name || this.function_name;
    this.isFunctionAvailable(); // Use isFunctionAvailable

    const MAX_BATCH = 5; // Number of requests to process in parallel
    const chunks = this._createChunks(this.data, MAX_BATCH); // Extracted chunking logic
    let totalResult = [];
    for (const chunk of chunks) {
      const result = await this._chunkExecute(chunk);
      if (!result || result.length === 0) {
        continue; // Early return for empty or invalid results
      }
      totalResult = [...totalResult, ...result];
    }
    return totalResult;
  }

  _createChunks(data, chunkSize) {
    if (!data || data.length === 0) {
      return []; // Early return for empty data
    }
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
  }

  async _chunkExecute(chunk) {
    if (!chunk || chunk.length === 0) {
      return []; // Early return for empty chunks
    }
    this.isFunctionAvailable(); // Use isFunctionAvailable

    const stacks = [];
    chunk.forEach((item) => {
      stacks.push(this.client[this.function_name](item));
    });

    return await Promise.all(stacks).then((values) => {
      return values;
    });
  }
}

// Strategy Selector
class RequestStrategySelector {
  static getStrategy(data) {
    if (typeof data === "string") {
      return new SingleRequestStrategy(data);
    }
    // enum of data : data = {id,market} || data = {orders,market}
    if (data.length === 0) {
      throw new Error("Data is empty");
    }

    const length = data.length;
    const EDGE_POWER = 5;
    const MINIMUM = 1;

    if (data && length > MINIMUM && length <= EDGE_POWER) {
      return new SequentialBatchStrategy(data);
    }

    return new ChunkedBatchStrategy(data);
  }
}

export {
  RequestStrategySelector,
  SequentialBatchStrategy,
  SingleRequestStrategy,
  ChunkedBatchStrategy,
};
