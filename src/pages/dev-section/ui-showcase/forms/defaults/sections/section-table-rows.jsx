import {
  Col,
  Row,
  TableRows,
  Fieldset,
  LabelHeading,
  labelHeadingVariant as lv,
} from "components";

export const TableRowsSection = () => {
  return (
    <>
      <h1>TableRows</h1>
      <Fieldset>
        <TableRows>
          <Row>
            <Col style={{ flex: 1 }}>
              <LabelHeading variant={lv.h2}>Field 1</LabelHeading>
            </Col>
            <Col style={{ flex: 1 }}>
              <LabelHeading variant={lv.h2}>Field 2</LabelHeading>
            </Col>
            <Col style={{ flex: 1 }}>
              <LabelHeading variant={lv.h2}>Field 3</LabelHeading>
            </Col>
            <Col style={{ flex: 1 }}>
              <LabelHeading variant={lv.h2}>Field 4</LabelHeading>
            </Col>
            <Col style={{ flex: 1 }}>
              <LabelHeading variant={lv.h2}>Field 5</LabelHeading>
            </Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>data 1A</Col>
            <Col style={{ flex: 1 }}>data 1B</Col>
            <Col style={{ flex: 1 }}>data 1C</Col>
            <Col style={{ flex: 1 }}>data 1D</Col>
            <Col style={{ flex: 1 }}>data 1E</Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>data 2A</Col>
            <Col style={{ flex: 1 }}>data 2B</Col>
            <Col style={{ flex: 1 }}>data 2C</Col>
            <Col style={{ flex: 1 }}>data 2D</Col>
            <Col style={{ flex: 1 }}>data 2E</Col>
          </Row>
        </TableRows>
        <br />
        <Row>
          <Col size={12}><b>example end:</b>note that we can use Col style={'{{flex:1}}'} to get autosized columns</Col>
          <Col size={12}><b>example WITHOUT {'<TableRows>'}</b></Col>
        </Row>
        <br />
        <Row>
          <Col style={{ flex: 1 }}>
            <LabelHeading variant={lv.h2}>Field 1</LabelHeading>
          </Col>
          <Col style={{ flex: 1 }}>
            <LabelHeading variant={lv.h2}>Field 2</LabelHeading>
          </Col>
          <Col style={{ flex: 1 }}>
            <LabelHeading variant={lv.h2}>Field 3</LabelHeading>
          </Col>
          <Col style={{ flex: 1 }}>
            <LabelHeading variant={lv.h2}>Field 4</LabelHeading>
          </Col>
          <Col style={{ flex: 1 }}>
            <LabelHeading variant={lv.h2}>Field 5</LabelHeading>
          </Col>
        </Row>
        <Row>
          <Col style={{ flex: 1 }}>data 1A</Col>
          <Col style={{ flex: 1 }}>data 1B</Col>
          <Col style={{ flex: 1 }}>data 1C</Col>
          <Col style={{ flex: 1 }}>data 1D</Col>
          <Col style={{ flex: 1 }}>data 1E</Col>
        </Row>
        <Row>
          <Col style={{ flex: 1 }}>data 2A</Col>
          <Col style={{ flex: 1 }}>data 2B</Col>
          <Col style={{ flex: 1 }}>data 2C</Col>
          <Col style={{ flex: 1 }}>data 2D</Col>
          <Col style={{ flex: 1 }}>data 2E</Col>
        </Row>
      </Fieldset>
    </>
  );
};
