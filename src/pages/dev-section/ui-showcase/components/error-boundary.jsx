import React from 'react';
import { toast } from 'react-toastify';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Extract file and line from stack trace
    const stackLines = error.stack?.split('\n') || [];
    let fileInfo = '';
    
    // Try to find the first meaningful line in the stack (skip error message line)
    for (let i = 1; i < stackLines.length; i++) {
      const line = stackLines[i];
      // Look for file path patterns (e.g., "at Component (file.jsx:123:45)")
      const match = line.match(/\((.+):(\d+):(\d+)\)/) || line.match(/at\s+(.+):(\d+):(\d+)/);
      if (match) {
        const filePath = match[1];
        const lineNum = match[2];
        const colNum = match[3];
        // Extract just the filename from the full path
        const fileName = filePath.split(/[/\\]/).pop();
        fileInfo = `${fileName}:${lineNum}:${colNum}`;
        break;
      }
    }

    return { 
      hasError: true, 
      fileInfo,
      errMsg:`
      This screen is trying to say, you got an error: please check if you  have at least defaults--public to run it.
      Otherwise, please check env.local VITE_FORMHELPER_DEFAULT. error: ${error}
      ${fileInfo ? `\n\nError location: ${fileInfo}` : ''}
    `};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary (UI showcase) caught an error", error, errorInfo);
    console.error("Component stack:", errorInfo.componentStack);
    toast.error(`An error occurred: ${error}`);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (<div
        style={{
          position:'absolute',
          top:"50%",
          left:"50%",
          transform:"translate(-50%,-50%)",
          textAlign:"center",
          backgroundColor:"#fff",
          padding:"20px",
          borderRadius:"8px",
          boxShadow:"0 2px 10px rgba(0, 0, 0, 0.1)",
          maxWidth:"80%",
          maxHeight:"80%",
          overflow:"auto"
        }}>
          <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
            {this.state.errMsg}
          </div>
          {this.state.error && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Stack Trace</summary>
              <pre style={{ 
                fontSize: '12px', 
                overflow: 'auto', 
                backgroundColor: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '4px',
                textAlign: 'left'
              }}>
                {this.state.error.stack}
              </pre>
            </details>
          )}
          {this.state.errorInfo && (
            <details style={{ marginTop: '10px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Component Stack</summary>
              <pre style={{ 
                fontSize: '12px', 
                overflow: 'auto', 
                backgroundColor: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '4px',
                textAlign: 'left'
              }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
    )}
    return this.props.children;
  }
}