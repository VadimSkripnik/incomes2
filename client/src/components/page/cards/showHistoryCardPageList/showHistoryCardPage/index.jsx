import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paginate } from "../../../../../utils/paginate";
import Pagination from "../../../../common/pagination";
import GroupList from "../../../../ui/groupList";
import _ from "lodash";
import ShowHistoryCardsTable from "../../../../ui/table/showHistoryCardsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  loadIncomeCategorysList,
  getIncomeCategorys,
} from "../../../../../store/incomeCategorys";
import {
  removeReceipt,
  loadShowHistoryCardId,
} from "../../../../../store/receipts";
import {
  loadCardsList,
  getCardById,
  getCards,
} from "../../../../../store/cards";
import {
  loadDailyExpenses,
  getDailyExpenses,
} from "../../../../../store/dailyExpenses";

const ShowHistoryCardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cardId } = useParams();

  const [cardReceipt, setCardReceipt] = useState([]);

  const receipts = useSelector((state) => state.receipts.entities);

  const categorys = useSelector(getIncomeCategorys());
  const cardItem = useSelector(getCardById(cardId));
  const cards = useSelector(getCards());
  const dailyExpensesAll = useSelector(getDailyExpenses());

  const [currentPage, setCurrentPage] = useState(1);
  const [card, setCard] = useState({});
  const [selectedCategory, setSelectedCategory] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(loadIncomeCategorysList());
    dispatch(loadCardsList());
    dispatch(loadDailyExpenses());
  }, []);

  useEffect(() => {
    setCard((prev) => ({ ...prev, ...cardItem }));
  }, [cardItem]);

  useEffect(() => {
    setCardReceipt(receipts);
  }, [receipts]);

  useEffect(() => {
    dispatch(loadShowHistoryCardId(card));
  }, [card]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedCategory(item);
  };

  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

  const pageSize = 8;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSelectedCategory(undefined);
    setSearchQuery(target.value);
  };

  const filteredCategorys = searchQuery
    ? cardReceipt.filter((receipt) => receipt.data.indexOf(searchQuery) !== -1)
    : selectedCategory
    ? cardReceipt.filter((receipt) => receipt.category === selectedCategory.id)
    : cardReceipt;
   
  const sortedCategorys = _.orderBy(
    filteredCategorys,
    [sortBy.path],
    [sortBy.order]
  );

  const receiptsCrop = paginate(sortedCategorys, currentPage, pageSize);
 
  const handleDelete = (receiptId) => {
    dispatch(removeReceipt(receiptId, cardId, cards, dailyExpensesAll));
  };

  const handleAddIncomeItem = () => {
    navigate(`/home/main/mainlist/${cardId}/addreceipt`, { replace: true });
  };

  const clearFilter = () => {
    setSelectedCategory();
  };

  if (cardReceipt) {
    const count = filteredCategorys.length;

    return (
      <div className="d-flex">
        {categorys && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedCategory}
              items={categorys}
              onItemSelect={handleCategorySelect}
              incomeId={cardItem.id}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          {count > 0 && (
            <ShowHistoryCardsTable
              receipts={receiptsCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
            />
          )}
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        <div>
          <button onClick={handleAddIncomeItem}>Добавить поступление</button>
        </div>
      </div>
    );
  }
  return "loading...";
};

export default ShowHistoryCardPage;



// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { paginate } from "../../../../../utils/paginate";
// import Pagination from "../../../../common/pagination";
// import GroupList from "../../../../ui/groupList";
// import _ from "lodash";
// import ShowHistoryCardsTable from "../../../../ui/table/showHistoryCardsTable";
// import { useDispatch, useSelector } from "react-redux";
// import {loadIncomeCategorysList, getIncomeCategorys} from "../../../../../store/incomeCategorys";
// import { loadReceiptsList, getReceipts, removeReceipt} from "../../../../../store/receipts";




// const ShowHistoryCardPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { cardId } = useParams();


//     const receipts = useSelector(getReceipts());
//     const categorys = useSelector(getIncomeCategorys());
   
    
// // console.log(cardItem)
// // console.log(categorys)
//     const [currentPage, setCurrentPage] = useState(1);
    
//     const [selectedCategory, setSelectedCategory] = useState();
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         dispatch(loadReceiptsList(cardId));
//         dispatch(loadIncomeCategorysList());
     
//       }, []);



//     useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedCategory, searchQuery]);

//     const handleCategorySelect = (item) => {
//         if (searchQuery !== "") setSearchQuery("");
//         setSelectedCategory(item);
//     };

//     const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

