import {
  Col,
  Row,
  Fieldset,
} from "components";
import { Button } from "@mui/material";

const renderButtons = (id) => (
  <>
    <Row>
      <Col size={6}> |far left</Col>
      <Col size={6} style={{ justifyItems: 'right' }}>far right|</Col>
    </Row>
    <Row>
      <Col size={3}>{id}.1 (default) </Col>
      <Col style={{ flex: 1 }}><code>{'<Button>Default</Button>'}</code></Col>
      <Col size={2} style={{ justifyItems: 'right' }}><Button>Submit</Button></Col>
    </Row>
    <Row>
      <Col size={3}>{id}.2 Primary</Col>
      <Col style={{ flex: 1 }}><code>{'<Button variant="contained">Submit</Button>'}</code></Col>
      <Col size={2} style={{ justifyItems: 'right' }}><Button variant="contained">Primary</Button></Col>
    </Row>
    <Row>
      <Col size={3}>{id}.3 Secondary</Col>
      <Col style={{ flex: 1 }}><code>{'<Button variant="link">Submit</Button>'}</code> (or no variant)</Col>
      <Col size={2} style={{ justifyItems: 'right' }}><Button variant="link">Secondary</Button></Col>
    </Row>
    <Row>
      <Col size={3}>{id}.3 Outlined</Col>
      <Col style={{ flex: 1 }}><code>{'<Button variant="outlined">Submit</Button>'}</code></Col>
      <Col size={2} style={{ justifyItems: 'right' }}><Button variant="outlined">Outlined</Button></Col>
    </Row>
    <br/>
  </>
)


export const ButtonsSection = () => {
  return (
    <>
      <h1>Buttons outside of Fieldset</h1>
      <h4 data-h4-color-alt>Buttons are larger.  primary button is contained, secondary is link</h4>
      <Button variant="contained">Primary</Button> &nbsp;&nbsp;<Button>Secondary</Button>
      <br/>
      <br/>
      {renderButtons(1)}
      <Fieldset>
        <h2>Buttons inside of Fieldset</h2>
        <h4 data-h4-color-alt>Buttons are smaller.  primary button is outlined, secondary is link</h4>
        <Button variant="contained">Primary</Button> &nbsp;&nbsp;<Button>Secondary</Button>
        {renderButtons(2)}
      </Fieldset>
    </>
  );
};
