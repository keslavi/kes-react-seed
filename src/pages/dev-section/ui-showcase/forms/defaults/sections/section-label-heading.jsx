import {
  Col,
  Row,
  TableRows,
  Fieldset,
  LabelHeading,
} from "components";

export const LabelHeadingSection = () => {
  return (
    <>
      <h1>LabelHeadings & TableRows</h1>
      <Fieldset>
        <Row>
          <Col size={12}>
            <LabelHeading variant="h1b">example of upper label H1B</LabelHeading>
            <p data-block-subtext>this is a subtitle example using p with data-block-subtext attribute.</p>
          </Col>
        </Row>

        <TableRows>
          <Row>
            <Col style={{ flex: 1 }}>
              <b>Style/Variant<br />
                {/* LabelHeading<br/> */}
                {/* NOT &lt;h&gt; */}
              </b>
            </Col>
            <Col style={{ flex: 1 }}>
              <b>H1</b>
            </Col>
            <Col style={{ flex: 1 }}>
              <b>H2</b>
            </Col>
            <Col style={{ flex: 1 }}>
              <b>H3</b>
            </Col>
            <Col style={{ flex: 1 }}>
              <b>H4</b>
            </Col>
            <Col style={{ flex: 1 }}>
              <b>H5</b>
            </Col>
            <Col style={{ flex: 1 }}>
              <b>H6</b>
            </Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>light</Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h1" light>H1 Light</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h2" light>H2 Light</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h3" light>H3 Light</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h4" light>H4 Light</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h5" light>H5 Light</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h6" light>H6 Light</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>bold</Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h1" bold>H1 Bold</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h2" bold>H2 Bold</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h3" bold>H3 Bold</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h4" bold>H4 Bold</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h5" bold>H5 Bold</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h6" bold>H6 Bold</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>boldish</Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h1" boldish>H1 Boldish</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h2" boldish>H2 Boldish</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h3" boldish>H3 Boldish</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h4" boldish>H4 Boldish</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h5" boldish>H5 Boldish</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h6" boldish>H6 Boldish</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>regular</Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h1" regular>H1 Regular</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h2" regular>H2 Regular</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h3" regular>H3 Regular</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h4" regular>H4 Regular</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h5" regular>H5 Regular</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h6" regular>H6 Regular</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>dark</Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h1" dark>H1 Dark</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h2" dark>H2 Dark</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h3" dark>H3 Dark</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h4" dark>H4 Dark</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h5" dark>H5 Dark</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h6" dark>H6 Dark</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>error</Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h1" errorColor>H1 Error</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h2" errorColor>H2 Error</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h3" errorColor>H3 Error</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h4" errorColor>H4 Error</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h5" errorColor>H5 Error</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h6" errorColor>H6 Error</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>link</Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h1" link onClick={() => alert('link clicked')}>H1 Link</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h2" link onClick={() => alert('link clicked')}>H2 Link</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h3" link onClick={() => alert('link clicked')}>H3 Link</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h4" link onClick={() => alert('link clicked')}>H4 Link</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h5" link onClick={() => alert('link clicked')}>H5 Link</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h6" link onClick={() => alert('link clicked')}>H6 Link</LabelHeading></Col>
          </Row>
          <Row>
            <Col style={{ flex: 1 }}>link disabled</Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h1" disabled link onClick={() => alert('link clicked')}>H1 Link Disabled</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h2" disabled link onClick={() => alert('link clicked')}>H2 Link Disabled</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h3" disabled link onClick={() => alert('link clicked')}>H3 Link Disabled</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h4" disabled link onClick={() => alert('link clicked')}>H4 Link Disabled</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h5" disabled link onClick={() => alert('link clicked')}>H5 Link Disabled</LabelHeading></Col>
            <Col style={{ flex: 1 }}><LabelHeading variant="h6" disabled link onClick={() => alert('link clicked')}>H6 Link Disabled</LabelHeading></Col>
          </Row>
        </TableRows>
      </Fieldset>
    </>
  );
};
