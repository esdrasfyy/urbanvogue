import { MinMaxUi } from "../../../../components/ui/inputs/min-max";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Select,
} from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import { FiltersI } from "../../types";
import { ContextLoading } from "@/contexts/ContextLoading";

interface FilterProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  filters: FiltersI | null;
}
function Filter({ onClose, isOpen, onOpen, filters }: FilterProps) {
  const contextLoading = useContext(ContextLoading)!;
  const { loading } = contextLoading;
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const [arrow1, setArrow1] = useState(false);
  const [arrow2, setArrow2] = useState(false);
  const [arrow3, setArrow3] = useState(false);
  const [order, setOrder] = useState("Relevance");
  const [category, setCategory] = useState("Categories");
  const [brand, setBrand] = useState("Brands");
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(999);
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.has("brand")) {
      setBrand(searchParams.get("brand") || "Brands");
    }
    if (searchParams.has("category")) {
      setCategory(searchParams.get("category") || "Categories");
    }
    if (searchParams.has("orderBy")) {
      setOrder(searchParams.get("orderBy") || "Relevance");
    }
    if (searchParams.has("min")) {
      setMin(parseInt(searchParams.get("min") || "0"));
    }
    if (searchParams.has("max")) {
      setMax(parseInt(searchParams.get("max") || "999"));
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    let pageQuery = searchParams.get("page");

    if (!search) {
      return router.back();
    }

    if (brand !== "Brands") {
      params.set("brand", brand);
    }
    if (category !== "Categories") {
      params.set("category", category);
    }
    if (!isNaN(min) && min > 0 && min < 999 && min < max) {
      params.set("min", `${min}`);
      if (!params.get("max")) {
        params.set("max", `${max}`);
      }
    }
    if (!isNaN(max) && max < 999 && max > 0 && min < max) {
      params.set("max", `${max}`);
      if (!params.get("min")) {
        params.set("min", `${min}`);
      }
    }
    params.set("query", search);
    params.set("page", pageQuery || "1");
    router.push(pathname + "?" + params.toString());
  }, [search, brand, category, min, max, pathname, searchParams, router]);

  const handleMin = (value: string) => {
    const realValue = parseInt(value);
    setMin(realValue);
  };
  const handleMax = (value: string) => {
    const realValue = parseInt(value);
    setMax(realValue);
  };
  return (
    <Drawer size={"xs"} isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay
        bg="none"
        backdropFilter="saturate(150%) blur(4px)"
        backdropInvert="50%"
        backdropBlur="3px"
      />
      <DrawerContent backgroundColor={"#171a1b"} textColor={"#d9d9d9"}>
        <DrawerCloseButton className="hover:text-custom-pink" />
        <DrawerHeader className="shadow-snipped">Filter & Order </DrawerHeader>
        <Divider />
        <DrawerBody backgroundColor={"#171a1b"}>
          <section className="h-full flex flex-col justify-between mb-16">
            <div>
              <div>
                <div>
                  <h4 className="text-base font-semibold mt-4 mb-2">
                    Category
                  </h4>
                  <Select
                    iconColor="#ed145b"
                    icon={arrow2 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                    onBlur={() => setArrow1(false)}
                    value={category}
                    onClick={() => setArrow2(!arrow2)}
                    onChange={(e) => setCategory(e.target.value)}
                    _focus={{
                      borderColor: "#ed145b",
                      boxShadow: "0 0 0 1px #ed145b",
                    }}
                    color={"#fff"}
                    backgroundColor={"#333"}
                    className="p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
                  >
                    <option value="Categories" className="select-css">
                      Categories
                    </option>
                    {filters &&
                      Object.entries(filters.categories).map(
                        ([category, count]) => (
                          <option
                            key={category}
                            value={category}
                            className="select-css"
                          >
                            {" "}
                            {category} ({count}){" "}
                          </option>
                        )
                      )}
                  </Select>
                </div>
                <div>
                  <h4 className="text-base font-semibold mt-5 mb-2">Brand</h4>
                  <Select
                    iconColor="#ed145b"
                    icon={arrow3 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                    onBlur={() => setArrow1(false)}
                    value={brand}
                    onClick={() => setArrow3(!arrow3)}
                    onChange={(e) => setBrand(e.target.value)}
                    _focus={{
                      borderColor: "#ed145b",
                      boxShadow: "0 0 0 1px #ed145b",
                    }}
                    className="p-0 shadow-snipped border-[10px] border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
                  >
                    <option value="Brands" className="select-css">
                      Brands
                    </option>
                    {filters &&
                      Object.keys(filters.brands).map((brand) => (
                        <option
                          key={brand}
                          value={brand}
                          className="select-css"
                        >
                          {brand}
                        </option>
                      ))}
                  </Select>
                </div>
                <h4 className="text-base font-semibold mt-5">Price</h4>
                <div className="flex gap-5">
                  <div className="w-full">
                    <MinMaxUi
                      type="number"
                      label="min:"
                      pleaceholder="min"
                      name="min"
                      defaultvalue={min}
                      disabled={loading ? true : false}
                      handleMinMax={handleMin}
                    />
                  </div>

                  <div className="w-full">
                    <MinMaxUi
                      type="number"
                      label="max:"
                      pleaceholder="max"
                      name="max"
                      defaultvalue={max}
                      disabled={loading ? true : false}
                      handleMinMax={handleMax}
                    />
                  </div>
                </div>
              </div>
              <h4 className="text-base font-semibold mt-5 mb-2">Order By</h4>
              <Select
                iconColor="#ed145b"
                icon={arrow1 ? <TbArrowBadgeUp /> : <TbArrowBadgeDown />}
                onBlur={() => setArrow1(false)}
                value={order}
                onClick={() => setArrow1(!arrow1)}
                onChange={(e) => setOrder(e.target.value)}
                _focus={{
                  borderColor: "#ed145b",
                  boxShadow: "0 0 0 1px #ed145b",
                }}
                className="p-0 shadow-snipped border-4 border-solid rounded-md outline-none focus:ring-custom-pink cursor-pointer focus:border-custom-pink"
              >
                <option value="Relevance" className="select-css">
                  Relevance
                </option>
                <option value="Price" className="select-css">
                  Lowest price
                </option>
                <option value="Recent" className="select-css">
                  Recent
                </option>
                <option value="A-Z" className="select-css">
                  A-Z
                </option>
              </Select>
              <div>
                <h4 className="text-base font-semibold mt-5 mb-2">Sizes</h4>
                <ul className="flex flex-wrap w-full gap-3 items-start text-[10px]">
                  {filters &&
                    Object.keys(filters.sizes).map((size) => (
                      <li
                        className="px-2 py-0.5 gradient-gray border-[1px] border-custom-pink rounded-md"
                        key={size}
                      >
                        {size}
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="text-base font-semibold mt-5 mb-2">Colors</h4>
                <ul className="flex flex-wrap w-full gap-3 items-start text-[10px]">
                  {filters &&
                    Object.keys(filters.colors).map((color) => (
                      <li
                        className="p-1 gradient-gray border-[1px] border-custom-pink  rounded-md"
                        key={color}
                      >
                        {color.toUpperCase()}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </section>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export { Filter };
