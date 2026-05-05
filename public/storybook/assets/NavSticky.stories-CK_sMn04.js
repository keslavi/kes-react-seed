import{j as e}from"./iframe-g8sOcO29.js";import{N as r}from"./nav-sticky-CsqwRrYm.js";import{B as n,T as l}from"./Button-DAyPjNpZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Paper-CidwHeRO.js";import"./Toolbar-BerDF9tJ.js";import"./Box-Bj_tvx55.js";const S={title:"Components/NavSticky",component:r,tags:["autodocs"],parameters:{layout:"fullscreen"},argTypes:{top:{control:"text"},bgcolor:{control:"color"},divider:{control:"boolean"},elevation:{control:{type:"number",min:0,max:24}},zIndex:{control:"number"},px:{control:"number"}}},i=()=>e.jsx("div",{style:{padding:"0 16px"},children:Array.from({length:30},(a,c)=>e.jsxs("p",{style:{borderBottom:"1px solid #eee",margin:"8px 0"},children:["Row ",c+1," — scroll to see the sticky bar stay in place"]},c))}),t={render:a=>e.jsxs(e.Fragment,{children:[e.jsxs(r,{...a,children:[e.jsx(n,{variant:"contained",size:"small",sx:{mr:1},children:"Save"}),e.jsx(n,{variant:"outlined",size:"small",children:"Cancel"})]}),e.jsx(r.Spacer,{}),e.jsx(i,{})]}),args:{top:"0px",divider:!0,elevation:0}},s={render:a=>e.jsxs(e.Fragment,{children:[e.jsxs(r,{...a,children:[e.jsx(n,{variant:"contained",size:"small",sx:{mr:1},children:"Save"}),e.jsx(n,{variant:"outlined",size:"small",children:"Cancel"}),e.jsx(l,{variant:"body2",sx:{ml:"auto",alignSelf:"center",color:"text.secondary"},children:"Last saved: just now"})]}),e.jsx(r.Spacer,{}),e.jsx(i,{})]}),args:{top:"0px",divider:!1,elevation:2}},o={name:"Spacer — prevents content overlap",render:()=>e.jsxs(e.Fragment,{children:[e.jsx(r,{top:"0px",children:e.jsx(l,{variant:"body2",sx:{fontWeight:600},children:"↑ Fixed sticky bar"})}),e.jsx(r.Spacer,{}),e.jsxs("div",{style:{padding:"0 16px"},children:[e.jsxs("p",{children:["↑ This content starts immediately below the bar thanks to ",e.jsx("code",{children:"NavSticky.Spacer"}),"."]}),e.jsx(i,{})]})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <>\r
      <NavSticky {...args}>\r
        <Button variant="contained" size="small" sx={{
        mr: 1
      }}>Save</Button>\r
        <Button variant="outlined" size="small">Cancel</Button>\r
      </NavSticky>\r
      <NavSticky.Spacer />\r
      <PageFiller />\r
    </>,
  args: {
    top: '0px',
    divider: true,
    elevation: 0
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <>\r
      <NavSticky {...args}>\r
        <Button variant="contained" size="small" sx={{
        mr: 1
      }}>Save</Button>\r
        <Button variant="outlined" size="small">Cancel</Button>\r
        <Typography variant="body2" sx={{
        ml: 'auto',
        alignSelf: 'center',
        color: 'text.secondary'
      }}>\r
          Last saved: just now\r
        </Typography>\r
      </NavSticky>\r
      <NavSticky.Spacer />\r
      <PageFiller />\r
    </>,
  args: {
    top: '0px',
    divider: false,
    elevation: 2
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Spacer — prevents content overlap',
  render: () => <>\r
      <NavSticky top="0px">\r
        <Typography variant="body2" sx={{
        fontWeight: 600
      }}>\r
          ↑ Fixed sticky bar\r
        </Typography>\r
      </NavSticky>\r
      <NavSticky.Spacer />\r
      <div style={{
      padding: '0 16px'
    }}>\r
        <p>↑ This content starts immediately below the bar thanks to <code>NavSticky.Spacer</code>.</p>\r
        <PageFiller />\r
      </div>\r
    </>
}`,...o.parameters?.docs?.source}}};const h=["Default","WithShadow","SpacerDemo"];export{t as Default,o as SpacerDemo,s as WithShadow,h as __namedExportsOrder,S as default};
