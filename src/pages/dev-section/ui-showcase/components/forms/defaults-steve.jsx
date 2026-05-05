import {Button, ListItemText} from "@mui/material";
import { yup } from "@/helpers/form-validation";

import {
  Col,
  Row,
  AlertInline,
  BtnContinueSave,
  Fieldset,
  Icon,
  iconType,
  Input,
  LabelHeading,
  LabelMask,
  TableRows,
} from "components";

import {color} from "@/theme-material";

export const schemaDefault= yup.object().shape({

});

export const optionDefault= {
    "task": {
        "status": [
            {
                "key": 0,
                "text": "pending"
            },
            {
                "key": 1,
                "text": "in progress"
            },
            {
                "key": 2,
                "text": "completed"
            },
            {
                "key": 3,
                "text": "cancelled"
            },
            {
                "key": 4,
                "text": "closed"
            }
        ],
        "result": [
            {
                "key": 0,
                "text": ""
            },
            {
                "key": 1,
                "text": "success"
            },
            {
                "key": 2,
                "text": "failed"
            },
            {
                "key": 3,
                "text": "partial"
            }
        ]
    },
};
const option=optionDefault;

export const itemDefault= {
  id:"2",
  subject:"Subject b",
  body:"Body b",
  status:"1", 
  result:"2",
  success:true,
  isDraft:true,
  ssn:"123456789",
  tin:"987654321",
  phone:"1234567890",
  phoneExt:"555",
  creditCard:"4111111111111111",
  creditCardExpiry:"1225",
  zipCode:"12345",
  zipCodePlus4:"12345-6789",
  appointmentTime: "1430",
  currency:"123456789",
  percentage: "85",
  customPattern:"123456",
  formattedValue: "12345678",
  licensePlate:"ABC1234",
  productCode:"12ABC3456",
  //partial masking examples
  creditCardPartial:"1234567890123456",
  ssnPartial:"123456789",
  phonePartial:"1234567890",
  customPartial:"12345678",
  //DateMask examples
  dob:"2025-07-26",
  dob2:"2025-07-26",
  dobEmpty: "",
};

const fields=[
  {id:0,beneName:"whoops"},
  {id:1,beneName:"good"},
  {id:2,beneName:"not good"},
]

export const ChildrenDefault=()=>(
  <>
    <h1>1.0 h1-h4 non Fieldset Example</h1>
    <br/>
    <hr/>
    <h1>1.1 this is a sample h1</h1> 
    <h2>1.2 this is a sample h2</h2>
    <h3>1.3 this is a sample h3</h3>
    <h4>1.4 this is a sample h4</h4>
    <h5>1.5 this is a sample h5</h5>
    <h6>1.6 this is a sample h6</h6>


    <h2>2.0 h1-h4 Fieldset Example</h2>
    <br/>
    <Fieldset>
      <h1>2.1 this is a sample h1</h1>
      <h2>2.2 this is a sample h2</h2>
      <h3>2.3 this is a sample h3</h3>
      <h4>2.4 this is a sample h4</h4>
      <h5>2.5 this is a sample h5</h5>
      <h6>2.6 this is a sample h6</h6>
    </Fieldset>

    <h2>3.0 Subtitle Example</h2>
    <h4 data-h-subtitle>
      This is a subtitle example using h4 with data-h-subtitle attribute.
    </h4>
    

















  </>
);






