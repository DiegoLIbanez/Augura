import React,{ useContext } from 'react';

//Views 
import ListDisinfect from '../register-disinfect/list/List';

//Components
import Sidebar from '../../components/Sidebar/Sidebar';

//Context for views
import { ViewsContext } from '../../context/ViewsContext';

function Home() {

  //Manejo de las vistas
  const { views } = useContext(ViewsContext);

  return (
    <>
      <Sidebar />
      {views.listDisinfect === true ? <ListDisinfect /> : <></> }
    </>
  )
}

export default Home