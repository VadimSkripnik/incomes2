import React from "react";
import MainSvg from "../../../svgFile/leftPaneMenuSvg/mainSvg";
import PropTypes from "prop-types";

const MainComponentMenuLeft = ({ mouseEnter, params }) => {
  return (
    <>
      <div
        className="ws-layout-row ws-align-items-center main-wrap__item-menu"
        onMouseEnter={() => mouseEnter(params)}
      >
        <div>
          <div>
            <MainSvg />
          </div>
        </div>
      </div>
    </>
  );
};

MainComponentMenuLeft.propTypes = {
  mouseEnter: PropTypes.func,
  params: PropTypes.string,
};

export default MainComponentMenuLeft;
