import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // Always display 5 buttons
    const buttonsToShow = 5;

    // Calculate the start and end buttons based on the current page
    let startButton = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
    let endButton = startButton + buttonsToShow - 1;

    // Adjust the start and end buttons if necessary
    if (endButton > numOfPages) {
      endButton = numOfPages;
      startButton = Math.max(1, endButton - buttonsToShow + 1);
    }

    // Render buttons
    for (let i = startButton; i <= endButton; i++) {
      if (i === currentPage) {
        // Current page
        pageButtons.push(addPageButton({ pageNumber: i, activeClass: true }));
      } else {
        pageButtons.push(addPageButton({ pageNumber: i, activeClass: false }));
      }
    }

    // Rerender the last button to always contain the maximum amount of pages
    pageButtons.pop();
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages ? true : false,
      })
    );

    // Rerender the first button to always contain the number 1
    pageButtons[0] = addPageButton({
      pageNumber: 1,
      activeClass: currentPage === 1 ? true : false,
    });

    // Add ... as button values for button 2 and 4 when the current page is higher than 3 and lower than the maximum amount of pages - 3
    if (pageButtons.length === 5) {
      if (currentPage <= numOfPages - 3) {
        pageButtons[3] = (
          <span className="page-btn dots" key="dots-1">
            ...
          </span>
        );
      }

      if (currentPage > 3) {
        pageButtons[1] = (
          <span className="page-btn dots" key="dots-2">
            ...
          </span>
        );
      }
    }

    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
