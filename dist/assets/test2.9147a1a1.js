import{d as n,r as c,c as s,f as o,b as i,t as l,o as d}from"./vendor.b60d91de.js";const u={"bg-orange":""},m=n({setup(p){const e=c(""),a=async()=>{try{e.value=await navigator.clipboard.readText(),console.log(e.value)}catch(t){e.value=t.message}},r=()=>{Swal.fire({title:"Error!",text:"Do you want to continue",icon:"error",confirmButtonText:"Cool"})};return(t,f)=>(d(),s("div",u,[o("button",{onClick:a}," read "),o("button",{onClick:r}," read "),i(" "+l(e.value),1)]))}});export{m as default};
