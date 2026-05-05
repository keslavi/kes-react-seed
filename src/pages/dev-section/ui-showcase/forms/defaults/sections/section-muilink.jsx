import {
  Col,
  Row,
  TableRows,
  //  TableRows,
  Fieldset,
  //  LabelHeading,
  labelHeadingVariant as lv,
} from "components";
import { AlertTitle, Button } from "@mui/material";
import { Link } from "@mui/material";



export const MuiLinkSection = () => {
  return (
    <>
      <h1>Link Examples</h1>
      <Fieldset>
        <TableRows>
          <Row>
            <Col flexGrow={1}>
              1 Current Behavior
            </Col>
            <Col size={6}>
              {'<Link variant="current">Example 1</Link>'}
            </Col>
            <Col flexGrow={1} sx={{ textAlign: 'right' }}>
              <Link variant="current" onClick={() => alert('Example clicked')}>Example 1</Link>
            </Col>
          </Row>          
          <Row>
            <Col flexGrow={1}>
              2 Link Example
            </Col>
            <Col size={6}>
              {'<Link>Example 2</Link>'}
              <br/>when i added color change on hover, noticed it looked odd
            </Col>
            <Col flexGrow={1} sx={{ textAlign: 'right' }}>
              <Link onClick={() => alert('Example clicked')}>Example 2</Link>
            </Col>
          </Row>
          <Row>
            <Col flexGrow={1}>
              3 always underline
            </Col>
            <Col size={6}>
              {'<Link underline="always">Example 3</Link>'}
            </Col>
            <Col flexGrow={1} sx={{ textAlign: 'right' }}>
              <Link underline="always">Example 3</Link>
            </Col>
          </Row>
          <Row>
            <Col flexGrow={1}>
              4.1 Do we mean this?
            </Col>
            <Col size={6}>
              Heron is static, i think it's showing the hover color.
              <br /> does this make sense? primary blue, then lighter on hover<br />
            </Col>
            <Col flexGrow={1} sx={{ textAlign: 'right' }}>
              <Link variant="dark">Example 4.1</Link>
            </Col>
          </Row>
          <Row>
            <Col flexGrow={1}>
              4.2 or no underline?
            </Col>
            <Col size={6}>
              
            </Col>
            <Col flexGrow={1} sx={{ textAlign: 'right' }}>
              <Link variant="dark" underline="none">Example 4.2</Link>
            </Col>
          </Row>
        </TableRows>
      </Fieldset>
    </>
  );
};


