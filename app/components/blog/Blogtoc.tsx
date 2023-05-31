"use client"
import { useEffect, useRef, useState } from "react";

type TOSType = {
  selector: string;
};

export const TOC = ({ selector }: TOSType) => {

  const [currentHeadingID, setCurrentHeadingID] = useState<
    string | undefined
  >();

  const listWrapperRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);



  const [headings, setHeadings] = useState<HTMLHeadElement[]>([]);
  useEffect(() => {
    const headingNodeList = document
      .querySelector(selector)!
      .querySelectorAll("h1,h2,h3,h4,h5,h6") as NodeListOf<HTMLHeadElement>;

    if (headingNodeList.length) {
      const headingArray = Array.from(headingNodeList);
      headingArray.forEach((el) => {
        el.dataset.id = Math.round(Math.random() * 100000).toString();
      });
      setHeadings(headingArray);
    }
  }, []);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // if (entry.intersectionRatio > 0.9) {
          // console.log(entry.target.innerHTML, entry.intersectionRatio);
          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            setCurrentHeadingID((entry.target as HTMLHeadElement).dataset.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -60% 0%",
        threshold: 1,
      }
    );

    if (headings.length) {
      headings.forEach((s) => {
        observer.observe(s);
      });
    }

    return () => {
      return observer.disconnect();
    };
  }, [headings.length]);

  useEffect(() => {
    const element = listWrapperRef.current?.querySelector(
      'button[data-id="' + currentHeadingID + '"]'
    );

    if (currentHeadingID && element) {
      listWrapperRef.current?.scrollTo({
        top: (element as HTMLElement).offsetTop,
        behavior: "smooth",
      });
    }
  }, [currentHeadingID]);

  console.log(headings)
  return (
    <div
      ref={wrapperRef}
    >

      <div
        className={`z-50 top-[103%] p-2 inset-x-0 bg-zinc-100 drop-shadow rounded-b-2xl overflow-hidden transition-[height] duration-200 `}
      >
        <div ref={listWrapperRef}>
          {headings.map((heading) => {
            const tagLevel = heading.tagName.match(/(\d+)/)?.[0] || "1";
            return (
              <div
                key={heading.dataset.id}
                style={{ paddingLeft: +tagLevel * 7 + "px", 
                color : currentHeadingID ===  heading.dataset.id ? 'purple' : 'black',
                fontWeight : currentHeadingID ===  heading.dataset.id ? 'bold' : 'normal'}}

                className="mb-2 cursor-pointer"
                title={heading.innerHTML}
                data-id={heading.dataset.id}
                onClick={() => {
                  window.scrollTo({
                    top:
                      heading.getBoundingClientRect().top + window.scrollY - 60,
                    behavior: "smooth",
                  });
                }}
              >
                {heading.innerHTML}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
