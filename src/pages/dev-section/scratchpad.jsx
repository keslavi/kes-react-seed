import { useState } from "react";
import api from "@/store/api";
import { Button } from "@mui/material";
import { store } from "@/store";


export const Scratchpad = () => {
  const [result, setResult] = useState(null);
  const loading = store.use.loading();

  const onTestNoResponse = async () => {
    setResult(null);

    try {
      console.log(["all"],"🚀 Making request to badRequest/noResponse (with spinner by default)...");
      const response = await api.get("/public/badRequest/noResponse");
      console.log(["all"],"✅ Response received:", response);
      setResult({ success: true, data: response.data });
    } catch (error) {
      console.error("❌ Error from badRequest/noResponse:", error);
      setResult({ 
        success: false, 
        error: error.message,
        code: error.code,
        status: error.response?.status
      });
    } 
  };

  const onTestNoResponseNoSpinner = async () => {
    setResult(null);

    try {
      console.log(["all"],"🚀 Making request to badRequest/noResponse (no spinner)...");
      const response = await api.get("/public/badRequest/noResponse", { blockUi: false });
      console.log(["all"],"✅ Response received:", response);
      setResult({ success: true, data: response.data });
    } catch (error) {
      console.error("❌ Error from badRequest/noResponse:", error);
      setResult({ 
        success: false, 
        error: error.message,
        code: error.code,
        status: error.response?.status
      });
    } 
  };
  const onDelayResponse = async () => {
    setResult(null);
    try {
      console.log("🚀 Making request to delay...");
      const response = await api.get("/public/badRequest/delay");
      console.log(["all"],"✅ Response received:", response);
      setResult({ success: true, data: response.data });
    } catch (error) {
      console.error("❌ Error from badRequest/delay:", error);
      setResult({ 
        success: false, 
        error: error.message,
        code: error.code,
        status: error.response?.status
      });
    } 
  };


  return (
    <div>
      <h4>Scratchpad</h4>
      
      <div style={{ margin: "20px 0" }}>
        <h5>Test BadRequest/NoResponse Endpoint</h5>
        <p>This will call the endpoint that never responds to test timeout behavior. The first button shows the default behavior (with spinner), the second button demonstrates how to disable the spinner using blockUi: false.</p>
        
        <Button 
          variant="outlined"
          onClick={onTestNoResponse}
          disabled={loading}
        >
          no response (with spinner by default)
        </Button>
        <Button 
          variant="outlined"
          onClick={onTestNoResponseNoSpinner}
          disabled={loading}
        >
          no response (no spinner)
        </Button>
        <Button 
          variant="outlined"
          onClick={onDelayResponse}
          disabled={loading}
        >
          delayed response
        </Button>
        
        {loading && (
          <div style={{ marginTop: "10px", color: "#666" }}>
            ⏳ Request in progress... (this should hang until timeout)
          </div>
        )}
        
        {result && (
          <div style={{ 
            marginTop: "20px", 
            padding: "15px", 
            backgroundColor: result.success ? "#d4edda" : "#f8d7da",
            border: `1px solid ${result.success ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "4px"
          }}>
            <h6>{result.success ? "Success" : "Error"}</h6>
            <pre style={{ fontSize: "12px", overflow: "auto" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scratchpad;