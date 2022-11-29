import { Fragment } from 'react'

export const colorVoteAverage = (v) => {
    if(v<1)return "rgb(150, 150, 150)"
    if(v>=1 && v<2)return "rgb(215, 193, 187)"
    if(v>=2 && v<3)return "rgb(255, 149, 0)"
    if(v>=3 && v<4)return "rgb(255, 196, 0)"
    if(v>=4 && v<5)return "rgb(242, 255, 0)"
    if(v>=5 && v<6)return "rgb(166, 255, 0)"
    if(v>=6 && v<7)return "rgb(0, 255, 0)"
    if(v>=7 && v<8)return "rgb(0, 110, 255)"
    if(v>=8 && v<9)return "rgb(135, 48, 247)"
    if(v>=9 && v<10)return "rgb(255, 70, 255)"
    if(v===10)return "rgb(255, 0, 0)"
}

export const setLocaleCurrency = (strNumber, language) => {
    if(strNumber===0){
        return ""
    }else{
        return Number(strNumber).toLocaleString(language===undefined && 'en-US', {maximumSignificantDigits: 2})
    }
}

export const setComma = (i, array) => {
    if(i===array.length-1){
        return ""
    }else{
        return ", "
    }
}

export const sliderMouseDown = (e, setClickVsTouchCoordinates) => {
    let xCoordinate
    let yCoordinate

    if(e.type==='touchstart'){
        xCoordinate = e.changedTouches[0].clientX
        yCoordinate = e.changedTouches[0].clientY
    }else {
        xCoordinate = e.pageX
        yCoordinate = e.pageY
    }

    setClickVsTouchCoordinates([xCoordinate, yCoordinate])
}

export const detectClickVsDrag = (e, coordinates) => {
    if(e.type==='touchend'){
        if(coordinates[0] === e.changedTouches[0].clientX && coordinates[1] === e.changedTouches[0].clientY){ //is clicking
            return true
        }else{
            return false //is dragging (mouse)
        }
    }else {
        if(coordinates[0] === e.pageX && coordinates[1] === e.pageY){ //is touching
            return true
        }else{
            return false //is dragging (touch)
        }
    }
}

export const slide = (sliderContainer, slider, id) => {
    let moveFlag = false
    let currentX = 0
    let initialPos
    //clientX: horizontal coordinate of the pointer when an event is triggered
    //currentX: current position of the slider
    //initialPos: the position where the 'drag' is started

    slider.addEventListener("mousedown", dragStart)
    window.addEventListener("mouseup", dragEnd) //window allows to keep draggind outside the slide boundaries
    window.addEventListener("mousemove", drag)
    slider.addEventListener("touchstart", dragStart)
    slider.addEventListener("touchend", dragEnd)
    slider.addEventListener("touchmove", drag)

    function setInitialPos(e) {
        e.type === "touchstart" || e.type === "touchmove"
            ?initialPos = e.touches[0].clientX - currentX
            :initialPos = e.clientX - currentX
        return initialPos
    }

    function dragStart(e) {
        setInitialPos(e)
        moveFlag = true
        //e.type==='touchstart' && e.preventDefault()
    } 

    function dragEnd(e) {
        e.cancelable && e.preventDefault()
        initialPos = currentX
        moveFlag = false
    }

    function drag(e) {
        if (moveFlag) {
            let sliderRect = slider.getBoundingClientRect() 
            let sliderContainerRect = sliderContainer.getBoundingClientRect() 
            e.type!=='touchmove' && e.preventDefault()

            //Drag the Slider
            e.type === "touchmove"
                ?currentX = e.touches[0].clientX - initialPos
                :currentX = e.clientX - initialPos
            
            //Control of limits, right and left
            if (currentX > 0) {
                currentX = 0
                setInitialPos(e)
            }
            if (currentX < sliderContainerRect.width - sliderRect.width) {
                currentX = sliderContainerRect.width - sliderRect.width
                setInitialPos(e)
            }
            
            slider.style.transform = "translateX(" + currentX + "px)"
        }				
    }
}

export const asideVerticalMovement = (stickySidebar, 
                                    prevScrollY, 
                                    setPrevScrollY, 
                                    sidebarInitialY, 
                                    setSideBarInitialY) => {
    
    if(stickySidebar !== null && stickySidebar !== undefined) {
        const upperLimit = 0
        let currentScrollY = window.scrollY
        let asideTop = window.getComputedStyle(stickySidebar).top
        sidebarInitialY===undefined && setSideBarInitialY(asideTop)
        
        //Controls if the scrollY is up or down
        if(prevScrollY < currentScrollY){
            //scrolling up
            if (Math.floor(stickySidebar.getBoundingClientRect().y) < upperLimit) {
                stickySidebar.style.position = 'fixed'
                stickySidebar.style.top = `${upperLimit}px`
            }
        } else if(sidebarInitialY!==undefined){
            //scrolling down
            if (Math.floor(window.scrollY) <= sidebarInitialY.replace('px','')-upperLimit) {
                stickySidebar.style.position = 'absolute'
                stickySidebar.style.top = sidebarInitialY
            }
        }
        
        setPrevScrollY(currentScrollY)
    }
}

