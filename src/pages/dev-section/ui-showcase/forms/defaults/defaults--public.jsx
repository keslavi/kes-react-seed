import { yup } from "@/helpers/form-validation";
import { Button, ListItemText } from "@mui/material";
import {
  Col,
  Row,
  Input,
  maskPattern,
  LabelMask,
} from "components";

import { color } from "@/theme-material";
import { Headers } from "./sections/section-headers";
import { LabelHeadingSection } from "./sections/section-label-heading";
import { TableRowsSection } from "./sections/section-table-rows";
import { ButtonsSection } from "./sections/section-buttons";
import { AlertInlineSection } from "./sections/section-alert-inline";
import { IconSection } from "./sections/section-Icon";
import { MuiLinkSection } from "./sections/section-muilink";

//schema, options, item are below Children 

const End = () => (<>
  <br />
  <div style={{
    height: '20px',
    backgroundColor: '#d4edda',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    paddingLeft: 'calc(50vw - 50%)',
    paddingRight: 'calc(50vw - 50%)'
  }}><b>(Section End)</b></div>
  <br />
</>)

export const ChildrenDefault = () => {
  return (
    <>
      <MuiLinkSection />
      <End />
      <Headers />
      <End />
      <LabelHeadingSection />
      <End />
      <TableRowsSection />
      <End />
      <ButtonsSection />
      <End />
      <AlertInlineSection />
      <End />
      <IconSection />
      <End />
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
          optionsCheckbox={optionDefault.task.names}
          info="header1|body1"
        //error={{ message: "Some error" }}
        />
        <Input
          size={{ xs: 6 }}
          name="names2"
          label="Names2 (multiselect)"
          optionsMulti={optionDefault.task.names}
        />
      </Row>
      <Row>
        <Input
          name="status"
          label="Status (select)"
          select
          options={optionDefault.task.status}
          //          placeholder="Select a status" 
          info="header2|body2"
        />
        <Input
          name="result"
          label="Result (autocomplete)"
          options={optionDefault.task.result}
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
        <Input name="whatever" label="whatever" />
        <Input
          datepicker
          name="dob2"
          label="Date of Birth (Datepicker)"
          info="Empty date field with MM/DD/YYYY format"
        />
        <Input charCount={10} name="body" label="Body" />
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

export const schemaDefault = yup.object().shape({
  subject: yup.string().optional(),
  body: yup.string().optional(),
});

export const optionDefault = {
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

export const itemDefault = {
  id: "2",
  subject: "Subject b",
  names: [1, 2],
  names2: [3, 4],
  body: "Body b",
  status: "1",
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
  // Sample data for password fields
  password: "",
  confirmPassword: "",
  ssn2: "",
};