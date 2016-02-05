debugger
 window.onmessage = function(e) {
                debugger
                var data = JSON.parse(e.data);
                localStorage.setItem('token', data.token);
              }