import React,{ useState,createContext } from 'react'

export const ViewsContext = createContext();

export function ViewsProvider({ children }) {

  const [views, setViews] = useState({});

  return (
    <>
      <ViewsContext.Provider value={{ views, setViews }}>
        {children}
      </ViewsContext.Provider>
    </>
  )
}

