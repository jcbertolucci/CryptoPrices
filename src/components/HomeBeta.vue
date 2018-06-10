<template>
  <!-- root element -->
  <div>  
    <!-- navigation bar -->
    <div class="nav-bar">
      <div class="bar-left">
        <!--<img src="https://preview.ibb.co/mHADiT/incliti2.png" alt="Incliti">-->
      </div>
      <div class="bar-center">
        <v-icon class="icon" color="white">fab fa-bitcoin</v-icon><p>Bitcoin: A$7.8952,00</p>
        <v-icon class="icon" color="white">fab fa-bitcoin</v-icon><p>Ripple: A$7.8952,00</p>
        <v-icon class="icon" color="white">fab fa-bitcoin</v-icon><p>Litecoin: A$7.8952,00</p>
        <v-icon class="icon" color="white">fab fa-bitcoin</v-icon><p>Ethereum: A$7.8952,00</p>
        <v-icon class="icon" color="white">fab fa-bitcoin</v-icon><p>Bitcoin Cash: A$7.8952,00</p>
      </div>
      <div class="bar-right">
        <a href="/signin" class="btn-scope btn-awesome" to="/signin">Sign In</a>
      </div>
    </div>   
    <!-- content top section -->
    <section class="start">
      <div class="container-scope">
        <div class="start-flex">
          <div class="start-flex-left">
            <h2>Incliti is a <strong>cryptocurrency portfolio and price comparison platform</strong> for traders and non-traders.</h2>
            <h3>Here you can do wahtever you like using our platform such as charts, comparison e more.</h3>
            <br>
            <br>
            <a href="/signup" class="btn-scope btn-normal btn-bigger">Sign Up</a>
            <a href="#" class="btn-scope btn-ghost btn-bigger">See Demo</a>
          </div> 
          <div class="start-flex-right">
            <div class ="picture pic-top">
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- content middle section -->
    <section class="middle">
      <div class="container-scope">
        <div class="middle-flex">
          <div class="middle-flex-top">
            <h2><strong>Platform with real-time data and great functionalities</strong></h2>
          </div>
          <div class="middle-flex-left">
            <div class="picture picture-left"></div>
            <h2>Analyse data</h2>
          </div>
          <div class="middle-flex-center">
            <div class="picture picture-center"></div>
            <h2>Integrate your exchange's account</h2>
          </div>
          <div class="middle-flex-right">
            <div class="picture picture-right"></div>
            <h2>Manage your portfolio</h2>
          </div>
          <div class="middle-flex-bottom">
              <h3>Use Incliti for free. Forever.</h3>
          </div>
        </div>
      </div>
    </section>
    <!-- content bottom section -->
    <section class="end">
      <div class="container-scope">
          <div class="bottom-flex">
            <div class="bottom-flex-top">
              <h3>What techlogies have we used?</h3>
              <p>This project is a result of a premise to conclude my bachelor degree along with the interest in cryptocurrencies. I hope you enjoy it as much as I do.</p>
            </div>
            <div class="bottom-flex-center">
              <div class="rounded-div tech-left"></div>
              <div class="rounded-div tech-middle-left"></div>
              <div class="rounded-div tech-middle-right"></div>
              <div class="rounded-div tech-right"></div>
            </div>
            <div class="bottom-flex-bottom">
              <a class="logo" href="https://github.com/bertolucci1985/CryptoPrices" target="_blank"> <i class="fab fa-github"></i></a>
            </div>
            <div class="bottom-flex-bottom-farther"><p>Check out on Github!</p></div>
          </div>
      </div>
    </section>
    <!-- footer -->
    <footer>
      <div class="container-scope">
        <div class="footer-flex">
          <div class="footer-left">
            <h4>Copyright &copy;2018 Incliti</h4>
          </div> 
          <div class="footer-mleft">
            <h4>Learn</h4>
            <ul>
              <li><a href="#" target="_blank">Demo</a></li>
              <li><a href="#" target="_blank">User's Manual</a></li>
            </ul>
          </div> 
          <div class="footer-mright">
            <h4>Api</h4>
            <ul>
              <li><a href="https://github.com/BTCMarkets/API" target="_blank">BtcMarkets - Official</a></li>
              <li><a href="https://github.com/naddison36/btc-markets" target="_blank">BtcMarkets - Nick Addison</a></li>
              <li><a href="https://coinmarketcap.com/api/" target="_blank">CoinMarketCap</a></li>
              <li><a href="https://www.cryptocompare.com/api/" target="_blank">CryptoCompare</a></li>
            </ul>
          </div> 
          <div class="footer-right">
            <h4>More</h4>
            <ul>
              <li><a href="#" target="_blank">Contact</a></li>
              <li><a href="https://github.com/bertolucci1985" target="_blank">GitHub</a></li>
              <li><a href="#" target="_blank">Twitter</a></li>
            </ul>
          </div> 
        </div>
      </div>      
    </footer>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

  i{
    color: white;
    font-size: 30px;
  }
  h1{
    font-weight: 700;
    font-size: 32px;
    margin:0;
  }
  h2{
    font-size: 45px;
    font-weight: 300;
    margin-top: 0;
  }
  h3{
    font-size: 29px;
    font-weight: 300;
    margin-top: 0;
  }
  h4{
    font-family: 'Roboto', sans-serif;
    color: #6ea1ad;
    font-size: 15px;
    font-weight: 400;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  li{
    padding-top: .5rem;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 200;
  }
  p{
    line-height: 1.75;
  }
  a{
    color: inherit;
    text-decoration: none;
  }
  section{
    padding: 2%;
  }
  ul{
    list-style-type: none;
  }
  .nav-bar{
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    min-height: 100px;
    background-color: var(--darkgrey);
    width: 100%;
    margin: 0 auto;
    align-items:center;
  }
  .container-scope{
    width: 95%;
    margin: 0 auto;
    color: var(--darkgrey);
  }
  .start{
    color: var(--darkgrey);
  }
  .middle{
    background-color: var(--lightgrey);
    padding-bottom: 3%;
  }
  .end{
    background-color: white;
  }
  .start-flex{
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    grid-gap: 4em 4em;
    padding: 5% 0;
  }
  .start-flex-left{
    padding: 2rem 2rem 0 3rem ;
  }
  .start-flex-left > a{
    margin-right: 3%;
  }
  .start-flex-left > a:last-child{
    margin-right: 0%;
  }
  .start-flex-right{
    position: absolute;
    right: 0;  
    min-width: 45%;
    top: 10em; 
  }
  .middle-flex{
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
    grid-template-rows: 1fr 2.5fr 1fr;
    grid-template-areas: "top top top"
                          "left center right"
                          "bottom bottom bottom";
    grid-gap: 2rem 4rem;
    padding: 0 0 1em 0;
    justify-items: stretch;
  }
  .middle-flex > h2{
    padding: 2px;
  }
  .middle-flex-top{
    grid-area: top;
    align-self: center;
    justify-self: center;
  }
  .middle-flex-top h2{
    padding: 5% 0;
  }
  .middle-flex-left{
    grid-area: left;
  }
  .middle-flex-center{
    grid-area: center;
  }
  .middle-flex-right{
    grid-area: right;
   }
  .middle-flex-bottom{
    grid-area: bottom;
    justify-self: center;
    align-self: end;
  }
  .middle-flex-bottom > h3{
    font-weight: 400;
  }
  .middle-flex-left > h2{
    padding-top: 5%;
    font-weight: 300;
    font-size: 30px;
  }
  .middle-flex-center > h2{
    padding-top: 5%;
    font-weight: 300;
    font-size: 30px;
  }
  .middle-flex-right > h2{
    padding-top: 5%;
    font-weight: 300;
    font-size: 30px;
  }
  .bottom-flex{
    display: grid;
    grid-template-rows: 1fr, 1fr, 1fr, 1fr;
    padding: 2% 0 0 0;
  }
  .bottom-flex-top{
    justify-self: center;
    line-height: 5em;
    width:25%;
    text-align: center;
    padding-bottom: 3%;
  }
  .bottom-flex-top h3{
    font-weight: 400;
  }

  .bottom-flex-center{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    padding: 3% 0;
  }
  .bottom-flex-bottom{
    padding-top: 3%;
    justify-self: center;
    align-self: end;
  }
  .bottom-flex-bottom .logo{
    color: var(--darkgrey);
  }
  .bottom-flex-bottom-farther{
    justify-self: center;
    align-self: start;
  }
  .bottom-flex-bottom-farther > p{
    margin:0;
  }
  
  footer{
    background: var(--darkgrey);
    height: 280px;
    min-width: 100%;
  }

  /*Buttons*/
  .bar-left{
    justify-self: center;
  }
  .bar-left > img{
    width: 6em;
  }
  .bar-center{
    justify-self: center;
  }
  .bar-center > p{
    display: inline;
    color: white;
    padding-left: 5px;
    padding-right: 15px;
  }
 
  .bar-center > i::first-child::last-child{
    padding: 0;
  }
  .bar-right{
    justify-self: center;
  }
  .btn-scope{ /*Global setting*/
    display: inline-block;
    text-decoration: none;
    padding: 0.7em 1.2em;
    font-weight: 700;  
    border-radius: 3%;
  }
  .btn-bigger{
    font-size: 30px;
  }
  .btn-normal{
    background: var(--primary);
    color: white;
  }
  .btn-normal:hover{
    color: white;
    background: #F4511E;   
  }
  .btn-ghost{
    border: 1.5px solid var(--primary);
    color: var(--primary);
  }
  .btn-ghost:hover{
    background: var(--primary);
    color: white;
  }
  .btn-awesome{
    background: white;
    color: var(--primary);
    box-shadow: 0px 4px 5px -3px rgba(0,0,0,.75);
    transition: all ease-in-out 250ms;
  }
  .btn-awesome:hover{
    transform: translateY(-2px);
    box-shadow: 0px 18px 8px -15px rgba(0,0,0,.3);
  }
  .logo{
    font-size:50px;
  }
  .picture{
    max-width: 100%;
    min-height: 100%;
    box-shadow: 0 8px 17px -4px rgba(0,0,0,.70);
    border-radius: 10px 10px 10px 10px;
  }
  .pic-top{
    background: url("https://image.ibb.co/iPebk8/Capture.jpg");
    height: 500px;
    background-size: cover;
    padding-bottom: 10%;
  }
  .picture-left{
    background-image: url('https://preview.ibb.co/mvJsa8/chart.jpg');
    background-repeat: cover;
  }
  .picture-center{
    background-image: url('https://preview.ibb.co/mWUFv8/btc.png');
    background-size: cover;
  }
  .picture-right{
    background-image: url('https://image.ibb.co/iPebk8/Capture.jpg');
    background-size: cover;
  }
  .tech-left{
    background: url("https://image.ibb.co/bZbHA8/logo.png");
    background-size: 100% 100%;
  }
  .tech-middle-left{
    background: url("https://image.ibb.co/jSSqV8/vuetify_logo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .tech-middle-right{
    background: url("https://preview.ibb.co/nxNDiT/firebase_logo.png");
    background-size: 150% 110%;
  }
  .tech-right{
    background: url("https://image.ibb.co/d938Ho/chartjs_logo.jpg");
    background-size: 100% 100%;
  }
  .rounded-div{
    padding-bottom: 10%;
    height: 150px;
    min-width: 170px;
  }
  .footer-flex{
    padding-top: 2%;
    margin: 0 auto;
    display: grid;
    max-width: 60%;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: 1fr;
    grid-gap: 10%;
    justify-items: center;
    align-content: center;
    color: white;
  }
  
</style>

