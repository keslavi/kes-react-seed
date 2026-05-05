import {
  Col,
  Row,
//  TableRows,
  Fieldset,
//  LabelHeading,
  labelHeadingVariant as lv,
  AlertInline,
} from "components";
import { AlertTitle, Button } from "@mui/material";

const renderAlertInline = () => {
  const types = ["success", "info", "warning", "error"];//, "banner"];
  return types.map((type) => (
    <Col size={12} key={type}>
      <AlertInline type={type} key={type}>
        <AlertTitle>{type}</AlertTitle>
      </AlertInline>
    </Col>
  ));
};


export const AlertInlineSection = () => {
  return (
    <>
      <h1>TableRows</h1>
      <Fieldset>
        <Row>
          {renderAlertInline()}
          <Col size={12}>
            <AlertInline type='success' icon={false}>
              example with no icon
            </AlertInline>
          </Col>
          <Col size={12}>
            <AlertInline type='banner'
              action={<>
                <Button variant="outlined" color="primary">Yes</Button>
                <Button variant="link" color="primary">No</Button>
              </>}
            >
              confirmations usually have buttons to for yes /no
            </AlertInline>
          </Col>
        </Row>
      </Fieldset >
    </>
  );
};


