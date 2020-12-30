const state = {
    token:null,
    board:[],
    card:[],    
    bodyColor:'',
    lightColor : {
        '#ff9f74':'#faefe6', //orange
        '#ffc853':'#fffaf0', //yellow
        '#ffa6a3':'#fff5f5', //rospink
        '#a3daff':'#f0f9ff', //skyblue
        '#b98dcb':'#ece4f0', //purple
    },
    midColor:{
        '#ff9f74':'#faddc0', //orange
        '#ffc853':'#ffe9b9', //yellow
        '#ffa6a3':'#ffdcdb', //rospink
        '#a3daff':'#cfecff', //skyblue
        '#b98dcb':'#d7c1e0', //purple
    },
    isOpenMenu:false,
    currentMenu:'MAIN'

}

export default state