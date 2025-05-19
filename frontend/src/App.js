import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPrompt, clearHistory, loadHistory } from './features/chat/chatslice';

function App() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.chat);

    useEffect(() => {
    dispatch(loadHistory());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(sendPrompt(input));
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <h2>Chat with OpenAI</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
        <button type="button" onClick={() => dispatch(clearHistory())}>
          Clear
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        {history.map((entry, index) => (
          <div key={index} style={{ marginBottom: '1em' }}>
            <div><strong>You:</strong> {entry.prompt}</div>
            <div><strong>AI:</strong> {entry.response}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
