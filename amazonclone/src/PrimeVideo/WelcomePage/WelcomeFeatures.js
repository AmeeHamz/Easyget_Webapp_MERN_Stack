import React from 'react'
import './WelcomeFeatures.css'


const WelcomeFeatures = ()=>{
    return (
        <>
            <div className="welcomebanner4">
            <div className="welcomebanner4__item">
              <img src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/Magellan_MLP/PV_Benefits_Devices_UPDATED.png" alt="Watch anywhere"></img>
              <h4 className="welcomebanner4__title">Watch anywhere</h4>
              <p className="welcomebanner4__description">
                Enjoy from the web or with the Prime Video app on your phone,
                tablet, or select Smart TVs — on up to 3 devices at once.
              </p>
            </div>
            <div className="welcomebanner4__item">
              <img src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/Magellan_MLP/PV_Benefits_Download_UPDATED.png" alt="Download and go"></img>
              <h4 className="welcomebanner4__title">Download and go</h4>
              <p className="welcomebanner4__description">
                Watch offline on the Prime Video app when you download titles to
                your iPhone, iPad, Tablet, or Android device.
              </p>
            </div>
            <div className="welcomebanner4__item">
              <img src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/Magellan_MLP/PV_Benefits_DataSaver_UPDATED.png" alt="Data Saver"></img>
              <h4 className="welcomebanner4__title">Data Saver</h4>
              <p className="welcomebanner4__description">
                Control data usage while downloading and watching videos on
                select phones or tablets.
              </p>
            </div>
          </div>        
        </>
    )
}

export default WelcomeFeatures;