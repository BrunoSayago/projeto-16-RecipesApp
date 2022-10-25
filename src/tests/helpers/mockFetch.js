import foodData from './mockData';

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(mockData),
});

export default mockFetch;
