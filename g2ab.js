$(window).load(function(){
		  $('div' + '.amebloGist').each(function(){
		    var param = $(this).attr('id');
		    if(param && param.match(/^[0-9]*$/)){
            	var giturl = 'https://gist.github.com/'+param+'.json'
	            $.ajax({
	                url: giturl,
	                type: 'GET',
	                dataType: 'jsonp'
	              }).success(function(gistdata) {
	            	  alert(gistdata.div)
                     var gistlink = document.createElement("link");
	            	  gistlink.href = gistdata.stylesheet
	            	  gistlink.media = "screen"
	            	  gistlink.rel = "stylesheet"
	                 document.head.appendChild(gistlink);
          	 		 $('#'+param).html(gistdata.div)
          	 		 
	              }).error(function() {
	            	 alert("error") 
	              });
		    }else{
		      notice(param, "Illigal parameter.");
		    }
		  });
		});