import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentUserId,
  getUserById,
  loadUsersList,
} from "../../../store/users";
import MainSvg from "./../../../svgFile/leftPaneMenuChildrenSvg/mainSvg";

const HomeComponentMenuLeftChild = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));

  useEffect(() => {
    dispatch(loadUsersList());
  }, []);

  const handleMainPage = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu main-wrap__item-child-menu--only-text">
        <div className="main-wrap__item-child-menu--text">
          {user ? user.email : "Loading..."}:
        </div>
      </div>
      <div
        className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu"
        onClick={handleMainPage}
      >
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <MainSvg />
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">На главную</div>
      </div>
    </>
  );
};

export default HomeComponentMenuLeftChild;
