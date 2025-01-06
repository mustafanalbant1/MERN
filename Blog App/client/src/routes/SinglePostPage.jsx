import { Link } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";

const SinglePostPage = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-4xl font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link to="/test" className="text-blue-800">
              John Doe
            </Link>
            <span>on</span>
            <Link to="/test" className="text-blue-800">
              Web Design
            </Link>
            <span>2 days ago</span>
          </div>
          <p className="text-gray-500 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <Image src="postImg.jpeg" className="rounded-2xl object-cover" />
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-8 text-justify w-4/5">
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
          </p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
          </p>
        </div>
        {/* menu */}
        <div className="px-6 py-4 h-max sticky top-8 w-1/4 bg-white shadow-lg rounded-lg">
          <h1 className="text-xl font-semibold mt-8 mb-4">Author</h1>
          <div className="flex flex-col items-center gap-4">
            <Image
              src="userImg.jpeg"
              className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
              width="64"
              height="64"
            />
            <Link to="/test" className="text-blue-800 text-lg font-medium">
              John Doe
            </Link>
            <p className="text-gray-600 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
            </p>
            <div className="flex gap-2">
              <Link to="/test">
                <Image src="facebook.svg" className="w-6 h-6" />
              </Link>
              <Link to="/test">
                <Image src="instagram.svg" className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <PostMenuActions />
          <h1 className="font-bold mt-8 mb-4">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/">
              All
            </Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="font-bold mt-8 mb-4">Search</h1>
          <Search />
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default SinglePostPage;
