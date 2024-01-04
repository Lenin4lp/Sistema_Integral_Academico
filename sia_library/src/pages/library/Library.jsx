import React, { useEffect, useState } from "react";
import { getBooks } from "../../api/book";
import { LazyLoadImage } from "react-lazy-load-image-component";

const categories = [
  {
    id: 1,
    name: "Administración Financiera",
  },
  {
    id: 2,
    name: "Asistencia Administrativa",
  },
  {
    id: 3,
    name: "Desarrollo de Software",
  },
  {
    id: 4,
    name: "Comercio Exterior",
  },
  {
    id: 5,
    name: "Técnico Superior en Ventas",
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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

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
    return book.book_classification == category;
  });

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      <div className=" overflow-x-hidden relative ">
        <div className=" fixed top-0 w-full h-fit bg-white z-30">
          <div>
            <h1 className=" text-left text-[12px] md:text-base p-2 text-[#1C274C]">
              Bienvenid@ al <span className=" pl-1 font-bold">S</span>istema{" "}
              <span className=" pl-1 font-bold">I</span>ntegral{" "}
              <span className=" pl-1 font-bold">A</span>cadémico
            </h1>
          </div>
        </div>
      </div>
      <div className="  h-fit mt-10 md:mt-5 w-full flex justify-start items-center">
        <div className=" block">
          <div className=" flex justify-start items-start">
            <div className="  mt-8 md:mt-14 mx-2 md:mx-10 inline-flex items-center justify-center gap-3">
              <svg
                className="  h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
                viewBox="0 0 15 15"
                version="1.1"
                id="library"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M1.0819,9.9388C0.9871,9.867,1.0007,9.7479,1.0007,9.7479L1.5259,3.5c0,0,0.0082-0.0688,0.0388-0.104
	C1.584,3.374,1.6084,3.342,1.6544,3.3232C2.1826,3.1072,5.0537,1.5519,6.5,3c0.2397,0.2777,0.4999,0.6876,0.4999,1v5.2879
	c0,0,0.0062,0.1122-0.0953,0.1801c-0.0239,0.016-0.124,0.0616-0.242,0.0026c-2.2253-1.1134-4.711,0.1546-5.3381,0.4871
	C1.1987,10.0244,1.1006,9.9531,1.0819,9.9388z M13.6754,9.9577c-0.6271-0.3325-3.1128-1.6005-5.3381-0.4871
	c-0.118,0.059-0.2181,0.0134-0.242-0.0026C7.9939,9.4001,8.0001,9.2879,8.0001,9.2879V4c0-0.3124,0.2602-0.7223,0.4999-1
	c1.4463-1.4481,4.2991,0.1071,4.8273,0.3232c0.046,0.0188,0.0704,0.0508,0.0897,0.0728C13.4476,3.4312,13.4558,3.5,13.4558,3.5
	l0.5435,6.2479c0,0,0.0136,0.1191-0.0812,0.1909C13.8994,9.9531,13.8013,10.0244,13.6754,9.9577z M8.8647,12.6863
	c0.0352-0.0085,0.0964-0.0443,0.1179-0.0775c0.0236-0.0364,0.0378-0.0617,0.0423-0.1088c0.0495-0.9379,1.6245-1.8119,4.6477-0.0298
	c0.0775,0.0441,0.1666,0.0396,0.2425-0.0155C14.0014,12.392,14,12.2859,14,12.2859v-0.5542c0,0,0.0003-0.0764-0.0272-0.1184
	c-0.0205-0.0312-0.0476-0.0643-0.0926-0.0858c-2.0254-1.3145-4.5858-1.8972-5.8854-0.1592
	c-0.0181,0.0423-0.0353,0.0613-0.0728,0.0905C7.8654,11.5028,7.7964,11.5,7.7964,11.5H7.2109c0,0-0.069,0.0028-0.1256-0.0412
	c-0.0375-0.0292-0.0547-0.0482-0.0728-0.0905c-1.2996-1.738-3.86-1.1828-5.8854,0.1317c-0.045,0.0215-0.0721,0.0546-0.0926,0.0858
	c-0.0275,0.042-0.0272,0.1184-0.0272,0.1184v0.5542c0,0-0.0014,0.1061,0.0849,0.1688c0.0759,0.0551,0.165,0.0596,0.2425,0.0155
	c3.0232-1.7821,4.5982-0.8806,4.6477,0.0573c0.0045,0.0471,0.0187,0.0724,0.0423,0.1088c0.0215,0.0332,0.0827,0.069,0.1179,0.0775
	C6.8645,12.8656,7.9112,12.9363,8.8647,12.6863z"
                  ></path>{" "}
                </g>
              </svg>
              <h1 className=" text-white underline underline-offset-8 decoration-2 text-left decoration-[#146898] duration-300 text-xl md:text-2xl lg:text-3xl font-semibold font-mono">
                Biblioteca
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-10 mt-10 flex justify-start items-center">
        <div>
          <select
            onChange={handleCategoryChange}
            className=" w-[250px] p-1"
            name=""
            id=""
          >
            <option value="">Todos</option>
            {categories &&
              categories.map((category) => (
                <option className=" " key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="  flex justify-center items-center">
        <div className=" block">
          <div className=" mx-3 mt-6 md:mt-10"></div>
          <div className="mx-3 mt-6 md:mt-10">
            <div className=" flex justify-center items-center">
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {category == 0
                  ? books &&
                    books.map((book) => (
                      <a
                        key={book.book_id}
                        href={book.book_url}
                        target="_blank"
                      >
                        <div className="group relative h-fit w-fit bg-white my-5 mx-7 cursor-pointer hover:shadow-lg hover:shadow-[#0c0d14] duration-300 active:transform active:scale-90 hover:z-10">
                          <span className="absolute top-0 left-0 right-0 text-center hidden lg:flex scale-0 transition-all rounded bg-gray-800 p-2 text-sm text-white group-hover:scale-100">
                            {book.book_name}
                          </span>
                          <LazyLoadImage
                            className=" object-contain h-[282px] w-[200px]"
                            src={book.book_cover}
                            alt=""
                          />
                        </div>
                      </a>
                    ))
                  : filteredBooks &&
                    filteredBooks.map((book) => (
                      <a
                        key={book.book_id}
                        href={book.book_url}
                        target="_blank"
                      >
                        <div className="group relative h-fit w-fit bg-white my-5 mx-7 cursor-pointer hover:shadow-lg hover:shadow-[#0c0d14] duration-300 active:transform active:scale-90 hover:z-10">
                          <span className="absolute top-0 left-0 right-0 text-center hidden lg:flex scale-0 transition-all rounded bg-gray-800 p-2 text-sm text-white group-hover:scale-100">
                            {book.book_name}
                          </span>
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
          
        </div>
      </div>
    </div>
  );
}

export default Library;
{
  /* <div className=" bg-black h-[282px] w-[200px]"></div> */
}
