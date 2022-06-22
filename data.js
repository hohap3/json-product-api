import { faker } from '@faker-js/faker';

function generateCategoryList(num) {
  if (typeof num !== 'number' || num <= 0) return;

  const categoryList = [];

  Array.from(new Array(num)).forEach(() => {
    const categoryObj = {
      id: faker.datatype.uuid(),
      categoryName: faker.commerce.department(),
      createAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(categoryObj);
  });

  return categoryList;
}

function generateProductList(categoryList, numOfProduct) {
  if (numOfProduct <= 0) return;

  const productList = [];

  categoryList.forEach((category) => {
    Array.from(new Array(numOfProduct)).forEach(() => {
      const productObj = {
        categoryID: category.id,
        id: faker.datatype.uuid(),
        productName: faker.commerce.productName(),
        imageUrl: faker.image.business(),
        productPrice: faker.commerce.price(),
        createAt: Date.now(),
        updateAt: Date.now(),
        color: faker.color.rgb(),
      };

      productList.push(productObj);
    });
  });

  return productList;
}

// main
export function dataJson() {
  const categoryList = generateCategoryList(3);
  const productList = generateProductList(categoryList, 12);

  const data = {
    categories: categoryList,
    products: productList,
  };

  return data;
}
