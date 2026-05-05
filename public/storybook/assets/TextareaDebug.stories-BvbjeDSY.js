import{T as s}from"./textarea-debug-k6TX2ccy.js";import"./iframe-g8sOcO29.js";import"./preload-helper-PPVm8Dsz.js";const o={id:42,name:"Jane Smith",email:"jane@example.com",address:{street:"123 Main St",city:"Springfield",zip:"62701"},tags:["admin","user"],active:!0},m={title:"Components/TextareaDebug",component:s,tags:["autodocs"],parameters:{layout:"padded"},argTypes:{debug:{control:"boolean"},hidden:{control:"boolean"},rows:{control:{type:"number",min:2,max:30}},cols:{control:{type:"number",min:20,max:200}}}},e={args:{value:o,debug:!0,rows:12,cols:60}},a={args:{value:o,debug:!0,hidden:!0}},r={name:"debug=false (renders nothing)",args:{value:o,debug:!1}},n={args:{debug:!0,rows:18,cols:70,value:{form:{personal:{firstName:"John",lastName:"Doe",dob:"1990-01-15"},contact:{phone:"555-1234",email:"john@example.com"},meta:{createdAt:"2024-01-01",updatedBy:"admin",version:3}},dirty:!0,errors:{phone:"Invalid format"}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    value: sampleValue,
    debug: true,
    rows: 12,
    cols: 60
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    value: sampleValue,
    debug: true,
    hidden: true
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'debug=false (renders nothing)',
  args: {
    value: sampleValue,
    debug: false
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    debug: true,
    rows: 18,
    cols: 70,
    value: {
      form: {
        personal: {
          firstName: 'John',
          lastName: 'Doe',
          dob: '1990-01-15'
        },
        contact: {
          phone: '555-1234',
          email: 'john@example.com'
        },
        meta: {
          createdAt: '2024-01-01',
          updatedBy: 'admin',
          version: 3
        }
      },
      dirty: true,
      errors: {
        phone: 'Invalid format'
      }
    }
  }
}`,...n.parameters?.docs?.source}}};const c=["Default","Hidden","DebugOff","NestedObject"];export{r as DebugOff,e as Default,a as Hidden,n as NestedObject,c as __namedExportsOrder,m as default};
