import Link from "next/link";
import { useStateContext } from "../context/context";

const TagIndex: React.FC<any> = () => {
  const { tagData } = useStateContext();
  return (
    <>
      <h4>TAG</h4>
      <ul>
        {Object.entries(tagData).map((item: any, i) => (
          <li
            key={i}
            className="text-sm w-24 text-left mb-1 hover:text-yellow-500 p-1"
          >
            <Link
              href="/tag-filter-page/[name]"
              as={`/tag-filter-page/${item[0]}`}
              passHref
            >
              <a>
                {item[0]}({item[1]})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TagIndex;
