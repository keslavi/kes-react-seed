const STORYBOOK_URL = '/storybook-dist/?path=/docs/formhelper--docs';

const Storybook = () => (
  <div style={{ width: "100%", height: "calc(100vh - 90px)" }}>
    <iframe
      title="Storybook"
      src={STORYBOOK_URL}
      style={{ width: "100%", height: "100%", border: 0 }}
    />
  </div>
);

export default Storybook;
