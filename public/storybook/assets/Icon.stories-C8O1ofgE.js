import{j as e}from"./iframe-g8sOcO29.js";import{I as r,i as o}from"./icon-Dr7n46Qn.js";import"./preload-helper-PPVm8Dsz.js";import"./createSvgIcon-DfrXIXML.js";const{fn:u}=__STORYBOOK_MODULE_TEST__,T={title:"Components/Icon",component:r,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{size:{control:"radio",options:["sm","md","lg"]},textPosition:{control:"radio",options:["left","right"]},colorIcon:{control:"color"},color:{control:"color"},bold:{control:"boolean"}}},s={render:()=>e.jsx(r,{src:o.arrowForward,size:"md"})},c={render:()=>e.jsx(r,{src:o.arrowBack,size:"md"})},a={render:()=>e.jsx(r,{src:o.complete,size:"lg"})},n={render:()=>e.jsx(r,{src:o.uncomplete,size:"lg"})},t={render:()=>e.jsx(r,{src:o.add,size:"md"})},d={render:()=>e.jsx(r,{src:o.remove,size:"md"})},i={render:()=>e.jsx(r,{src:o.accordion,size:"md",expanded:!1,onClick:u()})},p={render:()=>e.jsx(r,{src:o.arrowForward,text:"Continue",size:"md",bold:!0,onClick:u()})},m={render:()=>e.jsx(r,{src:o.arrowBack,text:"Back",size:"md",textPosition:"left",onClick:u()})},l={name:"All Icons",parameters:{layout:"padded"},render:()=>e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"24px",alignItems:"center",padding:16},children:Object.entries(o).map(([x,g])=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:80},children:[e.jsx(r,{src:g,size:"md"}),e.jsx("span",{style:{fontSize:11,color:"#666"},children:x})]},x))})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Icon src={iconType.arrowForward} size="md" />
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Icon src={iconType.arrowBack} size="md" />
}`,...c.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Icon src={iconType.complete} size="lg" />
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Icon src={iconType.uncomplete} size="lg" />
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Icon src={iconType.add} size="md" />
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Icon src={iconType.remove} size="md" />
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Icon src={iconType.accordion} size="md" expanded={false} onClick={fn()} />
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Icon src={iconType.arrowForward} text="Continue" size="md" bold onClick={fn()} />
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Icon src={iconType.arrowBack} text="Back" size="md" textPosition="left" onClick={fn()} />
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'All Icons',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    alignItems: 'center',
    padding: 16
  }}>\r
      {Object.entries(iconType).map(([key, IconComp]) => <div key={key} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      minWidth: 80
    }}>\r
          <Icon src={IconComp} size="md" />\r
          <span style={{
        fontSize: 11,
        color: '#666'
      }}>{key}</span>\r
        </div>)}\r
    </div>
}`,...l.parameters?.docs?.source}}};const j=["Forward","Back","Complete","Incomplete","Add","Remove","Accordion","WithText","TextLeft","AllIcons"];export{i as Accordion,t as Add,l as AllIcons,c as Back,a as Complete,s as Forward,n as Incomplete,d as Remove,m as TextLeft,p as WithText,j as __namedExportsOrder,T as default};
