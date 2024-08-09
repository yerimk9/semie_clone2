"use client";
import React, { useState } from "react";
import { FilterProps } from "../types";

function Filter({ list }: FilterProps) {
  const [activeItem, setActiveItem] = useState("전체");

  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <>
      <p>전체</p>
      <ul>
        {list.map((item) => (
          <li key={item} className={`${item === activeItem && "on"}`}>
            <button type="button" onClick={() => handleClick(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Filter;