//     const pageSize = 8;

//     const handlePageChange = (pageIndex) => {
//         setCurrentPage(pageIndex);
//     };

//     const handleSort = (item) => {
//         setSortBy(item);
//     };

//     const handleSearchQuery = ({ target }) => {
//         setSelectedCategory(undefined);
//         setSearchQuery(target.value);
//     };
//     // console.log(receipts)  
//     const filteredCategorys = searchQuery
//         ? receipts.filter((receipt) => receipt.data.indexOf(searchQuery) !== -1)
//         : selectedCategory
//             ? receipts.filter(
//                  (receipt) => receipt.category === selectedCategory._id,
//                 // (receipt) => receipt.category === selectedCategory.id,
//             )
//             : receipts;

         

//      const sortedCategorys = _.orderBy(
//          filteredCategorys,
//          [sortBy.path],
//          [sortBy.order]
//      );

//     const receiptsCrop = paginate(sortedCategorys, currentPage, pageSize);

   

//     const handleDelete = (receiptId) => {;
//             dispatch(removeReceipt(receiptId));
//         };

//     const handleAddIncomeItem = () => {
//         navigate(`/home/main/mainlist/${cardId}/addreceipt`, {replace: true});
//     };

//     const clearFilter = () => {
//         setSelectedCategory();
//     };

//     if (receipts) {
//         const count = filteredCategorys.length;
       
//         return (
//             <div className="d-flex">
//                 {categorys && (
//                     <div className="d-flex flex-column flex-shrink-0 p-3">
//                         <GroupList
//                             selectedItem={selectedCategory}
//                             items={categorys}
//                             onItemSelect={handleCategorySelect}
//                             incomeId={cardId}
//                         />
//                         <button
//                             className="btn btn-secondary mt-2"
//                             onClick={clearFilter}
//                         >
//                             Очистить
//                         </button>
//                     </div>
//                 )}
//                 <div className="d-flex flex-column">
//                     <input
//                         type="text"
//                         name="searchQuery"
//                         placeholder="Search..."
//                         onChange={handleSearchQuery}
//                         value={searchQuery}
//                     />
//                     {count > 0 && (
//                         <ShowHistoryCardsTable
//                             receipts={receiptsCrop}
//                             onSort={handleSort}
//                             selectedSort={sortBy}
//                             onDelete={handleDelete}
//                         />
//                    )} 
//                     <Pagination
//                         itemsCount={count}
//                         pageSize={pageSize}
//                         currentPage={currentPage}
//                         onPageChange={handlePageChange}
//                     />
//                 </div>
//                 <div>
//                     <button 
//                     onClick={handleAddIncomeItem}
//                     >
//                         Добавить поступление
//                     </button>
//                 </div>
//             </div>
//         );
//     }
//     return "loading...";
// };

// export default ShowHistoryCardPage;




// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { paginate } from "../../../../../utils/paginate";
// import Pagination from "../../../../common/pagination";
// import GroupList from "../../../../ui/groupList";
// import _ from "lodash";
// import ShowHistoryCardsTable from "../../../../ui/table/showHistoryCardsTable";
// import { useDispatch, useSelector } from "react-redux";
// import {loadIncomeCategorysList, getIncomeCategorys} from "../../../../../store/incomeCategorys";
// import { loadReceiptsList, getReceipts, removeReceipt, loadShowHistoryCardId} from "../../../../../store/receipts";
// import { loadCardsList, getCardById, getCards} from "../../../../../store/cards";
// import { loadDailyExpenses,
//     getDailyExpensesId,
//     getDailyExpenses
//     // removeDailyExpensesQuantityRate
//      } from "../../../../../store/dailyExpenses";
  



// const ShowHistoryCardPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { cardId } = useParams();

//     const [cardReceipt, setCardReceipt] = useState([]);
//     // console.log(cardReceipt)

//     // const receipts = useSelector(getReceipts());
//     const receipts = useSelector(state => state.receipts.entities);
// //     const receipts1 = useSelector(state => state.receipts.showHistoryCardId);
// // console.log("receipts1", receipts1)
// console.log("receipts", receipts)



//     const categorys = useSelector(getIncomeCategorys());
//     const cardItem = useSelector(getCardById(cardId)); 
//     const cards = useSelector(getCards()); 
//     const dailyExpensesAll = useSelector(getDailyExpenses());
    
//     //console.log("receipts1", receipts1)

