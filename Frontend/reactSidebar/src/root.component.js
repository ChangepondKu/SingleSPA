import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useWindowSize from './hooks/useWindowSize';


const Root = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsSidebarCollapsed(width < 992);
  }, [width]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <BrowserRouter>
        {/* <Routes> */}
        {/* <Route> */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isLargeScreen={width >= 992}
        />
        {/* </Route> */}
        {/* </Routes> */}
      </BrowserRouter>
    </>
  )
}

export default Root
