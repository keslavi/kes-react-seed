import { Fieldset } from "components";

export const Headers = () => {
  return (
    <>
      <h1>h1-h6 non Fieldset Example</h1>
      <h4 data-h4-color-alt>4 data-h4-color-alt h4 *frequently below initial h2</h4>
      <br />
      <h1>1 This is a sample h1</h1>
      <h2>2 This is a sample h2</h2>
      <h3>3 This is a sample h3</h3>
      <h4>4 regular sample h4</h4>
      <h4 data-h4-color-alt>4 data-h4-color-alt h4</h4>
      <h4 data-h4-subtitle>4 data-h4-subtitle h4</h4>
      <h5>5 This is a sample h5</h5>
      <h6>6 This is a sample h6</h6>
      <hr />
      <h1>h1-h6 Fieldset Example</h1>
      <Fieldset>
        <h1>1 This is a sample h1</h1>
        <h2>2 This is a sample h2</h2>
        <h3>3 This is a sample h3</h3>
        <h4>4 regular sample h4</h4>
        <h4 data-h4-color-alt>4 data-h4-color-alt h4</h4>
        <h4 data-h4-subtitle>4 data-h4-subtitle h4</h4>
        <h5>5 This is a sample h5</h5>
        <h6>6 This is a sample h6</h6>
      </Fieldset>
      <br/>
    </>
  );
};
