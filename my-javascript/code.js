let no_of_courses = [7];
let courses_data = [7];
for(let i = 0 ; i<7 ; i++){
    courses_data[i] = [];
    no_of_courses[i] = 0;
}
const search_btn = document.querySelector(".search_btn");
const search_txt = document.querySelector(".search_txt");
let topics = ["python" , "excel" , "web" , "java" , "data-science" , "aws" , "drawing"];
for(let topic_id = 0 ; topic_id<7 ; topic_id++){
    let add_arrows = document.querySelector(`#${topics[topic_id]} #carouselExampleControls`);
    add_arrows.innerHTML += `
    <a
              class="carousel-control-prev"
              href="#${topics[topic_id]} .carousel"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#${topics[topic_id]} #carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
    `;
}
get_data()
async function get_data(){
    for(let topic_id = 0 ;topic_id < 7 ; topic_id++){
        let url = "http://localhost:3000/" + topics[topic_id];
        let respose = await fetch(url)
            .then(res => res.json())
            .then(json => {
                json.map(data => {
                    courses_data[topic_id][no_of_courses[topic_id]++] = data;
                })
            })
    }
    search_filter();
}
function search_filter(){
    search_result();
    search_btn.addEventListener("click", function (event) {
        event.preventDefault();
        search_result();
    });
}
function search_result(){
    for(let topic_id = 0 ;topic_id < 7 ; topic_id++){
        let courses_list = document.querySelector(`#${topics[topic_id]} .carousel-inner`);
        courses_list.innerHTML = ``;
        let cards = [];
        let no_of_cards = 0;
        let words = search_txt.value.split(" ").filter(w => w !== '');
        for(let i=0; i<no_of_courses[topic_id]; i++){
            let valid = 0;
            for(let j=0; j<words.length ; j++){
                let target = words[j];
                if(courses_data[topic_id][i]["title"].toLowerCase().includes(target.toLowerCase())){
                    valid = 1;
                    break;
                }
            }

            if(valid || words.length === 0){
                cards[no_of_cards++] = `
                <div class="card">
                    <div class="course">
                        <img
                        src=${courses_data[topic_id][i]["img"]}
                        alt = "${topics[topic_id]}-course"
                        class="image"
                        />
                        <p class="title">
                        <strong>${courses_data[topic_id][i]["title"]}</strong>
                        </p>
                        <p class="author">${courses_data[topic_id][i]["auth"]}</p>
                        <div class="rating">
                        <span>${courses_data[topic_id][i]["rate"]}</span>
                        <img
                            src=${courses_data[topic_id][i]["star"]}
                            alt="stars-rating"
                            class="image"
                        />
                        </div>
                        <p class="price">${courses_data[topic_id][i]["price"]}</p>
                    </div>
                    </div>
                `; 
            }
        }
        for(let i = 0 ; i<no_of_cards ; i+=5){
            if(i == 0){
                let carousel_item = "";
                for(let j = i ; j<Math.min(i+5 , no_of_cards) ; j++){
                    carousel_item += cards[j];
                }
                courses_list.innerHTML += `
                    <div class="carousel-item active">
                    <div class="cards-wrapper">
                    ${carousel_item}
                    </div></div>
                `;
            }
            else{
                let carousel_item = "";
                for(let j = i ; j<Math.min(i+5 , no_of_cards); j++){
                    carousel_item += cards[j];
                }
                courses_list.innerHTML += `
                    <div class="carousel-item">
                    <div class="cards-wrapper">
                    ${carousel_item}
                    </div></div>
            `;
            }
        }
    }
}
