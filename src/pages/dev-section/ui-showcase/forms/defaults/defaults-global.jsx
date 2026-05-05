import {yup} from "@/helpers/form-validation";
import { Button } from "@mui/material";
import {
  Fieldset,
  Row,
  Col,
  Input,
  LabelMask,
  maskPattern
} from "components";

//schema, options, item are below Children

export const Children = () => {
  return (
    <>
      <h1>defaults-global</h1>
      <Fieldset>
        <Row><Col><Button variant="contained">yo1!</Button></Col></Row>
      </Fieldset>
      <Row>
        <Col size={12}>
          <Button variant="contained" size="small">yo1!</Button>
          <Button variant="contained" size="medium">yo1!</Button>
          <Button variant="contained" size="large">yo1!</Button>
        </Col>
      </Row>

      <Row><Col size={12}>
        {/* <br /><br /> */}
        <h4>UI showcase defaults-0</h4>
        {/* <br /><div style={{ color: 'red' }}>THIS IS NOT THE PATTERN FOR A FORM, USE TASK.JSX PATTERN. THIS IS FOR BENCH TESTING ONLY.</div>
        <br /><div style={{ color: 'red' }}>yup validation in particular is not the correct pattern for a form</div> */}
      </Col></Row>
      <Row>
        <Input
          textarea
          //minRows={5}
          charCount={10}
          name="subject"
          label="Char Count"
        />

        {/* <Input
          name="subject"
          label="Subject"
          placeholder="Enter subject"
          info="header1|body1"
        /> */}
        <Input charCount={10} name="body" label="Body" />
      </Row>
      <Row>
        <Input
          name="names"
          label="Names (checkbox)"
          optionsCheckbox={options.task.names}
          info="header1|body1"
        //error={{ message: "Some error" }}
        />
        <Input
          size={{ xs: 6 }}
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={options.task.names}
        />
      </Row>
      <Row>
        <Input
          name="status"
          label="Status (select)"
          select
          options={options.task.status}
          //          placeholder="Select a status" 
          info="header2|body2"
        />
        <Input
          name="result"
          label="Result (autocomplete)"
          options={options.task.result}
          info="header3|body3"
        />
      </Row>
      <Row>
        <h3>Masked Input Examples</h3>
      </Row>
      <Row>
        <h4>Date Mask Examples</h4>
      </Row>
      <Row>
        <Input
          name="dob"
          label="Date of Birth (MM/DD/YYYY)"
          mask={maskPattern.date}
          info="Enter your date of birth in MM/DD/YYYY format"
          readOnly
        />
        <Input
          name="dobEmpty"
          label="Date of Birth (Empty)"
          mask={maskPattern.date}
          info="Empty date field with MM/DD/YYYY format"
        />
        <Input
          datepicker
          name="dob2"
          label="Date of Birth (Datepicker)"
          info="Empty date field with MM/DD/YYYY format"
        />
      </Row>
      <Row>
        <Input
          name="ssn"
          label="SSN"
          mask={maskPattern.ssn}
          info="Enter your 9-digit SSN in format XXX-XX-XXXX"
        />
        <Input
          name="ssn2"
          label="SSN2"
          mask={maskPattern.ssn}
          info="Enter your 9-digit SSN in format XXX-XX-XXXX"
        />
      </Row>
      <Row>
        <Input
          name="ssnPartial"
          label="SSN (Partial Mask)"
          mask={maskPattern.ssn}
          showLast={4}
          info="SSN with partial masking - shows last 4 digits when masked"
        />
      </Row>
      <Row>
        <Input
          name="licensePlate"
          label="License Plate"
          mask={maskPattern.licensePlate}
          info="Enter license plate in format AAA-1234 (3 letters, dash, 4 numbers)"
        />
      </Row>



      <Row>
        <h3>Label Mask Examples</h3>
      </Row>
      <Row>
        <Col size={6}>
          <h4>SSN Label Mask (Children)</h4>
          <LabelMask mask={maskPattern.ssn}>123456789</LabelMask>
        </Col>
        <Col size={6}>
          <h4>SSN Label Mask (Text Prop)</h4>
          <LabelMask mask={maskPattern.ssn} text="123456789" />
        </Col>
      </Row>
      <Row>
        <Col size={6}>
          <h4>Phone Number Label Mask</h4>
          <LabelMask mask={maskPattern.phone}>5551234567</LabelMask>
        </Col>
        <Col size={6}>
          <h4>License Plate Label Mask</h4>
          <LabelMask mask={maskPattern.licensePlate}>ABC1234</LabelMask>
        </Col>
      </Row>
      <Row>
        <Col size={6}>
          <h4>Partial Mask (Last 4 digits)</h4>
          <LabelMask mask={maskPattern.ssn} showLast={4}>123456789</LabelMask>
        </Col>
        <Col size={6}>
          <h4>Persistent (Always Visible)</h4>
          <LabelMask mask={maskPattern.ssn} persistent>123456789</LabelMask>
        </Col>
      </Row>
      <Row>
        <Col size={6}>
          <h4>With Label Heading Variant (h1)</h4>
          <LabelMask mask={maskPattern.ssn} variant="h1">123456789</LabelMask>
        </Col>
        <Col size={6}>
          <h4>With Custom Style</h4>
          <LabelMask
            mask={maskPattern.ssn}
            style={{ color: 'blue', fontWeight: 'bold', fontSize: '18px' }}
          >
            123456789
          </LabelMask>
        </Col>
      </Row>

      <Row>
        <h3>Password Input Examples</h3>
      </Row>
      <Row>
        <Input
          name="password"
          label="Password"
          password
          info="Enter your password (with show/hide toggle)"
        />
        <Input
          name="confirmPassword"
          label="Confirm Password"
          password
          info="Confirm your password"
        />
      </Row>
    </>
  );
};