export const getCrewMembers = (dataMovieCredits, strJob) => {
    return dataMovieCredits.crew
        .filter((e)=>e.job===`${strJob}`) //necessary to detect comma (setComma)
        .map((e,i,arr)=>
            <Fragment key={i}>
                {e.original_name}{setComma(i,arr)}<br/>
            </Fragment>
        )
}

export const findBackdropImageNotNull = (dataMoviePerPerson, keyNames) => {
    let results = ''
    let len = 0

    if(dataMoviePerPerson !== undefined){
        
        if(keyNames==='backdrop_path'){
            results = dataMoviePerPerson.cast.filter((e)=>(e.backdrop_path!==null))
            len = results.length - 1
        }
        else if(keyNames==='title'){
            results = dataMoviePerPerson.cast.filter((e)=>(e.title!==null))
        }
        
        if(results[0]===undefined){return undefined}
        
        return results[Math.floor(Math.random() * len)]
    } else{
        return undefined
    }
}

export const getOriginalLanguage = (originalLanguage, langList) => {
    if(langList!==undefined){
        const langName = langList.filter((e)=>{return e.iso_639_1 === originalLanguage})
        return langName.map((e)=>{return e.name})
    }    
}

export const getProductionCountry = (productionCountry, prodCountryList) => {
    if(prodCountryList!==undefined){
        const countryName = prodCountryList.filter((e)=>{return e.iso_3166_1 === productionCountry})
        return countryName.map((e)=>{return e.english_name})
    }  
}

export const calcAge = (birthday, deathday, setAge) => {
    let today = new Date()
    deathday!==null && (today = new Date(deathday + 'T00:00:00'))
    let theBirthday = new Date(birthday + 'T00:00:00')
    let yearDiff = today.getFullYear() - theBirthday.getFullYear()
    let monthDiff = today.getMonth() - theBirthday.getMonth()
    let dayDiff = today.getDate() - theBirthday.getDate()

    if(monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) yearDiff-=1 
    if(yearDiff!==undefined && yearDiff!==null && !Number.isNaN(yearDiff)) setAge(`(${yearDiff})`)

}

