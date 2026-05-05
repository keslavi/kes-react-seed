import{j as e}from"./iframe-g8sOcO29.js";import{m as i,L as m}from"./input-CSvicsId.js";import"./icon-Dr7n46Qn.js";import"./modal-confirm-exit-BAAEgWYh.js";import"./nav-sticky-CsqwRrYm.js";import"./navbar-BjM8pU9P.js";import"./textarea-debug-k6TX2ccy.js";import"./fieldset-CsKJSmQo.js";import"./preload-helper-PPVm8Dsz.js";import"./Paper-CidwHeRO.js";import"./createSvgIcon-DfrXIXML.js";import"./Box-Bj_tvx55.js";import"./Button-DAyPjNpZ.js";import"./index-ak3be9q9.js";import"./index-9gl30e5c.js";import"./Toolbar-BerDF9tJ.js";const N={title:"Components/LabelMask",component:m,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{mask:{control:"select",options:["",...Object.keys(i)]},showLast:{control:{type:"number",min:0,max:10}}}},t={args:{text:"123456789",mask:"ssn"}},r={args:{text:"5551234567",mask:"phone"}},a={args:{text:"123456789",mask:"ein"}},n={name:"SSN – Show Last 4",args:{text:"123456789",mask:"ssn",showLast:4}},o={args:{text:"123456789",mask:"ssn",persistent:!0}},p={args:{text:"Plain text value"}},d={name:"All Mask Patterns",parameters:{layout:"padded"},render:()=>e.jsxs("table",{style:{borderCollapse:"collapse",fontFamily:"monospace",fontSize:14},children:[e.jsx("thead",{children:e.jsx("tr",{children:["Mask key","Pattern","Hidden","Visible"].map(s=>e.jsx("th",{style:{padding:"6px 16px",borderBottom:"1px solid #ccc",textAlign:"left"},children:s},s))})}),e.jsx("tbody",{children:Object.entries(i).map(([s,c])=>e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"4px 16px"},children:s}),e.jsx("td",{style:{padding:"4px 16px",color:"#888"},children:c}),e.jsx("td",{style:{padding:"4px 16px"},children:e.jsx(m,{mask:s,text:"12345678901234"})}),e.jsx("td",{style:{padding:"4px 16px"},children:e.jsx(m,{mask:s,text:"12345678901234",persistent:!0})})]},s))})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    text: '123456789',
    mask: 'ssn'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: '5551234567',
    mask: 'phone'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    text: '123456789',
    mask: 'ein'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'SSN – Show Last 4',
  args: {
    text: '123456789',
    mask: 'ssn',
    showLast: 4
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    text: '123456789',
    mask: 'ssn',
    persistent: true
  }
}`,...o.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Plain text value'
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'All Mask Patterns',
  parameters: {
    layout: 'padded'
  },
  render: () => <table style={{
    borderCollapse: 'collapse',
    fontFamily: 'monospace',
    fontSize: 14
  }}>\r
      <thead>\r
        <tr>\r
          {['Mask key', 'Pattern', 'Hidden', 'Visible'].map(h => <th key={h} style={{
          padding: '6px 16px',
          borderBottom: '1px solid #ccc',
          textAlign: 'left'
        }}>{h}</th>)}\r
        </tr>\r
      </thead>\r
      <tbody>\r
        {Object.entries(maskPattern).map(([key, pattern]) => <tr key={key}>\r
            <td style={{
          padding: '4px 16px'
        }}>{key}</td>\r
            <td style={{
          padding: '4px 16px',
          color: '#888'
        }}>{pattern}</td>\r
            <td style={{
          padding: '4px 16px'
        }}>\r
              <LabelMask mask={key} text={'12345678901234'} />\r
            </td>\r
            <td style={{
          padding: '4px 16px'
        }}>\r
              <LabelMask mask={key} text={'12345678901234'} persistent />\r
            </td>\r
          </tr>)}\r
      </tbody>\r
    </table>
}`,...d.parameters?.docs?.source}}};const E=["SSN","Phone","EIN","ShowLast4","AlwaysVisible","NoMask","AllMasks"];export{d as AllMasks,o as AlwaysVisible,a as EIN,p as NoMask,r as Phone,t as SSN,n as ShowLast4,E as __namedExportsOrder,N as default};
