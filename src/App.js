import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import './App.css';

const defaultMarkdown = `# Welcome to my Markdown Previewer!`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => setMarkdown(e.target.value);

  const resetMarkdown = () => setMarkdown(defaultMarkdown);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const getMarkdownText = () => {
    const rawHtml = marked(markdown, { breaks: true });
    return { __html: DOMPurify.sanitize(rawHtml) };
  };

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="toolbar">
        <button onClick={copyToClipboard}>{copied ? '✔ Copied!' : '📋 Copy'}</button>
        <button onClick={resetMarkdown}>🔄 Reset</button>
        <button onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="editor-preview">
        <textarea
          id="editor"
          value={markdown}
          onChange={handleChange}
          placeholder="Insert Markdown here..."
        />
        <div
          id="preview"
          dangerouslySetInnerHTML={getMarkdownText()}
        />
      </div>
    </div>
  );
}

export default App;