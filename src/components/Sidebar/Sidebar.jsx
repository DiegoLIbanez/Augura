import React,{ useContext } from 'react'

//Context for views
import { ViewsContext } from '../../context/ViewsContext';

function Sidebar() {

  //Manejo de las vistas
  const { setViews } = useContext(ViewsContext);

  const handleClick = () => {
    setViews({listDisinfect:true});
  }

  return (
    <>
      <p onClick={handleClick}>Para cuando el cachon por fin entregue esto echo</p>
    </>
  )
}

export default Sidebar