import Link from "next/link";

const RightSideBar: React.FC<any> = ({ tagCount }) => {
  return (
    <div>
      <ul>
        {Object.entries(tagCount).map((item: any, i) => (
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
    </div>
  );
};

export default RightSideBar;
