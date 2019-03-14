// 位置情報を取得
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var data = position.coords ;

			// データの整理
			var lat = data.latitude ;
			var lng = data.longitude ;
			var alt = data.altitude ;
			var accLatlng = data.accuracy ;
			var accAlt = data.altitudeAccuracy ;
			var heading = data.heading ;
      var speed = data.speed ;
      alert(lat);
    }
  )
}