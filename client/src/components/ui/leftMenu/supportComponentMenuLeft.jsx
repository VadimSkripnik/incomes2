import React from "react";
import SupportSvg from "../../../svgFile/leftPaneMenuSvg/supportSvg";
import PropTypes from "prop-types";

const SupportComponentMenuLeft = ({ mouseEnter, params }) => {
  return (
    <>
      <div
        className="ws-layout-row ws-align-items-center main-wrap__item-menu"
        onMouseEnter={() => mouseEnter(params)}
      >
        <div>
          <div>
            <SupportSvg />
          </div>
        </div>
      </div>
    </>
  );
};

SupportComponentMenuLeft.propTypes = {
  mouseEnter: PropTypes.func,
  params: PropTypes.string,
};

export default SupportComponentMenuLeft;
