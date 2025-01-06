import Image from "./Image";

const Comment = () => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Image
          src="userImg.jpeg"
          className="w-12 h-12 rounded-full object-cover"
          w="40"
        />
        <span className="font-medium">Johm Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod sint
          similique architecto eius quam quidem fugit voluptatibus reprehenderit
          officia exercitationem?
        </p>
      </div>
    </div>
  );
};

export default Comment;
