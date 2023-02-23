import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentUserId,
  getUserById,
  loadUsersList,
} from "../../../store/users";
import BasicInformationSvg from "../../../svgFile/leftPaneMenuChildrenSvg/basicInformationSvg";
import AddCardPageSvg from "../../../svgFile/leftPaneMenuChildrenSvg/addCardPageSvg";
import CategorySvg from "./../../../svgFile/leftPaneMenuChildrenSvg/categorySvg";
import AddCategorySvg from "./../../../svgFile/leftPaneMenuChildrenSvg/addCategorySvg";
import RateCategorySvg from "./../../../svgFile/leftPaneMenuChildrenSvg/rateCategorySvg";
import AddRateCategorySvg from "./../../../svgFile/leftPaneMenuChildrenSvg/addRateCategorySvg";

const MainComponentMenuLeftChild = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));

  useEffect(() => {
    dispatch(loadUsersList());
  }, []);
  const handleMain = () => {
    navigate("/home/main/mainlist");
  };
  const handleAddCardPage = () => {
    navigate("/home/main/addcard");
  };
  const handleShowCategoryPage = () => {
    navigate("/home/main/incomecategoryspage");
  };

  const handleAddCategoryPage = () => {
    navigate("/home/main/addincomecategory");
  };

  const handleRateCategoryPage = () => {
    navigate("/home/main/ratecategoryspage");
  };

  const handleAddRateCategoryPage = () => {
    navigate("/home/main/addratecategory");
  };

  return (
    <>
      <div className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu-email">
        <div className="main-wrap__item-child-menu--icon-wrap">
          <i className="material-icons">email</i>
        </div>
        <div className="main-wrap__item-child-menu--text">
          {user ? user.email : "Loading..."}
        </div>
      </div>
      <div
        className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu main-wrap__item-child-menu"
        onClick={handleMain}
      >
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <BasicInformationSvg />
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">
          Основные сведения
        </div>
      </div>

      <div
        className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu"
        onClick={handleAddCardPage}
      >
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <AddCardPageSvg />
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">
          Добавить доход(карту)
        </div>
      </div>
      <div
        className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu"
        onClick={handleShowCategoryPage}
      >
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <CategorySvg />
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">Категории дохода</div>
      </div>
      <div
        className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu"
        onClick={handleAddCategoryPage}
      >
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <AddCategorySvg />
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">
          Добавить категорию дохода
        </div>
      </div>
      <div
        className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu"
        onClick={handleRateCategoryPage}
      >
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <RateCategorySvg />
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">
          Категории расхода
        </div>
      </div>
      <div
        className="ws-layout-row ws-align-items-start-center ws-body-1-primary main-wrap__item-child-menu"
        onClick={handleAddRateCategoryPage}
      >
        <div className="main-wrap__item-child-menu--icon-wrap">
          <div>
            <div>
              <AddRateCategorySvg />
            </div>
          </div>
        </div>
        <div className="main-wrap__item-child-menu--text">
          Добавить категорию расхода
        </div>
      </div>
    </>
  );
};

export default MainComponentMenuLeftChild;
