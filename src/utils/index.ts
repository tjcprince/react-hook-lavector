
import {useRef,useEffect} from "react";
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {

        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
