export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Test Page - Baianê LP</h1>
      <p>Se você está vendo isso, o deploy está funcionando.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
}
