import { Link } from "react-router-dom";
import Image from "./Image";

const PostListItem = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="md:hidden xl:block xl:w-1/3">
        <Image
          src="postImg.jpeg"
          className="rounded-2xl object-cover "
          width="500"
        />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
        </Link>
        <div className="flex items gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to="/test" className="text-blue-800">
            Jhon Doe
          </Link>
          <span>on</span>
          <Link to="/test" className="text-blue-800">
            Web Design
          </Link>
          <span>2 days ago</span>
        </div>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ex.
        </p>
        <Link to="/test" className="text-blue-800 underline text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
