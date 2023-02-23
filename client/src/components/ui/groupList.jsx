import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem,
  incomeId,
}) => {
  if (!Array.isArray(items)) {
    return (
      <ul className="list-group">
        {Object.keys(items).map(
          (item) =>
            items[item].cardId === incomeId && (
              <li
                key={items[item][valueProperty]}
                className={
                  "list-group-item" +
                  (items[item] === selectedItem ? " active" : "")
                }
                onClick={() => onItemSelect(items[item])}
                role="button"
              >
                {items[item][contentProperty]}
              </li>
            )
        )}
      </ul>
    );
  }
  return (
    <ul className="list-group">
      {items.map(
        (item) =>
          item.cardId === incomeId && (
            <li
              key={item[valueProperty]}
              className={
                "list-group-item" + (item === selectedItem ? " active" : "")
              }
              onClick={() => onItemSelect(item)}
              role="button"
            >
              {item[contentProperty]}
            </li>
          )
      )}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: "id",
  contentProperty: "sourceOfIncome",
  cardId: "cardId",
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  incomeId: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
};

export default GroupList;
