import React, { useEffect, useState } from "react";
import { getBooks } from "../../api/book";
import { LazyLoadImage } from "react-lazy-load-image-component";

const categories = [
  {
    id: 1,
    name: "Matemáticas",
  },
  {
    id: 2,
    name: "Administración",
  },
  {
    id: 3,
    name: "Informática",
  },
  {
    id: 4,
    name: "Contabilidad",
  },
  {
    id: 5,
    name: "Investigación",
  },
  {
    id: 6,
    name: "Otros",
  },
];

function Library() {
  const [category, setCategory] = useState(0);
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [booksTable, setBooksTable] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    searchedBooks(e.target.value);
  };

  const searchedBooks = (search) => {
    let results = books.filter((book) => {
      if (book.book_name.toLowerCase().includes(search.toLowerCase())) {
        return book;
      }
    });
    setBooksTable(results);
  };

  const getAllBooks = async () => {
    try {
      const res = await getBooks();
      if (res.status === 200) {
        setBooks(res.data);
        setBooksTable(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const filteredBooks = books.filter((book) => {
    return book.book_classification === category;
  });

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      <div className=" mt-24 md:mt-32  mb-5 md:mb-10 mx-3 md:mx-10 flex items-center  text-2xl md:text-3xl font-bold text-[#1C274C] text-left">
        Biblioteca académica
      </div>
      <div className=" mt-5 mb-5 md:mb-7 mx-3 md:mx-10 flex items-center  text-xl md:text-2xl font-bold text-[#1C274C] text-left">
        Categorías
      </div>
      <div className=" flex justify-center items-center">
        <div className=" block">
          <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 text-sm lg:text-lg">
            <button
              onClick={() => {
                setCategory(0);
              }}
              className=" m-3 p-2 bg-gradient-to-br from-[#ad2845] to-[#9e1264] hover:from-[#1C274C] hover:to-[#146898] transition hover:scale-105 duration-300 text-white rounded-lg"
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                onClick={() => setCategory(category.id)}
                className=" m-3 p-2 bg-gradient-to-br from-[#ad2845] to-[#9e1264] hover:from-[#1C274C] hover:to-[#146898] transition hover:scale-105 duration-300 text-white rounded-lg"
                key={category.id}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className=" mx-3 mt-6 md:mt-10"></div>
          <div className="mx-3 mt-6 md:mt-10">
            <div className=" flex justify-center items-center">
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {category === 0
                  ? books &&
                    books.map((book) => (
                      <a
                        key={book.book_id}
                        href={book.book_url}
                        target="_blank"
                      >
                        <div className="h-[176px] w-[125px] sm:h-[282px] sm:w-[200px] my-5 mx-7 cursor-pointer hover:shadow-lg hover:shadow-[#31444ead] dark:hover:shadow-[#090a0e] duration-300 active:transform active:scale-90 hover:z-10">
                          <img
                            className=" object-contain h-[282px] w-[200px]"
                            src={book.book_cover}
                            alt=""
                          />
                        </div>
                      </a>
                    ))
                  : filteredBooks &&
                    filteredBooks.map((book) => (
                      <a href={book.book_url} key={book.book_id} target="_blank">
                        <div
                          
                          className=" h-[176px] w-[125px] sm:h-[282px] sm:w-[200px] relative my-5 mx-7 cursor-pointer hover:shadow-lg hover:shadow-[#31444ead] dark:hover:shadow-[#090a0e] duration-300 active:transform active:scale-90 hover:z-10"
                        >
                          <LazyLoadImage
                            className=" object-contain h-[282px] w-[200px]"
                            src={book.book_cover}
                            alt=""
                          />
                        </div>
                      </a>
                    ))}
              </div>
            </div>
          </div>
          <div className="mx-3 mt-20">
            <div className=" flex items-center">
              <div className=" text-xl md:text-2xl font-bold text-[#1C274C] text-left">
                Lista de libros
              </div>
            </div>
            <div className=" my-10">
              <div className="relative mb-4 flex w-[100%] md:w-[25vw] flex-wrap items-stretch rounded-lg bg-white dark:bg-[#949494]">
                <input
                  type="search"
                  className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-[#1C274C] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-600 dark:placeholder:text-neutral-600 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  onChange={handleChange}
                />
                <span
                  className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 fill-[#1C274C]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <div className=" my-10">
                <div className=" flex justify-center items-center">
                  <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {search === ""
                      ? books &&
                        books.map((book) => (
                          <div key={book.book_id} className=" m-3 sm:m-7 ">
                            <a href={book.book_url} target="_blank">
                              <div className="bg-gradient-to-br from-[#442f4e] to-[#a26da7] hover:from-[#146898] hover:to-[#146898] cursor-pointer hover:shadow-lg hover:shadow-[#31444ead] dark:hover:shadow-[#090a0e] duration-300 active:transform active:scale-90 hover:z-10 h-24 w-36 sm:h-28 sm:w-48 flex justify-center items-center rounded-lg">
                                <div className=" text-white text-sm sm:text-md text-center p-1">
                                  {book.book_name}
                                </div>
                              </div>
                            </a>
                          </div>
                        ))
                      : booksTable &&
                        booksTable.map((book) => (
                          <div key={book.book_id} className=" m-3 sm:m-7 ">
                            <a href={book.book_url} target="_blank">
                              <div className=" bg-gradient-to-br from-[#442f4e] to-[#a26da7] hover:from-[#146898] hover:to-[#146898] cursor-pointer hover:shadow-lg hover:shadow-[#31444ead] dark:hover:shadow-[#090a0e] duration-300 active:transform active:scale-90 hover:z-10 h-24 w-36 sm:h-28 sm:w-48 flex justify-center items-center rounded-lg ">
                                <div className=" text-white text-sm sm:text-md text-center p-1">
                                  {book.book_name}
                                </div>
                              </div>
                            </a>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
{
  /* <div className=" bg-black h-[282px] w-[200px]"></div> */
}
