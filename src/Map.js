/*global kakao*/
import React, { useEffect } from "react";
import "./Map.css";

function Map() {
  useEffect(() => {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도 타입 컨트롤 생성
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도 위에 표시됨
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열
    var positions = [
      {
        content: "<div>카카오</div>",
        latlng: new kakao.maps.LatLng(33.450705, 126.570677),
      },
      {
        content:
          '<div style="padding:5px;">Hello World! \
          <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> \
          <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>',
        latlng: new kakao.maps.LatLng(33.450936, 126.569477),
      },
      {
        content: "<div>텃밭</div>",
        latlng: new kakao.maps.LatLng(33.450879, 126.56994),
      },
      {
        content: "<div>근린공원</div>",
        latlng: new kakao.maps.LatLng(33.451393, 126.570738),
      },
    ];

    for (var i = 0; i < positions.length; i++) {
      // 마커 생성
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
      });

      // 마커에 표시할 인포윈도우를 생성
      var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
        removable: true,
      });
      // 마커에 mouseover 이벤트와 mouseout 이벤트 등록
      // 이벤트 리스너로는 클로저를 만들어 등록
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됨
      kakao.maps.event.addListener(
        marker,
        "click",
        makeOverListener(map, marker, infowindow)
      );
      //kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    }
    // 인포윈도우를 표시하는 클로저를 만드는 함수
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }
  }, []);

  return (
    <div id="mapwrap">
      <div
        className="map"
        id="map"
        style={{ width: "auto", height: "900px" }}
      ></div>
      <div class="category">
        <ul>
          <li id="coffeeMenu" onclick="changeMarker('coffee')">
            <span class="ico_comm ico_coffee"></span>
            커피숍
          </li>
          <li id="storeMenu" onclick="changeMarker('store')">
            <span class="ico_comm ico_store"></span>
            편의점
          </li>
          <li id="carparkMenu" onclick="changeMarker('carpark')">
            <span class="ico_comm ico_carpark"></span>
            주차장
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Map;
