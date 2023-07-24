"use client";
import { Box } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { mergeSx } from "@/utils";
import styles from "./styles";

/**
 * RootLoadingProvider
 * 全体で1つ配置する。loadingElementを渡すことで、loading中に表示する要素を指定できる。
 */
type RootLoadingContextType = {
  loadingElement: React.ReactNode;
};

const RootLoadingContext = createContext<RootLoadingContextType>({ loadingElement: null });

type LoadingProviderProps = {
  children: React.ReactNode;
  loadingElement: React.ReactNode;
};

const LoadingProvider: React.FC<LoadingProviderProps> = (props) => {
  const { children, loadingElement } = props;
  return (
    <RootLoadingContext.Provider value={{ loadingElement }}>{children}</RootLoadingContext.Provider>
  );
};

/**
 * LoadingProvider
 * ローディングさせたいコンポーネント単位で配置する。
 * withLoading HOCを使用することで、そのコンポーネント内でloading状態を管理できる。
 */
type LoadingContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const LoadingContext = createContext<LoadingContextType>([false, () => {}]);

type LoadingContainerProps = {
  children: React.ReactNode;
};

const LoadingContainer: React.FC<LoadingContainerProps> = (props) => {
  const { children } = props;
  const [loading, setLoading] = useState(false);
  const { loadingElement } = useContext(RootLoadingContext);
  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {children}
      <Box sx={mergeSx(styles.loading, !loading && styles.hidden)}>{loadingElement}</Box>
    </LoadingContext.Provider>
  );
};

function useLoading() {
  return useContext(LoadingContext);
}

function withLoading<P>(Component: React.ComponentType<P>): React.ComponentType<P> {
  return function LoadingContainer(props: any) {
    return (
      <LoadingContainer>
        <Component {...props} />
      </LoadingContainer>
    );
  };
}

export type { LoadingProviderProps as RootLoadingProviderProps };
export { useLoading, withLoading, LoadingContainer };
export default LoadingProvider;
