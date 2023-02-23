import React from "react";
import { Outlet } from "react-router-dom";




const ShowCategoryPageList = () => {
    return (
        
         <div className="ws-layout-row ws-align-items-start-stretch main-wrap">
        {/* <h1>ShowCategoryPageList</h1> */}
 
         <div className="ws-layout-column ws-align-items-start ws-flex-grow-1 main-wrap__content">
           <div className="main-wrap__container">
             <div className="ws-layout-column ws-align-items-start ws-flex-grow-1 main-wrap__content-panel">
               <div className="cabinet-container cabinet-main">
                 <div className="cabinet-main__content-wrap">
                   <div className="cabinet-main__content cabinet-main-content cabinet-content">
                     <div className="cabinet-main__account"></div>
                       <Outlet />
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
         </div>
    );
};

export default ShowCategoryPageList;
