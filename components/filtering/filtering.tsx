import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, CheckBox, Slider } from "react-native-elements";
import { useAtom } from "jotai";
import filterAtom from "./filterAtom";
import { Filters, defaultFilters } from "../types/types";
import CarFilter from "./carFilter";
import PriceFilter from "./PriceFilter";

const Filtering = () => {
  const [filterOn, setFilterOn] = useState(false);
  const [remove, setRemove] = useState(false);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useAtom(filterAtom);
  useEffect(() => {
    if (remove) {
      setFilters(defaultFilters);
      setRemove(false);
      setFilterOn(false)
      setOpen(false)
    }
  }, [remove]);

  function handlePrice(value: number) {
    const wholeValue = Math.floor(value * 200);
    setFilters((prev) => ({ ...prev, minPrice: wholeValue }));
    setFilterOn(true)
  }

  function handleCarType(type: "car" | "motor" | "station") {
    setFilters((prev) => ({ ...prev, wehicleType: type }));
    setFilterOn(true)
  }

  return (
    <View>
      <TouchableOpacity
        style={{ width: "100%", height: "5%" }}
        onPress={() => setOpen(!open)}
      >
        {filterOn ? (
          <MaterialCommunityIcons
            name="check-circle"
            size={20}
            color={"green"}
            style={{ position: "absolute", right: 3, top:-5,zIndex:2 }}
          />
        ) : null}
        <Fontisto
          name="filter"
          size={25}
          color={"black"}
          style={{ position: "absolute", right: 10 }}
        />
        <Text style={{ position: "absolute", right: 40 }}>Filters</Text>
      </TouchableOpacity>
      {open && filters && (
        <TouchableOpacity style={styles.overlay} onPress={() => setOpen(!open)}>
          <View style={styles.optionsStyle}>
            <CheckBox
              center
              title={"remove filters"}
              iconRight
              iconType="material"
              checked={remove}
              checkedIcon="clear"
              uncheckedIcon="clear"
              onPress={() => setRemove(!remove)}
            />
            <CarFilter filters={filters} handleCarType={handleCarType} />
            <PriceFilter
              minValue={filters.minPrice}
              priceChange={handlePrice}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsStyle: {
    width: "auto",
    height: "auto",
    position: "absolute",
    top: 130,
    right: 5,
    elevation: 3,
    borderWidth: 0.1,
    padding: 10,
    zIndex: 2,
    backgroundColor: "white",
  },
  optionTxt: {
    padding: 10,
  },
  overlay: {
    top: -100,
    width: "100%",
    height: 700,
    backgroundColor: "rgba(0,0,0,0.1)",
    position: "absolute",
    zIndex: 1,
  },
});

export default Filtering;