export const slideBackdrop = (sliderContainer, slider, parallax, setPositionIndexState) => {
    //for a better experience, images should have wider width
    let moveFlag = false
    let currentPos = 0
    let initialPos
    let index = 0
    let initialClickTouchPosition
    let dragDistanceValue
    let sliderItemWidth
    let dropPositionValue
    let sliderContainerWidth
    let sliderWidth

    slider.addEventListener("mousedown", dragStart)
    slider.addEventListener("mouseup", dragEnd)
    window.addEventListener("mousemove", drag)
    slider.addEventListener("touchstart", dragStart)
    slider.addEventListener("touchend", dragEnd)
    slider.addEventListener("touchmove", drag)
   // slider.addEventListener("click", ()=>{})
/*     window.screen.orientation.addEventListener("change", ()=>{
        sliderItemWidth = window.getComputedStyle(slider.children[0]).width.replace('px','')
        slider.style.transform = "translateX(" + (-window.screen.width*index) + "px)"
    }) */
    window.addEventListener("resize",()=>{
        slider.children[0].style.backgroundPosition = "center top"
        slider.style.transform = "translateX(0px)"    
        index=0 
    })
    //slider.addEventListener("transitionend", ()=>{slider.style.transition = 'initial'})

    function setInitialPos(e) {
        if(e.type === "touchstart" || e.type === "touchmove"){
            initialPos = e.touches[0].clientX - currentPos
        }
        if(e.type==="mousedown" || e.type==="mousemove"){
            initialPos = e.clientX - currentPos
        }
    }

    function dragInitialPos(e) {
        if(e.type === "touchstart" || e.type === "touchmove"){
            initialClickTouchPosition = e.touches[0].clientX
        }
        if(e.type==="mousedown" || e.type==="mousemove"){
            initialClickTouchPosition = e.clientX
        }
    }

    function dropPositionX(e){
        if(e.type === "touchend"){
            return e.changedTouches[0].clientX
        }
        if(e.type==="mouseup"){
            return e.clientX
        }
    }

    function dragDistance(initialClickTouchPosition, dropPosition){
        return dropPosition - initialClickTouchPosition
    }

    function dragStart(e) {
        setInitialPos(e)
        dragInitialPos(e)
        moveFlag = true
        slider.childNodes.length>1
            ?(e.target.style.cursor="grabbing")
            :(e.target.style.cursor="default")
    } 

    function dragEnd(e) {
        e.cancelable && e.preventDefault() //allows to move the page vertically (scrolling) and touch to enlarge backdrop image too 
        moveFlag = false
        slider.childNodes.length>1
            ?e.target.style.cursor="grab"
            :e.target.style.cursor="default"
        dropPositionValue = dropPositionX(e)
        dragDistanceValue = dragDistance(initialClickTouchPosition, dropPositionValue)
        sliderItemWidth = window.getComputedStyle(slider.children[0]).width.replace('px','')
        slider.style.transition = '1600ms cubic-bezier(0.39, 0.01, 0.04, 1)'
        
        if(Math.abs(dragDistanceValue) >= 50){ 
            if(dragDistanceValue > 0){ // drag to the right
                if(index > 0){
                    //Autostop Sliding
                    index -= 1
                    slider.style.transform = "translateX(" + ((-sliderItemWidth * index)) + "px)"
                    currentPos = -sliderItemWidth * (index)
                    
                    //Parallax effect (every children starts with background position right top)
                    if(parallax){
                        if(index > 0){
                            slider.children[index-1].style.backgroundPosition = "left top"
                        }
                        slider.children[index].style.backgroundPosition = "center top"
                        slider.children[index+1].style.backgroundPosition = "right top"
                    }
                }
            }

           if(dragDistanceValue < 0){ // drag to the left
                if(index < slider.childNodes.length-1){
                    //Autostop Sliding
                    index += 1
                    slider.style.transform = "translateX(" + (-sliderItemWidth * (index)) + "px)"
                    currentPos = -sliderItemWidth * (index)
                    
                    //Parallax effect (every children starts with background position right top)
                    if(parallax){
                        slider.children[index-1].style.backgroundPosition = "left top"
                        slider.children[index].style.backgroundPosition = "center top"
                        if(index < slider.childNodes.length-1 ){
                            slider.children[index+1].style.backgroundPosition = "right top"
                        }
                    }
                }
            }
            setPositionIndexState(index)
        }else{
            //returns to the original position when the distance is less than the distance needed to move the slider
            slider.style.transform = "translateX(" + (-sliderItemWidth * (index)) + "px)"
        }
    }

    function drag(e) {
        if (moveFlag) {
            sliderContainerWidth = window.getComputedStyle(sliderContainer).width.replace('px','')
            sliderWidth = window.getComputedStyle(slider).width.replace('px','')

            //Drag the Slider
            e.type === "touchmove"
                ?currentPos = e.changedTouches[0].clientX - initialPos
                :currentPos = e.clientX - initialPos
            
            //Control of limits, right and left
            if (currentPos > 0) {
                currentPos = 0
                setInitialPos(e)
            }

            if (currentPos < (sliderContainerWidth - sliderWidth)) {
                currentPos = sliderContainerWidth - sliderWidth
                setInitialPos(e)
            }

            //Maximum drag distance allowed
            if(currentPos > -100){
                slider.style.transform = "translateX(" + currentPos + "px)"
            }
        }			
    }
}


export const slideStack = (sliderContainer) => {
    let styles = {
        tX: -50,
        tY: -40,
        sY: 0,
        bl: 0,
        zI: 10
    }

    const el = sliderContainer.childNodes[0]
    el.onclick = (e)=>{
        rearrangeImages()
    }

    const getStyleTransform = (el) => {
        const elStyle = window.getComputedStyle(el).transform
        const matrix = new DOMMatrix(elStyle)
        console.log(elStyle)
        return [matrix.m41, matrix.m42]
    }

    const updateStyles = (transform) => {
        console.log(transform)
        styles = {
            ...styles,
            tX: transform[0] + 15,
            tY: transform[1] - 2,
            //sY: styles.sY /* + 0.2 */,
            // bl: styles.bl + 0.15,
            // zI: styles.zI - 1
        }
        
    }

    const rearrangeImages = () => {
        let arrayElements = Array.from(sliderContainer.children)
        
        arrayElements.map((e,i)=>{
            e.style.transform = `translate(${getStyleTransform(e)[0]-35}px,${getStyleTransform(e)[1]+20}px) `
            //e.style.filter = `blur(${styles.bl}px)`
        })
    }
}