// // console.log(categorys)
//     const [currentPage, setCurrentPage] = useState(1);
//     const [card, setCard] = useState({});
//     const [selectedCategory, setSelectedCategory] = useState();
//     const [searchQuery, setSearchQuery] = useState("");
//     // console.log("selectedCategory", selectedCategory)
//     useEffect(() => {
//         // dispatch(loadReceiptsList(cardId, card));
//         dispatch(loadIncomeCategorysList());
//         dispatch(loadCardsList());
//         dispatch(loadDailyExpenses());
//         // dispatch(loadShowHistoryCardId());
//         dispatch(loadReceiptsList())
//         // dispatch(loadShowHistoryCardId(card));
//         //  setCardReceipt(prev => ({...prev, ...receipts}))
//       }, []);

//       useEffect(() => {
//         setCard((prev) => ({...prev, ...cardItem}));
//     }, [cardItem]);

//     useEffect(() => {
//         setCardReceipt(receipts)
//     }, [receipts]);

//     useEffect(() => {
//         // dispatch(loadReceiptsList(cardId, card));
//         dispatch(loadShowHistoryCardId(card));
//     }, [card]);

    

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedCategory, searchQuery]);

//     const handleCategorySelect = (item) => {
//         if (searchQuery !== "") setSearchQuery("");
//         setSelectedCategory(item);
       
//     };

//     const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

//     const pageSize = 8;

//     const handlePageChange = (pageIndex) => {
//         setCurrentPage(pageIndex);
//     };

//     const handleSort = (item) => {
//         setSortBy(item);
//     };

//     const handleSearchQuery = ({ target }) => {
//         setSelectedCategory(undefined);
//         setSearchQuery(target.value);
//     };
//     // console.log(receipts)cardReceipt  


//     // const filteredCategorys = searchQuery
//     //     ? receipts.filter((receipt) => receipt.data.indexOf(searchQuery) !== -1)
//     //     : selectedCategory
//     //         ? receipts.filter(
//     //              //(receipt) => receipt.category === selectedCategory._id,
//     //             (receipt) => receipt.category === selectedCategory.id,
//     //         )
//     //         : receipts;


//     const filteredCategorys = searchQuery
//     ? cardReceipt.filter((receipt) => receipt.data.indexOf(searchQuery) !== -1)
//     : selectedCategory
//         ? cardReceipt.filter(
//              //(receipt) => receipt.category === selectedCategory._id,
//             (receipt) => receipt.category === selectedCategory.id,
//         )
//         : cardReceipt;
         

//      const sortedCategorys = _.orderBy(
//          filteredCategorys,
//          [sortBy.path],
//          [sortBy.order]
//      );

//     const receiptsCrop = paginate(sortedCategorys, currentPage, pageSize);

   

//     const handleDelete = (receiptId) => {;
//             dispatch(removeReceipt(receiptId, cardId, cards, dailyExpensesAll));
//         // navigate(-1);
//         };

//     const handleAddIncomeItem = () => {
//         navigate(`/home/main/mainlist/${cardId}/addreceipt`, {replace: true});
//     };

//     const clearFilter = () => {
//         setSelectedCategory();
//     };

//     if (cardReceipt) {
//         // if (receipts) {
//         const count = filteredCategorys.length;
       
//         return (
//             <div className="d-flex">
//                 {categorys && (
//                     <div className="d-flex flex-column flex-shrink-0 p-3">
                     
//                         <GroupList
//                             selectedItem={selectedCategory}
//                             items={categorys}
//                             onItemSelect={handleCategorySelect}
//                             // incomeId={cardId}
//                             incomeId={cardItem.id}
//                         />
//                         <button
//                             className="btn btn-secondary mt-2"
//                             onClick={clearFilter}
//                         >
//                             Очистить
//                         </button>
//                     </div>
//                 )}
//                 <div className="d-flex flex-column">
//                     <input
//                         type="text"
//                         name="searchQuery"
//                         placeholder="Search..."
//                         onChange={handleSearchQuery}
//                         value={searchQuery}
//                     />
//                     {count > 0 && (
//                         <ShowHistoryCardsTable
//                             receipts={receiptsCrop}
//                             onSort={handleSort}
//                             selectedSort={sortBy}
//                             onDelete={handleDelete}
//                         />
//                    )} 
//                     <Pagination
//                         itemsCount={count}
//                         pageSize={pageSize}
//                         currentPage={currentPage}
//                         onPageChange={handlePageChange}
//                     />
//                 </div>
//                 <div>
//                     <button 
//                     onClick={handleAddIncomeItem}
//                     >
//                         Добавить поступление
//                     </button>
//                 </div>
//             </div>
//         );
//     }
//     return "loading...";
// };

// export default ShowHistoryCardPage;

