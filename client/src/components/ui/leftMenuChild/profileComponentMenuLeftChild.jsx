import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserData, loadUsersList } from "../../../store/users";
import ProfileSvg from "../../../svgFile/leftPaneMenuChildrenSvg/profileSvg";

const ProfileComponentMenuLeftChild = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());

  useEffect(() => {
    dispatch(loadUsersList());
  }, []);

  const handleProfile = () => {
    navigate(`/home/users/${currentUser._id}`);
  };

  const handleLogOut = () => {
    navigate("/home/logout");
  };

  if (!currentUser) return "Loading...";
  return (
    <>
      <div
        className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu"
        onClick={handleProfile}
      >
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <ProfileSvg />
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">Профиль</div>
      </div>
      <div
        className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu"
        onClick={handleLogOut}
      >
        <div className="main-wrap__item-child-menu--icon-wrap">
          <i className="material-icons">input</i>
        </div>
        <div className="main-wrap__item-child-menu--text">Выйти</div>
      </div>
    </>
  );
};

export default ProfileComponentMenuLeftChild;
