import { storybookIndexUrl } from "kes-formhelper-mui/storybook-embed";

const Storybook = () => (
  <div style={{ width: "100%", height: "calc(100vh - 90px)" }}>
    <iframe
      title="Storybook"
      src={storybookIndexUrl()}
      style={{ width: "100%", height: "100%", border: 0 }}
    />
  </div>
);

export default Storybook;
