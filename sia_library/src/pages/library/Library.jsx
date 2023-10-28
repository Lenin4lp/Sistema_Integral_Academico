import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { getBook, getBooks } from "../../api/book";

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
  const [booksTable, setBooksTable] = useState([]);

  const getAllBooks = async () => {
    try {
      const res = await getBooks();
      if (res.status === 200) {
        setBooks(res.data);
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

  category === 0 ? console.log(books) : console.log(filteredBooks);
  console.log(books.book_cover);
  return (
    <div>
      <div>
        <Navbar />
      </div>
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
          <div className=" mx-3 mt-6 md:mt-10">
            <div className="relative mb-4 flex w-[100%] md:w-[25vw] flex-wrap items-stretch rounded-lg bg-white dark:bg-[#949494]">
              <input
                type="search"
                className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-[#1C274C] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-600 dark:placeholder:text-neutral-600 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
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
          </div>
          <div className="mx-3 mt-6 md:mt-10">
            <div className=" flex justify-center items-center">
              <div className=" grid grid-cols-1 lg:grid-cols-4 ">
                {category === 0
                  ? books &&
                    books.map((book) => (
                      <div
                        key={book.book_id}
                        className="  h-[282px] w-[200px] my-5 mx-7"
                      >
                        <img src={book.book_cover} alt="" />
                      </div>
                    ))
                  : filteredBooks &&
                    filteredBooks.map((book) => (
                      <div
                        key={book.book_id}
                        className=" h-[282px] w-[200px] my-5 mx-7"
                      >
                        <img src={book.book_cover} alt="" />
                      </div>
                    ))}
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
