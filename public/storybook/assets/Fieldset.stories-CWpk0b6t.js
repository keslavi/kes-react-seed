import{j as e}from"./iframe-g8sOcO29.js";import{F as o}from"./fieldset-CsKJSmQo.js";import{T as s,B as t}from"./Button-DAyPjNpZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Box-Bj_tvx55.js";const p={title:"Components/Fieldset",component:o,tags:["autodocs"],parameters:{layout:"padded"},argTypes:{legend:{control:"text"}}},n={render:()=>e.jsxs("div",{children:[e.jsxs(o,{legend:"Section Title",children:[e.jsx(s,{variant:"body1",sx:{mb:2},children:"(note button size inside fieldset vs outside)"}),e.jsx(t,{variant:"contained",children:"Button"})]}),e.jsx(t,{variant:"contained",children:"Button"})]})},r={render:()=>e.jsxs("div",{children:[e.jsxs(o,{children:[e.jsx(s,{variant:"body1",sx:{mb:2},children:"Fieldset with no legend."}),e.jsx(t,{variant:"contained",children:"Button"})]}),e.jsx(t,{variant:"contained",children:"Button"})]})},i={render:()=>e.jsxs("div",{children:[e.jsxs(o,{legend:"Disabled State",children:[e.jsx(s,{variant:"body1",sx:{mb:2},children:"Disabled button inside fieldset gets 1.25rem font size."}),e.jsx(t,{variant:"contained",disabled:!0,children:"Button"})]}),e.jsx(t,{variant:"contained",disabled:!0,children:"Button"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div>\r
      <Fieldset legend="Section Title">\r
        <Typography variant="body1" sx={{
        mb: 2
      }}>(note button size inside fieldset vs outside)</Typography>\r
        <Button variant="contained">Button</Button>\r
      </Fieldset>\r
      <Button variant="contained">Button</Button>\r
    </div>
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div>\r
      <Fieldset>\r
        <Typography variant="body1" sx={{
        mb: 2
      }}>Fieldset with no legend.</Typography>\r
        <Button variant="contained">Button</Button>\r
      </Fieldset>\r
      <Button variant="contained">Button</Button>\r
    </div>
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div>\r
      <Fieldset legend="Disabled State">\r
        <Typography variant="body1" sx={{
        mb: 2
      }}>Disabled button inside fieldset gets 1.25rem font size.</Typography>\r
        <Button variant="contained" disabled>Button</Button>\r
      </Fieldset>\r
      <Button variant="contained" disabled>Button</Button>\r
    </div>
}`,...i.parameters?.docs?.source}}};const m=["Default","NoLegend","Disabled"];export{n as Default,i as Disabled,r as NoLegend,m as __namedExportsOrder,p as default};
