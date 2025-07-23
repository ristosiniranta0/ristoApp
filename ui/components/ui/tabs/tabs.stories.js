import React from 'react';
import Tab from './tab/tab.component';
import Tabs from './tabs.component';

export default {title:'Components/UI/Tabs',component:Tabs};

const tabs=[
  {key:'tab1',name:'Tab 1',tabKey:'tab1',content:'Content 1'},
  {key:'tab2',name:'Tab 2',tabKey:'tab2',content:"Content 2 (Disabled)",disabled:true},
  {key:'tab3',name:"Tab 3", tabKey:"tab3", content:"Content 3"}
]

export const Default={args:{children:tabs.map((t)=><Tab {...t}>{t.content}</Tab>)}};
export const Disabled={args:{children:[...tabs.slice(0,1),{...tabs[1],disabled:false},...tabs.slice(2)].map((t)=><Tab {...t}>{t.content}</Tab>)}}
