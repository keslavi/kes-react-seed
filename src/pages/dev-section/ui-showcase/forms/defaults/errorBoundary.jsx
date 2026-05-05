import React from 'react';
import { toast } from 'react-toastify';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, errMsg: '', fileInfo: '', error: null, errorInfo: null };

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
      errMsg: error.toString(),
      fileInfo 
    };
  }

  componentDidCatch(error, info) {
    this.setState({ error, errorInfo: info });
    console.error("ErrorBoundary caught an error", error, info);
    console.error("Component stack:", info.componentStack);
    toast.error(`Error: ${error.toString()}`);
  }

  onRetry = () => {
    this.setState({ hasError: false, errMsg: '', fileInfo: '', error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position:'absolute',
          top:'50%',
          left:'50%',
          transform:'translate(-50%,-50%)',
          //width:'100%',
          backgroundColor:'#fff',
          borderRadius:'8px',
          boxShadow:'0 2px 10px 0 rgba(0, 0, 0, 0.1)',
          padding:'20px',
          textAlign:'center',
          maxWidth:'80%',
          maxHeight:'80%',
          overflow:'auto'
        }}>
          <h2 style={{ color: 'red' }}>Something went wrong.</h2>
          <p>{this.state.errMsg}</p>
          {this.state.fileInfo && (
            <p style={{ fontSize: '14px', color: '#666', fontFamily: 'monospace' }}>
              Location: {this.state.fileInfo}
            </p>
          )}
          <button onClick={this.onRetry} style={{ padding: '10px 20px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
            Retry
          </button>
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
      );
    }
    return this.props.children;
  }

}


