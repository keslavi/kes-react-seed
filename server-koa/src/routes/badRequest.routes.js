import Router from '@koa/router';

const router = new Router();

// GET endpoint that receives the request but never returns a response
// This simulates a server hang for testing purposes
router.get('/noResponse', async (ctx, next) => {
  console.log('🚫 BadRequest: Received request to /noResponse - simulating server hang');
  
  // Log the request details
  console.log('Request headers:', ctx.headers);
  console.log('Request query:', ctx.query);
  console.log('Request body:', ctx.request.body);
  
  // Simulate IIS hang behavior - create a Promise that never resolves
  // This will cause the request to hang indefinitely
  // The client will eventually timeout
  
  // Note: This endpoint is intentionally designed to never respond
  // It's used for testing timeout scenarios in the UI
  
  // Create a Promise that never resolves to simulate a true hang
  await new Promise(() => {
    // This Promise will never resolve, causing the request to hang
    // This mimics IIS behavior when it becomes unresponsive
  });
});
router.get('/delay', async (ctx, next) => {
  console.log('⏱️ BadRequest: Received request to /delay - simulating 10 second delay');
  await new Promise(resolve => setTimeout(resolve, 10000));
  console.log('✅ Delay completed, sending response');
  ctx.body = { message: 'Server delay simulated', delay: '10 seconds' };
});


export default router; 