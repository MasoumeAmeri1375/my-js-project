const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalReadyTime = document.getElementById("modalReadyTime");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");
const favoriteBtn = document.getElementById("favoriteBtn");

let favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

// Sample 20+ recipes with ready-made images
const recipes = [
  {id:1,title:"Spaghetti Bolognese",image:"https://cdn.stoneline.de/media/c5/63/4f/1727429313/spaghetti-bolognese.jpeg?ts=1727429313",readyTime:"30 min",ingredients:["Spaghetti","Tomato","Beef","Onion","Garlic"],instructions:["Cook spaghetti.","Prepare sauce with tomato and beef.","Mix and serve."]},
  {id:2,title:"Pancakes",image:"https://www.yummytummyaarthi.com/wp-content/uploads/2022/08/pancakes-1.jpg",readyTime:"20 min",ingredients:["Flour","Milk","Eggs","Sugar","Butter"],instructions:["Mix ingredients.","Cook on pan.","Serve with syrup."]},
  {id:3,title:"Caesar Salad",image:"https://images.immediate.co.uk/production/volatile/sites/30/2023/03/Caesar-salad-dressing-b4247ff.jpg?quality=90&resize=708,643",readyTime:"15 min",ingredients:["Lettuce","Parmesan","Croutons","Chicken","Caesar dressing"],instructions:["Chop lettuce.","Add toppings.","Mix and serve."]},
  {id:4,title:"Chocolate Cake",image:"https://i.pinimg.com/736x/d8/32/6e/d8326ecba30d8e32751eb9911826cb97.jpg",readyTime:"50 min",ingredients:["Flour","Cocoa","Sugar","Eggs","Butter"],instructions:["Mix ingredients.","Bake in oven.","Cool and serve."]},
  {id:5,title:"Sushi",image:"https://simple-veganista.com/wp-content/uploads/2012/07/raw-vegan-sushi-rolls-5.jpg",readyTime:"40 min",ingredients:["Rice","Nori","Salmon","Avocado","Soy sauce"],instructions:["Prepare rice.","Assemble rolls.","Serve."]},
  {id:6,title:"Burger",image:"https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2503,h_2503,c_limit/Smashburger-recipe-120219.jpg",readyTime:"25 min",ingredients:["Buns","Beef patty","Cheese","Lettuce","Tomato"],instructions:["Cook patty.","Assemble burger.","Serve."]},
  {id:7,title:"Pizza Margherita",image:"https://assets.tmecosys.cn/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/4F1526F0-0A46-4C87-A3D5-E80AD76C0D70/Derivates/df9a8be7-6ab2-4d5a-8c4d-6cbe8aceda72.jpg",readyTime:"30 min",ingredients:["Dough","Tomato","Mozzarella","Basil"],instructions:["Prepare dough.","Add toppings.","Bake in oven."]},
  {id:8,title:"Avocado Toast",image:"https://thecurlyspoonblog.com/wp-content/uploads/2022/04/avocado-toast-with-everything-bagel-seasoning-on-sourdough-featured-1.jpg",readyTime:"10 min",ingredients:["Bread","Avocado","Salt","Pepper"],instructions:["Toast bread.","Mash avocado.","Spread on bread."]},
  {id:9,title:"Tomato Soup",image:"https://www.allrecipes.com/thmb/EGp48npVJqDku38H1CFWwgwfAmM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57661-tomato-bisque-iii-VAT-007-4x3-44151fe6eccf42e2b7fecb632f3ff198.jpg",readyTime:"25 min",ingredients:["Tomatoes","Onion","Garlic","Cream","Salt"],instructions:["Cook tomatoes.","Blend.","Serve with cream."]},
  {id:10,title:"Grilled Salmon",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1BBovn0Ea0nW-fDMZ4XxdPNPWuEYKit_9Q&s",readyTime:"20 min",ingredients:["Salmon","Lemon","Salt","Pepper"],instructions:["Season salmon.","Grill.","Serve."]},
  {id:11,title:"Tacos",image:"https://dinnerthendessert.com/wp-content/uploads/2021/07/Ground-Beef-Soft-Tacos-20.jpg",readyTime:"30 min",ingredients:["Tortilla","Beef","Lettuce","Cheese","Salsa"],instructions:["Cook beef.","Assemble tacos.","Serve."]},
  {id:12,title:"Chicken Curry",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbIVDjM6mHvqgyaCCFW4wuHg481PFEXoxQNg&s",readyTime:"40 min",ingredients:["Chicken","Curry powder","Onion","Tomato","Cream"],instructions:["Cook chicken.","Add curry and sauce.","Simmer and serve."]},
  {id:13,title:"Omelette",image:"https://abountifulkitchen.com/wp-content/uploads/2023/08/Fried-Rice-Omelet-scaled.jpg",readyTime:"10 min",ingredients:["Eggs","Salt","Pepper","Cheese","Vegetables"],instructions:["Beat eggs.","Cook on pan.","Add toppings."]},
  {id:14,title:"Lasagna",image:"https://recipe-graphics.grocerywebsite.com/0_GraphicsRecipes/1391_4k.jpg",readyTime:"60 min",ingredients:["Pasta sheets","Cheese","Tomato sauce","Beef"],instructions:["Layer ingredients.","Bake in oven.","Serve."]},
  {id:15,title:"French Toast",image:"https://www.chilitochoc.com/wp-content/uploads/2025/04/buttermilk-french-toast-recipe-500x500.jpg",readyTime:"15 min",ingredients:["Bread","Eggs","Milk","Sugar"],instructions:["Mix eggs and milk.","Dip bread.","Cook on pan."]},
];

// Render cards
function renderRecipes(list){
  recipeContainer.innerHTML="";
  list.forEach(recipe=>{
    const card=document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML=`<img src="${recipe.image}" alt="${recipe.title}"><h3>${recipe.title}</h3><p>${recipe.readyTime}</p>`;
    card.addEventListener("click",()=>openModal(recipe));
    recipeContainer.appendChild(card);
  });
}

// Open modal
function openModal(recipe){
  modalImg.src=recipe.image;
  modalTitle.textContent=recipe.title;
  modalReadyTime.textContent=recipe.readyTime;
  modalIngredients.innerHTML=recipe.ingredients.map(i=>`<li>${i}</li>`).join("");
  modalInstructions.innerHTML=recipe.instructions.map(s=>`<li>${s}</li>`).join("");
  const isFav=favoriteRecipes.some(f=>f.id===recipe.id);
  favoriteBtn.textContent=isFav?"★ Remove from Favorites":"❤ Add to Favorites";
  favoriteBtn.onclick=()=>toggleFavorite(recipe);
  modal.classList.remove("hidden");
}

// Toggle favorite
function toggleFavorite(recipe){
  const index=favoriteRecipes.findIndex(f=>f.id===recipe.id);
  if(index===-1) favoriteRecipes.push(recipe);
  else favoriteRecipes.splice(index,1);
  localStorage.setItem("favoriteRecipes",JSON.stringify(favoriteRecipes));
  renderRecipes(recipes);
  modal.classList.add("hidden");
}

// Search
searchBtn.addEventListener("click",()=>{
  const query=searchInput.value.toLowerCase();
  const filtered=recipes.filter(r=>r.title.toLowerCase().includes(query));
  renderRecipes(filtered);
});

closeBtn.addEventListener("click",()=>modal.classList.add("hidden"));
modal.addEventListener("click",e=>{if(e.target===modal) modal.classList.add("hidden");});

renderRecipes(recipes);
