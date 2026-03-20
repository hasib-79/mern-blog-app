import React, { useEffect, useRef, useState } from "react";
import { formatISO9075 } from 'date-fns'
import { useNavigate } from "react-router-dom";

const Post = ({ postId, postImg, title, summary, createdAt, author }) => {
  const navigate = useNavigate();

  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);

  const [summaryMaxHeight, setSummaryMaxHeight] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const calculateHeight = () => {
      if (!imgRef.current || !titleRef.current || !metaRef.current) return;

      if (mediaQuery.matches) {
        const imgHeight = imgRef.current.offsetHeight;
        const titleHeight = titleRef.current.offsetHeight;
        const metaHeight = metaRef.current.offsetHeight;

        const available = imgHeight - (titleHeight + metaHeight);

        setSummaryMaxHeight(available > 0 ? available : 0);
      } else {
        // remove restriction below sm
        setSummaryMaxHeight(null);
      }
    };

    calculateHeight();

    const resizeObserver = new ResizeObserver(calculateHeight);

    if (imgRef.current) resizeObserver.observe(imgRef.current);
    if (titleRef.current) resizeObserver.observe(titleRef.current);
    if (metaRef.current) resizeObserver.observe(metaRef.current);

    window.addEventListener("resize", calculateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return (
    <div onClick={() => (navigate(`/post/${postId}`))} className="grid sm:grid-cols-[.7fr_1.3fr] grid-cols-[1fr] gap-2 sm:gap-8 cursor-pointer">

      {/* Image */}
      <div className="">
        <img
          ref={imgRef}
          src={postImg}
          alt=""
          className="w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col">

        {/* Title */}
        <p ref={titleRef} className="font-bold text-xl">
          {title}
        </p>

        {/* Author + Time */}
        <div ref={metaRef} className="flex items-center gap-3 mb-2">
          <p className="font-bold text-[.86rem] text-[#333]">{author}</p>
          <time className="text-[#aaa] text-[.89rem]">
            {formatISO9075(new Date(createdAt))}
          </time>
        </div>

        {/* Summary */}
        <p
          className="leading-[1.7rem] overflow-hidden"
          style={summaryMaxHeight !== null ? { maxHeight: summaryMaxHeight } : {}}
        >
          {summary}
        </p>

      </div>
    </div>
  );
};

export default Post;