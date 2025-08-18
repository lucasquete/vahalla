import "./hero.css"

const Hero = () => {
  return (
    <div className='banner'>
        <div className="slider" style={{ '--quantity': 10 }}>
            <div className="item" style={{ '--position': 1 }}>
                <img src="./dragon_1.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 2 }}>
                <img src="./dragon_2.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 3 }}>
                <img src="./dragon_3.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 4 }}>
                <img src="./dragon_4.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 5 }}>
                <img src="./dragon_5.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 6 }}>
                <img src="./dragon_6.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 7 }}>
                <img src="./dragon_7.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 8 }}>
                <img src="./dragon_8.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 9 }}>
                <img src="./dragon_9.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 10 }}>
                <img src="./dragon_10.jpg" alt="" />
            </div>
        </div>
        <div className="content">
            <h1 data-content="BEST STREAM">BEST STREAM</h1>
            <div className="author">
                <h2>VAHALLA</h2>
                <p>Stream platform</p>
                <p>The best streaming platform to enjoy.</p>
            </div>
            <div className="model"></div>
        </div>
    </div>
  )
}

export default Hero