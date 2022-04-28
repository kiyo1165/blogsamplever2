import { TAG, BLOG_POST } from "../@types/types";

const Tag: React.FC<{
  tag: TAG;
  index: number;
  setInputState: React.Dispatch<React.SetStateAction<BLOG_POST>>;
  inputState: BLOG_POST;
}> = ({ index, tag, setInputState, inputState }) => {
  const handleDeleteTag = () => {
    const newItems = inputState.tags.filter((v: any) => v.id !== tag.id);
    setInputState({ ...inputState, tags: newItems });
  };
  return (
    <p
      key={index}
      className="text-xs m-1 inline-flex items-center leading-sm uppercase px-2 py-1 bg-blue-200 text-blue-700 rounded-full"
    >
      {tag.name}
      <button onClick={handleDeleteTag} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
          />
        </svg>
      </button>
    </p>
  );
};

export default Tag;
