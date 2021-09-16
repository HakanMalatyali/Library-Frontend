import React, { useEffect, useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import CategoryService from "../services/categoryService";

export default function Categories() {

  const [categories, setCategories] = useState([])

  let categoryService = new CategoryService();

  useEffect(() => {
    categoryService.getCategories()
    .then((result) => setCategories(result.data.data))
  },[]);

  return (
    <div>
      <h1 style={{textAlign : "left", fontStyle: "oblique", fontFamily: "Cursive", color:"teal"}}>
        Kategoriler
      </h1>
      <Menu pointing vertical  size="large">
        {categories.map((category) => (
          <Menu.Item  style={{textAlign : "left"}} key={category.categoryId}>{category.categoryName}</Menu.Item>
        ))}

      </Menu>
    </div>
  );
}
