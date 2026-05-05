import{j as t}from"./iframe-g8sOcO29.js";import{N as n}from"./navbar-BjM8pU9P.js";import{B as a}from"./Button-DAyPjNpZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Box-Bj_tvx55.js";import"./Toolbar-BerDF9tJ.js";const p={title:"Components/Navbar",component:n,tags:["autodocs"],parameters:{layout:"fullscreen"}},r={render:o=>t.jsxs(n,{...o,children:[t.jsx(a,{variant:"text",size:"small",children:"Home"}),t.jsx(a,{variant:"text",size:"small",children:"Tasks"}),t.jsx(a,{variant:"text",size:"small",children:"Reports"})]})},e={name:"With alignRight content",render:()=>t.jsxs(n,{alignRight:t.jsx(a,{variant:"contained",size:"small",children:"+ New"}),children:[t.jsx(a,{variant:"text",size:"small",children:"Home"}),t.jsx(a,{variant:"text",size:"small",children:"Tasks"})]})},s={render:()=>t.jsx(n,{})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => <Navbar {...args}>\r
      <Button variant="text" size="small">Home</Button>\r
      <Button variant="text" size="small">Tasks</Button>\r
      <Button variant="text" size="small">Reports</Button>\r
    </Navbar>
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'With alignRight content',
  render: () => <Navbar alignRight={<Button variant="contained" size="small">+ New</Button>}>\r
      <Button variant="text" size="small">Home</Button>\r
      <Button variant="text" size="small">Tasks</Button>\r
    </Navbar>
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Navbar />
}`,...s.parameters?.docs?.source}}};const x=["Default","WithAlignRight","Empty"];export{r as Default,s as Empty,e as WithAlignRight,x as __namedExportsOrder,p as default};
