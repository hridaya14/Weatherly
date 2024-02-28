const Subscribe = () => {
    return(
        <div className="hidden xl:flex xl:flex-col xl:justify-around subscribe p-2">
            <div className="flex justify-end">
                <a href="#"><img src = "/dots.png"></img></a>
            </div>
            <div className=" rounded-3xl flex flex-col justify-start  items-center p-2">
                <img src="/stock.png" className="w-full"></img>
                <div className="w-full sub-card p-2">
                    <div className="flex justify-around">
                        <p className="text-white text-base">Stay Ahead of <br></br> the Weather! <br></br> Subscribe to our <br></br> Newsletter</p>
                        <button><img src = "/arrow.png"></img></button>
                    </div>
                    <input type = "text" placeholder="Enter your name" className="bg-[#333] border-none rounded-2xl mx-auto"></input>
                </div>
            </div>
        </div>
    )
}
export default Subscribe;