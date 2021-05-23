import React from 'react';
import "./LeftWidget.css";

export default () => {
    return (
        <aside class="widget-area">
              <div class="card card-profile widget-item p-0">
                  <div class="profile-banner">
                      <figure class="profile-banner-small">
                          <a href="profile.html">
                              <img src="https://cultivatedculture.com/wp-content/uploads/2020/06/LinkedIn-Banner-Image-Example-of-Someone-Hiking-In-The-Mountains.png" alt=""/>
                          </a>
                          <a href="profile.html" class="profile-thumb-2">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2BM0rkhOz_yrzecDNNxiddeX8LqaDrPyphCzwIpT7eB3H2giYlEmuM6B0L7ESCYd_4oI&usqp=CAU" alt=""/>
                          </a>
                      </figure>
                      <div class="profile-desc text-center">
                          <h6 class="author"><a href="profile.html">Dimbel Lebmid</a></h6>
                          <p>Any one can join with but Social network us if you want Any one can join with us if you want</p>
                      </div>
                  </div>
              </div>
              </aside>
    )
}