import Link from "next/link";
import TagIndex from "./TagIndex";

const RightSideBar: React.FC<any> = () => {
  return (
    <>
      <section>
        <TagIndex />
      </section>
    </>
  );
};

export default RightSideBar;
