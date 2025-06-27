import "./styles.css";


const Loader = () => {
    
    
    return (
        <div className="loader_wrapper">
            <div className="beaker_container">
                <div className="water_container">
                    <div className="wave"></div>
                </div>
                <div className="droplet droplet1"></div>
                <div className="droplet droplet2"></div>
                <div className="droplet droplet3"></div>
            </div>
        </div>
    )
}


export default Loader;