function includeHTML() {
    var headerPlaceholder = document.getElementById("headerjs");
    var footerPlaceholder = document.getElementById("footerjs");
    var navPlaceholder = document.getElementById("navbarjs");


    var headerRequest = new XMLHttpRequest();
    headerRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            headerPlaceholder.innerHTML = this.responseText;
        }
    };
    headerRequest.open("GET", "include/header.html", true);
    headerRequest.send();

    var footerRequest = new XMLHttpRequest();
    footerRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            footerPlaceholder.innerHTML = this.responseText;
        }
    };
    footerRequest.open("GET", "include/footer.html", true);
    footerRequest.send();

    var navRequest = new XMLHttpRequest();
    navRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){
            navPlaceholder.innerHTML = this.responseText;
        }
    }
    navRequest.open("GET", "include/nav.html", true);
    navRequest.send();
    
}

       function daumPostcodeFinder(){
        new daum.Postcode({
            oncomplete: function(data){
                var addr = ''; //주소 담을 변수
                var extraAddr = ''; // 참고항목 담을 변수

                //도로명주소 or 지번주소
                if(data.userSelectedType == 'R'){
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("form_extraAddress").value = extraAddr;
                
                } else {
                    document.getElementById("form_extraAddress").value = '';
                }


                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('form_postcode').value = data.zonecode;
                document.getElementById("form_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("form_detailAddress").focus();
            }
        }).open();
       }