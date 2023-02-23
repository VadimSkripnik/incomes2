import React from "react";
import ProfileSvg from "../../../svgFile/leftPaneMenuSvg/profileSvg";
import PropTypes from "prop-types";

const ProfileComponentMenuLeft = ({ mouseEnter, params }) => {
  return (
    <>
      <div
        className="ws-layout-row ws-align-items-center main-wrap__item-menu"
        onMouseEnter={() => mouseEnter(params)}
      >
        <div>
          <div>
            <ProfileSvg />
          </div>
        </div>
      </div>
    </>
  );
};

ProfileComponentMenuLeft.propTypes = {
  mouseEnter: PropTypes.func,
  params: PropTypes.string,
};

export default ProfileComponentMenuLeft;
