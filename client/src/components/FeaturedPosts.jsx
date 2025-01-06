import { Link } from "react-router-dom";
import Image from "./Image";

const FeaturedPosts = () => {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First Post */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <Image
          src="featured1.jpeg"
          className="rounded-3xl object-cover"
          width="895"
        />
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg">Web Design</Link>
          <span className="text-gray-500">2 days ago</span>
        </div>
        <Link
          to="/test"
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Link>
      </div>
      {/* Other Posts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* second post */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 flex ">
            <Image
              src="featured2.jpeg"
              className="rounded-3xl object-cover aspect-[4/3]"
            />
          </div>
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">0.2</h1>
              <Link to="/test" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            {/* title */}
            <Link
              to="/test"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Link>
          </div>
        </div>
        {/* third post */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 flex ">
            <Image
              src="featured3.jpeg"
              className="rounded-3xl object-cover aspect-[4/3]"
            />
          </div>
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">0.2</h1>
              <Link to="/test" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            {/* title */}
            <Link
              to="/test"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Link>
          </div>
        </div>
        {/* fo post */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 flex ">
            <Image
              src="featured4.jpeg"
              className="rounded-3xl object-cover aspect-[4/3]"
            />
          </div>
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">0.2</h1>
              <Link to="/test" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            {/* title */}
            <Link
              to="/test"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
