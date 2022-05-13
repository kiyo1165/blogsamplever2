import { useContext, useState, createContext, ReactNode } from "react";

const StateContext = createContext(
  {} as {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

interface Props {
  children: ReactNode;
}

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <StateContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
