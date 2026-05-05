import{j as e,r as i}from"./iframe-g8sOcO29.js";import{M as d,a as c}from"./modal-confirm-exit-BAAEgWYh.js";import{B as l}from"./Button-DAyPjNpZ.js";import"./preload-helper-PPVm8Dsz.js";import"./createSvgIcon-DfrXIXML.js";import"./Paper-CidwHeRO.js";import"./index-ak3be9q9.js";import"./index-9gl30e5c.js";const{fn:m}=__STORYBOOK_MODULE_TEST__,O={title:"Components/Modal",tags:["autodocs"],parameters:{layout:"centered"}},t={name:"ModalCommon",render:n=>{const[o,r]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(l,{variant:"contained",onClick:()=>r(!0),children:"Open Modal"}),e.jsx(d,{...n,isModalOpen:o,toggleModal:()=>r(!1)})]})},args:{header:"Modal Title",children:e.jsx("p",{children:"This is the modal body content."}),hideCloseIcon:!1},argTypes:{hideCloseIcon:{control:"boolean"}}},a={name:"ModalCommon – No Close Icon",render:n=>{const[o,r]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(l,{variant:"contained",onClick:()=>r(!0),children:"Open"}),e.jsx(d,{...n,isModalOpen:o,toggleModal:()=>r(!1)})]})},args:{header:"Locked Dialog",hideCloseIcon:!0,children:e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"This modal can only be dismissed via the buttons below."}),e.jsx(l,{variant:"outlined",onClick:m(),children:"Dismiss"})]})}},s={name:"ModalConfirmExit",render:()=>{const[n,o]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(l,{variant:"contained",color:"warning",onClick:()=>o(!0),children:"Trigger Exit"}),e.jsx(c,{isOpen:n,toggle:()=>o(!1),onConfirm:()=>alert("Confirmed exit"),onCancel:()=>alert("Cancelled")})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'ModalCommon',
  render: args => {
    const [open, setOpen] = useState(false);
    return <>\r
        <Button variant="contained" onClick={() => setOpen(true)}>Open Modal</Button>\r
        <ModalCommon {...args} isModalOpen={open} toggleModal={() => setOpen(false)} />\r
      </>;
  },
  args: {
    header: 'Modal Title',
    children: <p>This is the modal body content.</p>,
    hideCloseIcon: false
  },
  argTypes: {
    hideCloseIcon: {
      control: 'boolean'
    }
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'ModalCommon – No Close Icon',
  render: args => {
    const [open, setOpen] = useState(false);
    return <>\r
        <Button variant="contained" onClick={() => setOpen(true)}>Open</Button>\r
        <ModalCommon {...args} isModalOpen={open} toggleModal={() => setOpen(false)} />\r
      </>;
  },
  args: {
    header: 'Locked Dialog',
    hideCloseIcon: true,
    children: <>\r
        <p>This modal can only be dismissed via the buttons below.</p>\r
        <Button variant="outlined" onClick={fn()}>Dismiss</Button>\r
      </>
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'ModalConfirmExit',
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <Button variant="contained" color="warning" onClick={() => setOpen(true)}>\r
          Trigger Exit\r
        </Button>\r
        <ModalConfirmExit isOpen={open} toggle={() => setOpen(false)} onConfirm={() => alert('Confirmed exit')} onCancel={() => alert('Cancelled')} />\r
      </>;
  }
}`,...s.parameters?.docs?.source}}};const j=["Common","CommonNoClose","ConfirmExit"];export{t as Common,a as CommonNoClose,s as ConfirmExit,j as __namedExportsOrder,O as default};