export const schema = yup.object().shape({
  subject: yup.string().optional(),
  body: yup.string().optional(),
});

export const options = {
  task: {

    names: [
      {
        key: 1,
        text: "aaa",
      },
      {
        key: 2,
        text: "bbb",
      },
      {
        key: 3,
        text: "ccc",
      },
      {
        key: 4,
        text: "ddd",
      },
    ],

    status: [
      {
        key: 0,
        text: "pending",
      },
      {
        key: 1,
        text: "in progress",
      },
      {
        key: 2,
        text: "completed",
      },
      {
        key: 3,
        text: "cancelled",
      },
    ],
    result: [
      {
        key: 0,
        text: "whoops",
      },
      {
        key: 1,
        text: "good",
      },
      {
        key: 2,
        text: "not good",
      },
      {
        key: 3,
        text: "who knows",
      },
    ],
  },
};

export const item = {
  id: "2",
  subject: "Subject b",
  names: [1, 2],
  names2: [3, 4],
  body: "Body b",

  result: 2,
  address: {
    line1: "ddd",
    line2: "A2L2",
    line3: "A2L3",
  },
  success: true,
  isDraft: true,
  // Sample data for masked inputs
  ssn: "123223234",
  tin: "987654321",
  phone: "5551234567",
  phoneExt: "5551234567",
  creditCard: "1234567890123456",
  creditCardExpiry: "1225",
  zipCode: "12345",
  zipCodePlus4: "123456789",
  appointmentTime: "1430",
  currency: "1234567",
  percentage: "85",
  customPattern: "123456",
  formattedValue: "12345678",
  licensePlate: "ABC1234",
  productCode: "12ABC3456",
  // Sample data for partial masking examples
  creditCardPartial: "1234567890123456",
  ssnPartial: "123456789",
  phonePartial: "5551234567",
  customPartial: "12345678",
  // Sample data for DateMask examples
  dob: "2025-07-26",
  dob2: "2025-07-26",
  dobEmpty: "",
};