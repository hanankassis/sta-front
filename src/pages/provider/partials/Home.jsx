import { useEffect, useState } from "react";
import {provider as apiProvider } from "../../../services/api";
import modals from '../../../services/modals'

export default function Home() {
  const [info, setInfo] = useState({description: "" , })
  useEffect(() => {
    async function loadProviderInfo() {
    const {  result, data, text } = await apiProvider.getInfo();
    if (result)
      setInfo(data);
    else
      modals.error(text);
  } 
    loadProviderInfo();
  });

  return (
  <div className="provider-info">
    <h1 className="text-center">{info.description}</h1>
    <div className="main-img text-center">
      <img  src={info.image} alt="" />
    </div>
  </div>)  
}
