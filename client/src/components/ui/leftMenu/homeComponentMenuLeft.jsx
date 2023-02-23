import React from "react";
import HomeSvg from "../../../svgFile/leftPaneMenuSvg/homeSvg";
import PropTypes from "prop-types";

const HomeComponentMenuLeft = ({ mouseEnter, params }) => {
  return (
    <>
      <div
        className="ws-layout-row ws-align-items-center main-wrap__item-menu"
        onMouseEnter={() => mouseEnter(params)}
      >
        <div>
          <div>
            <HomeSvg onMouseEnter={() => mouseEnter(params)} />
          </div>
        </div>
      </div>
    </>
  );
};

HomeComponentMenuLeft.propTypes = {
  mouseEnter: PropTypes.func,
  params: PropTypes.string,
};

export default HomeComponentMenuLeft;
