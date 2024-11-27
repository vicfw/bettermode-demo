import DOMPurify from "dompurify";
import { MouseEvent, useCallback, useMemo, useRef, useState } from "react";
import { Fields } from "../../../types";
import { useLocation, useNavigate } from "react-router";

export const usePostCard = (fields: Fields[]) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  // check if current page is home page
  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  // find related description field
  const descriptionString = fields
    .find((field) => field.key === "content")
    ?.value.replace(/^"|"$/g, "");

  // check if description is more than 1500 characters
  const hasMore = useMemo(
    () => descriptionString && descriptionString?.length > 1500,
    [descriptionString]
  );

  // post ref for scrolling purpose
  const postRef = useRef<HTMLDivElement | null>(null);

  const [isMoreContentShown, setIsMoreContentShown] = useState(false);

  // sanitize html
  const cleanHtml = DOMPurify.sanitize(descriptionString || "");

  // show more content handler
  const handleClickMore = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setIsMoreContentShown((prev) => !prev);

    // Scrolls the post content into view smoothly when the "show more" content is toggled.
    if (isMoreContentShown) {
      postRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /**
   * Navigates back to the previous page in the browser history.
   */
  const handleBack = useCallback(() => {
    navigate(-1);
  }, []);

  return {
    get: {
      hasMore,
      isMoreContentShown,
      cleanHtml,
      descriptionString,
      postRef,
      isHomePage,
    },
    on: { handleClickMore, handleBack },
  };
};
