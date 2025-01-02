
//points to previous flag,  = seychelles. 20 = bhutan, 30 = Fiji
let pointer = 10;
    


function changeFlag(){
    if (pointer % 3 === 2){{
        document.getElementById("slidePic").src = "/flags-main/160Seychelles.png";
        document.getElementById("circle1").style.backgroundColor = 'rgb(197, 189, 189)';
        document.getElementById("circle2").style.backgroundColor = 'rgb(87, 84, 81)';
        document.getElementById("circle3").style.backgroundColor = 'rgb(87, 84, 81)';
        document.getElementById("text").innerHTML = "June 18, 1996. The colours of the flag are blue (for sky and sea), yellow (for the life-giving sun), red (for the people and their work for unity and love), white (for social justice and harmony), and green (for the land and natural environment).";
        pointer-=10;       
        return;
     }
    }
    if (pointer % 3 === 0){
        document.getElementById("slidePic").src = "/flags-main/113Marshall Islands.png";
        document.getElementById("circle2").style.backgroundColor = 'rgb(197, 189, 189)';
        document.getElementById("circle1").style.backgroundColor = 'rgb(87, 84, 81)';
        document.getElementById("circle3").style.backgroundColor = 'rgb(87, 84, 81)';
        document.getElementById("text").innerHTML = "The blue field for the Pacific Ocean, the white star has a point for each district. The orange stripe for the Ralik Chain or sunset and courage, while the white stripe for the Ratak Chain or sunrise. The star symbolizes a cross, the four larger rays are cultural centers.";
        
        pointer-=10;    
        return;  
    }
    if (pointer % 3 === 1){
        document.getElementById("slidePic").src = "/flags-main/064Fiji.png";
        document.getElementById("circle3").style.backgroundColor = 'rgb(197, 189, 189)';
        document.getElementById("circle1").style.backgroundColor = 'rgb(87, 84, 81)';
        document.getElementById("circle2").style.backgroundColor = 'rgb(87, 84, 81)';
        document.getElementById("text").innerHTML = "The flag's bright blue background is for the Pacific Ocean, in terms of the fishing industry, and the huge tourist trade. The Union Jack reflects the country's links with the United Kingdom. The shield is derived from the country's coat of arms.";
        pointer+=20;
        return; 
    }
    else{
        pointer-=10;
    }


}
