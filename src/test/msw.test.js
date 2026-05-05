// Test MSW setup - this test works with the global MSW server setup in _setupTest.js
describe('MSW Setup', () => {
  it('should intercept /api/public/tasks', async () => {
    // Test that MSW can intercept the API call
    const response = await fetch('/api/public/tasks');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('should intercept /api/public/options', async () => {
    // Test that MSW can intercept options API call
    const response = await fetch('/api/public/options');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toBeDefined();
  });
}); 