const productsE = [
    { id: 1, name: "ฮุ๊กข้าวมันไก่",  image: "img/store1.jpg" ,url: "store1.html"},
    { id: 1, name: "ร้านเจ๊กิ๊ก",  image: "img/store2.jpg" ,url: "store2.html"},
    { id: 1, name: "ก๋วยเตี๋ยว น้ำเงี้ยว",  image: "img/store3.jpg" ,url: "store3.html"},
    { id: 1, name: "ลุงเษม ก๋วยเตี๋ยวรสเด็ด",  image: "img/store4.jpg" ,url: "store4.html"},
  ];

  const productsX = [
    { id: 1, name: "BB ส้มตำเเซป",  image: "img/store5.jpeg" ,url: "store5.html"},
    { id: 1, name: "ข้ามมันไก่โกหนุน",  image: "img/store6.jpg" ,url: "store6.html"},
  ];


  const productContainer = document.getElementById("product-container");


  function displayProducts(products) {
    productContainer.innerHTML = ""; 
    products.forEach(product => {
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="">
          <h4>${product.name}</h4>
          <a href="${product.url}">OPEN</a>
        </div>
      `;
      productContainer.innerHTML += productCard;
    });
  }

  document.getElementById("menu-e").addEventListener("click", () => displayProducts(productsE));
  document.getElementById("menu-x").addEventListener("click", () => displayProducts(productsX));
