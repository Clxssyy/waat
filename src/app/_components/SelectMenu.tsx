"use client";

import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { getBackdropColor, getBorderColor, getTextColor } from "~/styles";
import SelectOption from "./SelectOption";
import ImageHelper from "./ImageHelper";
import type { SelectOptions } from "~/types";

const SelectMenu = ({
  options,
  allOptions,
  placeholder,
  value,
  onChange,
  selectColor,
  optionsColor,
}: {
  options: SelectOptions[];
  allOptions?: SelectOptions[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  selectColor?: string;
  optionsColor?: string;
}) => {
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const selectContainerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = useMemo(
    () => options.find((opt) => opt.name === value),
    [value, options],
  );
  const filteredOptions = useMemo(
    () =>
      options.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, options],
  );

  const current =
    allOptions?.find((opt) => opt.name === value) ??
    options?.find((opt) => opt.name === value);
  const colorDeterminant = current
    ? "rarity" in current
      ? current?.rarity
      : current?.type
    : "";

  const toggleOpen = () => setOpen((o) => !o);
  const selectOption = (option: SelectOptions) => {
    onChange(
      selected
        ? option.name !== selected.name
          ? option.name
          : ""
        : option.name,
    );
    setOpen(false);
  };
  const clear = () => {
    onChange("");
    setOpen(false);
  };

  useEffect(() => {
    if (open && optionsContainerRef.current)
      optionsContainerRef.current.scrollTop = 0;
  }, [filteredOptions, search, open]);

  useEffect(() => {
    setSearch("");
    function handleClickOutside(event: MouseEvent) {
      if (
        selectContainerRef.current &&
        !selectContainerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex gap-2">
      <div
        className={clsx(
          "h-12 w-12 min-w-12 rounded",
          current
            ? clsx(
                "border-2",
                getBackdropColor(colorDeterminant),
                getBorderColor(colorDeterminant),
              )
            : "border border-neutral-600",
          selectColor ?? "bg-neutral-700",
        )}
      >
        {current?.image ? (
          <ImageHelper
            src={current.image}
            alt={current.name}
            width={current && "rarity" in current ? 800 : 2436}
            height={current && "rarity" in current ? 800 : 1440}
            className="size-full object-cover"
          />
        ) : null}
      </div>
      <div ref={selectContainerRef} className="relative h-12 grow">
        <button
          className={clsx(
            "flex h-full w-full cursor-pointer items-center rounded border border-neutral-600 text-lg transition-all",
            open && "rounded-b-none",
            selectColor ?? "bg-neutral-700",
          )}
          onClick={toggleOpen}
        >
          {open ? (
            <input
              type="text"
              className="w-full px-2 py-2 outline-none"
              placeholder={selected?.name ?? placeholder ?? "Type here..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          ) : (
            <h2
              className={clsx(
                "w-full px-2 py-2 text-left transition-all",
                selected && getTextColor(colorDeterminant),
              )}
            >
              {selected?.name ?? placeholder ?? "Default"}
            </h2>
          )}
          <BiChevronDown
            className={clsx(
              "text-2xl text-neutral-400 transition-all",
              open && "scale-y-[-1]",
            )}
          />
        </button>
        <div
          ref={optionsContainerRef}
          className={clsx(
            "absolute top-full z-20 flex max-h-72 w-full flex-col overflow-y-auto border border-neutral-600 bg-neutral-800",
            !open && "hidden",
          )}
        >
          {filteredOptions.map((option, i) => {
            return (
              <SelectOption
                key={i}
                option={option}
                selected={selected === option}
                color={optionsColor}
                description={
                  option.type[0]?.toUpperCase() +
                  option.type.slice(1) +
                  (option.set
                    ? " - " +
                      option.set[0]?.toUpperCase() +
                      option.set?.slice(1)
                    : "")
                }
                onClick={() => selectOption(option)}
              />
            );
          })}
        </div>
      </div>
      <button
        className={clsx(
          "flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-neutral-600 transition-all hover:text-red-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40",
          selectColor ?? "bg-neutral-700",
        )}
        aria-label="Clear equipment"
        disabled={!current}
        onClick={clear}
      >
        <IoClose className="h-6 w-6" />
      </button>
    </div>
  );
};

export default SelectMenu;
