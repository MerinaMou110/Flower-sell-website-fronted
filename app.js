const loadflower = (search)=>{
    document.getElementById("flowers").innerHTML = "";
    document.getElementById("spinner").style.display = "block";


    fetch(
        `https://flower-sell-website-drf-project.onrender.com/flower/list/?search=${
            search ? search : ""}`
            
    )
    .then((res) => res.json())
    .then((data)=>{
        console.log(data);
      if (data.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displyflowers(data);
      } else {
        document.getElementById("doctors").innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }

    });
    
};

const truncateWords = (text, numWords) => {
    const words = text.split(' ');
    if (words.length > numWords) {
      return words.slice(0, numWords).join(' ') + '...';
    }
    return text;
  };

const displyflowers = (flowers) => {
    
    flowers?.forEach((flower) => {
      console.log(flower);
      
      const parent = document.getElementById("flowers");
      const div = document.createElement("div");
      div.classList.add("flw-card");
      div.innerHTML = `
          <img class="doc-img card-img-top" src=${flower.image} alt="" />
                <h4>${flower?.title}</h4>
                
                <p>
                ${truncateWords(flower.details, 20)} <!-- Adjust the number of words you want to display -->
                </p>
               
                <p>
                
                ${flower?.categories?.map((item) => {
                  return `<button class="bt">${item}</button>`;
                })}
                </p>
                <button class="details-button">
                <a  target="_blank" href="flowerDetails.html?flowerId=${flower.id}">Details</a>
            </button>
            
           
          `;
         
      parent.appendChild(div);
    });
  };

const handleSearch = () => {
    const value = document.getElementById("search").value;
    loadflower(value);
  };

const loadCategory = () => {
    fetch("https://flower-sell-website-drf-project.onrender.com/flower/categories/")
      .then((res) => res.json())
      .then((data) => {
       
        data.forEach((item) => {
           
          const parent = document.getElementById("drop-cat");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `
        <li onclick="loadflower('${item.name}')"> <a class="ct">${item.name}</a></li>
          `;
        //   console.log(item.name)
          parent.appendChild(li);
         
        });
      });
  };

loadflower();
loadCategory();