const Storybook = () => {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 90px)' }}>
      <iframe
        title="Storybook"
        src="/storybook/index.html"
        style={{ width: '100%', height: '100%', border: '0' }}
      />
    </div>
  );
};

export default Storybook;
